import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member Profile – GRIP Business Forum",
  description: "View GRIP associate member profile, business details, and contact information.",
};

export default function MemberProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
