import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import UnderlineSvg from "@/components/UnderlineSvg";
import { fetchWebsiteEvents } from "@/lib/websiteEvents";

export const metadata: Metadata = {
  title: "GRIP – Global Referral Interacting Platform for Professional Networking",
  description:
    "GRIP is a global referral-based networking platform fostering ethical collaboration, structured business growth, and meaningful professional connections.",
};

export default async function Home() {
  const events = await fetchWebsiteEvents();

  return (
    <>
      <Preloader />
      <Header />

      {/* Slider Area */}
      <section
        className="si__slider__area bg"
        style={{ background: "url(/assets/images/slider/banner.jpeg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="si__slider__content text-center">
                <h1 className="wow fadeInUp animated" data-wow-delay=".2s">
                  Global Referral Interacting Platform <br />
                  <span>
                    India&apos;s 1<small style={{ fontSize: "0.6em", verticalAlign: "super" }}>st</small>{" "}
                    Digital Business Networking Platform
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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
                    insights to build strong, professional relationships across
                    diverse industries. By leveraging the power of structured
                    networking and ethical collaboration, we aim to create a
                    vibrant community of forward-thinking professionals.
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
                    It to be the world&apos;s most trusted referral-based business
                    network by enabling professionals to build meaningful
                    connections and grow through collaboration.
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
                    To empower professionals through ethical collaboration by
                    providing structured networking opportunities and fostering a
                    culture of integrity, accountability, and professionalism.
                  </p>
                  <Link className="si__btn mt-15" href="/about">
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Three Area - Uniqueness of GRIP */}
      <section className="si__service__three__area pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="si__three__section__title mb-52 text-center">
                <br />
                <h1 className="text-white text-anime-style-3">
                  Uniqueness of <span>GRIP</span>
                </h1>
                <p className="text-white">
                  Discover how GRIP helps professionals thrive through smart,
                  structured networking solutions.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {/* 1: Digital Platform */}
            <div className="col-lg-4 col-md-6">
              <div className="si__service__three__box text-center">
                <div className="si__service__three__inner" style={{ height: "376px" }}>
                  <div className="si__service__three__icon">
                    <img src="/assets/images/grip/smart-home.png" alt="" />
                  </div>
                  <div className="si__service__three__text">
                    <h5>Digital First</h5>
                    <p>
                      Android &amp; iOS Apps are User Friendly to track Geographical
                      Attendance &amp; weekly activities, helping them maximize their
                      potential
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2: Regular Offline Training */}
            <div className="col-lg-4 col-md-6">
              <div className="si__service__three__box text-center">
                <div className="si__service__three__inner" style={{ height: "376px" }}>
                  <div className="si__service__three__icon">
                    <img src="/assets/images/grip/meeting.png" alt="" />
                  </div>
                  <div className="si__service__three__text">
                    <h5>Regular Offline Training</h5>
                    <p>
                      Offline Trainings will be conducted twice in a month to help
                      associates educate &amp; gain the networking knowledge. Trainings
                      will be increased as per requirement
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3: Freedom from Manual Work */}
            <div className="col-lg-4 col-md-6">
              <div className="si__service__three__box text-center">
                <div className="si__service__three__inner" style={{ height: "376px" }}>
                  <div className="si__service__three__icon">
                    <img src="/assets/images/grip/presentation.png" alt="" />
                  </div>
                  <div className="si__service__three__text">
                    <h5>Freedom from Manual Work</h5>
                    <p>
                      Record of attendance of visitors and their applications will be
                      digitally done without any paper work. Associates attendance will
                      be monitored through Geo locations which will be enabled through
                      our mobile app functions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4: Chapter Mentor */}
            <div className="col-lg-4 col-md-6">
              <div className="si__service__three__box text-center">
                <div className="si__service__three__inner" style={{ height: "376px" }}>
                  <div className="si__service__three__icon">
                    <img src="/assets/images/grip/value.png" alt="" />
                  </div>
                  <div className="si__service__three__text">
                    <h5>Chapter Mentor</h5>
                    <p>
                      Each chapter will be supported by a Mentor who will travel along
                      the chapter to help each associate to achieve their Goals in terms
                      of business
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 5: Valued Associates */}
            <div className="col-lg-4 col-md-6">
              <div className="si__service__three__box text-center">
                <div className="si__service__three__inner" style={{ height: "376px" }}>
                  <div className="si__service__three__icon">
                    <img src="/assets/images/grip/seminar.png" alt="" />
                  </div>
                  <div className="si__service__three__text">
                    <h5>Valued Associates</h5>
                    <p>
                      All Associates including the leadership team are free to do their
                      business as all other activities of the forum will be maintained
                      digitally through our app.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 6: Your Dedicated Business Page */}
            <div className="col-lg-4 col-md-6">
              <div className="si__service__three__box text-center">
                <div className="si__service__three__inner" style={{ height: "376px" }}>
                  <div className="si__service__three__icon">
                    <img src="/assets/images/grip/meeting.png" alt="" />
                  </div>
                  <div className="si__service__three__text">
                    <h5>Your Dedicated Business Page</h5>
                    <p>
                      Dedicated digital business page in our official forum website
                      which will fetch our associates an additional mileage of global
                      visibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How GRIP Helps Business Grow */}
      <section className="si__faq__are pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="si__section__title pb-40 text-center">
                <h1 className="text-anime-style-3">
                  How GRIP helps <br />{" "}
                  <span className="si__section__title__highlight">
                    Business <UnderlineSvg />
                  </span>{" "}
                  grow?
                </h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 wow fadeInUp animated" data-wow-delay=".3s">
              <div
                className="si__about__us__text_gr wow fadeInUp animated"
                data-wow-delay=".45s"
              >
                <span>
                  <i className="fa-solid fa-angle-right"></i> COLLOBORATE TO
                  ACCELERATE!
                </span>
                <span>
                  <i className="fa-solid fa-angle-right"></i> GRIP provides the
                  environment, training and support to build trusted relationships
                </span>
                <span>
                  <i className="fa-solid fa-angle-right"></i> Pioneers to have a
                  separate digital business page for associates in our official
                  website
                </span>
                <span>
                  <i className="fa-solid fa-angle-right"></i> Global Visibility
                </span>
                <span>
                  <i className="fa-solid fa-angle-right"></i> Weekly Chapter meetings
                  that follow a structured agenda proven to maximize referrals
                </span>
                <span>
                  <i className="fa-solid fa-angle-right"></i> Chapter Mentors to
                  monitor the smooth functioning of each chapter and to help
                  associates to achieve their goals 1st Digital
                </span>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="si__faq__thumb reveal-left">
                <img src="/assets/images/grip/chhose.png" alt="" />
                <img
                  className="si__faq__thumb__shape1 dance"
                  src="/assets/images/faq/1.png"
                  alt=""
                />
                <img
                  className="si__faq__thumb__shape2 scale2"
                  src="/assets/images/faq/2.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Text Marquee */}
      <section className="marquee-section mb-120">
        <div className="marquee">
          <div className="marquee-group">
            <div className="text" data-text="Visionary Consulting">
              <img src="/assets/images/text-animation/1.png" alt="" /> 1st Digital
              Business Networking Platform
            </div>
            <div className="text weight" data-text="Visionary Consulting">
              <img src="/assets/images/text-animation/2.png" alt="" /> Thought
              Leadership
            </div>
            <div className="text" data-text="Visionary Consulting">
              <img src="/assets/images/text-animation/3.png" alt="" /> Cross-Industry
            </div>
          </div>
          <div className="marquee-group">
            <div className="text weight" data-text="Visionary Consulting">
              <img src="/assets/images/text-animation/2.png" alt="" /> First Fully
              Digitally Empowered Networking Platform
            </div>
            <div className="text" data-text="Visionary Consulting">
              <img src="/assets/images/text-animation/1.png" alt="" /> Grow &amp;
              Innovate
            </div>
            <div className="text" data-text="Visionary Consulting">
              <img src="/assets/images/text-animation/3.png" alt="" /> Connect
            </div>
          </div>
        </div>
      </section>

      {/* Join the Revolution */}
      <section
        className="si__our__features__area pt-120 pb-120 custom__width bg"
        style={{ background: "url(/assets/images/features/bg.png)" }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 wow fadeInUp animated" data-wow-delay=".15s">
              <div className="si__our__features__box">
                <div className="si__our__features__box__inner">
                  <div className="si__section__title pb-40">
                    <h1 className="text-white text-anime-style-3">
                      Join the <br />{" "}
                      <span className="si__section__title__highlight">
                        Revolution! <UnderlineSvg />
                      </span>
                    </h1>
                    <div className="si__our__features__box__content">
                      <p>
                        <b>
                          Be a part of the next-generation Networking Revolution&quot;
                        </b>
                        GRIP redefines how professionals connect, communicate and
                        collaborate in a rapidly evolving digital landscape. It
                        provides the platform to expand your network and drive
                        engagement.
                      </p>
                      <ul>
                        <li>
                          <i className="fa-regular fa-angle-right"></i> First Fully
                          Digitally empowered Networking Forum
                        </li>
                        <li>
                          <i className="fa-regular fa-angle-right"></i> Connect
                        </li>
                        <li>
                          <i className="fa-regular fa-angle-right"></i> Collaborate
                        </li>
                        <li>
                          <i className="fa-regular fa-angle-right"></i> Grow &amp;
                          Innovate
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="si__our__features__thumb reveal-left">
                <div className="si__our__features__thumb__img">
                  <img src="/assets/images/grip/b4.jpeg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
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
            {events.map((event, idx) => (
              <div
                key={event._id}
                className="col-lg-6 col-md-6 wow fadeInUp animated"
                data-wow-delay={`${0.2 + idx * 0.1}s`}
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
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
