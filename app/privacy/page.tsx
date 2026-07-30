import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Privacy Policy & Terms – GRIP India's 1st Digital Business Networking Forum",
  description:
    "GRIP Privacy Policy & Terms and Conditions – learn how we handle your data and what permissions are required to provide specific features.",
};

export default function Privacy() {
  return (
    <>
      <Header />
      <Breadcrumb title="Privacy Policy" />

      <section className="si__project__details__area pb-80">
        <div className="container">

          {/* Page title */}
          <div className="si__project__details__content mb-40">
            <h3 className="text-anime-style-3">
              <i className="fa-solid fa-shield-halved" style={{ color: "#c1272d", marginRight: "12px" }} />
              Privacy Policy &amp; Terms and Conditions
            </h3>
            <p style={{ maxWidth: "780px", lineHeight: 1.8 }}>
              Welcome to our app. Your privacy is important to us. This document outlines how we handle
              your data and what permissions are required to provide specific features. By using the app,
              you agree to the terms outlined below.
            </p>
          </div>

          <div className="row g-4">

            {/* Contact Picker */}
            <div className="col-lg-6">
              <div className="privacy-card" style={{ borderTopColor: "#4f6ef7" }}>
                <div className="privacy-card-head">
                  <span className="privacy-icon" style={{ background: "#4f6ef718" }}>
                    <i className="fa-solid fa-address-book" style={{ color: "#4f6ef7" }} />
                  </span>
                  <h5>Contact Picker</h5>
                </div>
                <p>This feature allows you to pick a contact from your phone&apos;s contact list solely to pre-fill the referral form.</p>
                <ul>
                  <li>This data is not stored on our servers.</li>
                  <li>It is not shared with third parties.</li>
                  <li>Access to contacts is requested only when using this feature.</li>
                  <li>Using this feature is entirely optional.</li>
                </ul>
              </div>
            </div>

            {/* Camera Access */}
            <div className="col-lg-6">
              <div className="privacy-card" style={{ borderTopColor: "#e67e22" }}>
                <div className="privacy-card-head">
                  <span className="privacy-icon" style={{ background: "#e67e2218" }}>
                    <i className="fa-solid fa-camera" style={{ color: "#e67e22" }} />
                  </span>
                  <h5>Camera Access</h5>
                </div>
                <ul>
                  <li>To capture a photo for One-To-One Slip verification and documentation.</li>
                  <li>To scan QR codes during attendance marking at events.</li>
                </ul>
                <p><strong>Key Points:</strong></p>
                <ul>
                  <li>Camera access is only activated when you choose to use these features.</li>
                  <li>Captured images or scanned data are not shared with third parties.</li>
                  <li>Denying permission will disable QR scanning, but other features remain usable.</li>
                </ul>
              </div>
            </div>

            {/* Location Access */}
            <div className="col-lg-6">
              <div className="privacy-card" style={{ borderTopColor: "#27ae60" }}>
                <div className="privacy-card-head">
                  <span className="privacy-icon" style={{ background: "#27ae6018" }}>
                    <i className="fa-solid fa-location-dot" style={{ color: "#27ae60" }} />
                  </span>
                  <h5>Location Access</h5>
                </div>
                <ul>
                  <li>Required to fetch your live location for accurate meeting/event logging.</li>
                  <li>Used to verify attendance at the event venue.</li>
                </ul>
                <p><strong>Important:</strong></p>
                <ul>
                  <li>Location is only checked during attendance or meeting logging.</li>
                  <li>We never share or track your location in the background.</li>
                  <li>Denying permission may prevent attendance marking but not other features.</li>
                </ul>
              </div>
            </div>

            {/* File & Document Upload */}
            <div className="col-lg-6">
              <div className="privacy-card" style={{ borderTopColor: "#8e44ad" }}>
                <div className="privacy-card-head">
                  <span className="privacy-icon" style={{ background: "#8e44ad18" }}>
                    <i className="fa-solid fa-file-arrow-up" style={{ color: "#8e44ad" }} />
                  </span>
                  <h5>File &amp; Document Upload</h5>
                </div>
                <ul>
                  <li>Used when submitting testimonial slips (images or PDFs).</li>
                  <li>Requested only for verification and internal reference.</li>
                </ul>
                <p><strong>Details:</strong></p>
                <ul>
                  <li>Temporary access to file storage is requested.</li>
                  <li>Only user-selected files are accessed.</li>
                  <li>No scanning of other folders.</li>
                  <li>Files are never shared with third parties.</li>
                </ul>
              </div>
            </div>

            {/* Notifications */}
            <div className="col-lg-6">
              <div className="privacy-card" style={{ borderTopColor: "#c1272d" }}>
                <div className="privacy-card-head">
                  <span className="privacy-icon" style={{ background: "#c1272d18" }}>
                    <i className="fa-solid fa-bell" style={{ color: "#c1272d" }} />
                  </span>
                  <h5>Notifications</h5>
                </div>
                <ul>
                  <li>Used to send meeting reminders and activity alerts to keep you updated.</li>
                  <li>You can manage notification preferences in the app settings.</li>
                </ul>
              </div>
            </div>

            {/* Data Deletion */}
            <div className="col-lg-6">
              <div className="privacy-card" style={{ borderTopColor: "#e74c3c" }}>
                <div className="privacy-card-head">
                  <span className="privacy-icon" style={{ background: "#e74c3c18" }}>
                    <i className="fa-solid fa-trash-can" style={{ color: "#e74c3c" }} />
                  </span>
                  <h5>Data Deletion</h5>
                </div>
                <p>
                  Users may request the deletion of their personal data (if stored) by contacting support.
                </p>
                <ul>
                  <li>
                    Contact Number:{" "}
                    <a href="tel:+919841012721" style={{ color: "#c1272d", fontWeight: 600 }}>
                      +91 98410 12721
                    </a>
                  </li>
                  <li>
                    Email:{" "}
                    <a href="mailto:care@gripforum.com" style={{ color: "#c1272d", fontWeight: 600 }}>
                      care@gripforum.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Us */}
            <div className="col-lg-6">
              <div className="privacy-card" style={{ borderTopColor: "#2980b9" }}>
                <div className="privacy-card-head">
                  <span className="privacy-icon" style={{ background: "#2980b918" }}>
                    <i className="fa-solid fa-envelope" style={{ color: "#2980b9" }} />
                  </span>
                  <h5>Contact Us</h5>
                </div>
                <p>
                  If you have any questions or concerns about this policy, please contact us at{" "}
                  <a href="mailto:care@gripforum.com" style={{ color: "#c1272d", fontWeight: 600 }}>
                    care@gripforum.com
                  </a>.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        .privacy-card {
          background: #fff;
          border: 1px solid #eee;
          border-top: 3px solid #c1272d;
          border-radius: 12px;
          padding: 24px;
          height: 100%;
          box-shadow: 0 2px 16px rgba(0,0,0,.05);
        }
        .privacy-card-head {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .privacy-card-head h5 {
          margin: 0;
          font-size: 17px;
          font-weight: 700;
          color: #111;
        }
        .privacy-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 18px;
        }
        .privacy-card p {
          font-size: 14px;
          color: #444;
          line-height: 1.8;
          margin-bottom: 8px;
        }
        .privacy-card ul {
          padding-left: 18px;
          margin-bottom: 8px;
        }
        .privacy-card ul li {
          font-size: 14px;
          color: #444;
          line-height: 1.8;
        }
      `}</style>

      <Footer />
    </>
  );
}
