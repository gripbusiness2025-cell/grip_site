"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  menuType?: "standard" | "zone";
  zoneSlug?: string;
}

export default function Header({ menuType = "standard", zoneSlug }: HeaderProps) {
  const pathname = usePathname();

  const isActive = (...paths: string[]) =>
    paths.some((p) => pathname === p || pathname.startsWith(p + "/"))
      ? "active"
      : "";

  return (
    <>
      <section id="header-sticky" className={`si__header__area ${pathname !== "/" ? "inner-page-header" : ""}`}>
        <div className="container custom__container">
          <div className="row">
            <div className="col-lg-2">
              <div className="si__header__logo">
                <Link href="/">
                  <img src="/assets/images/logo/grip.png?v=old" alt="logo" />
                </Link>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="si__header__content">
                <div className="si__header__menubar">
                  <div className="si__header__menu">
                    <ul>
                      {menuType === "zone" ? (
                        <>
                          <li>
                            <Link
                              href={zoneSlug ? `/${zoneSlug}/home` : "/"}
                              className={isActive(zoneSlug ? `/${zoneSlug}/home` : "/") || pathname === "/" ? "active" : ""}
                            >
                              Home
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className={isActive(
                                zoneSlug ? `/${zoneSlug}/membership-policies` : "/membership-policies",
                                zoneSlug ? `/${zoneSlug}/enquiry` : "/enquiry",
                                zoneSlug ? `/${zoneSlug}/faq` : "/faq"
                              )}
                            >
                              Become a Associate{" "}
                              <i className="fa-light fa-chevron-down"></i>
                            </Link>
                            <ul className="sub__menu">
                              <li className={isActive(zoneSlug ? `/${zoneSlug}/membership-policies` : "/membership-policies") ? "current__item" : ""}>
                                <Link href={zoneSlug ? `/${zoneSlug}/membership-policies` : "/membership-policies"}>
                                  Associate Policies
                                </Link>
                              </li>
                              <li className={isActive(zoneSlug ? `/${zoneSlug}/enquiry` : "/enquiry") ? "current__item" : ""}>
                                <Link href={zoneSlug ? `/${zoneSlug}/enquiry` : "/enquiry"}>Become a Associate</Link>
                              </li>
                              <li className={isActive(zoneSlug ? `/${zoneSlug}/faq` : "/faq") ? "current__item" : ""}>
                                <Link href={zoneSlug ? `/${zoneSlug}/faq` : "/faq"}>FAQ</Link>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <Link
                              href={zoneSlug ? `/${zoneSlug}/events` : "/upcoming-events"}
                              className={isActive(zoneSlug ? `/${zoneSlug}/events` : "/upcoming-events")}
                            >
                              Events
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={`/${zoneSlug || ""}`}
                              className={
                                pathname === `/${zoneSlug}` ||
                                (zoneSlug && pathname.startsWith(`/${zoneSlug}/`) &&
                                  !pathname.endsWith("/home") &&
                                  !pathname.includes("/membership-policies") &&
                                  !pathname.includes("/enquiry") &&
                                  !pathname.includes("/faq") &&
                                  !pathname.includes("/events") &&
                                  !pathname.includes("/contact"))
                                  ? "active"
                                  : ""
                              }
                            >
                              Chapters
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={zoneSlug ? `/${zoneSlug}/contact` : "/contact"}
                              className={isActive(zoneSlug ? `/${zoneSlug}/contact` : "/contact")}
                            >
                              Contact
                            </Link>
                          </li>
                          <li>
                            <a
                              href="https://user.gripforum.com/"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Associates Login
                            </a>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link href="/" className={isActive("/") || pathname === "/" ? "active" : ""}>
                              Home
                            </Link>
                          </li>
                          <li>
                            <Link href="/about" className={isActive("/about")}>
                              About GRIP
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className={isActive(
                                "/membership-policies",
                                "/enquiry",
                                "/faq"
                              )}
                            >
                              Become a Associate{" "}
                              <i className="fa-light fa-chevron-down"></i>
                            </Link>
                            <ul className="sub__menu">
                              <li className={isActive("/membership-policies") ? "current__item" : ""}>
                                <Link href="/membership-policies">
                                  Associate Policies
                                </Link>
                              </li>
                              <li className={isActive("/enquiry") ? "current__item" : ""}>
                                <Link href="/enquiry">Become a Associate</Link>
                              </li>
                              <li className={isActive("/faq") ? "current__item" : ""}>
                                <Link href="/faq">FAQ</Link>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className={isActive("/franchising", "/franchise-partners")}
                            >
                              Franchise{" "}
                              <i className="fa-light fa-chevron-down"></i>
                            </Link>
                            <ul className="sub__menu">
                              <li className={isActive("/franchise-partners") ? "current__item" : ""}>
                                <Link href="/franchise-partners">Franchise Partners</Link>
                              </li>
                              <li className={isActive("/franchising") ? "current__item" : ""}>
                                <Link href="/franchising">GRIP Franchising</Link>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <Link href="#" className={isActive("/upcoming-events")}>
                              Events <i className="fa-light fa-chevron-down"></i>
                            </Link>
                            <ul className="sub__menu">
                              <li className={isActive("/upcoming-events") ? "current__item" : ""}>
                                <Link href="/upcoming-events">Upcoming Events</Link>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <Link href="/contact" className={isActive("/contact")}>
                              Contact
                            </Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offcanvas Sidebar */}
      <section className="xs-sidebar-group info-group">
        <div className="dt-overlay bt-black"></div>
        <div className="dt-sidebar-widget">
          <div className="sidebar-container">
            <div className="widget-top">
              <a href="#" className="close">
                X
              </a>
            </div>
            <div className="sidebar-textwidget">
              <section className="sidebar-info-contents">
                <div className="content-inner">
                  <div className="logo">
                    <Link href="/">
                      <img src="/assets/images/logo/logo__white.png" alt="" />
                    </Link>
                  </div>
                  <div className="content-text">
                    <h2>About Us</h2>
                    <p className="text-white">
                      GRIP - India&apos;s First Paperless Digital empowered referral
                      networking organization. We foster meaningful discussions and
                      share insights to build powerful professional relationships
                      across industries.
                    </p>
                  </div>
                  <div className="contact-info">
                    <h2>Contact Us</h2>
                    <ul>
                      <li>
                        <i className="fa-light fa-phone"></i>{" "}
                        <a href="tel:+919841012721">+91 98410 12721</a>
                      </li>
                      <li>
                        <i className="fa-light fa-envelope"></i>{" "}
                        <a href="mailto:care@gripforum.com">care@gripforum.com</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
              <div className="social-icon pt-40">
                <ul>
                  <li>
                    <a href="https://www.facebook.com/gripbusinessforum" target="_blank" rel="noreferrer">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/gripbusinessforum/" target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/@GripBusinessForum" target="_blank" rel="noreferrer">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/grip-business-forum-b83578363/" target="_blank" rel="noreferrer">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Menu */}
      <section className="si__mobilemenu__area">
        <div className="mobile-menu">
          <nav className="si_menu">
            <ul>
              {menuType === "zone" ? (
                <>
                  <li className={pathname === (zoneSlug ? `/${zoneSlug}/home` : "/") ? "current__item" : ""}>
                    <Link href={zoneSlug ? `/${zoneSlug}/home` : "/"}>Home</Link>
                  </li>
                  <li>
                    <a href="#">Become a Associate</a>
                    <ul className="sub__menu">
                      <li>
                        <Link href={zoneSlug ? `/${zoneSlug}/membership-policies` : "/membership-policies"}>Associate Policies</Link>
                      </li>
                      <li>
                        <Link href={zoneSlug ? `/${zoneSlug}/enquiry` : "/enquiry"}>Become a Associate</Link>
                      </li>
                      <li>
                        <Link href={zoneSlug ? `/${zoneSlug}/faq` : "/faq"}>FAQ</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link href={zoneSlug ? `/${zoneSlug}/events` : "/upcoming-events"}>Events</Link>
                  </li>
                  <li>
                    <Link href={`/${zoneSlug || ""}`}>Chapters</Link>
                  </li>
                  <li>
                    <Link href={zoneSlug ? `/${zoneSlug}/contact` : "/contact"}>Contact</Link>
                  </li>
                  <li>
                    <a href="https://user.gripforum.com/" target="_blank" rel="noreferrer">Associates Login</a>
                  </li>
                </>
              ) : (
                <>
                  <li className={pathname === "/" ? "current__item" : ""}>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/about">About GRIP</Link>
                  </li>
                  <li>
                    <a href="#">Become a Associate</a>
                    <ul className="sub__menu">
                      <li>
                        <Link href="/membership-policies">Associate Policies</Link>
                      </li>
                      <li>
                        <Link href="/enquiry">Become a Associate</Link>
                      </li>
                      <li>
                        <Link href="/faq">FAQ</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Franchise</a>
                    <ul className="sub__menu">
                      <li>
                        <Link href="/franchise-partners">Franchise Partners</Link>
                      </li>
                      <li>
                        <Link href="/franchising">GRIP Franchising</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Events</a>
                    <ul className="sub__menu">
                      <li>
                        <Link href="/upcoming-events">Upcoming Events</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </section>

      <style>{`
        .si__header__area.inner-page-header,
        #header-sticky.inner-page-header {
          background-color: #fff !important;
          background: #fff !important;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05) !important;
          padding-top: 15px !important;
          padding-bottom: 15px !important;
          border-bottom: 1px solid #eaeaea !important;
          z-index: 999 !important;
        }
        .si__header__area.inner-page-header .si__header__menu,
        #header-sticky.inner-page-header .si__header__menu {
          border: 1px solid #eaeaea !important;
        }
      `}</style>
    </>
  );
}
