"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ChapterHeader from "@/components/ChapterHeader";

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "https://api.gripforum.com/api/public";
const PHP_URL = process.env.NEXT_PUBLIC_PHP_BACKEND_URL || "https://gripforum.com";

/* ─── helpers ─────────────────────────────────── */
function toTitle(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function avatarUrl(img?: { docPath?: string; docName?: string } | null) {
  if (img?.docPath && img?.docName)
    return `${IMAGE_URL}/${img.docPath}/${img.docName}`;
  return "/assets/images/logo/grip.png";
}

/* ─── types ───────────────────────────────────── */
interface Member {
  _id: string;
  name?: string;
  role?: string;
  chapterRole?: string;
  company?: string;
  email?: string;
  phone?: string;
  photo?: string | null;
}

function MemberCard({ member, showRoleTop = false, profileLink }: { member: Member; showRoleTop?: boolean; profileLink?: string }) {
  const name    = member.name || "—";
  const role    = member.chapterRole || member.role || "";
  const company = member.company || "";
  const email   = member.email || "";
  const phone   = member.phone || "";
  const hasPhoto = !!member.photo;

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <div className="chapter-member-card">
      {showRoleTop && role && (
        <div className="chapter-member-role-top">{role}</div>
      )}
      <div className="chapter-member-photo-wrap">
        {hasPhoto ? (
          <img
            src={member.photo!}
            alt=""
            className="chapter-member-photo"
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.style.display = "none";
              const wrap = el.parentElement;
              if (wrap && !wrap.querySelector(".chapter-member-initials")) {
                const div = document.createElement("div");
                div.className = "chapter-member-photo chapter-member-initials";
                div.textContent = initials;
                wrap.appendChild(div);
              }
            }}
          />
        ) : (
          <div className="chapter-member-photo chapter-member-initials">{initials}</div>
        )}
      </div>
      <div className="chapter-member-body">
        <h6 className="chapter-member-name">{name}</h6>
        {role    && <p className="chapter-member-role">{role}</p>}
        {company && <p className="chapter-member-company">{company}</p>}
        <div className="chapter-member-footer">
          <div className="chapter-member-icons">
            {phone && <a href={`tel:${phone}`}    title={phone}><i className="fa-solid fa-phone" /></a>}
            {email && <a href={`mailto:${email}`} title={email}><i className="fa-solid fa-envelope" /></a>}
          </div>
          <a
            href={profileLink || "https://user.gripforum.com/"}
            target="_blank"
            rel="noreferrer"
            className="chapter-view-profile"
          >
            View Profile <i className="fa-solid fa-chevron-right" style={{ fontSize: "10px" }} />
          </a>
        </div>
      </div>
    </div>
  );
}

function RoleGroup({ title, members, memberLinks = {} }: { title: string; members: Member[]; memberLinks?: Record<string, string> }) {
  if (!members.length) return null;
  return (
    <div className="chapter-role-section">
      <div className="chapter-role-divider"><span>{title}</span></div>
      <div className="chapter-members-grid">
        {members.map((m) => <MemberCard key={m._id} member={m} profileLink={memberLinks[m._id]} />)}
      </div>
    </div>
  );
}

