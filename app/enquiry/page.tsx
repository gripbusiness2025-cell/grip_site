import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Enquiry – GRIP India's 1st Digital Business Networking Forum",
  description: "Enquire about becoming a GRIP associate.",
};

const BACKEND_URL = process.env.NEXT_PUBLIC_PHP_BACKEND_URL || "https://gripforum.com";

export default function Enquiry() {
  return (
    <>
      <Header />
      <Breadcrumb title="Enquiry Us" />

      <div className="si__contact__area pb-120 pt-120">
        <div className="container">
          <div className="row">
            <div className="cl-lg-12">
              <div className="si__section__title pb-40">
                <h5>talk with US</h5>
                <h1 className="text-anime-style-3">
                  Unlocking potential the <br /> delivering results
                </h1>
              </div>
            </div>
            <div className="col-lg-8">
              <form action={`${BACKEND_URL}/insert.php`} method="post">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="si__contact__from">
                      <input
                        name="first_name"
                        type="text"
                        placeholder="First Name..."
                        required
                      />
                      <div className="si__contact__icontwo">
                        <a href="#">
                          <i className="fa-solid fa-user"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="si__contact__from">
                      <input
                        name="last_name"
                        type="text"
                        placeholder="Last Name..."
                        required
                      />
                      <div className="si__contact__icontwo">
                        <a href="#">
                          <i className="fa-solid fa-user"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="si__contact__from">
                      <input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        required
                      />
                      <div className="si__contact__icontwo">
                        <a href="#">
                          <i className="fa-sharp fa-solid fa-paper-plane"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="si__contact__from">
                      <input
                        name="phone"
                        type="text"
                        placeholder="Your Phone"
                        required
                      />
                      <div className="si__contact__icontwo">
                        <a href="#">
                          <i className="fa-sharp fa-solid fa-phone"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="si__contact__message">
                      <textarea
                        name="company_name"
                        placeholder="Write your company name..."
                        required
                      ></textarea>
                      <div className="si__contact__iconthree">
                        <a href="#">
                          <i className="fa-sharp fa-solid fa-envelope"></i>
                        </a>
                      </div>
                    </div>
                    <div className="si__contact__btn">
                      <button type="submit">Send message</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-4">
              <div
                className="si__contact__thumb wow fadeInUp animated"
                data-wow-delay=".75s"
              >
                <img src="/assets/images/grip/contanct.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
