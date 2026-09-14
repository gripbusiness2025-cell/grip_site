const PROD_API = "https://api.gripforum.com/api";
const PROD_IMG = "https://api.gripforum.com/api/public";

export type WebsiteEventCard = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string | null;
};

const FALLBACK_EVENTS: WebsiteEventCard[] = [
  {
    _id: "fallback-nexor",
    title: "GRIP NEXOR - Launch",
    description:
      "An exclusive chapter for young entrepreneurs aged between 18 to 22 years",
    imageUrl: "/assets/images/grip/blog2.png",
  },
  {
    _id: "fallback-nexus-chennai-west",
    title: "GRIP Nexus Chennai West – Baseline Meeting",
    description:
      "Organization: GRIP – The Business Forum\nChapter: GRIP Nexus Chennai West\nType: Hybrid Chapter – Baseline Meeting\nDate: 16 September 2026 (Wednesday)\nTime: 8:00 AM – 9:00 AM\nMode: Zoom\nMeeting: Free",
    imageUrl: "https://res.cloudinary.com/dq6gr5zjc/image/upload/v1789357145/WhatsApp_Image_2026-09-14_at_8.58.58_AM_mrcedc.jpg",
  },
];

function buildImageUrl(
  image: { docPath?: string; docName?: string } | null | undefined,
  imgBase: string
) {
  if (!image?.docPath || !image?.docName) return null;
  return `${imgBase}/${image.docPath}/${image.docName}`;
}

export async function fetchWebsiteEvents(): Promise<WebsiteEventCard[]> {
  try {
    const res = await fetch(`${PROD_API}/public/website/events`, {
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      const list = Array.isArray(json?.data) ? json.data : [];
      if (list.length > 0) {
        return list.map((e: any) => {
          if (e.title?.toLowerCase().includes("virutcham")) {
            return {
              _id: String(e._id),
              title: "GRIP Nexus Chennai West – Baseline Meeting",
              description:
                "Organization: GRIP – The Business Forum\nChapter: GRIP Nexus Chennai West\nType: Hybrid Chapter – Baseline Meeting\nDate: 16 September 2026 (Wednesday)\nTime: 8:00 AM – 9:00 AM\nMode: Zoom\nMeeting: Free",
              imageUrl: "https://res.cloudinary.com/dq6gr5zjc/image/upload/v1789357145/WhatsApp_Image_2026-09-14_at_8.58.58_AM_mrcedc.jpg",
            };
          }
          return {
            _id: String(e._id),
            title: e.title || "",
            description: e.description || "",
            imageUrl: buildImageUrl(e.image, PROD_IMG),
          };
        });
      }
    }
  } catch {
    /* fall through to fallback */
  }
  return FALLBACK_EVENTS;
}
