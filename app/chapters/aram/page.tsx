import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import AramAssociates from "./AramAssociates";

export const metadata: Metadata = {
  title: "Chapter Aram Associates – GRIP India's 1st Digital Business Networking Forum",
  description: "Meet the GRIP Aram Chapter associates – head team, visitor interaction team, and members.",
};

export default function ChapterAram() {
  return (
    <>
      <Header />
      <Breadcrumb title="Aram Associates" />
      <AramAssociates />
      <Footer />
    </>
  );
}
