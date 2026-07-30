import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ChapterAramDetail from "./ChapterAramDetail";

export const metadata: Metadata = {
  title: "GRIP Aram Chapter – Chennai | India's 1st Digital Business Networking Forum",
  description:
    "Explore the GRIP Aram Chapter in Chennai — weekly networking meetings, chapter leadership, and associates driving ethical business growth.",
};

export default function ChennaiAramPage() {
  return (
    <>
      <ChapterAramDetail />
      <Footer />
    </>
  );
}
