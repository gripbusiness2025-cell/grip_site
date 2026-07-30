import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import SubNav from "@/components/SubNav";

export const metadata: Metadata = {
  title: "Head – Legal & Training – GRIP India's 1st Digital Business Networking Forum",
  description: "GRIP Head of Legal and Training – leadership driving compliance and learning.",
};

export default function HeadLegalTraining() {
  return (
    <>
      <Header />
      <Breadcrumb title="Head – Legal & Training" />
      <SubNav pt="pt-60" />

      <section className="si__our__team__area pt-60 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center pb-40">
              <h1 className="text-anime-style-3">Head – Legal &amp; Training</h1>
              <p>
                Our legal and training leadership ensures every GRIP associate
                operates with full integrity, knowledge, and compliance.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div
                style={{
                  background: "#f5f5f5",
                  borderRadius: "12px",
                  padding: "40px",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: "16px", color: "#666" }}>
                  This section is managed through the GRIP admin system. Please
                  visit the main website for the full profile.
                </p>
                <a
                  href="https://gripforum.com/grip_head_legal_training.php"
                  target="_blank"
                  rel="noreferrer"
                  className="si__btn mt-15 d-inline-block"
                >
                  View on GRIP Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
