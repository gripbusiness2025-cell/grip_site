"use client";

import { use, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Props {
  params: Promise<{ zone: string }>;
}

export default function ZoneHomePage({ params }: Props) {
  const { zone: zoneSlug } = use(params);
  const [zoneName, setZoneName] = useState("");
  const [description, setDescription] = useState("");
  const [aboutText, setAboutText] = useState("");

  const formatZoneTitle = (slug: string) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    async function loadZone() {
      const formattedTitle = formatZoneTitle(zoneSlug);
      setZoneName(formattedTitle);

      const PROD_API  = "https://api.gripforum.com/api";

      for (const base of [PROD_API]) {
        try {
          const res = await fetch(`${base}/mobile/zones/list/public?search=${encodeURIComponent(formattedTitle)}`, {
            cache: "no-store",
          });
          if (!res.ok) continue;
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            const matchedZone = json.data.find(
              (z: any) => z.zoneName.toLowerCase() === formattedTitle.toLowerCase()
            ) || json.data[0];

            if (matchedZone.description) {
              setDescription(matchedZone.description);
            }
            if (matchedZone.aboutText) {
              setAboutText(matchedZone.aboutText);
            }
            break;
          }
        } catch (e) {
          // try next
        }
      }
    }
    loadZone();
  }, [zoneSlug]);

  return (
    <>
      <Header menuType="zone" zoneSlug={zoneSlug} />

      {/* Hero Section */}
      <section style={{ paddingTop: "180px", paddingBottom: "80px" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 style={{ fontSize: "64px", fontWeight: "bold", lineHeight: "1.1", color: "#111" }}>
                {zoneName}
              </h1>
            </div>
            <div className="col-lg-6">
              <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6" }}>
                {description || "Grip Forum connects professionals, businesses, and communities through networking, collaboration, events, and knowledge sharing to create meaningful opportunities and lasting growth."}
              </p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-12">
              <img
                src="/assets/images/grip/airplane_on_runway.png"
                alt="Airplane on Runway"
                style={{ width: "100%", height: "380px", borderRadius: "12px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services/What We Do Section */}
      <section style={{ backgroundColor: "#DF2E2E", borderTopLeftRadius: "40px", borderTopRightRadius: "40px", padding: "80px 0", color: "#fff" }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.9)", lineHeight: "1.6", margin: 0 }}>
                {aboutText || "Grip Forum brings professionals together to network, collaborate, discover opportunities, and build stronger business communities through meaningful connections."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
