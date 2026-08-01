"use client";

import { useEffect, useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_PHP_BACKEND_URL || "https://gripforum.com";

interface Associate {
  id: number;
  name: string;
  sub_category: string;
  business_name: string;
  email: string;
  website_link: string;
  photo: string;
  category: string;
}

interface AssociateGroups {
  head_team: Associate[];
  visitor_interaction_team: Associate[];
  members: Associate[];
}

function TeamCard({ member }: { member: Associate }) {
  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="si__our__team">
        <div className="si__our__team__thumb">
          <img
            src={`${BACKEND_URL}/application/uploads/${member.photo}`}
            alt={member.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/assets/images/logo/gripbg.png";
            }}
          />
        </div>
        <div className="team-info-box">
          <h5 className="team-name">{member.name}</h5>
          {member.sub_category && (
            <div className="info-block category-block">
              <i className="fas fa-user-tie"></i>
              <span>{member.sub_category}</span>
            </div>
          )}
          {member.business_name && (
            <div className="info-block desc-block">
              <i className="fas fa-briefcase"></i>
              <span>{member.business_name}</span>
            </div>
          )}
          {member.email && (
            <div className="info-block contact-block">
              <a href={`mailto:${member.email}`}>
                <i className="fas fa-envelope"></i> {member.email}
              </a>
            </div>
          )}
          {member.website_link && (
            <div className="info-block web-block">
              <i className="fas fa-globe"></i>
              <a href={member.website_link} target="_blank" rel="noreferrer">
                {member.website_link}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AramAssociates() {
  const [data, setData] = useState<AssociateGroups | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/associates.php`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError(
          "Unable to load associate data. Please visit the page directly or contact the administrator."
        );
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="si__our__team__area pt-120 pb-120">
        <div className="container text-center">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading associates...</p>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="si__our__team__area pt-120 pb-120">
        <div className="container">
          <div className="alert alert-info text-center">
            <p>{error || "No data available."}</p>
            <a
              href={`${BACKEND_URL}/chapter_aram_associates.php`}
              target="_blank"
              rel="noreferrer"
              className="si__btn mt-15 d-inline-block"
            >
              View Associates on GRIP Website
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <style>{`
        .si__our__team {
          background: #ffffff;
          border-radius: 18px;
          overflow: hidden;
          transition: 0.3s ease-in-out;
          border: 2px solid #e8e8e8;
          box-shadow: 0px 6px 20px rgba(0,0,0,0.08);
        }
        .si__our__team:hover { transform: translateY(-8px); box-shadow: 0 12px 30px rgba(0,0,0,0.15); }
        .si__our__team__thumb { width: 100%; height: 200px; overflow: hidden; border-bottom: 2px solid #eee; }
        .si__our__team__thumb img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
        .team-info-box { padding: 16px; }
        .team-name { text-transform: uppercase; font-weight: 700; font-size: 15px; color: #111; margin-bottom: 10px; }
        .info-block { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; font-size: 13px; color: #333; }
        .info-block i { font-size: 14px; color: #555; min-width: 18px; }
        .category-block span { font-weight: 600; color: #C0392B; }
        .contact-block a, .web-block a { color: #BD2811; font-weight: 600; text-decoration: none; word-break: break-all; }
        .aram { font-size: 24px; font-weight: 700; margin-bottom: 25px; color: #C0392B; text-transform: uppercase; letter-spacing: 1px; border-left: 6px solid #c1272d; padding-left: 15px; }
      `}</style>

      <section className="si__our__team__area pt-120 pb-120">
        <div className="container">
          {data.head_team?.length > 0 && (
            <>
              <h1 className="aram">Head Team</h1>
              <div className="row">
                {data.head_team.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
              <br />
              <br />
            </>
          )}

          {data.visitor_interaction_team?.length > 0 && (
            <>
              <h1 className="aram">Visitor Interaction Team</h1>
              <div className="row">
                {data.visitor_interaction_team.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
              <br />
              <br />
            </>
          )}

          {data.members?.length > 0 && (
            <>
              <h1 className="aram">Associates</h1>
              <div className="row">
                {data.members.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
