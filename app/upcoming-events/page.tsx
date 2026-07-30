import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import UnderlineSvg from "@/components/UnderlineSvg";

export const metadata: Metadata = {
  title: "Upcoming Events – GRIP India's 1st Digital Business Networking Forum",
  description: "Stay updated with the latest upcoming events at GRIP.",
};

const events = [
  {
    img: "/assets/images/grip/blog2.png",
    title: "GRIP NEXOR - Launch",
    desc: "An exclusive chapter for young entrepreneurs aged between 18 to 22 years",
    delay: ".7s",
  },
  {
    img: "/assets/images/grip/launch.jpg",
    title: "GRIP Virutcham - Launch",
    desc: "A platform to nurture business growth through strong referral roots.",
    delay: ".9s",
  },
];

export default function UpcomingEvents() {
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
            {events.map((event) => (
              <div
                key={event.title}
                className="col-lg-6 col-md-6 wow fadeInUp animated"
                data-wow-delay={event.delay}
              >
                <div className="si__our__blog__box">
                  <div className="si__our__blog__thumb">
                    <div className="si__our__blog__thumb__inner">
                      <img src={event.img} alt={event.title} />
                    </div>
                  </div>
                  <div className="si__our__blog__inner">
                    <div className="si__our__blog__content">
                      <a className="si__our__blog__content__text" href="#">
                        {event.title}
                      </a>
                      <p>{event.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
