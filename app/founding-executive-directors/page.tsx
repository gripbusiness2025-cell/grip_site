import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import SubNav from "@/components/SubNav";

export const metadata: Metadata = {
  title: "Founding Executive Directors – GRIP India's 1st Digital Business Networking Forum",
  description: "Meet the Founding Executive Directors of GRIP.",
};

const members = [
  {
    name: "K. Gajendran",
    title: "Founding Executive Director",
    image: "https://gripforum.com/assets/images/grip/f8.png",
    bio: [
      "A seasoned sales professional with over 20 years of proven success in driving revenue growth, building high-performing teams, and delivering strategic business outcomes across diverse industries. Known for a deep understanding of the sales lifecycle, from lead generation to closing complex deals, and for consistently exceeding targets through a customer-centric, consultative approach.",
    ],
    strengths: [
      { label: "Sales Strategy & Execution", text: "Extensive experience in B2B and enterprise sales, with a strong record of securing high-value deals and expanding market share." },
      { label: "Team Leadership & Mentorship", text: "Built and led sales teams with a focus on performance, accountability, and continuous learning." },
      { label: "Client Relationship Management", text: "Skilled in cultivating long-term relationships based on trust, value, and business insight." },
      { label: "Negotiation & Deal Closure", text: "Expertise in navigating complex negotiations and driving successful outcomes in competitive environments." },
      { label: "Sales Training & Enablement", text: "Passionate about sharing knowledge through mentoring and structured sales training programs that elevate team capabilities." },
    ],
    highlights: [
      "Achieved consistent top-performer recognition in regional and national sales roles.",
      "Played a key role in scaling sales operations and entering new markets.",
      "Developed and delivered sales workshops that improved conversion rates and team confidence.",
      "Built strong networks with key decision-makers, contributing to repeat business and long-term growth.",
    ],
  },
  {
    name: "K. Kirubakaran",
    title: "Founding Executive Director",
    image: "https://gripforum.com/assets/images/grip/f11.jpeg",
    bio: [
      "A values-driven professional with over 13 years of leadership experience, known for strategic thinking, process-oriented execution, and a strong focus on mentoring future leaders. Committed to fostering collaborative environments that support innovation, continuous learning, and inclusive growth.",
    ],
    strengths: [
      { label: "Strategic Leadership", text: "Experienced in aligning vision with execution through structured planning and stakeholder collaboration." },
      { label: "Mentorship and Development", text: "Passionate about guiding and upskilling emerging professionals through training and knowledge-sharing." },
      { label: "Process Orientation", text: "Focused on building efficient systems that drive clarity, accountability, and long-term impact." },
      { label: "Business Development", text: "Proven ability to identify new opportunities, open doors, and create value through strategic connections." },
      { label: "Collaborative Culture Building", text: "Encourages open communication and teamwork rooted in trust and shared goals." },
      { label: "Ethical and Inclusive Approach", text: "Leads with integrity and empathy, prioritizing ethical decision-making and collective growth." },
    ],
    highlights: [
      "Over a decade of experience in team leadership and capacity-building initiatives.",
      "Conducted numerous workshops and training programs for professionals at various stages.",
      "Contributed to fostering inclusive, growth-focused cultures within teams and organizations.",
      "Active participant in leadership and professional development forums.",
    ],
  },
  {
    name: "N. Mahalakshmi",
    title: "Founding Executive Director",
    image: "/assets/images/grip/mahalakshmi.jpeg",
    bio: [
      "N. Mahalakshmi plays a key role in expanding the organization's presence by building strategic partnerships and creating new business opportunities. With her extensive experience in business development and relationship management, she serves as a bridge between GRIP, entrepreneurs, investors, and business leaders.",
      "Her expertise lies in identifying growth opportunities, fostering meaningful business relationships, and supporting aspiring entrepreneurs in becoming successful franchise partners. Through her leadership and professional guidance, she contributes to strengthening the GRIP brand and expanding its reach across new markets.",
      "Committed to collaboration, innovation, and sustainable growth, she works towards creating a strong network of business leaders who share GRIP's vision of empowering businesses through trust-based networking and professional excellence.",
    ],
    strengths: [],
    specializations: [
      "Franchise Development & Expansion",
      "Strategic Partnerships",
      "Business Development",
      "Investor & Entrepreneur Relations",
      "Networking & Relationship Building",
      "Market Growth Strategies",
      "Business Community Development"
    ],
    motto: `"Creating Opportunities • Building Partnerships • Driving Growth"`,
    highlights: [],
  },
];

