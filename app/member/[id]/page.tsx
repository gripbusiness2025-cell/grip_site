import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import MemberProfileClient, { type MemberProfile } from "./MemberProfileClient";
import { getAllMembers, type MemberEntry } from "@/lib/members";
import { SITE_URL, withSeo } from "@/lib/seo";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

async function findMember(id: string) {
  const all = await getAllMembers();
  return { all, member: all?.find((m) => m._id === id) || null };
}

const titleCase = (s: string) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

function toProfile(m: MemberEntry): MemberProfile {
  const website = m.profileLink ? (/^https?:\/\//i.test(m.profileLink) ? m.profileLink : `https://${m.profileLink}`) : "";
  return {
    _id: m._id,
    name: m.name,
    company: m.company,
    role: m.role,
    email: m.email,
    phone: m.phone,
    photo: m.photo,
    companyLogo: null,
    address: "",
    city: "",
    state: "Tamilnadu",
    pincode: "",
    website,
    category: "",
    subCategory: m.role,
    chapter: m.chapterName,
    zone: m.zoneName,
    profileLink: website,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { member } = await findMember(id);
  if (!member) {
    return withSeo(`/member/${id}`, {
      title: "Member Profile – GRIP Business Forum",
      description: "View GRIP associate member profile, business details, and contact information.",
    });
  }
  const name = titleCase(member.name);
  const what = member.company || member.role;
  return withSeo(`/member/${id}`, {
    title: `${name}${what ? ` – ${what}` : ""} | GRIP ${titleCase(member.chapterName)} Chapter`,
    description: `${name}${member.company ? ` of ${member.company}` : ""} is an associate of the GRIP ${titleCase(
      member.chapterName
    )} Chapter, ${titleCase(member.zoneName)}. View business details and contact information.`,
  });
}

export default async function MemberProfilePage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const { all, member } = await findMember(id);

  // Real 404 when the API answered, the id is unknown, and the link carried no profile data
  if (all && !member && !sp.name) notFound();

  return (
    <>
      {member && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Person",
            name: titleCase(member.name),
            url: `${SITE_URL}/member/${id}`,
            ...(member.photo ? { image: member.photo } : {}),
            ...(member.role ? { jobTitle: member.role } : {}),
            ...(member.company ? { worksFor: { "@type": "Organization", name: member.company } } : {}),
            memberOf: {
              "@type": "Organization",
              name: `GRIP ${titleCase(member.chapterName)} Chapter`,
              url: `${SITE_URL}${member.chapterPath}`,
            },
          }}
        />
      )}
      <MemberProfileClient initialMember={member ? toProfile(member) : undefined} />
    </>
  );
}
