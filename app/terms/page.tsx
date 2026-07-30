import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Terms & Conditions – GRIP India's 1st Digital Business Networking Forum",
  description: "GRIP Terms and Conditions – please read before using our platform.",
};

export default function Terms() {
  return (
    <>
      <Header />
      <Breadcrumb title="Terms and Conditions" />

      <section className="si__project__details__area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="si__project__details__content">
                <h3 className="text-anime-style-3">Terms and Conditions</h3>
                <p>
                  Welcome to GRIP – Global Referral Interacting Platform. By
                  accessing or using our website, you agree to comply with and be
                  bound by the following Terms and Conditions. Please read them
                  carefully before using our platform or services.
                </p>
              </div>

              <div
                className="si__project__details__text wow fadeInUp animated"
                data-wow-delay=".5s"
              >
                <h6>1. Acceptance of Terms</h6>
                <p>
                  By registering, accessing, or using any part of the GRIP
                  platform, you agree to comply with and be legally bound by these
                  Terms and Conditions. If you do not agree, please do not use our
                  platform.
                </p>

                <h6>2. Eligibility</h6>
                <p>
                  You must be at least 18 years old to access or use our services.
                  By using the platform, you confirm that you meet this
                  requirement.
                </p>

                <h6>3. Nature of Service</h6>
                <p>
                  GRIP is a digital business networking platform connecting
                  professionals across industries through structured referrals and
                  ethical collaborations. It is intended solely for lawful business
                  purposes.
                </p>

                <h6>4. User Responsibilities</h6>
                <ul>
                  <li>
                    You agree to provide accurate, complete, and current
                    information.
                  </li>
                  <li>
                    You agree not to engage in spamming, harassment, unethical, or
                    illegal activities.
                  </li>
                  <li>
                    You are solely responsible for your interactions with other
                    users.
                  </li>
                </ul>

                <h6>5. Code of Conduct</h6>
                <ul>
                  <li>Promote only legitimate and ethical businesses.</li>
                  <li>
                    Do not share political, religious, or offensive content.
                  </li>
                  <li>Respect the confidentiality of shared information.</li>
                </ul>

                <h6>6. Intellectual Property</h6>
                <p>
                  All content on this website is the property of GRIP or its
                  licensors and protected under intellectual property laws.
                  Unauthorized use is prohibited.
                </p>

                <h6>7. Privacy</h6>
                <p>
                  We value your privacy. Please refer to our{" "}
                  <Link href="/privacy">Privacy Policy</Link> to understand how we
                  handle your data.
                </p>

                <h6>8. Payments &amp; Associate</h6>
                <p>
                  Certain services on GRIP may be offered via paid associate. All
                  fees are non-refundable. We reserve the right to modify or
                  discontinue services without prior notice.
                </p>

                <h6>9. Termination</h6>
                <p>
                  GRIP may suspend or terminate your account for violations of our
                  terms or improper conduct.
                </p>

                <h6>10. Disclaimers</h6>
                <p>
                  GRIP does not guarantee specific business outcomes and is not
                  liable for any disputes, damages, or losses resulting from user
                  interactions.
                </p>

                <h6>11. Modifications</h6>
                <p>
                  We may revise these Terms at any time. Continued use of the
                  platform indicates your acceptance of the changes.
                </p>

                <h6>12. Contact</h6>
                <p>For any questions or concerns, feel free to contact us:</p>
                <ul>
                  <li>Email: care@gripforum.com</li>
                  <li>Phone: +91 8122229550</li>
                  <li>
                    Website:{" "}
                    <a
                      href="https://www.gripforum.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      www.gripforum.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
