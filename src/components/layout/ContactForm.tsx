"use client";
import { useState } from "react";
import { ArrowRight, CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { contactSchema } from "@/lib/validation";
import { buttonClass } from "@/components/ui/Button";

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;
const field = "w-full rounded-lg border border-[#d6d6d6] bg-white px-3.5 text-[15px] transition focus:border-brand-green focus:outline-none focus:ring-[3px] focus:ring-brand-green/15 aria-[invalid=true]:border-brand-red";

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [serverMsg, setServerMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof Errors;
        next[k] ??= issue.message;
      }
      setErrors(next);
      setStatus("idle");
      const first = (Object.keys(next)[0] ?? "") as string;
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setServerMsg(json.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("ok");
    } catch {
      setServerMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  const f = (name: keyof Errors, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className="mb-[18px]">
      <label htmlFor={name} className="mb-1.5 block font-[family-name:var(--font-heading)] text-[12.5px] font-semibold text-[#333]">{label}</label>
      <input id={name} name={name} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-err` : undefined} className={`${field} h-12`} {...props} />
      {errors[name] && <p id={`${name}-err`} className="mt-1.5 text-[13px] text-[#c4161f]">{errors[name]}</p>}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate>
      <div aria-live="polite">
        {status === "ok" && <p className="mb-5 flex gap-3 rounded-[10px] border border-[#c8e6cc] bg-brand-green-tint px-4 py-3.5 text-sm text-[#0b5a17]"><CircleCheck aria-hidden className="size-5 shrink-0" strokeWidth={1.75} />Thank you. Your message has been sent.</p>}
        {status === "error" && <p role="alert" className="mb-5 flex gap-3 rounded-[10px] border border-[#f3c3c6] bg-[#fdf1f1] px-4 py-3.5 text-sm text-[#8f1219]"><CircleAlert aria-hidden className="size-5 shrink-0" strokeWidth={1.75} />{serverMsg}</p>}
      </div>
      <div className="grid gap-x-4 sm:grid-cols-2">
        {f("name", "Full name", { autoComplete: "name" })}
        {f("email", "Email address", { type: "email", autoComplete: "email" })}
      </div>
      {f("subject", "Subject")}
      <div className="mb-[18px]">
        <label htmlFor="message" className="mb-1.5 block font-[family-name:var(--font-heading)] text-[12.5px] font-semibold text-[#333]">Message</label>
        <textarea id="message" name="message" rows={6} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} className={`${field} min-h-[150px] resize-y py-3`} />
        {errors.message && <p id="message-err" className="mt-1.5 text-[13px] text-[#c4161f]">{errors.message}</p>}
      </div>
      <div aria-hidden className="absolute -left-[9999px]"><label>Leave empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <button type="submit" disabled={status === "sending"} className={buttonClass("primary", "disabled:opacity-70")}>
        {status === "sending" ? <>Sending <LoaderCircle aria-hidden className="size-[18px] animate-spin" /></> : <>Send message <ArrowRight aria-hidden className="size-[18px]" strokeWidth={1.75} /></>}
      </button>
    </form>
  );
}
