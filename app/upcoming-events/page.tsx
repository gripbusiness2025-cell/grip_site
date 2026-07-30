import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import UnderlineSvg from "@/components/UnderlineSvg";
import { fetchWebsiteEvents } from "@/lib/websiteEvents";

export const metadata: Metadata = {
  title: "Upcoming Events – GRIP India's 1st Digital Business Networking Forum",
  description: "Stay updated with the latest upcoming events at GRIP.",
};

export default async function UpcomingEvents() {
  const events = await fetchWebsiteEvents();

  return (
    <>
      <Header />
      <Breadcrumb title="Upcoming Events" />

      <section className="si__our__blog__area pb-120 pt-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="si__section__title pb-40 text-center">
                <h5>
                  <i className="fa-regular fa-chevrons-left"></i> oUR Upcoming
                  Events <i className="fa-regular fa-chevrons-right"></i>
                </h5>
                <h1 className="text-anime-style-3">
                  What&apos;s Next at GRIP? <br /> Mark Your{" "}
                  <span className="si__section__title__highlight">
                    Calendar! <UnderlineSvg />
                  </span>{" "}
                  Time
                </h1>
              </div>
            </div>
          </div>
          <div className="row">
            {events.length === 0 ? (
              <div className="col-12 text-center py-5 text-muted">
                No upcoming events right now.
              </div>
            ) : (
              events.map((event, idx) => (
                <div
                  key={event._id}
                  className="col-lg-6 col-md-6 wow fadeInUp animated"
                  data-wow-delay={`${0.5 + idx * 0.2}s`}
                >
                  <div className="si__our__blog__box">
                    <div className="si__our__blog__thumb">
                      <div className="si__our__blog__thumb__inner">
                        <img
                          src={event.imageUrl || "/assets/images/grip/blog2.png"}
                          alt={event.title}
                        />
                      </div>
                    </div>
                    <div className="si__our__blog__inner">
                      <div className="si__our__blog__content">
                        <a className="si__our__blog__content__text" href="/upcoming-events">
                          {event.title}
                        </a>
                        <p>{event.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
