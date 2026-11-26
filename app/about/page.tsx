import type { Metadata } from "next";
import { withSeo } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubNav from "@/components/SubNav";
import UnderlineSvg from "@/components/UnderlineSvg";

export const metadata: Metadata = withSeo("/about", {
  title: "Why Choose GRIP – Digital Networking, Leadership, and Cross-Industry Growth",
  description:
    "Discover why professionals choose GRIP – a platform for seamless digital networking, weekly leadership insights, and powerful cross-industry collaboration to fuel innovation.",
});

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
                <img src="https://res.cloudinary.com/dq6gr5zjc/image/upload/v1784264144/about_udd7zm.jpg" alt="Business professionals collaborating around a glowing digital globe – GRIP global referral networking platform" fetchPriority="high" />
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
                <h2 className="text-anime-style-3 as-h1">
                  Why Choose GRIP?{" "}
                  <span className="si__section__title__highlight">
                    <UnderlineSvg />
                  </span>
                </h2>
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
                    <img src="/assets/images/work-process/icon1.svg" alt="One Touch GRIP App" />
                  </div>
                </div>
              </div>
              <div className="si__work__process__content text-center">
                <h5>One Touch GRIP App</h5>
                <p>
                  Android &amp; iOS Apps are User Friendly to track Geographical
                  Attendance; 1-2-1 &amp; all the activities, AI helping Chat box them
                  maximize their potential and Real Recognition Awards.
                </p>
              </div>
            </div>
            <div className="col-lg-4 wow fadeInUp animated" data-wow-delay=".45s">
              <div className="si__work__process__box">
                <div className="si__work__process__icon">
                  <div className="si__work__process__icon__inner text-center">
                    <img src="/assets/images/work-process/icon2.svg" alt="Chapter Mentor" />
                  </div>
                </div>
              </div>
              <div className="si__work__process__content text-center">
                <h5>Chapter Mentor</h5>
                <p>
                  Each chapter will be supported by a Mentor who will travel along the
                  chapter to help each member to achieve their goals in terms of
                  business.
                </p>
              </div>
            </div>
            <div className="col-lg-4 wow fadeInUp animated" data-wow-delay=".5s">
              <div className="si__work__process__box last-box">
                <div className="si__work__process__icon">
                  <div className="si__work__process__icon__inner text-center">
                    <img src="/assets/images/work-process/icon3.svg" alt="Dedicated Business Webpage" />
                  </div>
                </div>
              </div>
              <div className="si__work__process__content text-center">
                <h5>Dedicated Business Webpage</h5>
                <p>
                  Dedicated digital business page in our official forum website which
                  will fetch our members an additional mileage of global visibility. If
                  a member requests his / her own web page to be added, it can be done.
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
