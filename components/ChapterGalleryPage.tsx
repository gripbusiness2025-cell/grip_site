"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

const PROD_API   = "https://api.gripforum.com/api";
const PROD_IMG   = "https://api.gripforum.com/api/public";

function toTitle(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

interface GalleryImage {
  _id: string;
  docPath: string;
  docName: string;
}

interface Album {
  _id: string;
  name: string;
  description?: string;
  coverImage?: { docPath: string; docName: string } | null;
  images: GalleryImage[];
}

/* ── Lightbox ───────────────────────────────────────────────────── */
function Lightbox({
  images,
  index,
  imgBase,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[];
  index: number;
  imgBase: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const img = images[index];
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)",
        zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        style={navBtn("left")}
      >&#8249;</button>

      <img
        src={`${imgBase}/${img.docPath}/${img.docName}`}
        alt=""
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "90vw", maxHeight: "88vh", objectFit: "contain", borderRadius: 8 }}
      />

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        style={navBtn("right")}
      >&#8250;</button>

      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 18, right: 24,
          background: "none", border: "none", color: "#fff",
          fontSize: "2rem", cursor: "pointer", lineHeight: 1,
        }}
      >×</button>

      {/* Counter */}
      <div style={{
        position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)",
        color: "rgba(255,255,255,0.6)", fontSize: 13,
      }}>
        {index + 1} / {images.length}
      </div>
    </div>
  );
}

function navBtn(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute", [side]: 18, top: "50%", transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.15)", border: "none", color: "#fff",
    fontSize: "2.4rem", width: 48, height: 48, borderRadius: "50%",
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    lineHeight: 1,
  };
}

