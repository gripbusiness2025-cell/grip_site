import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubNav from "@/components/SubNav";
import UnderlineSvg from "@/components/UnderlineSvg";

export const metadata: Metadata = {
  title: "Why Choose GRIP – Digital Networking, Leadership, and Cross-Industry Growth",
  description:
    "Discover why professionals choose GRIP – a platform for seamless digital networking, weekly leadership insights, and powerful cross-industry collaboration to fuel innovation.",
};

export default function About() {
  return (
    <>
      <Header />
      <SubNav />

      {/* About Section */}
      <section className="si__why__choose__area pt-60 pb-120">
        <div className="container custom__container__two">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="si__why__choose__thumb reveal-left">
                <img src="https://res.cloudinary.com/dq6gr5zjc/image/upload/v1784264144/about_udd7zm.jpg" alt="About GRIP" fetchPriority="high" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="si__why__choose__right">
                <div className="si__section__title">
                  <h1 className="text-anime-style-3">
                    Global Referral <br /> Interacting{" "}
                    <span className="si__section__title__highlight">
                      Platform <UnderlineSvg />
                    </span>
                  </h1>
                  <p>
                    At GRIP, we foster meaningful conversations and share valuable
                    insights to build strong, professional relationships across diverse
                    industries. By leveraging the power of structured networking and
                    ethical collaboration, we aim to create a vibrant community of
                    forward-thinking professionals.
                  </p>
                </div>
                <div
                  className="si__why__choose__iconbox pt-20 wow fadeInLeft animated"
                  data-wow-delay=".3s"
                >
                  <h6>
                    <i className="fa-solid fa-angle-right"></i> Our Vision
                  </h6>
                  <p>
                    It to be the world&apos;s most trusted referral-based business network
                    by enabling professionals to build meaningful connections and grow
                    through collaboration.
                  </p>
                </div>
                <div
                  className="si__why__choose__iconbox pt-7 wow fadeInLeft animated"
                  data-wow-delay=".45s"
                >
                  <h6>
                    <i className="fa-solid fa-angle-right"></i>Our Mission
                  </h6>
                  <p>
                    To empower professionals through ethical collaboration by providing
                    structured networking opportunities and fostering a culture of
                    integrity, accountability, and professionalism.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Process */}
      <section className="si__work__process__area pb-90">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="si__section__title text-right">
                <h5>
                  Work Process <i className="fa-regular fa-chevrons-right"></i>
                </h5>
                <h1 className="text-anime-style-3">
                  Why Choose GRIP?{" "}
                  <span className="si__section__title__highlight">
                    <UnderlineSvg />
                  </span>
                </h1>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="si__work__process__text">
                <p>
                  GRIP empowers professionals through seamless digital networking,
                  insightful leadership, and cross-industry collaboration to drive
                  growth and innovation.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 wow fadeInUp animated" data-wow-delay=".3s">
              <div className="si__work__process__box">
                <div className="si__work__process__icon">
                  <div className="si__work__process__icon__inner text-center">
                    <img src="/assets/images/work-process/icon1.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="si__work__process__content text-center">
                <h5>Digital Support &amp; Weekly Meetings</h5>
                <p>
                  Connect seamlessly with influential industry leaders during our
                  structured weekly meetings—completely digital, hassle-free, and
                  efficient.
                </p>
              </div>
            </div>
            <div className="col-lg-4 wow fadeInUp animated" data-wow-delay=".45s">
              <div className="si__work__process__box">
                <div className="si__work__process__icon">
                  <div className="si__work__process__icon__inner text-center">
                    <img src="/assets/images/work-process/icon2.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="si__work__process__content text-center">
                <h5>Thought Leadership</h5>
                <p>
                  Stay ahead of the curve with valuable insights and strategies from
                  top industry experts, embracing innovation and emerging trends.
                </p>
              </div>
            </div>
            <div className="col-lg-4 wow fadeInUp animated" data-wow-delay=".5s">
              <div className="si__work__process__box last-box">
                <div className="si__work__process__icon">
                  <div className="si__work__process__icon__inner text-center">
                    <img src="/assets/images/work-process/icon3.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="si__work__process__content text-center">
                <h5>Cross-Industry Collaboration</h5>
                <p>
                  Expand your network across diverse sectors and foster meaningful
                  connections that inspire cross-disciplinary growth and innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
