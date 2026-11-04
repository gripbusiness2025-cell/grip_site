import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page Not Found – GRIP",
  robots: { index: false, follow: true },
};

/* Shown with a real 404 status for unknown URLs, zones, chapters and members. */
export default function NotFound() {
  return (
    <>
      <Header />
      <section style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div>
          <h1 style={{ fontSize: "6rem", fontWeight: 900, color: "#d23b3b", lineHeight: 1 }}>404</h1>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111", marginBottom: "12px" }}>Page Not Found</h2>
          <p style={{ color: "#666", marginBottom: "28px" }}>The page you are looking for does not exist.</p>
          <Link href="/" className="si__btn">Back to Home</Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
