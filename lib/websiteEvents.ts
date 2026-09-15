const PROD_API = "https://api.gripforum.com/api";
const PROD_IMG = "https://api.gripforum.com/api/public";

export type WebsiteEventCard = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string | null;
};

export const BASELINE_MEETING_EVENT: WebsiteEventCard = {
  _id: "fallback-nexus-chennai-west",
  title: "GRIP Nexus Chennai West – Baseline Meeting",
  description:
    "Organization: GRIP – The Business Forum\nChapter: GRIP Nexus Chennai West\nType: Hybrid Chapter – Baseline Meeting\nDate: 16 September 2026 (Wednesday)\nTime: 8:00 AM – 9:00 AM\nMode: Zoom\nMeeting: Free",
  imageUrl:
    "https://res.cloudinary.com/dq6gr5zjc/image/upload/v1789357145/WhatsApp_Image_2026-09-14_at_8.58.58_AM_mrcedc.jpg",
};

export const IGNITE_EVENT: WebsiteEventCard = {
  _id: "ignite-chennai-west-2026-09-26",
  title: "GRIP Nexus Chennai West – IGNITE",
  description:
    "Organization: GRIP – The Business Forum\nChapter: GRIP Nexus – Chennai West\nEvent: IGNITE – Business Networking on Zoom\nMeeting: Baseline Meeting\nDate: 26th September 2026 (Saturday)\nTime: 8:00 AM – 9:00 AM\nMode: Online via Zoom\nMeeting Fee: Free\nChapter Type: Hybrid Chapter",
  imageUrl:
    "https://res.cloudinary.com/dq6gr5zjc/image/upload/v1789436668/3c1cecce-72d1-427f-806f-40fa309bfc65_x2ljqr.jpg",
};

export const HORIZON_EVENT: WebsiteEventCard = {
  _id: "horizon-business-networking-2026-10-02",
  title: "GRIP HORIZON – Business Networking",
  description:
    "Organization: GRIP – The Business Forum\nEvent: HORIZON – Business Networking\nMeeting: Baseline Meet\nDate: October 2nd, 2026 (Friday)\nTime: 8:00 AM – 9:00 AM\nMode: Online via Zoom\nMeeting Fee: FREE\nChapter: Hybrid Chapter",
  imageUrl:
    "https://res.cloudinary.com/dq6gr5zjc/image/upload/v1789436636/889f2e51-1b5f-439a-8aeb-7be3ebdeb79c_a6kxcq.jpg",
};

const FALLBACK_EVENTS: WebsiteEventCard[] = [
  BASELINE_MEETING_EVENT,
  IGNITE_EVENT,
  HORIZON_EVENT,
  {
    _id: "fallback-nexor",
    title: "GRIP NEXOR - Launch",
    description:
      "An exclusive chapter for young entrepreneurs aged between 18 to 22 years",
    imageUrl: "/assets/images/grip/blog2.png",
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
        const events: WebsiteEventCard[] = [];
        for (const e of list) {
          if (e.title?.toLowerCase().includes("virutcham")) {
            events.push(BASELINE_MEETING_EVENT);
            events.push(IGNITE_EVENT);
            events.push(HORIZON_EVENT);
          } else {
            events.push({
              _id: String(e._id),
              title: e.title || "",
              description: e.description || "",
              imageUrl: buildImageUrl(e.image, PROD_IMG),
            });
          }
        }

        if (!events.some((ev) => ev._id === BASELINE_MEETING_EVENT._id)) {
          events.push(BASELINE_MEETING_EVENT);
        }
        if (!events.some((ev) => ev._id === IGNITE_EVENT._id)) {
          events.push(IGNITE_EVENT);
        }
        if (!events.some((ev) => ev._id === HORIZON_EVENT._id)) {
          events.push(HORIZON_EVENT);
        }

        return events;
      }
    }
  } catch {
    /* fall through to fallback */
  }
  return FALLBACK_EVENTS;
}



