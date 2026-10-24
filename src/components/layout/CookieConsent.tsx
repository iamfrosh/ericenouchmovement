"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Cookie, X } from "lucide-react";
import { OPEN_SETTINGS_EVENT, parseConsent, saveConsent, useConsentRaw } from "@/lib/consent";
import { buttonClass } from "@/components/ui/Button";

function Toggle({ id, label, checked, disabled, onChange }: { id: string; label: string; checked: boolean; disabled?: boolean; onChange?: (v: boolean) => void }) {
  return (
    <label className="relative inline-block h-[26px] w-11 shrink-0">
      <input id={id} type="checkbox" aria-label={label} checked={checked} disabled={disabled} onChange={(e) => onChange?.(e.target.checked)} className="peer absolute inset-0 z-10 m-0 cursor-pointer opacity-0 disabled:cursor-not-allowed" />
      <span aria-hidden className="absolute inset-0 rounded-full bg-[#cfd3cf] transition-colors peer-checked:bg-brand-green peer-disabled:opacity-60 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-green" />
      <span aria-hidden className="absolute left-[3px] top-[3px] size-5 rounded-full bg-white transition-transform peer-checked:translate-x-[18px]" />
    </label>
  );
}

export function CookieConsent() {
  const raw = useConsentRaw();
  const stored = parseConsent(raw);
  const [modal, setModal] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [preferences, setPreferences] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const open = () => {
      const c = parseConsent(window.localStorage.getItem("eem_cookie_consent") ?? "");
      setAnalytics(!!c?.analytics);
      setPreferences(!!c?.preferences);
      setModal(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, []);

  useEffect(() => {
    if (!modal) return;
    const box = boxRef.current;
    box?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModal(false);
      if (e.key === "Tab" && box) {
        const f = [...box.querySelectorAll<HTMLElement>("button, input:not([disabled]), a[href]")];
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modal]);

  const decide = (a: boolean, p: boolean) => { saveConsent({ analytics: a, preferences: p }); setModal(false); };
  const showBar = raw === "" && !modal;

  return (
    <>
      {showBar && (
        <div role="region" aria-label="Cookie consent" className="fixed inset-x-4 bottom-4 z-[80] max-w-[560px] rounded-2xl border border-line bg-white p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,.28)] sm:p-[22px]">
          <div className="mb-2 flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-[10px] bg-brand-green-tint text-brand-green-dark"><Cookie aria-hidden className="size-[18px]" strokeWidth={1.75} /></span>
            <h2 className="text-base">We value your privacy</h2>
          </div>
          <p className="text-sm text-ink-soft">We use essential cookies to run this site, and optional cookies to understand how it is used. Read our <Link href="/privacy#cookies" className="text-brand-green-dark underline underline-offset-4">Cookie Policy</Link>.</p>
          <div className="mt-3.5 flex flex-wrap gap-2.5">
            <button type="button" onClick={() => decide(true, true)} className={buttonClass("primary", "h-11 min-w-0 flex-1 px-4 text-sm")}>Accept all</button>
            <button type="button" onClick={() => decide(false, false)} className={buttonClass("secondary", "h-11 min-w-0 flex-1 px-4 text-sm")}>Essential only</button>
            <button type="button" onClick={() => { setAnalytics(false); setPreferences(false); setModal(true); }} className="h-9 w-full text-sm font-semibold text-brand-green-dark underline underline-offset-4">Customise</button>
          </div>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/45 p-4" onMouseDown={(e) => { if (e.target === e.currentTarget) setModal(false); }}>
          <div ref={boxRef} role="dialog" aria-modal="true" aria-labelledby="ck-title" className="max-h-[90vh] w-full max-w-[500px] overflow-auto rounded-2xl bg-white p-7">
            <div className="flex items-center justify-between">
              <h2 id="ck-title" className="text-xl">Cookie preferences</h2>
              <button type="button" aria-label="Close" onClick={() => setModal(false)} className="flex size-[38px] items-center justify-center rounded-lg border border-line"><X aria-hidden className="size-5" strokeWidth={1.75} /></button>
            </div>
            <p className="mt-2 text-sm text-ink-soft">Choose which cookies you allow. You can change this at any time from the footer.</p>
            {[
              { id: "ck-es", t: "Essential", d: "Required for security and basic site function. Always on.", c: true, dis: true },
              { id: "ck-an", t: "Analytics", d: "Anonymous usage statistics that help us improve the site.", c: analytics, set: setAnalytics },
              { id: "ck-pr", t: "Preferences", d: "Remember your settings for future visits.", c: preferences, set: setPreferences },
            ].map((o) => (
              <div key={o.id} className="flex items-start justify-between gap-5 border-b border-line py-4">
                <div><p className="font-[family-name:var(--font-heading)] text-[14.5px] font-bold">{o.t}</p><p className="text-[13.5px] text-ink-soft">{o.d}</p></div>
                <Toggle id={o.id} label={`${o.t} cookies`} checked={o.c} disabled={o.dis} onChange={o.set} />
              </div>
            ))}
            <div className="mt-6 flex gap-2.5">
              <button type="button" onClick={() => decide(false, false)} className={buttonClass("secondary", "h-[42px] flex-1 px-4 text-sm")}>Reject optional</button>
              <button type="button" onClick={() => decide(analytics, preferences)} className={buttonClass("primary", "h-[42px] flex-1 px-4 text-sm")}>Save choices</button>
            </div>
          </div>
        </div>
      )}
      <span hidden data-consent={stored ? "set" : "unset"} />
    </>
  );
}
