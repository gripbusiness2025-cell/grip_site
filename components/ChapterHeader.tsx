"use client";

import Link from "next/link";
import Header from "./Header";

interface ChapterHeaderProps {
  chapterName: string;
  zoneSlug: string;
  chapterSlug: string;
  currentTab?: "members" | "gallery" | "detail" | "";
}

export default function ChapterHeader({
  chapterName,
  zoneSlug,
  chapterSlug,
  currentTab = "",
}: ChapterHeaderProps) {
  const chapterHomeUrl = `/${zoneSlug}/${chapterSlug}`;
  const galleryUrl = `/${zoneSlug}/${chapterSlug}/gallery`;
  const membersUrl = `/${zoneSlug}/${chapterSlug}/members`;

  return (
    <>
      <Header menuType="zone" zoneSlug={zoneSlug} />

      {/* White logo + nav bar */}
      <div className="chapter-mainbar">
        <div className="container chapter-mainbar-inner">
          <Link href={chapterHomeUrl} className="chapter-mainbar-brand">
            <img src="/assets/images/logo/gripbg.png?v=1" alt="GRIP – The Business Forum" className="chapter-mainbar-logo" />
            <span className="chapter-mainbar-divider" />
            <span className="chapter-mainbar-name">{chapterName}</span>
          </Link>
          <nav className="chapter-mainbar-nav">
            <Link
              href={membersUrl}
              className={currentTab === "members" ? "active" : ""}
            >
              CHAPTER MEMBERS
            </Link>
            <span className="chapter-mainbar-nav-sep">|</span>
            <Link
              href={galleryUrl}
              className={currentTab === "gallery" ? "active" : ""}
            >
              GALLERY
            </Link>
          </nav>
        </div>
      </div>

      <style>{`
        .chapter-topbar {
          background: #c1272d;
          padding: 7px 0;
        }
        .chapter-topbar-inner {
          display: flex;
          justify-content: flex-end;
        }
        .chapter-topbar-links {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .chapter-topbar-links a {
          color: #fff;
          font-size: 12px;
          font-weight: 500;
          text-decoration: none;
          opacity: 0.92;
          transition: opacity 0.2s;
        }
        .chapter-topbar-links a:hover {
          opacity: 1;
        }
        .chapter-topbar-sep {
          color: rgba(255, 255, 255, 0.5);
          font-size: 12px;
        }

        .chapter-mainbar {
          background: #fff;
          border-bottom: 1px solid #e8e8e8;
          padding: 14px 0;
        }
        .chapter-mainbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .chapter-mainbar-brand {
          display: flex;
          align-items: center;
          gap: 14px;
          text-decoration: none !important;
        }
        .chapter-mainbar-logo {
          height: 44px;
          width: auto;
          object-fit: contain;
        }
        .chapter-mainbar-divider {
          display: inline-block;
          width: 1px;
          height: 36px;
          background: #ccc;
        }
        .chapter-mainbar-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: #222;
          letter-spacing: 0.3px;
        }
        .chapter-mainbar-nav {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .chapter-mainbar-nav a {
          font-size: 13px;
          font-weight: 700;
          color: #222;
          text-decoration: none;
          letter-spacing: 0.5px;
          transition: color 0.2s;
        }
        .chapter-mainbar-nav a:hover,
        .chapter-mainbar-nav a.active {
          color: #c1272d;
        }
        .chapter-mainbar-nav-sep {
          color: #bbb;
          font-size: 16px;
        }
        @media (max-width: 576px) {
          .chapter-mainbar-nav {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