export default function FoundingExecutiveDirectors() {
  return (
    <>
      <Header />
      <Breadcrumb title="Founding Executive Directors" />
      <SubNav pt="pt-60" />

      {/* ── Section Header ── */}
      <section className="si__our__team__area pt-60 pb-40">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center pb-20">
              <h1 className="text-anime-style-3">Founding Executive Directors</h1>
              <p style={{ maxWidth: 680, margin: "0 auto", color: "#555", fontSize: "17px", lineHeight: "1.7" }}>
                The visionary leaders who laid the foundation of GRIP and continue to shape its growth across India and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Member Cards ── */}
      {members.map((member, idx) => (
        <div key={member.name} className={`pb-80 ${idx === 0 ? "pt-20" : "pt-0"}`}>
          <div className="container">
            <div className={`row align-items-start g-5 bg-light rounded-4 p-md-5 p-4 ${idx % 2 === 1 ? "flex-lg-row-reverse" : ""}`}>

              {/* ── Photo ── */}
              <div className="col-lg-4 text-center">
                <img
                  src={member.image}
                  alt={`${member.name} – ${member.title}`}
                  style={{
                    width: "100%",
                    maxWidth: "340px",
                    borderRadius: "20px",
                    boxShadow: "0 12px 40px rgba(0,0,0,.15)",
                    objectFit: "cover",
                    aspectRatio: "3/4",
                  }}
                />
              </div>

              {/* ── Text ── */}
              <div className="col-lg-8">
                <h3 style={{ fontSize: "22px", color: "#d23b3b", marginBottom: "4px" }}>
                  {member.name}
                </h3>
                <p style={{ fontSize: "14px", color: "#777", marginBottom: "20px", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                  {member.title}
                </p>

                {member.bio.map((para, i) => (
                  <p key={i} style={{ color: "#444", lineHeight: "1.75", marginBottom: "16px" }}>{para}</p>
                ))}

                {member.strengths && member.strengths.length > 0 && (
                  <>
                    <p style={{ fontWeight: 700, color: "#222", marginBottom: "10px", marginTop: "8px" }}>Key Strengths</p>
                    <ul style={{ paddingLeft: "0", listStyle: "none", marginBottom: "16px" }}>
                      {member.strengths.map((s) => (
                        <li key={s.label} style={{ marginBottom: "8px", color: "#444", lineHeight: "1.65" }}>
                          <span style={{ fontWeight: 600, color: "#222" }}>{s.label}:</span>{" "}{s.text}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {(member as any).specializations && (member as any).specializations.length > 0 && (
                  <>
                    <p style={{ fontWeight: 700, color: "#222", marginBottom: "10px", marginTop: "8px" }}>Key Specializations</p>
                    <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
                      {(member as any).specializations.map((s: string, i: number) => (
                        <li key={i} style={{ marginBottom: "8px", color: "#444", lineHeight: "1.65" }}>{s}</li>
                      ))}
                    </ul>
                  </>
                )}

                {(member as any).motto && (
                  <>
                    <p style={{ fontWeight: 700, color: "#222", marginBottom: "10px", marginTop: "8px" }}>Motto</p>
                    <p style={{ fontStyle: "italic", color: "#444", lineHeight: "1.65", marginBottom: "16px", fontSize: "16px" }}>{(member as any).motto}</p>
                  </>
                )}

                {member.highlights && member.highlights.length > 0 && (
                  <>
                    <p style={{ fontWeight: 700, color: "#222", marginBottom: "10px" }}>Career Highlights</p>
                    <ul style={{ paddingLeft: "20px", marginBottom: "0" }}>
                      {member.highlights.map((h, i) => (
                        <li key={i} style={{ marginBottom: "6px", color: "#444", lineHeight: "1.65" }}>{h}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      ))}

      <Footer />
    </>
  );
}
