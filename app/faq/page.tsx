import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "FAQ – GRIP India's 1st Digital Business Networking Forum",
  description: "Frequently asked questions about GRIP networking platform.",
};

const faqs = [
  {
    num: "01",
    question: "What is GRIP and how does it work?",
    answer:
      "GRIP is India's first paperless, digital referral networking platform that connects professionals across industries through structured meetings and a powerful mobile app.",
  },
  {
    num: "02",
    question: "How can I benefit from joining a GRIP chapter?",
    answer:
      "Associates receive structured support, mentoring, digital tools, and networking opportunities that help boost business growth and professional visibility.",
  },
  {
    num: "03",
    question: "What is the role of the GRIP mobile app?",
    answer:
      "The GRIP app enables associates to log weekly activities, track referrals, send thank-you notes, monitor attendance, and access business data—all digitally.",
  },
  {
    num: "04",
    question: "Are trainings and mentorships available?",
    answer:
      "Yes. GRIP offers regular offline training sessions and provides each chapter with a mentor to guide associates in achieving their business goals.",
  },
  {
    num: "05",
    question: "Do I need to maintain paperwork or reports?",
    answer:
      "No manual work is needed. All associate activities, attendance, and reports are managed digitally through our app, ensuring efficiency and ease.",
  },
];

export default function FAQ() {
  return (
    <>
      <Header />
      <Breadcrumb title="FAQ" />

      <section className="si__faq__are pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 wow fadeInUp animated" data-wow-delay="1s">
              <div className="si__faq__accordion m-0">
                <ul className="my-accordion">
                  {faqs.map((faq) => (
                    <li key={faq.num}>
                      <div className="accordion__number">
                        <span>{faq.num}</span>
                      </div>
                      <div className="accordion__content">
                        <h2>{faq.question}</h2>
                        <p>{faq.answer}</p>
                      </div>
                    </li>
                  ))}
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
