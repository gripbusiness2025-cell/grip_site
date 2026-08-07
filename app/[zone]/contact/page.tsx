"use client";

import { useEffect, useState, use } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

const PROD_API   = "https://api.gripforum.com/api";
const BACKEND_URL = process.env.NEXT_PUBLIC_PHP_BACKEND_URL || "https://api.gripforum.com";

const slugify = (s: string) =>
  (s || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

interface Props {
  params: Promise<{ zone: string }>;
}

export default function ZoneContactPage({ params }: Props) {
  const { zone: zoneSlug } = use(params);
  
  const [edDetails, setEdDetails] = useState<{
    name: string;
    phone: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchED() {
      setLoading(true);
      for (const base of [PROD_API]) {
        try {
          const res = await fetch(`${base}/admin/zones/list/public`, { cache: "no-store" });
          if (!res.ok) continue;
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            const matchedZone = json.data.find(
              (z: any) => slugify(z.zoneName) === zoneSlug
            );
            if (matchedZone) {
              setEdDetails({
                name: matchedZone.name || "",
                phone: matchedZone.mobileNumber || "",
                email: matchedZone.email || "",
              });
              setLoading(false);
              return;
            }
          }
        } catch (e) {
          // try next
        }
      }
      setEdDetails(null);
      setLoading(false);
    }
    fetchED();
  }, [zoneSlug]);

  return (
    <>
      <Header menuType="zone" zoneSlug={zoneSlug} />
      <Breadcrumb title="Contact" />

      {/* Contact Info */}
      <div className="si__contact__area pt-120 pb-40">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="si__contact__mine">
                {/* Chapter Mentor Name & Phone */}
                <div className="si__contact__box">
                  <div className="si__contact__box__inner">
                    <div className="si__contact__icon">
                      <i className="fa-solid fa-user-tie" style={{ fontSize: "24px", color: "#DF2E2E" }} />
                    </div>
                    <div className="si__contact__number">
                      <span>Chapter Mentor</span>
                      <h6>Ms. Priyadharshini</h6>
                      <a href="tel:+919841012721">+91 98410 12721</a>
                    </div>
                  </div>
                </div>

                {/* Executive Director Name */}
                <div className="si__contact__box">
                  <div className="si__contact__box__inner">
                    <div className="si__contact__icon">
                      <i className="fa-solid fa-user-gear" style={{ fontSize: "24px", color: "#DF2E2E" }} />
                    </div>
                    <div className="si__contact__number">
                      <span>Executive Director</span>
                      <h6>
                        {loading ? (
                          <span className="shimmer-placeholder" style={{ display: 'inline-block', width: '120px', height: '16px', background: '#e0e0e0', borderRadius: '4px' }} />
                        ) : (
                          edDetails?.name || "Gandhi"
                        )}
                      </h6>
                    </div>
                  </div>
                </div>

                {/* ED Phone */}
                <div className="si__contact__box">
                  <div className="si__contact__box__inner">
                    <div className="si__contact__icon">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 43 43"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M30.7037 22.1564C30.3045 22.1564 29.9828 21.8335 29.9828 21.4344C29.9875 16.7981 26.2438 13.0174 21.5646 13.0174C21.1667 13.0174 20.8438 12.6945 20.8438 12.2965C20.8438 11.9069 21.1547 11.5745 21.5742 11.5745C26.9897 11.5745 31.4305 15.9569 31.4257 21.4356C31.4245 21.8347 31.1016 22.1564 30.7037 22.1564Z"
                          fill="#DF2E2E"
                        />
                        <path
                          d="M32.1017 42.5C31.4952 42.5 29.7043 42.3796 26.9173 41.1857C21.671 38.9385 16.5701 34.5239 12.6011 30.3988C9.72118 27.6273 7.29522 24.882 5.39116 22.2404C3.85527 20.11 2.65183 18.0379 1.81418 16.0826C0.436775 12.869 0.489202 10.9793 0.504692 10.704C0.58929 6.49673 2.79362 3.195 6.33366 1.05383C8.06852 0.00408766 10.3253 0.487849 11.4703 2.15599L15.8528 8.53663C16.3902 9.31947 16.6166 10.2691 16.4903 11.2104C16.364 12.1517 15.8945 13.0073 15.1689 13.6209L13.7688 14.8041C14.4742 19.2652 23.7348 28.5257 28.1804 29.2287L29.379 27.8311C30.6444 26.3321 32.8428 26.0354 34.4633 27.1471L40.8439 31.5296C42.5121 32.6746 42.9958 34.9314 41.9461 36.6663C39.5726 40.5852 36.0171 42.5 32.1017 42.5Z"
                          fill="#DF2E2E"
                        />
                      </svg>
                    </div>
                    <div className="si__contact__number">
                      <span>ED Contact</span>
                      <h6>
                        {loading ? (
                          <span className="shimmer-placeholder" style={{ display: 'inline-block', width: '120px', height: '16px', background: '#e0e0e0', borderRadius: '4px' }} />
                        ) : edDetails?.phone ? (
                          <a href={`tel:${edDetails.phone}`}>{edDetails.phone}</a>
                        ) : (
                          <a href="tel:9551205555">9551205555</a>
                        )}
                      </h6>
                    </div>
                  </div>
                </div>

                {/* ED Email */}
                <div className="si__contact__box">
                  <div className="si__contact__box__inner">
                    <div className="si__contact__icon">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 45 45"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.14056 21.5377L16.5649 31.304L3.14056 41.0703V21.5377ZM4.84214 41.8612L22.4991 29.0156L40.1561 41.8612H4.84214ZM41.8577 41.0703L28.4334 31.304L41.8577 21.5377V41.0703Z"
                          fill="#DF2E2E"
                        />
                        <path
                          d="M43.4974 19.9265C43.4975 19.759 43.4474 19.5899 43.3413 19.4441L40.3873 16.8318C40.9972 16.3407 41.3885 15.5885 41.3885 14.7462V13.4001C41.3885 9.78171 38.4447 6.83789 34.8263 6.83789C31.2079 6.83789 28.2641 9.78171 28.2641 13.4001C28.2641 17.0185 31.2079 19.9623 34.8263 19.9623C35.2793 19.9623 35.6466 19.5951 35.6466 19.1421C35.6466 18.689 35.2793 18.3218 34.8263 18.3218C32.1125 18.3218 29.9046 16.1139 29.9046 13.4001C29.9046 10.6863 32.1125 8.47845 34.8263 8.47845C37.5401 8.47845 39.748 10.6863 39.748 13.4001V14.7462C39.748 15.3179 39.2829 15.783 38.711 15.783C38.1393 15.783 37.6742 15.3179 37.6742 14.7462V11.2544C37.5814 10.8133 37.4175 10.6583 36.7138 9.99317C36.0101 9.32801 35.7936 9.62684 34.8263 9.62684C32.7457 9.62684 31.053 11.3196 31.053 13.4001C31.053 15.4807 32.7457 17.1734 34.8263 17.1734C35.5302 17.1734 36.2089 16.9785 36.7977 16.6164C37.2684 17.0979 37.9187 17.4026 38.6391 17.4218L41.3649 19.8675L34.8033 24.6411V22.5027C34.8033 22.0496 34.4361 21.6824 33.983 21.6824C33.53 21.6824 33.1628 22.0496 33.1628 22.5027V25.8346L27.039 30.2897L22.9817 27.338C22.694 27.1286 22.3042 27.1286 22.0166 27.338L17.9592 30.2897L3.66898 19.8934L8.33661 15.8085C8.67752 15.5101 8.71197 14.9919 8.41364 14.651C8.11522 14.3101 7.59705 14.2756 7.25614 14.5739L1.80252 19.2905C1.61755 19.4418 1.5 19.6704 1.5 19.9266V42.6814C1.5 43.1345 1.86724 43.5017 2.32028 43.5017H42.678C43.131 43.5017 43.4983 43.1345 43.4983 42.6814V19.9266L43.4974 19.9265Z"
                          fill="#DF2E2E"
                        />
                      </svg>
                    </div>
                    <div className="si__contact__number">
                      <span>ED Email</span>
                      <h6>
                        {loading ? (
                          <span className="shimmer-placeholder" style={{ display: 'inline-block', width: '120px', height: '16px', background: '#e0e0e0', borderRadius: '4px' }} />
                        ) : edDetails?.email ? (
                          <a href={`mailto:${edDetails.email}`}>{edDetails.email}</a>
                        ) : (
                          <a href="mailto:altronindia@gmail.com">altronindia@gmail.com</a>
                        )}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="si__contact__area pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
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
                className="si__contact__thumb"
              >
                <img src="/assets/images/grip/contanct.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        .si__contact__mine {
          display: grid !important;
          grid-template-columns: repeat(4, 1fr) !important;
          gap: 20px !important;
        }
        @media (max-width: 1200px) {
          .si__contact__mine {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .si__contact__mine {
            grid-template-columns: 1fr !important;
          }
        }

        .si__contact__box {
          width: 100% !important;
          padding: 24px 20px !important;
          margin: 0 !important;
          box-sizing: border-box !important;
          border-radius: 18px !important;
          display: flex !important;
          align-items: center !important;
          min-height: 110px !important;
          background: #fff !important;
          box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06) !important;
        }

        .si__contact__box__inner {
          display: flex !important;
          align-items: center !important;
          gap: 16px !important;
          width: 100% !important;
        }

        .si__contact__icon {
          width: 64px !important;
          height: 64px !important;
          min-width: 64px !important;
          min-height: 64px !important;
          line-height: 64px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          border-radius: 16px !important;
          border: 1px solid #DF2E2E !important;
          flex-shrink: 0 !important;
        }

        .si__contact__number {
          margin-left: 0 !important;
          flex: 1 !important;
          min-width: 0 !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
        }

        .si__contact__number span {
          position: static !important;
          top: 0 !important;
          font-size: 13px !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.3px !important;
          color: #555 !important;
          margin-bottom: 3px !important;
          display: block !important;
          line-height: 1.2 !important;
        }

        .si__contact__number h6 {
          position: static !important;
          top: 0 !important;
          font-size: 14px !important;
          font-weight: 700 !important;
          color: #111 !important;
          margin: 0 !important;
          line-height: 1.3 !important;
          word-break: break-word !important;
        }

        .si__contact__number a {
          color: #DF2E2E !important;
          text-decoration: none !important;
          font-weight: 600 !important;
          word-break: break-all !important;
        }

        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: 200px 0; }
        }
        .shimmer-placeholder {
          background: linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%);
          background-size: 200px 100%;
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </>
  );
}
