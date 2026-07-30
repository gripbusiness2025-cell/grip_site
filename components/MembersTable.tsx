"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

function toTitle(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

interface Member {
  _id: string;
  name?: string;
  role?: string;
  company?: string;
  email?: string;
  phone?: string;
}

type SortCol = "name" | "company";

export default function MembersTable({
  zoneSlug,
  chapterSlug,
}: {
  zoneSlug: string;
  chapterSlug: string;
}) {
  const [members, setMembers]       = useState<Member[]>([]);
  const [chapterName, setChapterName] = useState("");
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [sort, setSort]             = useState<{ col: SortCol; dir: 1 | -1 }>({ col: "name", dir: 1 });

  const chapterTitle = chapterName || toTitle(chapterSlug);
  const backHref = `/${zoneSlug}/${chapterSlug}`;

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `/api/chapter-members?chapter=${encodeURIComponent(chapterSlug)}&zone=${encodeURIComponent(zoneSlug)}`
        );
        if (res.ok) {
          const json = await res.json();
          if (json.chapterInfo?.name) setChapterName(json.chapterInfo.name);
          if (json.members?.length) setMembers(json.members);
        }
      } catch (_) { /* show empty */ }
      setLoading(false);
    }
    load();
  }, [chapterSlug, zoneSlug]);

  const toggleSort = (col: SortCol) =>
    setSort((s) => ({ col, dir: s.col === col ? ((-s.dir) as 1 | -1) : 1 }));

  const sortIcon = (col: SortCol) => {
    if (sort.col !== col) return <i className="fa-solid fa-sort" />;
    return sort.dir === 1
      ? <i className="fa-solid fa-sort-up" />
      : <i className="fa-solid fa-sort-down" />;
  };

  const filtered = members
    .filter((m) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        (m.name    || "").toLowerCase().includes(q) ||
        (m.company || "").toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      const va = (sort.col === "name" ? a.name : a.company) || "";
      const vb = (sort.col === "name" ? b.name : b.company) || "";
      return va.localeCompare(vb) * sort.dir;
    });

  return (
    <>
      <Header menuType="zone" zoneSlug={zoneSlug} />

      {/* ── breadcrumb ── */}
      <div className="mt-breadcrumb">
        <div className="container">
          <Link href={backHref} className="mt-back">
            <i className="fa-solid fa-chevron-left" /> Back to {chapterTitle} Chapter
          </Link>
        </div>
      </div>

      {/* ── main content ── */}
      <section className="mt-section">
        <div className="container">
          <div className="mt-page-header">
            <div>
              <h2 className="mt-page-title">GRIP – {chapterTitle} Chapter</h2>
              <p className="mt-page-sub">All Associates</p>
            </div>
            {!loading && (
              <span className="mt-count-badge">{members.length} Associates</span>
            )}
          </div>

          {/* search */}
          {!loading && members.length > 0 && (
            <div className="mt-search-wrap">
              <i className="fa-solid fa-magnifying-glass mt-search-icon" />
              <input
                type="text"
                className="mt-search"
                placeholder="Search by name or company…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button className="mt-search-clear" onClick={() => setSearch("")}>
                  <i className="fa-solid fa-xmark" />
                </button>
              )}
            </div>
          )}

          {loading ? (
            <div className="mt-loading">
              <div className="spinner-border text-danger" role="status" />
              <p>Loading members…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="mt-empty">
              {search ? `No results for "${search}"` : "No associates found."}
            </div>
          ) : (
            <div className="mt-table-wrap">
              <table className="mt-table">
                <thead>
                  <tr>
                    <th className="th-num">#</th>
                    <th className="sortable" onClick={() => toggleSort("name")}>
                      Member Names {sortIcon("name")}
                    </th>
                    <th className="sortable" onClick={() => toggleSort("company")}>
                      Company {sortIcon("company")}
                    </th>
                    <th>Phone</th>
                    <th>Send Mail</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((m, i) => (
                    <tr key={m._id} className={i % 2 === 0 ? "row-even" : ""}>
                      <td className="td-num">{i + 1}</td>
                      <td className="td-name">{m.name || "—"}</td>
                      <td>{m.company || "—"}</td>
                      <td>{m.phone || "—"}</td>
                      <td>
                        {m.email ? (
                          <a href={`mailto:${m.email}`} className="td-mail" title={m.email}>
                            <i className="fa-regular fa-envelope" />
                          </a>
                        ) : (
                          <span className="td-na">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-result-count">
                Showing {filtered.length} of {members.length} associates
              </p>
            </div>
          )}
        </div>
      </section>

      <style>{`
        /* top bar */
        .mt-topbar { background:#c1272d; padding:7px 0; }
        .mt-topbar-inner { display:flex; justify-content:flex-end; }
        .mt-topbar-links { display:flex; align-items:center; gap:10px; }
        .mt-topbar-links a { color:#fff; font-size:12px; font-weight:500; text-decoration:none; opacity:.92; }
        .mt-topbar-links a:hover { opacity:1; }
        .mt-sep { color:rgba(255,255,255,.5); font-size:12px; }

        /* logo bar */
        .mt-mainbar { background:#fff; border-bottom:1px solid #e8e8e8; padding:14px 0; }
        .mt-mainbar-inner { display:flex; align-items:center; justify-content:space-between; }
        .mt-brand { display:flex; align-items:center; gap:14px; text-decoration:none !important; }
        .mt-logo { height:44px; width:auto; object-fit:contain; }
        .mt-divider { display:inline-block; width:1px; height:36px; background:#ccc; }
        .mt-chapter-name { font-size:1.25rem; font-weight:700; color:#222; }
        .mt-nav { display:flex; align-items:center; gap:12px; }
        .mt-nav a { font-size:13px; font-weight:700; color:#222; text-decoration:none; letter-spacing:.5px; }
        .mt-nav a:hover { color:#c1272d; }
        .mt-nav-sep { color:#bbb; font-size:16px; }
        @media(max-width:576px){ .mt-nav { display:none; } }

        /* breadcrumb */
        .mt-breadcrumb { background:#f5f5f5; border-bottom:1px solid #e8e8e8; padding:10px 0; }
        .mt-back { font-size:13px; font-weight:600; color:#c1272d; text-decoration:none; display:inline-flex; align-items:center; gap:6px; }
        .mt-back:hover { opacity:.75; }

        /* main section */
        .mt-section { padding:48px 0 80px; background:#fff; }
        .mt-page-header { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:28px; flex-wrap:wrap; gap:12px; }
        .mt-page-title { font-size:1.6rem; font-weight:800; color:#111; margin:0 0 4px; }
        .mt-page-sub { font-size:1rem; color:#555; margin:0; }
        .mt-count-badge { background:#c1272d; color:#fff; font-size:13px; font-weight:700; padding:6px 16px; border-radius:50px; white-space:nowrap; align-self:center; }

        /* search */
        .mt-search-wrap { position:relative; max-width:400px; margin-bottom:24px; }
        .mt-search-icon { position:absolute; left:14px; top:50%; transform:translateY(-50%); color:#aaa; font-size:14px; }
        .mt-search { width:100%; padding:10px 40px 10px 38px; border:1px solid #ddd; border-radius:6px; font-size:14px; outline:none; }
        .mt-search:focus { border-color:#c1272d; box-shadow:0 0 0 3px rgba(193,39,45,.1); }
        .mt-search-clear { position:absolute; right:12px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; color:#aaa; font-size:14px; }
        .mt-search-clear:hover { color:#c1272d; }

        /* loading / empty */
        .mt-loading { text-align:center; padding:60px 0; color:#888; }
        .mt-loading p { margin-top:12px; }
        .mt-empty { text-align:center; padding:60px 0; color:#888; font-size:15px; }

        /* table */
        .mt-table-wrap { border-radius:8px; overflow:hidden; box-shadow:0 2px 16px rgba(0,0,0,.09); }
        .mt-table { width:100%; border-collapse:collapse; font-size:14px; }
        .mt-table thead tr { background:#4a4a4a; }
        .mt-table thead th { color:#fff; font-weight:600; padding:14px 18px; text-align:left; white-space:nowrap; border:none; font-size:13px; }
        .mt-table thead th.sortable { cursor:pointer; user-select:none; }
        .mt-table thead th.sortable:hover { background:#5a5a5a; }
        .mt-table thead th i { margin-left:6px; font-size:11px; opacity:.7; }
        .th-num { width:48px; text-align:center; }
        .mt-table tbody tr { border-bottom:1px solid #eee; transition:background .15s; }
        .mt-table tbody tr:last-child { border-bottom:none; }
        .mt-table tbody tr:hover { background:#fff5f5; }
        .mt-table tbody tr.row-even { background:#fffef0; }
        .mt-table tbody tr.row-even:hover { background:#fff5f5; }
        .mt-table tbody td { padding:14px 18px; color:#333; vertical-align:middle; }
        .td-num { text-align:center; color:#999; font-size:12px; }
        .td-name { color:#c1272d; font-weight:600; }
        .td-mail { color:#c1272d; font-size:18px; display:flex; align-items:center; justify-content:center; }
        .td-mail:hover { opacity:.7; }
        .td-na { color:#bbb; }
        .mt-result-count { font-size:12px; color:#888; text-align:right; margin-top:12px; }
        @media(max-width:600px){
          .mt-table thead th, .mt-table tbody td { padding:10px 12px; }
          .th-num, .td-num { display:none; }
        }
      `}</style>
    </>
  );
}
