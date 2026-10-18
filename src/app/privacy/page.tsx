import type { Metadata } from "next";
import { Info } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/SectionHeading";
import { CookieSettingsButton } from "@/components/layout/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Privacy & Cookie Policy",
  description: "How Eric Enoch Movement handles your information and cookies.",
  alternates: { canonical: "/privacy" },
};

const h2 = "mb-2.5 mt-9 text-xl";
export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy & Cookie Policy" text="How we handle your information." />
      <Container className="py-14">
        <div className="max-w-[760px] text-ink-soft">
          <h2 className={`${h2} !mt-0 text-ink`}>Information you send us</h2>
          <p>When you use the contact form, we receive your name, email address, subject and message. We use them only to respond to you. We do not sell personal data.</p>
          <h2 className={`${h2} text-ink`}>Security</h2>
          <p>Submitted data is validated and transmitted over an encrypted connection. Access is limited to authorised members of the movement.</p>
          <h2 id="cookies" className={`${h2} text-ink`}>Cookies</h2>
          <p>We use the following categories of cookies:</p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li><strong className="text-ink">Essential:</strong> required for security and basic function. Always active.</li>
            <li><strong className="text-ink">Analytics:</strong> anonymous usage statistics. Used only with your consent.</li>
            <li><strong className="text-ink">Preferences:</strong> remember your settings. Used only with your consent.</li>
          </ul>
          <p className="mt-4">You can change your choice at any time using <CookieSettingsButton className="font-semibold text-brand-green-dark underline underline-offset-4" />.</p>
          <p className="mt-8 flex items-start gap-3 rounded-[10px] border border-line bg-muted px-4 py-3.5 text-[13.5px]">
            <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-green-dark" strokeWidth={1.75} />
            Draft policy. The movement should review and confirm this text, including the data controller&apos;s details and applicable data-protection law, before launch.
          </p>
        </div>
      </Container>
    </>
  );
}
