import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubNav from "@/components/SubNav";

export const metadata: Metadata = {
  title: "GRIP App Policies – Privacy Policy & Terms",
  description: "GRIP app privacy policy, terms and conditions, and permission details.",
};

export default function Policies() {
  return (
    <>
      <Header />
      <SubNav />

      <section className="si__project__details__area py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="si__project__details__content mb-4">
                <h3 className="text-anime-style-3">
                  Privacy Policy &amp; Terms and Conditions
                </h3>
                <p>
                  Welcome to our app. Your privacy is important to us. This
                  document outlines how we handle your data and what permissions
                  are required to provide specific features. By using the app, you
                  agree to the terms outlined below.
                </p>
              </div>

              <div
                className="si__project__details__text wow fadeInUp animated"
                data-wow-delay=".5s"
              >
                <h5 className="mb-2">Contact Picker</h5>
                <ul>
                  <li>
                    This feature allows you to pick a contact from your
                    phone&apos;s contact list solely to pre-fill the referral form.
                  </li>
                  <li>This data is not stored on our servers.</li>
                  <li>It is not shared with third parties.</li>
                  <li>
                    Access to contacts is requested only when using this feature.
                  </li>
                  <li>Using this feature is entirely optional.</li>
                </ul>

                <h5 className="mt-4 mb-2">Camera Access</h5>
                <ul>
                  <li>
                    To capture a photo for One-To-One Slip verification and
                    documentation.
                  </li>
                  <li>
                    To scan QR codes during attendance marking at events.
                  </li>
                </ul>
                <strong>Key Points:</strong>
                <ul>
                  <li>
                    Camera access is only activated when you choose to use these
                    features.
                  </li>
                  <li>
                    Captured images or scanned data are not shared with third
                    parties.
                  </li>
                  <li>
                    Denying permission will disable QR scanning, but other
                    features remain usable.
                  </li>
                </ul>

                <h5 className="mt-4 mb-2">Location Access</h5>
                <ul>
                  <li>
                    Required to fetch your live location for accurate
                    meeting/event logging.
                  </li>
                  <li>Used to verify attendance at the event venue.</li>
                </ul>
                <strong>Important:</strong>
                <ul>
                  <li>
                    Location is only checked during attendance or meeting
                    logging.
                  </li>
                  <li>
                    We never share or track your location in the background.
                  </li>
                  <li>
                    Denying permission may prevent attendance marking but not
                    other features.
                  </li>
                </ul>

                <h5 className="mt-4 mb-2">File &amp; Document Upload</h5>
                <ul>
                  <li>
                    Used when submitting testimonial slips (images or PDFs).
                  </li>
                  <li>Requested only for verification and internal reference.</li>
                </ul>
                <strong>Details:</strong>
                <ul>
                  <li>Temporary access to file storage is requested.</li>
                  <li>Only user-selected files are accessed.</li>
                  <li>No scanning of other folders.</li>
                  <li>Files are never shared with third parties.</li>
                </ul>

                <h5 className="mt-4 mb-2">Notifications</h5>
                <ul>
                  <li>
                    Used to send meeting reminders and activity alerts to keep
                    you updated.
                  </li>
                  <li>You can manage notification preferences in the app settings.</li>
                </ul>
              </div>

              <div
                className="si__project__details__right wow fadeInUp animated mt-4"
                data-wow-delay=".5s"
              >
                <h6>Contact Us</h6>
                <p>
                  If you have any questions or concerns about this policy, please
                  contact us at{" "}
                  <a href="mailto:care@gripforum.com">care@gripforum.com</a>.
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
