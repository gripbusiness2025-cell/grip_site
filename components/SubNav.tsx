"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const subNavLinks = [
  { href: "/about", label: "About GRIP" },
  { href: "/founders", label: "Founders" },
  { href: "/founding-executive-directors", label: "Founding Executive Directors" },
  { href: "/careers", label: "Careers" },
  { href: "/policies", label: "Policies" },
];

interface SubNavProps {
  pt?: string;
}

export default function SubNav({ pt = "pt-120" }: SubNavProps) {
  const pathname = usePathname();

  return (
    <>
      <div className={`container ${pt}`}>
        <nav className="main-nav">
          <ul>
            {subNavLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={pathname === link.href ? "active" : ""}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <style>{`
        .main-nav {
          background-color: #666;
          border-radius: 25px;
          margin: 15px auto;
          position: relative;
        }
        .main-nav ul {
          display: flex;
          justify-content: space-around;
          list-style: none;
          padding: 8px 10px;
          margin: 0;
        }
        .main-nav li {
          list-style: none;
        }
        .main-nav a {
          color: white;
          text-decoration: none;
          padding: 8px 14px;
          font-size: 14px;
          font-weight: 500;
          border-radius: 32px;
          display: inline-block;
          transition: background-color 0.2s;
        }
        .main-nav a.active {
          background-color: #d23b3b;
        }
        .main-nav a:hover {
          background-color: #d23b3b;
        }
        @media (max-width: 768px) {
          .main-nav ul {
            flex-wrap: wrap;
            gap: 8px;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}
