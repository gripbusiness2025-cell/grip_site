"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

const PROD_API = "https://api.gripforum.com/api";

const slugify = (s: string) =>
  (s || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

interface ZoneItem {
  _id: string;
  zoneName: string;
  stateName?: string;
  countryName?: string;
  name?: string;
  email?: string;
  mobileNumber?: string;
  description?: string;
}

export default function FranchisePartnersPage() {
  const [zones, setZones] = useState<ZoneItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      for (const base of [PROD_API]) {
        try {
          const res = await fetch(`${base}/admin/zones/list/public`, { cache: "no-store" });
          if (!res.ok) continue;
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            const hiddenZones = new Set(["salem", "coimbatore"]);
            const active = json.data.filter((z: any) => {
              if (z.isDelete === 1) return false;
              if (z.isActive !== 1 && z.isActive !== undefined) return false;
              const name = slugify(z.zoneName);
              return !hiddenZones.has(name);
            });
            setZones(active);
            setLoading(false);
            return;
          }
        } catch {
          /* try next */
        }
      }
      setZones([]);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <>
      <Header />
      <Breadcrumb
        title="Franchise Partners"
        backgroundImage="/assets/images/grip/chapter2.jpg"
      />

      <section className="pb-120 pt-90">
        <div className="container">
          <div className="row mb-40">
            <div className="col-lg-12 text-center">
              <h5
                style={{
                  color: "#c1272d",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Franchise Partners
              </h5>
              <h1 style={{ fontWeight: 800, marginBottom: 12 }}>Our Zones</h1>
              <p style={{ color: "#666", fontSize: 16, maxWidth: 640, margin: "0 auto" }}>
                Explore GRIP zones across the network. Select a zone to view chapters and partner details.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="row g-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="col-lg-4 col-md-6">
                  <div
                    style={{
                      background: "#f5f5f5",
                      borderRadius: 12,
                      height: 160,
                      animation: "pulse 1.4s ease-in-out infinite",
                    }}
                  />
                </div>
              ))}
            </div>
          ) : zones.length === 0 ? (
            <div className="text-center py-5" style={{ color: "#888" }}>
              No zones found.
            </div>
          ) : (
            <div className="row g-4">
              {zones.map((zone) => {
                const slug = slugify(zone.zoneName);
                const showViewZone = !["chennai-south-zone", "viruthunagar-zone"].includes(slug);
                const card = (
                      <div
                        className={showViewZone ? "franchise-zone-card" : undefined}
                        style={{
                          background: "#fff",
                          border: "1px solid #eee",
                          borderRadius: 12,
                          padding: "28px 24px",
                          height: "100%",
                          transition: showViewZone ? "box-shadow .2s, transform .2s, border-color .2s" : undefined,
                        }}
                      >
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: "50%",
                            background: "rgba(193,39,45,0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 16,
                            color: "#c1272d",
                            fontSize: 18,
                          }}
                        >
                          <i className="fa-solid fa-map-location-dot" />
                        </div>
                        <h4 style={{ fontWeight: 800, marginBottom: 8, color: "#111", fontSize: "1.15rem", textTransform: "uppercase" }}>
                          {zone.zoneName}
                        </h4>
                        <p style={{ color: "#888", fontSize: 13, marginBottom: showViewZone ? 12 : 0 }}>
                          {[zone.stateName, zone.countryName].filter(Boolean).join(" · ") || "—"}
                        </p>
                        {zone.name && (
                          <p style={{ color: "#555", fontSize: 14, marginBottom: 0 }}>
                            <span style={{ color: "#999", fontSize: 12 }}>ED · </span>
                            {zone.name}
                          </p>
                        )}
                        {showViewZone && (
                          <div
                            style={{
                              marginTop: 18,
                              color: "#c1272d",
                              fontWeight: 700,
                              fontSize: 13,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                            }}
                          >
                            View Zone <i className="fa-solid fa-arrow-right" style={{ fontSize: 11 }} />
                          </div>
                        )}
                      </div>
                );
                return (
                  <div key={zone._id} className="col-lg-4 col-md-6">
                    {showViewZone ? (
                      <a
                        href={`https://gripforum.com/${slug}/home`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}
                      >
                        {card}
                      </a>
                    ) : (
                      card
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />

      <style>{`
        .franchise-zone-card:hover {
          box-shadow: 0 10px 28px rgba(0,0,0,.1);
          transform: translateY(-3px);
          border-color: #c1272d !important;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .55; }
        }
      `}</style>
    </>
  );
}
