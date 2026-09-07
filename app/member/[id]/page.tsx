"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface MemberProfile {
  _id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  photo: string | null;
  companyLogo: string | null;
  address: string;
  city: string;
  state: string;
  pincode: string;
  website: string;
  category: string;
  subCategory: string;
  chapter: string;
  zone: string;
  profileLink: string;
}

export default function MemberProfilePage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const [member, setMember] = useState<MemberProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [photoError, setPhotoError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const queryName = searchParams.get("name") || "";
  const queryCompany = searchParams.get("company") || "";
  const queryRole = searchParams.get("role") || "";
  const queryEmail = searchParams.get("email") || "";
  const queryPhone = searchParams.get("phone") || "";
  const queryPhoto = searchParams.get("photo") || "";
  const queryChapter = searchParams.get("chapter") || "";
  const queryZone = searchParams.get("zone") || "";
  const queryWebsite = searchParams.get("website") || "";

  useEffect(() => {
    if (!id) return;

    if (queryName) {
      setMember({
        _id: id,
        name: queryName,
        company: queryCompany,
        role: queryRole,
        email: queryEmail,
        phone: queryPhone,
        photo: queryPhoto ? decodeURIComponent(queryPhoto) : null,
        companyLogo: null,
        address: "",
        city: "",
        state: "Tamilnadu",
        pincode: "",
        website: queryWebsite ? decodeURIComponent(queryWebsite) : "",
        category: "",
        subCategory: queryRole,
        chapter: queryChapter,
        zone: queryZone,
        profileLink: queryWebsite ? decodeURIComponent(queryWebsite) : ""
      });
      setLoading(false);
      return;
    }

    fetch(`/api/member-profile?id=${encodeURIComponent(id)}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.member) {
          setMember(json.member);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id, queryName, queryCompany, queryRole, queryEmail, queryPhone, queryPhoto, queryChapter, queryZone, queryWebsite]);

  const initials = member
    ? member.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("")
    : "";

  const fullAddress = [
    member?.address,
    member?.city || (member?.zone ? member.zone.replace(/zone/i, "").trim() : ""),
    member?.state || "Tamilnadu",
    member?.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <>
      <Header />
      <div className="mp-page">
        {loading && (
          <div className="mp-loading">
            <div className="mp-spinner" />
            <p>Loading profile…</p>
          </div>
        )}

        {!loading && notFound && (
          <div className="mp-not-found">
            <i className="fa-solid fa-user-slash" />
            <h2>Profile not found</h2>
            <p>This member profile is not available.</p>
            <Link href="/" className="mp-back-btn">← Back to Home</Link>
          </div>
        )}

        {!loading && member && (
          <>
            {/* ── Top White Section ── */}
            <div className="mp-top-section">
              {/* Hero Banner */}
              <div className="mp-hero">
                <div className="mp-hero-bg" />
                <div className="mp-hero-photo-wrap">
                  {member.photo && !photoError ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="mp-hero-photo"
                      onError={() => setPhotoError(true)}
                    />
                  ) : (
                    <div className="mp-hero-photo mp-hero-initials">{initials}</div>
                  )}
                </div>
              </div>

              {/* Identity Details */}
              <div className="mp-identity">
                <h1 className="mp-name">{member.name.toUpperCase()}</h1>
                {member.company && <p className="mp-company">{member.company}</p>}
                {(member.category || member.role) && (
                  <p className="mp-category">
                    {[member.category, member.subCategory || member.role]
                      .filter(Boolean)
                      .join(" | ")}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mp-actions">
                {member.phone && (
                  <a href={`tel:${member.phone}`} className="mp-action-btn" title="Call">
                    <i className="fa-solid fa-phone" />
                  </a>
                )}
                {member.email && (
                  <a href={`mailto:${member.email}`} className="mp-action-btn" title="Email">
                    <i className="fa-solid fa-envelope" />
                  </a>
                )}
                {member.website && (
                  <a
                    href={member.website.startsWith("http") ? member.website : `https://${member.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mp-action-btn"
                    title="Website"
                  >
                    <i className="fa-solid fa-globe" />
                  </a>
                )}
                {member.profileLink && (
                  <a
                    href={member.profileLink.startsWith("http") ? member.profileLink : `https://${member.profileLink}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mp-action-btn"
                    title="GRIP Profile"
                  >
                    <i className="fa-solid fa-link" />
                  </a>
                )}
              </div>
            </div>

            {/* ── Bottom Gray Section ── */}
            <div className="mp-bottom-section">
              <div className="mp-content-container">
                {/* Business Card Info */}
                <div className="mp-bcard">
                  <div className="mp-bcard-logo-col">
                    {member.companyLogo && !logoError ? (
                      <img
                        src={member.companyLogo}
                        alt={member.company}
                        className="mp-bcard-logo"
                        onError={() => setLogoError(true)}
                      />
                    ) : (
                      <div className="mp-bcard-logo-placeholder">
                        <i className="fa-solid fa-building" />
                      </div>
                    )}
                  </div>
                  <div className="mp-bcard-details">
                    <p className="mp-bcard-name">Mr. {member.name}</p>
                    {member.company  && <p className="mp-bcard-company">{member.company}</p>}
                    {fullAddress     && <p className="mp-bcard-address">{fullAddress}</p>}
                    {member.website  && (
                      <p className="mp-bcard-website">
                        <a
                          href={member.website.startsWith("http") ? member.website : `https://${member.website}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {member.website.replace(/^https?:\/\//i, "")}
                        </a>
                      </p>
                    )}
                  </div>
                </div>

                {/* Chapter & Zone Info */}
                {(member.chapter || member.zone) && (
                  <div className="mp-chapter-info">
                    <i className="fa-solid fa-users" />
                    <span>
                      GRIP{member.chapter ? ` – ${member.chapter}` : ""}
                      {member.zone ? ` (${member.zone})` : ""}
                    </span>
                  </div>
                )}

                {/* Back Button */}
                <div className="mp-footer">
                  <button onClick={() => window.history.back()} className="mp-back-btn">
                    ← Back
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />

      <style>{`
        /* ── Layout ── */
        .mp-page { min-height: 100vh; background: #f5f5f5; display: flex; flex-direction: column; width: 100%; }

        .mp-top-section { background: #fff; width: 100%; display: flex; flex-direction: column; align-items: center; padding-bottom: 24px; }
        .mp-bottom-section { background: #f5f5f5; width: 100%; padding: 24px 16px 60px; display: flex; flex-direction: column; align-items: center; }
        .mp-content-container { width: 100%; max-width: 600px; display: flex; flex-direction: column; gap: 20px; }

        /* ── Loaders ── */
        .mp-loading { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 80px 20px; color: #888; width: 100%; }
        .mp-spinner { width: 44px; height: 44px; border: 3px solid #e0e0e0; border-top-color: #c1272d; border-radius: 50%; animation: mp-spin .8s linear infinite; }
        @keyframes mp-spin { to { transform: rotate(360deg); } }

        .mp-not-found { text-align: center; padding: 80px 20px; color: #888; width: 100%; }
        .mp-not-found i { font-size: 3rem; color: #ccc; margin-bottom: 16px; display: block; }
        .mp-not-found h2 { font-size: 1.4rem; color: #444; margin-bottom: 8px; }

        /* ── Hero ── */
        .mp-hero { position: relative; width: 100%; height: 160px; background: #9e9e9e; display: flex; justify-content: center; }
        .mp-hero-bg { position: absolute; inset: 0; background: linear-gradient(160deg, #bdbdbd 0%, #9e9e9e 100%); }
        .mp-hero-photo-wrap { position: absolute; bottom: -60px; z-index: 2; }
        .mp-hero-photo { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; object-position: top; border: 4px solid #fff; box-shadow: 0 4px 16px rgba(0,0,0,.18); background: #e0e0e0; }
        .mp-hero-initials { display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg,#c1272d,#e05555); color: #fff; font-size: 2.5rem; font-weight: 700; }

        /* ── Identity ── */
        .mp-identity { padding: 76px 20px 16px; text-align: center; width: 100%; }
        .mp-name { font-size: 1.5rem; font-weight: 800; color: #c1272d; margin-bottom: 6px; letter-spacing: .5px; }
        .mp-company { font-size: 14px; font-weight: 700; color: #c1272d; margin-bottom: 4px; }
        .mp-category { font-size: 14px; color: #555; margin: 0; }

        /* ── Action buttons ── */
        .mp-actions { display: flex; justify-content: center; gap: 20px; width: 100%; }
        .mp-action-btn { width: 46px; height: 46px; border-radius: 50%; background: #c1272d; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 16px; text-decoration: none; transition: background .2s, transform .15s; }
        .mp-action-btn:hover { background: #a01f24; transform: scale(1.08); color: #fff; }

        /* ── Business card ── */
        .mp-bcard { background: #fff; border-radius: 12px; display: flex; gap: 20px; padding: 24px; align-items: flex-start; box-shadow: 0 2px 12px rgba(0,0,0,.04); border: 1px solid #eaeaea; width: 100%; }
        .mp-bcard-logo-col { flex-shrink: 0; }
        .mp-bcard-logo { width: 90px; height: 90px; object-fit: contain; border-radius: 6px; background: #fff; padding: 6px; border: 1px solid #e0e0e0; }
        .mp-bcard-logo-placeholder { width: 90px; height: 90px; background: #e8e8e8; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #aaa; font-size: 2.2rem; }
        .mp-bcard-details { flex: 1; min-width: 0; }
        .mp-bcard-name { font-size: 15px; font-weight: 700; color: #222; margin-bottom: 4px; }
        .mp-bcard-company { font-size: 14px; font-weight: 600; color: #444; margin-bottom: 4px; }
        .mp-bcard-address { font-size: 13px; color: #666; line-height: 1.6; margin-bottom: 6px; }
        .mp-bcard-website a { font-size: 13px; color: #c1272d; font-weight: 600; text-decoration: none; }
        .mp-bcard-website a:hover { text-decoration: underline; }

        /* ── Chapter info ── */
        .mp-chapter-info { display: flex; align-items: center; gap: 10px; padding: 16px 24px; background: #fff; border-radius: 12px; font-size: 13px; color: #555; box-shadow: 0 2px 12px rgba(0,0,0,.04); border: 1px solid #eaeaea; width: 100%; }
        .mp-chapter-info i { color: #c1272d; }

        /* ── Footer ── */
        .mp-footer { padding: 24px; text-align: center; width: 100%; }
        .mp-back-btn { display: inline-flex; align-items: center; gap: 6px; padding: 10px 24px; border: 2px solid #c1272d; color: #c1272d; border-radius: 50px; font-weight: 600; font-size: 14px; background: #fff; cursor: pointer; text-decoration: none; transition: all .2s; }
        .mp-back-btn:hover { background: #c1272d; color: #fff; }
      `}</style>
    </>
  );
}
