"use client";
import Script from "next/script";
import { parseConsent, useConsentRaw } from "@/lib/consent";

/** Loads Google tag only after the visitor has accepted analytics cookies. */
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  const consent = parseConsent(useConsentRaw());
  if (!id || !consent?.analytics) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(id)},{anonymize_ip:true});`}</Script>
    </>
  );
}
