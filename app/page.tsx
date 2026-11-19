import type { Metadata } from "next";
import { withSeo } from "@/lib/seo";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import UnderlineSvg from "@/components/UnderlineSvg";
import { fetchWebsiteEvents } from "@/lib/websiteEvents";

export const metadata: Metadata = withSeo("/", {
  title: "GRIP – Global Referral Interacting Platform for Professional Networking",
  description:
    "GRIP is a global referral-based networking platform fostering ethical collaboration, structured business growth, and meaningful professional connections.",
});

export default async function Home() {
  const events = await fetchWebsiteEvents();

  return (
    <>
      <Preloader />
      <Header />

      {/* Hero banner — img keeps full artwork (no crop/stretch on large screens) */}
      <section className="si__slider__area si__slider__area--img">
        <img
          className="si__slider__banner-img"
          src="/assets/images/slider/banner1.jpeg"
          alt="GRIP – Global Referral Interacting Platform, India's First Digital Business Networking Forum"
          width={1600}
          height={900}
          fetchPriority="high"
        />
      </section>

      {/* Text Marquee */}
      <section className="marquee-section">
        <div className="marquee">
          {[0, 1].map((group) => (
            <div className="marquee-group" key={group}>
              <div className="text">
                ✅ India&apos;s 1st Digital Business Networking Platform
              </div>
              <div className="text weight">✅ Business Mentor Guidance</div>
              <div className="text">✅ FREE Business Webpage</div>
              <div className="text weight">✅ One-Touch GRIP App</div>
              <div className="text">✅ Geo-Location Attendance</div>
              <div className="text weight">
                ✅ Zero Paperwork &amp; 100% Digital Platform
              </div>
              <div className="text">✅ Real Business Referrals</div>
              <div className="text weight">✅ Knowledge Sharing Sessions</div>
            </div>
          ))}
        </div>
      </section>

      {/* Uniqueness of GRIP — directly under scrolling banner */}
      <section className="grip-uniqueness pt-90 pb-100">
        <div className="container">
          <div className="row mb-50">
            <div className="col-lg-12 text-center">
              <h2 className="grip-uniqueness__title">Uniqueness of GRIP</h2>
            </div>
          </div>
          <div className="row g-4 g-lg-5">
            {[
              {
                img: "/assets/images/grip/3.webp",
                title: "One Touch GRIP App",
                text: "Android & iOS Apps are User Friendly to track Geographical Attendance; 1-2-1 & all the activities, AI helping Chat box them maximize their potential and Real Recognition Awards.",
              },
              {
                img: "/assets/images/grip/chapter2.jpg",
                title: "Chapter Mentor",
                text: "Each chapter will be supported by a Mentor who will travel along the chapter to help each member to achieve their goals in terms of business.",
              },
              {
                img: "/assets/images/grip/aram.jpg",
                title: "Dedicated Business Webpage",
                text: "Dedicated digital business page in our official forum website which will fetch our members an additional mileage of global visibility. If a member requests his / her own web page to be added, it can be done.",
              },
              {
                img: "/assets/images/grip/launch2.jpg",
                title: "Regular Offline Training",
                text: "Offline Trainings will be conducted twice in a month to help members educate & gain the networking knowledge. Trainings will be increased as per requirement.",
              },
              {
                img: "/assets/images/grip/grip.jpeg",
                title: "Respect Associates & Digital-First",
                text: "All associates, including the leadership team, can focus on their businesses. Visitors Entry, Attendance, meeting records and performance tracking are digitally maintained, ensuring a seamless, transparent and completely paperless networking experience.",
              },
              {
                img: "/assets/images/grip/launch.jpg",
                title: "Knowledge Sharing Sessions",
                text: "Structured knowledge sharing sessions help associates learn from peers, expand industry insight, and convert networking into real business growth.",
              },
            ].map((item) => (
              <div key={item.title} className="col-lg-4 col-md-6">
                <div className="grip-uniqueness__card">
                  <div className="grip-uniqueness__thumb">
                    <img src={item.img} alt={item.title} />
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="grip-core-values pt-100 pb-90">
        <div className="container">
          <div className="row mb-50">
            <div className="col-lg-12 text-center">
              <h2 className="grip-core-values__title">CORE VALUES</h2>
            </div>
          </div>
          <div className="row g-4 g-lg-5">
            {[
              {
                icon: "fa-people-group",
                title: "Contributors Win™",
                text: "Success comes from the value you create for others. When you share knowledge, create opportunities, and support fellow entrepreneurs, everyone grows; and Contributors Win™.",
              },
              {
                icon: "fa-handshake",
                title: "Respect",
                text: "We respect every Associate, every profession, every idea, and every contribution. We listen with intent, value diverse perspectives, honour our commitments, and uphold the highest standards of professionalism, integrity, and dignity in every interaction.",
              },
              {
                icon: "fa-clipboard-check",
                title: "Accountability",
                text: "We take ownership of our commitments, actions, and outcomes. We honour our promises, follow through on opportunities, and build trust through consistent action.",
              },
              {
                icon: "fa-puzzle-piece",
                title: "Collaboration",
                text: "We work together, share our strengths, and foster a positive attitude that benefits everyone. Together, we achieve more, grow stronger, and create lasting success through collaboration and positivity.",
              },
              {
                icon: "fa-book-open-reader",
                title: "Learn to Enrich",
                text: "We embrace lifelong learning, continuously developing our knowledge and skills to create greater value for ourselves and others. Invest in yourself, grow your value, and become the leader you aspire to be.",
              },
              {
                icon: "fa-hands-clapping",
                title: "Appreciation",
                text: "We recognise and value the contributions of others, knowing that genuine appreciation builds stronger teams, inspires success, and creates meaningful growth.",
              },
            ].map((item) => (
              <div key={item.title} className="col-lg-4 col-md-6">
                <div className="grip-core-values__card">
                  <div className="grip-core-values__icon">
                    <i className={`fa-solid ${item.icon}`} />
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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

      {/* How GRIP Helps Business Grow */}
      <section className="si__faq__are pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="si__section__title pb-40 text-center">
                <h2 className="text-anime-style-3 as-h1">
                  How GRIP helps <br />{" "}
                  <span className="si__section__title__highlight">
                    Business <UnderlineSvg />
                  </span>{" "}
                  grow?
                </h2>
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
                <img src="/assets/images/grip/chhose.png" alt="Three business professionals working together at a laptop – why choose GRIP business networking" />
                <img
                  className="si__faq__thumb__shape1 dance"
                  src="/assets/images/faq/1.png"
                  alt=""
                  aria-hidden="true"
                />
                <img
                  className="si__faq__thumb__shape2 scale2"
                  src="/assets/images/faq/2.png"
                  alt=""
                  aria-hidden="true"
                />
              </div>
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
                    <h2 className="text-white text-anime-style-3 as-h1">
                      Join the <br />{" "}
                      <span className="si__section__title__highlight">
                        Revolution! <UnderlineSvg />
                      </span>
                    </h2>
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
                  <img src="/assets/images/grip/b4.jpeg" alt="Business professionals networking around a meeting table – connect, collaborate and grow with GRIP" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .grip-core-values { background: #fff; }
        .grip-core-values__title {
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 800;
          color: #1a2b6b;
          letter-spacing: 0.04em;
          margin: 0;
        }
        .grip-core-values__card { text-align: center; padding: 8px 10px; height: 100%; }
        .grip-core-values__icon {
          width: 88px;
          height: 88px;
          margin: 0 auto 18px;
          border-radius: 50%;
          background: #c1272d;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          box-shadow: 0 10px 24px rgba(193, 39, 45, 0.22);
        }
        .grip-core-values__card h4 {
          font-size: 1.2rem;
          font-weight: 800;
          color: #111;
          margin-bottom: 12px;
        }
        .grip-core-values__card p {
          color: #555;
          font-size: 14px;
          line-height: 1.7;
          margin: 0;
        }
        .grip-uniqueness { background: #fafafa; }
        .grip-uniqueness__title {
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 800;
          color: #c1272d;
          margin: 0;
        }
        .grip-uniqueness__card {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 12px;
          padding: 18px;
          height: 100%;
          transition: box-shadow .2s, transform .2s;
        }
        .grip-uniqueness__card:hover {
          box-shadow: 0 12px 28px rgba(0,0,0,.08);
          transform: translateY(-3px);
        }
        .grip-uniqueness__thumb {
          width: 100%;
          height: 180px;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 16px;
          background: #f2f2f2;
        }
        .grip-uniqueness__thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .grip-uniqueness__card h4 {
          font-size: 1.15rem;
          font-weight: 800;
          color: #c1272d;
          margin-bottom: 10px;
        }
        .grip-uniqueness__card p {
          color: #555;
          font-size: 14px;
          line-height: 1.7;
          margin: 0;
        }
      `}</style>

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
                <h2 className="text-anime-style-3 as-h1">
                  What&apos;s Next at GRIP? <br /> Mark Your{" "}
                  <span className="si__section__title__highlight">
                    Calendar! <UnderlineSvg />
                  </span>{" "}
                  Time
                </h2>
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
                        alt={event.imageAlt || `${event.title} poster`}
                      />
                    </div>
                  </div>
                  <div className="si__our__blog__inner">
                    <div className="si__our__blog__content">
                      <a className="si__our__blog__content__text" href="/upcoming-events">
                        {event.title}
                      </a>
                      <p style={{ whiteSpace: "pre-line" }}>{event.description}</p>
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
