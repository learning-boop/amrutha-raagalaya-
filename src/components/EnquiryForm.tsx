"use client";
import { useState } from "react";
import { site } from "@/lib/site";
import { WhatsAppIcon } from "./Icon";

type Kind = "classes" | "program";

export default function EnquiryForm({ kind }: { kind: Kind }) {
  const [form, setForm] = useState({ name: "", phone: "", age: "", event: "Temple program", date: "", location: "", message: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = kind === "classes"
      ? [`Namaste! I would like to enquire about Carnatic music classes.`, `Parent name: ${form.name}`, `Child's age: ${form.age}`, `Phone: ${form.phone}`, form.message && `Message: ${form.message}`]
      : [`Namaste! I would like to enquire about a devotional program.`, `Name: ${form.name}`, `Event: ${form.event}`, `Date: ${form.date}`, `Location: ${form.location}`, `Phone: ${form.phone}`, form.message && `Message: ${form.message}`];
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(lines.filter(Boolean).join("\n"))}`, "_blank", "noopener");
  };

  const input = "w-full min-h-12 rounded-xl border border-line bg-offwhite px-4 text-ink placeholder:text-ink-2/60 focus:outline-none focus:border-gold focus:ring-3 focus:ring-gold/25";
  const label = "block text-[0.8rem] font-semibold text-ink mb-1.5";

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div><label className={label} htmlFor={`${kind}-name`}>{kind === "classes" ? "Parent\u2019s name" : "Your name"}</label><input id={`${kind}-name`} required className={input} value={form.name} onChange={set("name")} autoComplete="name" /></div>
      {kind === "classes" ? (
        <div><label className={label} htmlFor="age">Child’s age</label><input id="age" required type="number" min={5} max={18} className={input} value={form.age} onChange={set("age")} placeholder="7 – 15" /></div>
      ) : (
        <>
          <div><label className={label} htmlFor="event">Type of occasion</label>
            <select id="event" className={input} value={form.event} onChange={set("event")}>
              {["Temple program", "Wedding", "Traditional function", "Cultural event", "Other devotional performance"].map((o) => (<option key={o}>{o}</option>))}
            </select></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className={label} htmlFor="date">Event date</label><input id="date" type="date" className={input} value={form.date} onChange={set("date")} /></div>
            <div><label className={label} htmlFor="location">Venue / city</label><input id="location" className={input} value={form.location} onChange={set("location")} /></div>
          </div>
        </>
      )}
      <div><label className={label} htmlFor={`${kind}-phone`}>Phone / WhatsApp number</label><input id={`${kind}-phone`} required type="tel" className={input} value={form.phone} onChange={set("phone")} autoComplete="tel" placeholder="+91" /></div>
      <div><label className={label} htmlFor={`${kind}-msg`}>Message (optional)</label><textarea id={`${kind}-msg`} rows={3} className={`${input} py-3`} value={form.message} onChange={set("message")} /></div>
      <button type="submit" className="inline-flex items-center justify-center gap-2 min-h-12 px-6 rounded-xl bg-maroon text-[#FFF8EC] font-semibold hover:bg-maroon-2 transition-colors focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-3">
        <WhatsAppIcon /> Send on WhatsApp
      </button>
      <p className="text-[0.78rem] text-ink-2">This opens WhatsApp with your message pre-filled. We only use your details to reply to your enquiry.</p>
    </form>
  );
}