/* ── Main component ─────────────────────────────────────────────── */
export default function ChapterGalleryPage({
  zoneSlug,
  chapterSlug,
}: {
  zoneSlug: string;
  chapterSlug: string;
}) {
  const [albums,      setAlbums]      = useState<Album[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [imgBase,     setImgBase]     = useState(PROD_IMG);
  const [chapterId,   setChapterId]   = useState<string | null>(null);
  const [heroBgUrl,   setHeroBgUrl]   = useState<string | null>(null);
  const [chapterName, setChapterName] = useState<string>("");
  const [lightbox,    setLightbox]    = useState<{ albumIdx: number; imgIdx: number } | null>(null);
  const [openAlbumId, setOpenAlbumId] = useState<string | null>(null);

  const chapterTitle = chapterName || toTitle(chapterSlug);

  /* ── load chapter info + gallery ────────────────────────────── */
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        // 1. Try Next.js internal route first (same as ChapterDetail does)
        const apiRes = await fetch(
          `/api/chapter-members?chapter=${encodeURIComponent(chapterSlug)}&zone=${encodeURIComponent(zoneSlug)}`,
          { cache: "no-store" }
        ).catch(() => null);

        let cid: string | null = null;

        if (apiRes?.ok) {
          const apiJson = await apiRes.json();
          if (apiJson.chapterInfo?.bgImageUrl) setHeroBgUrl(apiJson.chapterInfo.bgImageUrl);
          if (apiJson.chapterInfo?.name) setChapterName(apiJson.chapterInfo.name);
        }

        // 2. Resolve chapterId via chapter list
        for (const base of [PROD_API]) {
          try {
            const r = await fetch(
              `${base}/mobile/chapters/list?search=${encodeURIComponent(chapterSlug)}&limit=50`,
              { cache: "no-store" }
            );
            if (!r.ok) continue;
            const j = await r.json();
            const slugify = (s: string) =>
              (s || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
            const matched =
              (j.data || []).find(
                (c: any) =>
                  slugify(c.chapterName) === chapterSlug &&
                  slugify(c.zoneId?.zoneName || "") === zoneSlug
              ) || (j.data || []).find((c: any) => slugify(c.chapterName) === chapterSlug);
            if (matched) {
              cid = matched._id;
              if (!chapterName) setChapterName(matched.chapterName || "");
              break;
            }
          } catch { /* try next */ }
        }

        if (!cid) { setLoading(false); return; }

        setChapterId(cid);
        setImgBase(PROD_IMG);

        // 3. Load gallery
        for (const base of [PROD_API]) {
          try {
            const r = await fetch(`${base}/public/gallery/chapters/${cid}`, { cache: "no-store" });
            if (!r.ok) continue;
            const j = await r.json();
            setAlbums(j.data || []);
            break;
          } catch { /* try next */ }
        }
      } catch { /* show empty */ }
      setLoading(false);
    }
    load();
  }, [chapterSlug, zoneSlug]);

  /* ── lightbox helpers ─────────────────────────────────────── */
  const openLightbox = (aIdx: number, iIdx: number) =>
    setLightbox({ albumIdx: aIdx, imgIdx: iIdx });
  const closeLightbox = () => setLightbox(null);

  const lbAlbum   = lightbox !== null ? albums[lightbox.albumIdx] : null;
  const lbImages  = lbAlbum?.images ?? [];
  const lbIdx     = lightbox?.imgIdx ?? 0;
  const lbPrev    = () => setLightbox((lb) => lb && { ...lb, imgIdx: (lb.imgIdx - 1 + lbImages.length) % lbImages.length });
  const lbNext    = () => setLightbox((lb) => lb && { ...lb, imgIdx: (lb.imgIdx + 1) % lbImages.length });

  const totalPhotos = albums.reduce((n, a) => n + a.images.length, 0);

  return (
    <>
      <Header menuType="zone" zoneSlug={zoneSlug} />

      {/* ── Hero banner ── */}
      <section
        className="gallery-hero"
        style={{
          backgroundImage: `url(${heroBgUrl || "/assets/images/slider/banner.jpeg"})`,
        }}
      >
        <div className="gallery-hero-overlay" />
        <div className="container gallery-hero-content">
          <h1>Gallery</h1>
        </div>
      </section>

      {/* ── Page sub-header ── */}
      <section className="gallery-subheader">
        <div className="container">
          <Link href={`/${zoneSlug}/${chapterSlug}`} className="gallery-back-link">
            <i className="fa-solid fa-arrow-left" style={{ fontSize: 11 }} /> Back to Chapter
          </Link>
          <h2 className="gallery-title">{chapterTitle} — Gallery</h2>
          <p className="gallery-meta">
            {loading
              ? "Loading…"
              : `${albums.length} album${albums.length !== 1 ? "s" : ""} · ${totalPhotos} photo${totalPhotos !== 1 ? "s" : ""}`}
          </p>
        </div>
      </section>

      {/* ── Albums ── */}
      <section className="gallery-albums-section">
        <div className="container">
          {loading ? (
            <div className="gallery-cards-grid">
              {[0, 1, 2].map((i) => (
                <div key={i} className="gallery-album-card">
                  <div className="gallery-card-img-wrap shimmer" />
                  <div className="gallery-card-body">
                    <div className="shimmer" style={{ height: 14, width: "70%", borderRadius: 4, marginBottom: 8 }} />
                    <div className="shimmer" style={{ height: 11, width: "40%", borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>
          ) : albums.length === 0 ? (
            <div className="gallery-empty">
              <i className="fa-regular fa-images" />
              <p>No gallery albums yet.</p>
            </div>
          ) : (
            <>
              {/* ── Album cards grid ── */}
              <div className="gallery-cards-grid">
                {albums.map((album, aIdx) => {
                  const coverSrc = album.coverImage?.docPath
                    ? `${imgBase}/${album.coverImage.docPath}/${album.coverImage.docName}`
                    : null;
                  const isOpen = openAlbumId === album._id;
                  return (
                    <div
                      key={album._id}
                      className={`gallery-album-card${isOpen ? " active" : ""}`}
                      onClick={() => setOpenAlbumId(isOpen ? null : album._id)}
                    >
                      {/* Cover image */}
                      <div className="gallery-card-img-wrap">
                        {coverSrc ? (
                          <img src={coverSrc} alt={album.name} className="gallery-card-img" />
                        ) : (
                          <div className="gallery-card-img-placeholder">
                            <i className="fa-regular fa-images" />
                          </div>
                        )}
                      </div>

                      {/* Card body */}
                      <div className="gallery-card-body">
                        <h3 className="gallery-card-title">{album.name}</h3>
                        <p className="gallery-card-meta">
                          {album.images.length} photo{album.images.length !== 1 ? "s" : ""}
                        </p>
                        {album.description && (
                          <p className="gallery-card-desc">{album.description}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ── Expanded photos for selected album ── */}
              {openAlbumId && (() => {
                const aIdx = albums.findIndex((a) => a._id === openAlbumId);
                const album = albums[aIdx];
                if (!album) return null;
                return (
                  <div className="gallery-photos-panel">
                    <div className="gallery-photos-panel-header">
                      <span className="gallery-photos-panel-title">{album.name}</span>
                      <span className="gallery-photos-panel-count">
                        {album.images.length} photo{album.images.length !== 1 ? "s" : ""}
                      </span>
                      <button
                        className="gallery-photos-panel-close"
                        onClick={() => setOpenAlbumId(null)}
                        aria-label="Close"
                      >✕</button>
                    </div>

                    {album.images.length === 0 ? (
                      <p className="gallery-photos-empty">No photos in this album yet.</p>
                    ) : (
                      <div className="gallery-photos-grid">
                        {album.images.map((img, iIdx) => (
                          <div
                            key={img._id}
                            className="gallery-photo-thumb"
                            onClick={() => openLightbox(aIdx, iIdx)}
                          >
                            <img
                              src={`${imgBase}/${img.docPath}/${img.docName}`}
                              alt=""
                              className="gallery-photo-thumb-img"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}
            </>
          )}
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox !== null && lbAlbum && (
        <Lightbox
          images={lbImages}
          index={lbIdx}
          imgBase={imgBase}
          onClose={closeLightbox}
          onPrev={lbPrev}
          onNext={lbNext}
        />
      )}

      <style>{`
        .chapter-topbar { background:#c1272d; padding:7px 0; }
        .chapter-topbar-inner { display:flex; justify-content:flex-end; }
        .chapter-topbar-links { display:flex; align-items:center; gap:10px; }
        .chapter-topbar-links a { color:#fff; font-size:12px; font-weight:500; text-decoration:none; opacity:.92; }
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
        @keyframes sk-shimmer { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
        .shimmer { background:linear-gradient(90deg,#ececec 25%,#f5f5f5 50%,#ececec 75%); background-size:600px 100%; animation:sk-shimmer 1.4s infinite linear; }
        @media(max-width:576px) { .chapter-mainbar-nav { display:none; } }

        /* ── Gallery hero ── */
        .gallery-hero { position:relative; min-height:260px; background-size:cover; background-position:center; display:flex; align-items:flex-end; padding-bottom:40px; }
        .gallery-hero-overlay { position:absolute; inset:0; background:rgba(0,0,0,.52); }
        .gallery-hero-content { position:relative; z-index:1; }
        .gallery-hero-content h1 { font-size:clamp(2rem,5vw,3rem); font-weight:800; color:#fff; margin:0; }

        /* ── Gallery sub-header ── */
        .gallery-subheader { background:#fff; border-bottom:1px solid #eee; padding:24px 0 20px; }
        .gallery-back-link { display:inline-flex; align-items:center; gap:5px; color:#c1272d; font-size:13px; font-weight:600; text-decoration:none; margin-bottom:10px; }
        .gallery-back-link:hover { opacity:.75; }
        .gallery-title { font-size:1.5rem; font-weight:800; margin:0 0 4px; color:#111; }
        .gallery-meta { font-size:13px; color:#777; margin:0; }

        /* ── Albums section ── */
        .gallery-albums-section { background:#f8f8f8; min-height:60vh; padding:40px 0 60px; }
        .gallery-empty { text-align:center; padding:80px 0; color:#aaa; }
        .gallery-empty i { font-size:3rem; display:block; margin-bottom:16px; }
        .gallery-empty p { font-size:16px; margin:0; }

        /* ── Album cards grid ── */
        .gallery-cards-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        @media(max-width:900px) { .gallery-cards-grid { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:560px) { .gallery-cards-grid { grid-template-columns:1fr; } }

        /* ── Single album card ── */
        .gallery-album-card {
          background:#fff; border-radius:12px; overflow:hidden;
          border:1px solid #e8e8e8; cursor:pointer;
          transition:box-shadow .2s, transform .2s;
        }
        .gallery-album-card:hover,
        .gallery-album-card.active { box-shadow:0 8px 28px rgba(0,0,0,.13); transform:translateY(-2px); }
        .gallery-album-card.active { border-color:#c1272d; }

        .gallery-card-img-wrap { width:100%; height:200px; overflow:hidden; background:#f0f0f0; }
        .gallery-card-img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .3s; }
        .gallery-album-card:hover .gallery-card-img { transform:scale(1.04); }
        .gallery-card-img-placeholder { width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:#ccc; font-size:2.5rem; }

        .gallery-card-body { padding:16px 18px 20px; }
        .gallery-card-title { font-size:1.05rem; font-weight:800; color:#c1272d; margin:0 0 5px; line-height:1.35; }
        .gallery-card-meta { font-size:12.5px; color:#888; margin:0 0 6px; }
        .gallery-card-desc { font-size:13.5px; color:#555; margin:0; line-height:1.55;
          display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }

        /* ── Expanded photos panel ── */
        .gallery-photos-panel { margin-top:28px; background:#fff; border-radius:12px; border:1px solid #e0e0e0; overflow:hidden; }
        .gallery-photos-panel-header { display:flex; align-items:center; gap:10px; padding:16px 20px; border-bottom:1px solid #f0f0f0; background:#fff; }
        .gallery-photos-panel-title { font-size:1rem; font-weight:700; color:#111; flex:1; }
        .gallery-photos-panel-count { font-size:12px; color:#888; background:#f4f4f4; border-radius:20px; padding:3px 10px; }
        .gallery-photos-panel-close { background:none; border:none; cursor:pointer; font-size:16px; color:#999; padding:4px 8px; border-radius:6px; transition:background .15s; }
        .gallery-photos-panel-close:hover { background:#f0f0f0; color:#333; }
        .gallery-photos-empty { padding:40px; text-align:center; color:#aaa; font-size:14px; margin:0; }

        .gallery-photos-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:4px; padding:4px; }
        @media(max-width:560px) { .gallery-photos-grid { grid-template-columns:repeat(3,1fr); } }

        .gallery-photo-thumb { aspect-ratio:1; overflow:hidden; cursor:pointer; }
        .gallery-photo-thumb-img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .2s; }
        .gallery-photo-thumb:hover .gallery-photo-thumb-img { transform:scale(1.06); }
      `}</style>
    </>
  );
}
