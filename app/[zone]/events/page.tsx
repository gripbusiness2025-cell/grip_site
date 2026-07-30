"use client";

import { useEffect, useState, use } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import UnderlineSvg from "@/components/UnderlineSvg";

const LOCAL_API = "http://localhost:4002/api";
const PROD_API  = "https://api.gripforum.com/api";
const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "https://api.gripforum.com/api/public";

interface EventItem {
  _id: string;
  topic: string;
  startDate: string;
  endDate: string;
  address: string;
  image?: {
    docName: string;
    docPath: string;
  };
  chapterId?: {
    _id: string;
    chapterName: string;
  }[];
}

interface Props {
  params: Promise<{ zone: string }>;
}

export default function ZoneEventsPage({ params }: Props) {
  const { zone: zoneSlug } = use(params);

  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [zoneName, setZoneName] = useState("");

  const formatZoneTitle = (slug: string) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    setZoneName(formatZoneTitle(zoneSlug));
  }, [zoneSlug]);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      for (const base of [LOCAL_API, PROD_API]) {
        try {
          const res = await fetch(`${base}/public/chapters/events?zone=${zoneSlug}`, {
            cache: "no-store",
          });
          if (!res.ok) continue;
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            setEvents(json.data);
            setLoading(false);
            return;
          }
        } catch (e) {
          // try next
        }
      }
      setEvents([]);
      setLoading(false);
    }
    fetchEvents();
  }, [zoneSlug]);

  const formatDateRange = (start: string, end: string) => {
    if (!start) return "";
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const sDate = new Date(start).toLocaleDateString("en-US", options);
    if (!end || start === end) return sDate;
    const eDate = new Date(end).toLocaleDateString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${sDate} - ${eDate}`;
  };

  return (
    <>
      <Header menuType="zone" zoneSlug={zoneSlug} />
      <Breadcrumb title={`${zoneName} Events`} />

      <section className="si__our__blog__area pb-120 pt-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="si__section__title pb-40 text-center">
                <h5>
                  <i className="fa-regular fa-chevrons-left"></i> UPCOMING EVENTS{" "}
                  <i className="fa-regular fa-chevrons-right"></i>
                </h5>
                <h1 className="text-anime-style-3">
                  What&apos;s Next in <br />
                  <span className="si__section__title__highlight">
                    {zoneName}? <UnderlineSvg />
                  </span>
                </h1>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="d-flex justify-content-center py-5">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <h4>No upcoming events found for {zoneName}.</h4>
              <p>Stay tuned! Events will be listed here as soon as they are posted.</p>
            </div>
          ) : (
            <div className="row">
              {events.map((event, idx) => {
                const imgUrl = event.image?.docPath
                  ? `${IMAGE_URL}/${event.image.docPath}/${event.image.docName}`
                  : "/assets/images/grip/blog2.png";

                const chapters = event.chapterId
                  ? event.chapterId.map((c) => c.chapterName).join(", ")
                  : "";

                return (
                  <div
                    key={event._id}
                    className="col-lg-6 col-md-6 wow fadeInUp animated"
                    data-wow-delay={`${0.2 * idx + 0.3}s`}
                  >
                    <div className="si__our__blog__box mb-30" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                      <div className="si__our__blog__thumb">
                        <div className="si__our__blog__thumb__inner">
                          <img
                            src={imgUrl}
                            alt={event.topic}
                            style={{ width: "100%", height: "260px", objectFit: "cover" }}
                          />
                        </div>
                      </div>
                      <div className="si__our__blog__inner" style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                        <div className="si__our__blog__content" style={{ flexGrow: 1 }}>
                          <span
                            className="badge bg-danger text-white mb-2"
                            style={{ fontSize: "12px", padding: "6px 12px", textTransform: "uppercase" }}
                          >
                            {chapters || "Event"}
                          </span>
                          <h4 style={{ margin: "10px 0 15px 0", fontWeight: "bold" }}>
                            {event.topic}
                          </h4>
                          <p className="text-muted mb-2 d-flex align-items-center gap-2" style={{ fontSize: "14px" }}>
                            <i className="fa-regular fa-calendar-days text-danger"></i>
                            {formatDateRange(event.startDate, event.endDate)}
                          </p>
                          <p className="text-muted d-flex align-items-center gap-2" style={{ fontSize: "14px" }}>
                            <i className="fa-regular fa-location-dot text-danger"></i>
                            {event.address}
                          </p>
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

      <Footer />
    </>
  );
}
