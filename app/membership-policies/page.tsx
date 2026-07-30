import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Associate Policies – GRIP India's 1st Digital Business Networking Forum",
  description: "GRIP Policies and Guidelines for Associates.",
};

export default function MembershipPolicies() {
  return (
    <>
      <Header />
      <Breadcrumb title="Associate Policies" />

      <section className="si__project__details__area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="si__project__details__content">
                <h3 className="text-anime-style-3">
                  GRIP Policies and Guidelines for Associates
                </h3>
                <p>
                  GRIP Policies and Guidelines for Associates are designed to
                  maintain professionalism, commitment, and integrity within the
                  network.
                  <br />
                  The Associate Committees oversee the enforcement of these
                  guidelines and are authorized to address violations, including
                  placing associates on probation or terminating associate.
                </p>
              </div>

              <div
                className="si__project__details__text wow fadeInUp animated"
                data-wow-delay=".5s"
              >
                <p>
                  These rules ensure all GRIP associates uphold the standards that
                  contribute to a respectful, reliable, and result-driven networking
                  environment.
                </p>
                <span>
                  <i className="fa-solid fa-check"></i>{" "}
                  <strong>Attendance:</strong> Associates are allowed up to three
                  absences. A fourth absence results in automatic termination.
                </span>
                <span>
                  <i className="fa-solid fa-check"></i>{" "}
                  <strong>Medical Emergency:</strong> A valid doctor&apos;s prescription
                  must be submitted to the leadership team to excuse an absence.
                </span>
                <span>
                  <i className="fa-solid fa-check"></i>{" "}
                  <strong>Dress Code:</strong> Business Attire/Suit, formal shoes,
                  GRIP pin, and associate batch are mandatory at all meetings.
                </span>
              </div>

              <div
                className="si__project__details__right wow fadeInUp animated"
                data-wow-delay=".5s"
              >
                <h6>Committed to Standards, Connected by Values</h6>
                <p>
                  The GRIP Policies and Guidelines for Associates set the foundation
                  for trust and cooperation. Every associate plays a key role in
                  upholding the community&apos;s values and ensuring its ongoing success.
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
