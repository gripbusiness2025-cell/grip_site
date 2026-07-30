"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_PHP_BACKEND_URL || "https://gripforum.com";

interface Associate {
  id: number;
  name: string;
  sub_category: string;
  business_name: string;
  email: string;
  website_link: string;
  photo: string;
  category: string;
}

interface AssociateGroups {
  head_team: Associate[];
  visitor_interaction_team: Associate[];
  members: Associate[];
}

// Groups that map to BNI-style leadership sections
const LEADERSHIP_ROLES = ["President", "Vice President", "Secretary / Treasurer", "Secretary/Treasurer", "Secretary"];
const VISITOR_HOST_ROLES = ["Visitor Host"];
const MEMBERSHIP_ROLES = ["Membership Committee", "Membership Coordinator"];
const SUPPORTING_ROLES = ["Education Coordinator", "Events Coordinator", "Mentor Coordinator", "Training Coordinator"];

function groupByRole(members: Associate[], roles: string[]) {
  return members.filter((m) =>
    roles.some((r) => m.sub_category?.toLowerCase().includes(r.toLowerCase()))
  );
}

function MemberCard({ member }: { member: Associate }) {
  const photo = member.photo
    ? `${BACKEND_URL}/application/uploads/${member.photo}`
    : "/assets/images/logo/grip.png";

  return (
    <div className="chapter-member-card">
      <div className="chapter-member-photo-wrap">
        <img
          src={photo}
          alt={member.name}
          className="chapter-member-photo"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/assets/images/logo/grip.png";
          }}
        />
      </div>
      <div className="chapter-member-body">
        <h6 className="chapter-member-name">{member.name}</h6>
        {member.sub_category && (
          <p className="chapter-member-role">{member.sub_category}</p>
        )}
        {member.business_name && (
          <p className="chapter-member-company">{member.business_name}</p>
        )}
        <div className="chapter-member-actions">
          <div className="chapter-member-icons">
            {member.email && (
              <a href={`mailto:${member.email}`} title={member.email}>
                <i className="fa-solid fa-envelope" />
              </a>
            )}
            {member.website_link && (
              <a href={member.website_link} target="_blank" rel="noreferrer" title={member.website_link}>
                <i className="fa-solid fa-globe" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function RoleSection({ title, members }: { title: string; members: Associate[] }) {
  if (!members.length) return null;
  return (
    <div className="chapter-role-section">
      <div className="chapter-role-divider">
        <span>{title}</span>
      </div>
      <div className="chapter-members-grid">
        {members.map((m) => (
          <MemberCard key={m.id} member={m} />
        ))}
      </div>
    </div>
  );
}

function ChapterHeader() {
  return (
    <>
      <Header menuType="zone" zoneSlug="chennai" />

      {/* White logo + nav bar */}

      
      <div className="chapter-mainbar">
        <div className="container chapter-mainbar-inner">
          <a href="https://gripforum.com" target="_blank" rel="noreferrer" className="chapter-mainbar-brand">
            <img src="/assets/images/logo/grip.png" alt="GRIP" className="chapter-mainbar-logo" />
            <span className="chapter-mainbar-divider" />
            <span className="chapter-mainbar-name">Aram</span>
          </a>
          <nav className="chapter-mainbar-nav">
            <a href="#members">CHAPTER MEMBERS</a>
            <span className="chapter-mainbar-nav-sep">|</span>
            <a href="/chapters/aram">GALLERY</a>
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
        .chapter-topbar-links a:hover { opacity: 1; }
        .chapter-topbar-sep { color: rgba(255,255,255,0.5); font-size: 12px; }

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
        .chapter-mainbar-nav a:hover { color: #c1272d; }
        .chapter-mainbar-nav-sep { color: #bbb; font-size: 16px; }
        @media (max-width: 576px) {
          .chapter-mainbar-nav { display: none; }
        }
      `}</style>
    </>
  );
}

export default function ChapterAramDetail() {
  const [data, setData] = useState<AssociateGroups | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAllMembers, setShowAllMembers] = useState(false);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/associates.php`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json) => { setData(json); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const headTeam = data?.head_team ?? [];
  const visitorTeam = data?.visitor_interaction_team ?? [];
  const members = data?.members ?? [];
  const totalMembers = headTeam.length + visitorTeam.length + members.length;

  const leadership = groupByRole(headTeam, LEADERSHIP_ROLES);
  const visitorHosts = [
    ...groupByRole(headTeam, VISITOR_HOST_ROLES),
    ...groupByRole(visitorTeam, VISITOR_HOST_ROLES),
    ...visitorTeam.filter((m) => !VISITOR_HOST_ROLES.some((r) => m.sub_category?.toLowerCase().includes(r.toLowerCase()))),
  ];
  const membershipCommittee = groupByRole(headTeam, MEMBERSHIP_ROLES);
  const supportingLeaders = groupByRole(headTeam, SUPPORTING_ROLES);

  // remaining head_team not already grouped
  const grouped = new Set([
    ...leadership.map((m) => m.id),
    ...visitorHosts.map((m) => m.id),
    ...membershipCommittee.map((m) => m.id),
    ...supportingLeaders.map((m) => m.id),
  ]);
  const otherHeadTeam = headTeam.filter((m) => !grouped.has(m.id));

  return (
    <>
      <ChapterHeader />

      {/* ── Hero ────────────────────────────────── */}
      <section
        className="chapter-hero"
        style={{ backgroundImage: "url(/assets/images/grip/aram.jpg)" }}
      >
        <div className="chapter-hero-overlay" />
        <div className="container chapter-hero-content">
          <h1 style={{ color: "#fff" }}>GRIP – Aram Chapter</h1>
          <p style={{ color: "#fff" }}>India's 1st Digital Business Networking &amp; Referral Platform</p>
        </div>
      </section>

      {/* ── Meeting Details ──────────────────────── */}
      <section className="chapter-info-section">
        <div className="container">
          <div className="chapter-info-grid">
            {/* Meeting Details */}
            <div className="chapter-info-box">
              <h4>Meeting Details</h4>
              <p><strong>Wednesday 7:00 AM</strong></p>
              <p>In-Person</p>
              <p>
                <strong>Chennai, Tamil Nadu</strong>
              </p>
              <p className="text-muted" style={{ fontSize: "13px" }}>
                Weekly structured networking meetings every Wednesday.
              </p>
              <a
                href="https://maps.google.com/?q=Chennai+Tamil+Nadu"
                target="_blank"
                rel="noreferrer"
                className="chapter-link"
              >
                View Map
              </a>
            </div>

            {/* Member Count */}
            <div className="chapter-info-box chapter-info-count">
              <h4>Member Count</h4>
              {loading ? (
                <div className="chapter-spinner">
                  <div className="spinner-border text-danger spinner-border-sm" role="status" />
                </div>
              ) : (
                <>
                  <div className="chapter-count-number">{totalMembers || "—"}</div>
                  <button
                    className="chapter-link"
                    onClick={() => setShowAllMembers((v) => !v)}
                  >
                    {showAllMembers ? "Hide Members" : "Show Members"}
                  </button>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="chapter-info-box chapter-info-actions">
              <a
                href="https://user.gripforum.com/"
                target="_blank"
                rel="noreferrer"
                className="chapter-action-btn"
              >
                Visit Us! <i className="fa-solid fa-arrow-right" />
              </a>
              <Link href="/chapters/aram" className="chapter-action-btn chapter-action-btn--outline">
                View Associates <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Leadership ───────────────────────────── */}
      {!loading && data && (
        <section className="chapter-leadership-section" id="members">
          <div className="container">
            <div className="chapter-leadership-header">
              <h3>Chapter Leadership</h3>
            </div>

            <RoleSection title="President &amp; Office Bearers" members={leadership} />
            <RoleSection title="Visitor Host" members={visitorHosts} />
            <RoleSection title="Membership Committee" members={membershipCommittee} />
            <RoleSection title="Supporting Leaders" members={supportingLeaders} />
            {otherHeadTeam.length > 0 && (
              <RoleSection title="Head Team" members={otherHeadTeam} />
            )}

            {/* All Members */}
            {showAllMembers && members.length > 0 && (
              <RoleSection title="Associates" members={members} />
            )}
          </div>
        </section>
      )}

      {loading && (
        <section className="chapter-leadership-section">
          <div className="container text-center py-5">
            <div className="spinner-border text-danger" role="status" />
            <p className="mt-3 text-muted">Loading chapter members…</p>
          </div>
        </section>
      )}

      <style>{`
        /* Hero */
        .chapter-hero {
          position: relative;
          min-height: 340px;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: flex-end;
          padding-bottom: 48px;
        }
        .chapter-hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.55);
        }
        .chapter-hero-content {
          position: relative;
          z-index: 1;
          color: #fff !important;
        }
        .chapter-hero-content h1 {
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 800;
          margin-bottom: 8px;
          color: #fff !important;
        }
        .chapter-hero-content p {
          font-size: 1rem;
          opacity: 0.9;
          margin: 0;
          color: #fff !important;
        }

        /* Info Section */
        .chapter-info-section {
          background: #fff;
          padding: 48px 0;
          border-bottom: 1px solid #eee;
        }
        .chapter-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .chapter-info-grid { grid-template-columns: 1fr; }
        }
        .chapter-info-box h4 {
          font-size: 1.1rem;
          font-weight: 700;
          border-bottom: 3px solid #c1272d;
          padding-bottom: 8px;
          margin-bottom: 16px;
          display: inline-block;
        }
        .chapter-info-box p { margin-bottom: 6px; font-size: 14px; color: #444; }
        .chapter-count-number {
          font-size: 4rem;
          font-weight: 800;
          color: #c1272d;
          line-height: 1;
          margin-bottom: 8px;
        }
        .chapter-link {
          color: #c1272d;
          font-weight: 600;
          font-size: 13px;
          text-decoration: underline;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }
        .chapter-link:hover { opacity: 0.75; }
        .chapter-info-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          justify-content: center;
        }
        .chapter-action-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 12px 24px;
          background: #c1272d;
          color: #fff !important;
          border-radius: 50px;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none !important;
          transition: background 0.2s;
        }
        .chapter-action-btn:hover { background: #a01f24; }
        .chapter-action-btn--outline {
          background: transparent;
          border: 2px solid #c1272d;
          color: #c1272d !important;
        }
        .chapter-action-btn--outline:hover { background: #c1272d; color: #fff !important; }

        /* Leadership Section */
        .chapter-leadership-section {
          padding: 60px 0;
          background: #f8f8f8;
        }
        .chapter-leadership-header {
          background: #fff;
          border: 1px solid #e0e0e0;
          display: inline-block;
          padding: 14px 28px;
          border-radius: 4px 4px 0 0;
          margin-bottom: 0;
        }
        .chapter-leadership-header h3 {
          font-size: 1.3rem;
          font-weight: 700;
          margin: 0;
        }

        /* Role Section */
        .chapter-role-section {
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 0 4px 4px 4px;
          padding: 32px 24px;
          margin-bottom: 24px;
        }
        .chapter-role-divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin-bottom: 28px;
          gap: 12px;
        }
        .chapter-role-divider::before,
        .chapter-role-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #ddd;
        }
        .chapter-role-divider span {
          font-size: 14px;
          font-weight: 600;
          color: #555;
          white-space: nowrap;
          padding: 0 8px;
        }

        /* Member Cards Grid */
        .chapter-members-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 20px;
        }
        @media (max-width: 480px) {
          .chapter-members-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* Member Card */
        .chapter-member-card {
          background: #f5f5f5;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e8e8e8;
          transition: box-shadow 0.2s;
        }
        .chapter-member-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.12); }
        .chapter-member-photo-wrap {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 20px 20px 0;
        }
        .chapter-member-photo {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          object-fit: cover;
          object-position: top;
          border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .chapter-member-body {
          padding: 14px 14px 16px;
          text-align: center;
        }
        .chapter-member-name {
          font-weight: 700;
          font-size: 13px;
          color: #111;
          margin-bottom: 4px;
          line-height: 1.3;
        }
        .chapter-member-role {
          font-size: 12px;
          color: #666;
          margin-bottom: 4px;
        }
        .chapter-member-company {
          font-size: 12px;
          font-weight: 600;
          color: #c1272d;
          margin-bottom: 10px;
          word-break: break-word;
        }
        .chapter-member-actions {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chapter-member-icons {
          display: flex;
          gap: 10px;
        }
        .chapter-member-icons a {
          color: #c1272d;
          font-size: 14px;
          transition: opacity 0.2s;
        }
        .chapter-member-icons a:hover { opacity: 0.7; }
        .chapter-spinner { padding: 20px 0; }
      `}</style>
    </>
  );
}
