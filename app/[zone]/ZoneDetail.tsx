"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

const LOCAL_API  = "http://localhost:4002/api";
const PROD_API   = "https://api.gripforum.com/api";

function toTitle(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const slugify = (s: string) =>
  (s || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

interface Chapter {
  _id: string;
  chapterName: string;
  weekday?: string;
  meetingTime?: string;
  venue?: string;
  stateName?: string;
  memberCount?: number;
  zoneId?: {
    _id: string;
    zoneName: string;
  };
}

export default function ZoneDetail({ zoneSlug }: { zoneSlug: string }) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [zoneFound, setZoneFound] = useState<boolean | null>(null);
  const zoneTitle = toTitle(zoneSlug);

  const allowedNames = ["ARAM", "VIRUTCHAM", "NEXOR", "EDUCATION"];

  const getChapterDetails = (name: string, chapter: Chapter) => {
    const n = name.toUpperCase();
    if (n === "ARAM") {
      return {
        weekday: "Every Tuesday",
        time: "7:00 AM",
        state: "TN"
      };
    }
    if (n === "VIRUTCHAM") {
      return {
        weekday: "Weekly meeting",
        time: "7:00 AM",
        state: "TN"
      };
    }
    if (n === "NEXOR") {
      return {
        weekday: "Every Saturday",
        time: "7:00 AM",
        state: "TN"
      };
    }
    if (n === "EDUCATION") {
      return {
        weekday: "Every Friday",
        time: "7:00 AM",
        state: "TN"
      };
    }
    return {
      weekday: chapter.weekday ? `Every ${chapter.weekday}` : "Weekly meeting",
      time: chapter.meetingTime || "7:00 AM",
      state: chapter.stateName || "TN"
    };
  };

  useEffect(() => {
    async function load() {
      setLoading(true);
      for (const base of [LOCAL_API, PROD_API]) {
        try {
          const r = await fetch(`${base}/mobile/chapters/list?limit=50`, { cache: "no-store" });
          if (!r.ok) continue;
          const j = await r.json();
          const list = j.data || [];

          // Check if this zone slug exists in the chapter list
          const zoneExists = list.some((c: any) => slugify(c.zoneId?.zoneName || "") === zoneSlug);
          setZoneFound(zoneExists);

          if (!zoneExists) {
            setLoading(false);
            return;
          }

          // Filter by zoneSlug, active status, and restrict names for chennai-west-zone
          const filtered = list.filter((c: any) => {
            const isZoneMatch = slugify(c.zoneId?.zoneName || "") === zoneSlug;
            const isChapterActive = c.isActive === 1 && c.isDelete !== 1;
            if (zoneSlug === "chennai-west-zone") {
              return isZoneMatch && isChapterActive && allowedNames.includes(c.chapterName?.toUpperCase());
            }
            return isZoneMatch && isChapterActive;
          });
          setChapters(filtered);
          setLoading(false);
          return;
        } catch { /* try next */ }
      }
      setZoneFound(false);
      setLoading(false);
    }
    load();
  }, [zoneSlug]);

  // Zone doesn't exist → show 404
  if (!loading && zoneFound === false) {
    return (
      <>
        <Header />
        <section style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          <div>
            <h1 style={{ fontSize: "6rem", fontWeight: 900, color: "#d23b3b", lineHeight: 1 }}>404</h1>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111", marginBottom: "12px" }}>Zone Not Found</h2>
            <p style={{ color: "#666", marginBottom: "28px" }}>The page <strong>/{zoneSlug}</strong> does not exist.</p>
            <Link href="/" className="si__btn">Back to Home</Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Header menuType="zone" zoneSlug={zoneSlug} />
      {/* Hero Banner */}
      <section className="zone-hero">
        <div className="zone-hero-overlay" />
        <div className="container zone-hero-content">
          <h1>{zoneTitle}</h1>
          <p>India's 1st Digital Business Networking &amp; Referral Platform</p>
        </div>
      </section>

      {/* Chapters Grid */}
      <section className="zone-chapters-section">
        <div className="container">
          <div className="zone-header">
            <h2>Active Chapters</h2>
            <p className="text-muted">Select a chapter below to explore leadership and associates.</p>
          </div>

          {loading ? (
            <div className="row">
              {[0, 1, 2].map((i) => (
                <div key={i} className="col-lg-4 col-md-6 mb-4">
                  <div className="zone-chapter-card shimmer-card">
                    <div className="shimmer-line header-shimmer" />
                    <div className="shimmer-line body-shimmer" />
                    <div className="shimmer-line footer-shimmer" />
                  </div>
                </div>
              ))}
            </div>
          ) : chapters.length === 0 ? (
            <div className="zone-empty-state">
              <i className="fa-regular fa-folder-open" />
              <p>No active chapters found in this zone.</p>
              <Link href="/" className="si__btn mt-15">Back to Home</Link>
            </div>
          ) : (
            <div className="row">
              {chapters.map((chapter) => {
                const chapterSlug = slugify(chapter.chapterName);
                const detailUrl = `/${zoneSlug}/${chapterSlug}`;
                const details = getChapterDetails(chapter.chapterName, chapter);
                return (
                  <div key={chapter._id} className="col-lg-4 col-md-6 mb-4">
                    <div className="zone-chapter-card">
                      <div className="card-header-accent" />
                      <div className="card-body-content">
                        <h3 className="chapter-title">{chapter.chapterName}</h3>
                        <div className="chapter-meta">
                          <div className="meta-item">
                            <i className="fa-regular fa-calendar-days" />
                            <span>{details.weekday}</span>
                          </div>
                          <div className="meta-item">
                            <i className="fa-regular fa-clock" />
                            <span>{details.time}</span>
                          </div>
                          <div className="meta-item location-item">
                            <i className="fa-regular fa-map" />
                            <span>{details.state}</span>
                          </div>
                          {chapter.memberCount !== undefined && (
                            <div className="meta-item">
                              <i className="fa-regular fa-user" />
                              <span>{chapter.memberCount} Associates</span>
                            </div>
                          )}
                        </div>
                        <div className="card-actions">
                          <Link href={detailUrl} className="si__btn si__btn-sm w-100 text-center">
                            Explore Chapter <i className="fa-solid fa-arrow-right ms-2" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <style>{`
        /* Hero section styling matching ChapterHero */
        .zone-hero {
          position: relative;
          min-height: 280px;
          background-image: url("/assets/images/slider/banner.jpeg");
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: flex-end;
          padding-bottom: 40px;
        }
        .zone-hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
        }
        .zone-hero-content {
          position: relative;
          z-index: 1;
          color: #fff;
        }
        .zone-hero-content h1 {
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 800;
          color: #fff;
          margin-bottom: 6px;
        }
        .zone-hero-content p {
          font-size: 1.1rem;
          color: #e0e0e0;
          margin: 0;
        }

        /* Chapters list layout */
        .zone-chapters-section {
          padding: 60px 0 80px;
          background: #fdfdfd;
        }
        .zone-header {
          margin-bottom: 40px;
        }
        .zone-header h2 {
          font-size: 2rem;
          font-weight: 800;
          color: #111;
          margin-bottom: 8px;
          position: relative;
          display: inline-block;
        }
        .zone-header h2::after {
          content: '';
          display: block;
          width: 50%;
          height: 4px;
          background: #c1272d;
          margin-top: 8px;
          border-radius: 2px;
        }

        /* Chapter Cards */
        .zone-chapter-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #eaeaea;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .zone-chapter-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(193, 39, 45, 0.08);
          border-color: rgba(193, 39, 45, 0.2);
        }
        .card-header-accent {
          height: 6px;
          background: #c1272d;
          width: 100%;
        }
        .card-body-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .chapter-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: #111;
          margin-bottom: 18px;
          letter-spacing: -0.3px;
        }
        .chapter-meta {
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-grow: 1;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
          color: #555;
        }
        .meta-item i {
          color: #c1272d;
          width: 16px;
          font-size: 0.95rem;
        }
        .location-item span {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.4;
        }
        .si__btn-sm {
          padding: 10px 20px;
          font-size: 0.85rem;
          border-radius: 8px;
        }

        /* Empty state */
        .zone-empty-state {
          text-align: center;
          padding: 80px 0;
          color: #888;
        }
        .zone-empty-state i {
          font-size: 3.5rem;
          color: #ccc;
          margin-bottom: 16px;
          display: block;
        }
        .zone-empty-state p {
          font-size: 1.1rem;
          margin: 0;
        }

        /* Shimmer Loading animation */
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .shimmer-line {
          background: linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 4px;
        }
        .header-shimmer {
          height: 24px;
          width: 60%;
        }
        .body-shimmer {
          height: 80px;
          width: 100%;
        }
        .footer-shimmer {
          height: 38px;
          width: 100%;
          border-radius: 8px;
        }
      `}</style>
    </>
  );
}
