"use client";
import { useSyncExternalStore } from "react";

const KEY = "eem_cookie_consent";
const EVENT = "eem-consent-change";

export interface Consent {
  essential: true;
  analytics: boolean;
  preferences: boolean;
}

/** "ssr" = server render, "" = no decision yet, otherwise stored JSON. */
function snapshot(): string {
  try {
    return window.localStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function useConsentRaw(): string {
  return useSyncExternalStore(subscribe, snapshot, () => "ssr");
}

export function parseConsent(raw: string): Consent | null {
  if (!raw || raw === "ssr") return null;
  try {
    const v = JSON.parse(raw) as Partial<Consent>;
    return { essential: true, analytics: !!v.analytics, preferences: !!v.preferences };
  } catch {
    return null;
  }
}

export function saveConsent(c: Omit<Consent, "essential">) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ essential: true, ...c, savedAt: Date.now() }));
  } catch {
    /* storage unavailable: choice applies for this page view only */
  }
  window.dispatchEvent(new Event(EVENT));
}

export const OPEN_SETTINGS_EVENT = "eem-open-cookie-settings";
