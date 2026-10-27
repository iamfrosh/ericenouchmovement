export interface OutreachVideo {
  id: string;
  title: string;
  description: string;
  tag: string;
  /** Short silent loop used for the autoplaying card. */
  preview: string;
  /** Full video, loaded only when the visitor opens it. */
  src: string;
  poster: string;
  duration: string;
  spokenDuration: string;
  width: number;
  height: number;
}

export const OUTREACH_VIDEOS: OutreachVideo[] = [
  {
    id: "outreach-1",
    title: "Outreach video 1",
    description: "A gathering of members and supporters from our outreach.",
    tag: "Outreach",
    preview: "/videos/outreach-1-preview.mp4",
    src: "/videos/outreach-1.mp4",
    poster: "/videos/outreach-1-poster.jpg",
    duration: "2:16",
    spokenDuration: "2 minutes 16 seconds",
    width: 720,
    height: 1280,
  },
  {
    id: "outreach-2",
    title: "Outreach video 2",
    description: "Members addressing an outdoor gathering during our outreach.",
    tag: "Outreach",
    preview: "/videos/outreach-2-preview.mp4",
    src: "/videos/outreach-2.mp4",
    poster: "/videos/outreach-2-poster.jpg",
    duration: "3:22",
    spokenDuration: "3 minutes 22 seconds",
    width: 360,
    height: 640,
  },
  {
    id: "outreach-3",
    title: "Outreach video 3",
    description: "From our outreach.",
    tag: "Outreach",
    preview: "/videos/outreach-3-preview.mp4",
    src: "/videos/outreach-3.mp4",
    poster: "/videos/outreach-3-poster.jpg",
    duration: "1:48",
    spokenDuration: "1 minute 48 seconds",
    width: 360,
    height: 640,
  },
];
