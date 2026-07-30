import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubNav from "@/components/SubNav";

export const metadata: Metadata = {
  title: "Careers – GRIP India's 1st Digital Business Networking Forum",
  description: "Join the GRIP team. Explore career opportunities at GRIP.",
};

const benefits = [
  {
    img: "/assets/images/work-process/img1.png",
    title: "Collaborative Culture",
    desc: "We believe in the power of teamwork and shared success.",
  },
  {
    img: "/assets/images/work-process/img2.png",
    title: "Growth Opportunities",
    desc: "Continuous learning and growth are our core values.",
  },
  {
    img: "/assets/images/work-process/img3.png",
    title: "Meaningful Work",
    desc: "Be part of projects that make a difference.",
  },
  {
    img: "/assets/images/work-process/img3.png",
    title: "Dynamic Environment",
    desc: "Where creativity, agility, and ideas thrive.",
  },
];

export default function Careers() {
  return (
    <>
      <Header />
      <SubNav />

      {/* Why Join Us */}
      <section className="si__work__process__three__area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="si__section__title pb-40 text-center">
                <h1 className="text-anime-style-3">Why Join GRIP?</h1>
                <p>
                  At GRIP, we believe that our people are our greatest asset. We
                  foster a culture of collaboration, innovation, and continuous
                  learning that empowers every team member to reach their full
                  potential.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {benefits.map((item) => (
              <div key={item.title} className="col-lg-3 col-md-6">
                <div className="si__work__process__three__box">
                  <div className="si__work__process__three__icon">
                    <div className="si__work__process__three__inner">
                      <img src={item.img} alt={item.title} />
                    </div>
                  </div>
                  <div className="si__work__process__three__text">
                    <h6>{item.title}</h6>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We're Looking For */}
      <section
        className="si__testimonial__two__area pt-125 custom__width bg"
        style={{
          background:
            "url(/assets/images/testimonial/bg.png) center/cover no-repeat",
        }}
      >
        <div className="container custom__container__two">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="si__section__title colortwo">
                <h1 className="text-anime-style-3">Who We&apos;re Looking For</h1>
              </div>
            </div>
          </div>
          <div className="row align-items-stretch mt-4">
            <div className="col-lg-6 mb-4">
              <div className="si__testimonial__two__box h-100 p-4 d-flex flex-column justify-content-between">
                <div className="si__testimonial__two__box__text">
                  <h5 className="text-white">
                    We welcome individuals from a wide range of backgrounds and
                    expertise. If you&apos;re passionate, proactive, and ready to grow
                    with a forward-thinking team, we&apos;d love to hear from you.
                  </h5>
                </div>
                <div className="mt-3">
                  <a
                    href="mailto:care@gripforum.com"
                    className="btn btn-light text-dark"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="si__testimonial__two__box h-100 p-4 d-flex flex-column justify-content-between">
                <div className="si__testimonial__two__box__text">
                  <h5 className="text-white">
                    Send your resume along with a brief cover letter to{" "}
                    <a href="mailto:care@gripforum.com" className="text-white">
                      <u>care@gripforum.com</u>
                    </a>
                    . Please include the position or area of interest in the
                    subject line.
                  </h5>
                </div>
                <div className="si__testimonial__two__box__inner d-flex align-items-center justify-content-between mt-4">
                  <div className="si__testimonial__two__box__inner__content">
                    <h6 className="text-white">
                      Take the next step in your career — join GRIP and help shape
                      the future with us!
                    </h6>
                  </div>
                  <div className="si__testimonial__two__box__inner__icon">
                    <img src="/assets/images/testimonial/icon.png" alt="Icon" />
                  </div>
                </div>
                <div className="mt-3">
                  <a
                    href="mailto:care@gripforum.com"
                    className="btn btn-outline-light"
                  >
                    Send Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
