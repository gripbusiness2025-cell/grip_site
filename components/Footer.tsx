import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* Footer Two Area */}
      <section
        className="si__fotter__two__area pt-80 pb-120 custom__width bg"
        style={{ background: "url(/assets/images/fotter/bg.png)" }}
      >
        <div className="container custom__container__two">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="si__fotter__two__box">
                <div className="si__fotter__two__box__icon">
                  <Link href="/">
                    <img src="/assets/images/logo/grip.png?v=old" alt="GRIP Logo" />
                  </Link>
                  <p>
                    GRIP - India&apos;s First Paperless Digital empowered referral
                    networking organization. We foster meaningful discussions and
                    share insights to build powerful professional relationships
                    across industries.
                  </p>
                </div>
                <div className="si__fotter__two__box__social">
                  <a
                    href="https://www.instagram.com/gripbusinessforum/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a
                    href="https://www.facebook.com/gripbusinessforum"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a
                    href="https://www.youtube.com/@GripBusinessForum"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-youtube-square"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/grip-business-forum-b83578363/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="si__fotter__two__text">
                <h6>About GRIP</h6>
                <ul>
                  <li>
                    <Link href="/about">About GRIP</Link>
                  </li>
                  <li>
                    <Link href="/founders">GRIP Founders</Link>
                  </li>
                  <li>
                    <Link href="/head-legal-training">
                      GRIP Head - Legal &amp; Training
                    </Link>
                  </li>
                  <li>
                    <Link href="/founding-executive-directors">
                      Founding Executive Directors
                    </Link>
                  </li>
                  <li>
                    <a href="#">GRIP Regional Directors</a>
                  </li>
                  <li>
                    <Link href="/careers">Careers</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="si__fotter__two__text">
                <h6>GRIP Associates</h6>
                <ul>
                  <li>
                    <Link href="/membership-policies">Associate Policies</Link>
                  </li>
                  <li>
                    <Link href="/enquiry">Become a Associate</Link>
                  </li>
                  <li>
                    <Link href="/faq">FAQ</Link>
                  </li>
                  <li>
                    <Link href="/policies">GRIP Policies</Link>
                  </li>
                </ul>
                <h6>
                  <Link href="/franchising">GRIP Franchising</Link>
                </h6>
                <h6>
                  <Link href="/contact">Contact</Link>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <a
        href="https://play.google.com/store/apps/details?id=com.sanjaysn.grip&hl=en_IN"
        className="float-2"
        target="_blank"
        rel="noreferrer"
      >
        <img src="/assets/images/playstore.png" alt="Play Store" className="w-75" />
      </a>

      <a href="tel:9841012721" className="float-1" target="_blank" rel="noreferrer">
        <img src="/assets/images/grip/call.png" alt="Call" className="w-75" />
      </a>

      <a href="https://wa.me/919841012721" className="float" target="_blank" rel="noreferrer">
        <img
          src="/assets/images/grip/whatsapp.png"
          alt="WhatsApp"
          style={{ borderRadius: "21px" }}
          className="w-75"
        />
      </a>

      {/* Copyright */}
      <section className="si__copyright__area">
        <div className="container custom__container__two">
          <div className="row">
            <div className="col-lg-6">
              <div className="si__copyright__content">
                <p>© GRIP 2026 | All Rights Reserved</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="si__copyright__text">
                <ul>
                  <li>
                    <Link href="/terms">Terms &amp; Condition</Link>
                  </li>
                  <li>
                    <Link href="/privacy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Popup */}
      <div className="search-popup">
        <button className="close-search style-two">
          <i className="fa-sharp fa-light fa-xmark"></i>
        </button>
        <button className="close-search">
          <i className="fa-sharp fa-regular fa-up"></i>
        </button>
        <form method="post" action="#">
          <div className="form-group">
            <input
              type="search"
              name="search-field"
              placeholder="Search Here"
              required
            />
            <button type="submit">
              <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
