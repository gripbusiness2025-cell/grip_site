import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubNav from "@/components/SubNav";

export const metadata: Metadata = {
  title: "GRIP Founders – Meet the Visionaries Behind Global Referral Interacting Platform",
  description:
    "Meet R. Pratheep Gandhi, Founder & CEO of GRIP – a peak performance business coach and life strategist driving ethical collaboration, innovation, and professional growth.",
};

export default function Founders() {
  return (
    <>
      <Header />
      <SubNav />

      <div className="pt-60">
        <div className="container">
          <h2>
            <span style={{ color: "#d23b3b" }}>GRIP Founders</span>
          </h2>
        </div>
      </div>

      {/* Founder 1 - Pratheep Gandhi */}
      <div className="pt-30 pb-80">
        <div className="container">
          <div className="row align-items-center g-5 bg-light rounded-4 p-md-5 p-4">

            {/* ── Text ── */}
            <div className="col-lg-7">
              <div className="ceo-info">
                <h3 className="ceo-name" style={{ fontSize: "22px", color: "#d23b3b" }}>
                  R. PRATHEEP GANDHI
                </h3>
                <p className="ceo-title" style={{ fontSize: "14px", color: "#777", marginBottom: "25px" }}>
                  FOUNDER &amp; CEO
                </p>
                <div className="ceo-bio">
                  <p>
                    <strong style={{ color: "#333" }}>Business Coach and Life Strategist</strong>{" "}
                    Pratheep Gandhi is a peak performance business coach and life
                    strategist serving leading business owners and celebrity
                    entrepreneurs to grow their impact and realise their biggest
                    personal and professional goals.
                  </p>
                  <p>
                    He&apos;s known for bringing about unparalleled transformations for
                    his most discerning clients through his private one on one,
                    business and life coaching.
                  </p>
                  <p>
                    <strong style={{ color: "#333" }}>Exceeding Extraordinary</strong>{" "}
                    Gandhi is committed to powering extraordinary growth and helping
                    you lead a more purposeful, passionate and fulfilling life.
                  </p>
                  <p>
                    <strong style={{ color: "#333" }}>Inspiring greatness</strong>{" "}
                    Inspire the greatness within. Find your greatest expression in
                    business and life with Gandhi as your trusted advisor.
                  </p>
                  <p>
                    <strong style={{ color: "#333" }}>Clarity</strong> Identify your
                    unique vision and goals to create a customised strategy blueprint
                    designed for you, your team and your business.
                  </p>
                  <p>
                    <strong style={{ color: "#333" }}>Strategy</strong> Embody the
                    psychology of the top 1% to achieve exponential productivity and
                    create breakthroughs in sales, leadership and culture.
                  </p>
                  <p>
                    <strong style={{ color: "#333" }}>Execution</strong> Maximise
                    your potential and grow exponentially with dedicated support and
                    consistent guidance from your coach at each step of the way.
                  </p>
                </div>
              </div>
              <div className="si__our__team__social" style={{ marginTop: "20px" }}>
                <a href="https://www.facebook.com/thanjai.gandhi" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="https://www.instagram.com/thanjaigandhi100/" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/in/pratheep-gandhi-0133b21b1/" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </div>
            </div>

            {/* ── Photo ── */}
            <div className="col-lg-5 text-center">
              <img
                src="https://res.cloudinary.com/dq6gr5zjc/image/upload/v1784264224/grip_founders_ra0aql.jpg"
                alt="R. Pratheep Gandhi – Founder & CEO, GRIP"
                fetchPriority="high"
                style={{ width: "100%", maxWidth: "420px", borderRadius: "20px", boxShadow: "0 12px 40px rgba(0,0,0,.18)", objectFit: "cover" }}
              />
            </div>

          </div>
        </div>
      </div>


      <Footer />
    </>
  );
}
