import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { FounderSpotlight } from "@/components/home/FounderSpotlight";
import { VisionMission } from "@/components/home/VisionMission";
import { FocusAreas } from "@/components/home/FocusAreas";
import { LeadershipPreview } from "@/components/home/LeadershipPreview";
import { LatestNews } from "@/components/home/LatestNews";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { ContactCTA } from "@/components/home/ContactCTA";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <FounderSpotlight />
      <Section><VisionMission /></Section>
      <Section alt>
        <SectionHeading eyebrow="Core focus" title="What we work on" />
        <FocusAreas />
      </Section>
      <LeadershipPreview />
      <LatestNews />
      <GalleryPreview />
      <ContactCTA />
    </>
  );
}
