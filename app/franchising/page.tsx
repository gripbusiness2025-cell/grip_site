import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UnderlineSvg from "@/components/UnderlineSvg";

export const metadata: Metadata = {
  title: "GRIP Franchising – Grow With Us Across India and Beyond",
  description:
    "GRIP Franchising – exceptional franchising opportunities across India and globally with proven business strategies and comprehensive support.",
};

const franchiseReasons = [
  {
    num: "01",
    icon: "/assets/images/services/1.png",
    title: "Proven Track Record",
    desc: "Scalable and profitable business model with consistent success.",
    reverse: false,
  },
  {
    num: "02",
    icon: "/assets/images/services/2.png",
    title: "Strong Brand Value",
    desc: "Trusted by thousands across multiple regions.",
    reverse: true,
  },
  {
    num: "03",
    icon: "/assets/images/services/3.png",
    title: "End-to-End Support",
    desc: "Comprehensive training, marketing assistance, and operational guidance.",
    reverse: false,
  },
  {
    num: "04",
    icon: "/assets/images/services/2.png",
    title: "Global Opportunities",
    desc: "Expand with GRIP into emerging and mature markets worldwide.",
    reverse: true,
  },
  {
    num: "05",
    icon: "/assets/images/services/3.png",
    title: "Innovation-Driven Growth",
    desc: "We adapt, evolve, and stay ahead of market trends.",
    reverse: false,
  },
];

export default function Franchising() {
  return (
    <>
      <Header />

      {/* Hero Slider */}
      <section
        className="si__slider__four__area bg position-relative"
        style={{
          background:
            "url(/assets/images/grip/grip12.avif) center/cover no-repeat",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7))",
            zIndex: 1,
            pointerEvents: "none",
          }}
        ></div>
        <div
          className="container custom__container position-relative"
          style={{ zIndex: 2 }}
        >
          <div className="row">
            <div className="col-lg-12">
              <div className="si__slider__four__right">
                <div className="si__slider__four__content text-white">
                  <h5>Join the GRIP Story</h5>
                  <h1 className="text-anime-style-3">
                    GRIP Franchising – Grow With Us <br /> Across India and Beyond
                  </h1>
                  <p className="pt-3">
                    At GRIP, we are redefining growth by offering exceptional
                    franchising opportunities across India and globally. Backed by a
                    strong brand, proven business strategies, and comprehensive
                    support, GRIP empowers franchise partners to succeed in
                    competitive markets.
                  </p>
                </div>
                <div className="si__slider__four__box">
                  <div className="si__slider__four__btn">
                    <a className="si__btn__two" href="#">
                      Join Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose GRIP Franchising */}
      <section className="si__service__four__area bg pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="si__three__section__title mb-43">
                <h5>GRIP Franchising</h5>
                <h1 className="text-anime-style-3">
                  Why Choose GRIP Franchising?
                </h1>
              </div>
              <div className="si__service__four__main">
                {franchiseReasons.map((item) => (
                  <div key={item.num} className="si__service__four__main">
                    <div className="si__service__four__box">
                      {!item.reverse ? (
                        <>
                          <div className="si__service__four__number">
                            <span>{item.num}</span>
                          </div>
                          <div className="si__service__four__inner">
                            <div className="si__service__four__icon">
                              <a href="#">
                                <img src={item.icon} alt="" />
                              </a>
                            </div>
                            <div className="si__service__four__content">
                              <h6>{item.title}</h6>
                              <span>{item.desc}</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="si__service__four__inner si__inner">
                            <div className="si__service__four__icon">
                              <a href="#">
                                <img src={item.icon} alt="" />
                              </a>
                            </div>
                            <div className="si__service__four__content">
                              <h6>{item.title}</h6>
                              <span>{item.desc}</span>
                            </div>
                          </div>
                          <div className="si__service__four__number si__service__four__inner__two">
                            <span>{item.num}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-5">
              <div className="si__service__four__thumb">
                <img
                  className="si__service__four__thumb__two"
                  src="/assets/images/grip/grip1.png"
                  alt="GRIP Franchising"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Build */}
      <section
        className="si__project__four__area custom__width__five bg pt-120 pb-120"
        style={{ background: "url(/assets/images/project/bg.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="si__three__section__title mb-43 text-center text-white">
                <h1 className="text-white text-anime-style-3">
                  Ready to Build a Future with GRIP?
                </h1>
                <p>
                  For franchising opportunities in India and internationally, get in
                  touch with
                </p>
                <h4 className="mt-3 mb-1 text-white">Mr. Pugalenthi Palanivelu</h4>
                <a
                  href="https://wa.me/919962456533"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-danger text-dark fw-bold px-4 py-2 mt-3 rounded-pill"
                >
                  Contact on WhatsApp <strong>+91 99624 56533</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section
        className="si__why__choose__four__area pt-120 pb-90"
        style={{ background: "url(/assets/images/why-choose/bg.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-7" style={{ paddingTop: "60px" }}>
              <div className="si__three__section__title mb-43">
                <h1 className="text-anime-style-3">
                  Our Commitment to Franchise <br /> Partners
                </h1>
                <p>
                  We are committed to providing our franchise partners with the
                  tools, knowledge, and resources needed to thrive. With GRIP, you
                  are not just investing in a business – you are becoming part of a
                  trusted network poised for long-term success.
                </p>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="si__why__choose__four__thumb">
                <img src="/assets/images/grip/grip.jpeg" alt="GRIP" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