/* ─── main component ──────────────────────────── */
export default function ChapterDetail({
  zoneSlug,
  chapterSlug,
}: {
  zoneSlug: string;
  chapterSlug: string;
}) {
  const [members,     setMembers]     = useState<Member[]>([]);
  const [memberLinks, setMemberLinks] = useState<Record<string, string>>({});
  const [chapterInfo, setChapterInfo] = useState<{
    name?: string;
    weekday?: string;
    zone?: string;
    stateName?: string;
    venue?: string;
    meetingTime?: string;
    totalAssociates?: number;
    bgImageUrl?: string | null;
    memberLinks?: { memberId: string; profileLink: string }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const chapterTitle = chapterInfo?.name || toTitle(chapterSlug);
  const zoneTitle    = chapterInfo?.zone  || toTitle(zoneSlug);
  const weekday      = chapterInfo?.weekday || "";
  const meetingTime  = chapterInfo?.meetingTime || "7:00 AM";
  const venue        = chapterInfo?.venue || chapterInfo?.stateName || zoneTitle;
  const totalAssociates = chapterInfo?.totalAssociates ?? members.length;

  useEffect(() => {
    async function load() {
      // 1. Try the internal Next.js API route (uses server-side token → Node.js backend)
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 12000);
        const res = await fetch(
          `/api/chapter-members?chapter=${encodeURIComponent(chapterSlug)}&zone=${encodeURIComponent(zoneSlug)}`,
          { signal: controller.signal }
        );
        clearTimeout(timer);
        if (res.ok) {
          const json = await res.json();
          if (json.chapterInfo) {
            setChapterInfo(json.chapterInfo);
            // Build a memberId → profileLink map
            if (Array.isArray(json.chapterInfo.memberLinks)) {
              const map: Record<string, string> = {};
              json.chapterInfo.memberLinks.forEach(({ memberId, profileLink }: any) => {
                if (memberId && profileLink) map[String(memberId)] = profileLink;
              });
              setMemberLinks(map);
            }
          }
          if (json.members?.length) {
            setMembers(json.members);
            setLoading(false);
            return;
          }
        }
      } catch (_) { /* fall through to PHP */ }

      // 2. Fallback: PHP backend
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 10000);
        const res = await fetch(
          `${PHP_URL}/api/associates.php?chapter=${encodeURIComponent(chapterSlug)}`,
          { signal: controller.signal }
        );
        clearTimeout(timer);
        if (res.ok) {
          const json = await res.json();
          if (json?.head_team || json?.visitor_interaction_team || json?.members) {
            const flatten = (arr: any[], roleTag: string) =>
              (arr || []).map((m: any, i: number) => ({
                _id: `${roleTag}-${m.id ?? i}`,
                name: m.name || "",
                role: m.sub_category || roleTag,
                company: m.business_name || "",
                email: m.email || "",
                phone: "",
                photo: m.photo
                  ? `${PHP_URL}/application/uploads/${m.photo}`
                  : null,
              }));
            setMembers([
              ...flatten(json.head_team, "head"),
              ...flatten(json.visitor_interaction_team, "visitor"),
              ...flatten(json.members, "associate"),
            ]);
          }
        }
      } catch (_) { /* show page without members */ }

      setLoading(false);
    }
    load();
  }, [chapterSlug, zoneSlug]);

  // ── group members by role ──────────────────────
  const HEAD_ROLES = ["president", "vice president", "secretary", "treasurer"];
  const ASSOC_COM_ROLES = [
    "associate committee",
    "membership",
    "visitor host",
  ];
  const COORD_ROLES = ["coordinator", "mentor", "training"];
  const VISITOR_TEAM_ROLES = ["visitor interaction team", "visitor interaction"];

  const roleOf = (m: Member) => (m.chapterRole || m.role || "").toLowerCase();

  const headTeam    = members
    .filter((m) => HEAD_ROLES.some((r) => roleOf(m).includes(r)))
    .sort((a, b) => {
      const order = (m: Member) => {
        const r = roleOf(m);
        if (r.includes("president") && !r.includes("vice")) return 1;
        if (r.includes("vice")) return 2;
        if (r.includes("secretary")) return 3;
        if (r.includes("treasurer")) return 4;
        return 5;
      };
      return order(a) - order(b);
    });
  const assocCom    = members.filter((m) =>
    !HEAD_ROLES.some((r) => roleOf(m).includes(r)) &&
    ASSOC_COM_ROLES.some((r) => roleOf(m).includes(r))
  );
  const coordTeam   = members.filter((m) =>
    !HEAD_ROLES.some((r) => roleOf(m).includes(r)) &&
    !ASSOC_COM_ROLES.some((r) => roleOf(m).includes(r)) &&
    COORD_ROLES.some((r) => roleOf(m).includes(r))
  );
  const visitorTeam = members.filter((m) =>
    !HEAD_ROLES.some((r) => roleOf(m).includes(r)) &&
    !ASSOC_COM_ROLES.some((r) => roleOf(m).includes(r)) &&
    !COORD_ROLES.some((r) => roleOf(m).includes(r)) &&
    VISITOR_TEAM_ROLES.some((r) => roleOf(m).includes(r))
  );
  const assignedIds = new Set(
    [...headTeam, ...assocCom, ...coordTeam, ...visitorTeam].map((m) => m._id)
  );
  const associates  = members.filter((m) => !assignedIds.has(m._id));

  // totalCount used for role grouping sections
  const totalCount = members.length;

  return (
    <>
      <ChapterHeader chapterName={chapterTitle} zoneSlug={zoneSlug} chapterSlug={chapterSlug} />

      {/* Hero */}
      <section
        className="chapter-hero"
        style={{ backgroundImage: `url(${chapterInfo?.bgImageUrl || "/assets/images/slider/banner.jpeg"})` }}
      >
        <div className="chapter-hero-overlay" />
        <div className="container chapter-hero-content">
          <h1 style={{ color: "#fff" }}>GRIP – {chapterTitle} Chapter</h1>
          <p style={{ color: "#fff" }}>India's 1st Digital Business Networking &amp; Referral Platform</p>
        </div>
      </section>

      {/* Info row */}
      <section className="chapter-info-section">
        <div className="container">
          <div className="chapter-info-grid">
            <div className="chapter-info-box">
              <h4>Meeting Details</h4>
              <p>
                <strong>
                  {weekday ? `${weekday} ${meetingTime}` : `Weekly ${meetingTime}`}
                </strong>
              </p>
              <p>In-Person</p>
              <p><strong>{venue}</strong></p>
              <p style={{ fontSize: "13px", color: "#666" }}>
                Weekly structured networking meetings
                {weekday ? ` every ${weekday}.` : " every week."}
              </p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(venue)}`}
                target="_blank"
                rel="noreferrer"
                className="chapter-link"
              >
                View Map
              </a>
            </div>

            <div className="chapter-info-box chapter-info-count">
              <h4>Associate Count</h4>
              {loading ? (
                <div className="sk-count-wrap">
                  <div className="sk-count-number" />
                </div>
              ) : (
                <div className="chapter-count-number">{totalAssociates || "—"}</div>
              )}
            </div>

            <div className="chapter-info-box chapter-info-actions">
              <a href="https://user.gripforum.com/" target="_blank" rel="noreferrer" className="chapter-action-btn">
                Visit Us! <i className="fa-solid fa-arrow-right" />
              </a>
              <Link
                href={`/${zoneSlug}/${chapterSlug}/members`}
                className="chapter-action-btn chapter-action-btn--outline"
              >
                View Associates <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ── Chapter Leadership (President / VP / Secretary / etc.) ── */}
      {!loading && headTeam.length + assocCom.length + coordTeam.length + visitorTeam.length > 0 && (
        <section className="chapter-leadership-section" id="leadership">
          <div className="container">
            <div className="chapter-leadership-header"><h3>Head Team</h3></div>
            {/* All leadership roles in ONE row */}
            {headTeam.length > 0 && (
              <div className="chapter-role-section">
                <div className="chapter-members-grid chapter-members-grid--leadership">
                  {headTeam.map((m) => <MemberCard key={m._id} member={m} showRoleTop profileLink={memberLinks[m._id]} />)}
                </div>
              </div>
            )}
            <RoleGroup title="Associate Committee" members={assocCom} memberLinks={memberLinks} />
            <RoleGroup title="Coordinator Team" members={coordTeam} memberLinks={memberLinks} />
            <RoleGroup title="Visitor Interaction Team" members={visitorTeam} memberLinks={memberLinks} />
          </div>
        </section>
      )}

      {/* ── Chapter Associates (all remaining members) ── */}
      {!loading && members.length > 0 && (
        <section className="chapter-leadership-section" id="members">
          <div className="container">
            <div className="chapter-leadership-header"><h3>Chapter Associates</h3></div>
            <div className="chapter-role-section">
              <div className="chapter-members-grid">
                {associates.map((m) => <MemberCard key={m._id} member={m} profileLink={memberLinks[m._id]} />)}
              </div>
            </div>
          </div>
        </section>
      )}

      {loading && (
        <section className="chapter-leadership-section">
          <div className="container">
            {/* Leadership skeleton */}
            <div className="sk-header" />
            <div className="chapter-role-section">
              <div className="chapter-members-grid chapter-members-grid--leadership">
                {[0,1,2].map((i) => (
                  <div key={i} className="sk-card">
                    <div className="sk-role-label" />
                    <div className="sk-avatar" />
                    <div className="sk-line sk-name" />
                    <div className="sk-line sk-sub" />
                    <div className="sk-line sk-company" />
                    <div className="sk-footer-bar" />
                  </div>
                ))}
              </div>
            </div>

            {/* Associates skeleton */}
            <div className="sk-header sk-header--sm" />
            <div className="chapter-role-section">
              <div className="chapter-members-grid">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="sk-card">
                    <div className="sk-avatar" />
                    <div className="sk-line sk-name" />
                    <div className="sk-line sk-sub" />
                    <div className="sk-line sk-company" />
                    <div className="sk-footer-bar" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}


      <style>{`
        .chapter-topbar { background:#c1272d; padding:7px 0; }
        .chapter-topbar-inner { display:flex; justify-content:flex-end; }
        .chapter-topbar-links { display:flex; align-items:center; gap:10px; }
        .chapter-topbar-links a { color:#fff; font-size:12px; font-weight:500; text-decoration:none; opacity:.92; }
        .chapter-topbar-links a:hover { opacity:1; }
        .chapter-topbar-sep { color:rgba(255,255,255,.5); font-size:12px; }
        .chapter-mainbar { background:#fff; border-bottom:1px solid #e8e8e8; padding:14px 0; }
        .chapter-mainbar-inner { display:flex; align-items:center; justify-content:space-between; }
        .chapter-mainbar-brand { display:flex; align-items:center; gap:14px; text-decoration:none !important; }
        .chapter-mainbar-logo { height:44px; width:auto; object-fit:contain; }
        .chapter-mainbar-divider { display:inline-block; width:1px; height:36px; background:#ccc; }
        .chapter-mainbar-name { font-size:1.25rem; font-weight:700; color:#222; }
        .chapter-mainbar-nav { display:flex; align-items:center; gap:12px; }
        .chapter-mainbar-nav a { font-size:13px; font-weight:700; color:#222; text-decoration:none; letter-spacing:.5px; }
        .chapter-mainbar-nav a:hover { color:#c1272d; }
        .chapter-mainbar-nav-sep { color:#bbb; font-size:16px; }
        @media(max-width:576px){ .chapter-mainbar-nav { display:none; } }

        .chapter-hero { position:relative; min-height:340px; background-size:cover; background-position:center; display:flex; align-items:flex-end; padding-bottom:48px; }
        .chapter-hero-overlay { position:absolute; inset:0; background:rgba(0,0,0,.55); }
        .chapter-hero-content { position:relative; z-index:1; color:#fff !important; }
        .chapter-hero-content h1 { font-size:clamp(1.8rem,4vw,3rem); font-weight:800; margin-bottom:8px; color:#fff !important; }
        .chapter-hero-content p { font-size:1rem; opacity:.9; margin:0; color:#fff !important; }

        .chapter-info-section { background:#fff; padding:48px 0; border-bottom:1px solid #eee; }
        .chapter-info-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:40px; align-items:start; }
        @media(max-width:768px){ .chapter-info-grid { grid-template-columns:1fr; } }
        .chapter-info-box h4 { font-size:1.1rem; font-weight:700; border-bottom:3px solid #c1272d; padding-bottom:8px; margin-bottom:16px; display:inline-block; }
        .chapter-info-box p { margin-bottom:6px; font-size:14px; color:#444; }
        .chapter-count-number { font-size:4rem; font-weight:800; color:#c1272d; line-height:1; margin-bottom:8px; }
        .chapter-link { color:#c1272d; font-weight:600; font-size:13px; text-decoration:underline; background:none; border:none; padding:0; cursor:pointer; }
        .chapter-info-actions { display:flex; flex-direction:column; gap:12px; justify-content:center; }
        .chapter-action-btn { display:flex; align-items:center; justify-content:space-between; gap:10px; padding:12px 24px; background:#c1272d; color:#fff !important; border-radius:50px; font-weight:600; font-size:14px; text-decoration:none !important; transition:background .2s; }
        .chapter-action-btn:hover { background:#a01f24; }
        .chapter-action-btn--outline { background:transparent; border:2px solid #c1272d; color:#c1272d !important; }
        .chapter-action-btn--outline:hover { background:#c1272d; color:#fff !important; }

        .chapter-leadership-section { padding:60px 0; background:#f8f8f8; }
        .chapter-leadership-header { background:#fff; border:1px solid #e0e0e0; display:inline-block; padding:14px 28px; border-radius:4px 4px 0 0; }
        .chapter-leadership-header h3 { font-size:1.3rem; font-weight:700; margin:0; }
        .chapter-role-section { background:#fff; border:1px solid #e0e0e0; border-radius:0 4px 4px 4px; padding:32px 24px; margin-bottom:24px; }
        .chapter-role-divider { display:flex; align-items:center; text-align:center; margin-bottom:28px; gap:12px; }
        .chapter-role-divider::before,.chapter-role-divider::after { content:""; flex:1; height:1px; background:#ddd; }
        .chapter-role-divider span { font-size:14px; font-weight:600; color:#555; white-space:nowrap; padding:0 8px; }
        .chapter-members-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:20px; }
        .chapter-members-grid--leadership { grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); }
        @media(max-width:480px){ .chapter-members-grid { grid-template-columns:repeat(2,1fr); } }
        .chapter-member-role-top { text-align:center; font-size:13px; font-weight:700; color:#555; padding:12px 12px 0; letter-spacing:.3px; }
        .chapter-member-card { background:#f5f5f5; border-radius:8px; overflow:hidden; border:1px solid #e8e8e8; transition:box-shadow .2s; display:flex; flex-direction:column; }
        .chapter-member-card:hover { box-shadow:0 6px 20px rgba(0,0,0,.12); }
        .chapter-member-photo-wrap { width:100%; display:flex; justify-content:center; padding:20px 20px 0; }
        .chapter-member-photo { width:90px; height:90px; border-radius:50%; object-fit:cover; object-position:top; border:3px solid #fff; box-shadow:0 2px 8px rgba(0,0,0,.15); }
        .chapter-member-initials { display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,#c1272d,#e05555); color:#fff; font-size:1.4rem; font-weight:700; letter-spacing:1px; }
        .chapter-member-body { padding:14px 14px 0; text-align:center; flex:1; display:flex; flex-direction:column; }
        .chapter-member-name { font-weight:700; font-size:13px; color:#111; margin-bottom:4px; line-height:1.3; }
        .chapter-member-role { font-size:12px; color:#666; margin-bottom:4px; }
        .chapter-member-company { font-size:12px; font-weight:600; color:#c1272d; margin-bottom:10px; word-break:break-word; flex:1; }
        .chapter-member-footer { display:flex; align-items:center; justify-content:space-between; padding:10px 14px; border-top:1px solid #ebebeb; margin-top:auto; }
        .chapter-member-icons { display:flex; gap:10px; }
        .chapter-member-icons a { color:#c1272d; font-size:14px; }
        .chapter-member-icons a:hover { opacity:.7; }
        .chapter-view-profile { font-size:12px; font-weight:600; color:#c1272d; text-decoration:none; white-space:nowrap; }
        .chapter-view-profile:hover { opacity:.75; }

        /* ── Count box skeleton ── */
        .sk-count-wrap { padding:8px 0; }
        .sk-count-number { width:90px; height:64px; border-radius:8px; }

        /* ── Skeleton loader ── */
        @keyframes sk-shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }
        .sk-card,.sk-header,.sk-avatar,.sk-line,.sk-footer-bar {
          background: linear-gradient(90deg,#ececec 25%,#f5f5f5 50%,#ececec 75%);
          background-size: 1200px 100%;
          animation: sk-shimmer 1.4s infinite linear;
          border-radius: 6px;
        }
        .sk-header { height:44px; width:220px; border-radius:4px 4px 0 0; margin-bottom:0; }
        .sk-header--sm { height:40px; width:200px; margin-top:32px; }
        .sk-card { background:#fff; border:1px solid #e8e8e8; border-radius:8px; padding:20px 16px 0; display:flex; flex-direction:column; align-items:center; gap:10px; overflow:hidden; }
        .sk-role-label { width:80px; height:14px; border-radius:4px; }
        .sk-avatar { width:90px; height:90px; border-radius:50%; flex-shrink:0; }
        .sk-name  { width:75%; height:13px; }
        .sk-sub   { width:55%; height:11px; }
        .sk-company { width:65%; height:11px; }
        .sk-footer-bar { width:calc(100% + 32px); height:38px; border-radius:0; margin-top:6px; }

      `}</style>
    </>
  );
}
