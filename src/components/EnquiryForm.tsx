"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import { sendEnquiry, type EnquiryState } from "@/app/(site)/contact/actions";
import { site, telLink } from "@/lib/site";
import { Icon } from "./Icon";

type Kind = "classes" | "program";

const OCCASIONS = ["Temple program", "Wedding", "Traditional function", "Other devotional performance"];

export default function EnquiryForm({ kind }: { kind: Kind }) {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(sendEnquiry, { status: "idle" });
  // Stamped on mount so the action can tell a person from a bot that submits instantly.
  const [startedAt, setStartedAt] = useState("");
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => setStartedAt(String(Date.now())), []);
  useEffect(() => {
    if (state.status === "done") doneRef.current?.focus();
  }, [state.status]);

  if (state.status === "done") {
    return (
      <div ref={doneRef} tabIndex={-1} className="rounded-xl border border-gold-soft bg-cream px-5 py-6 focus:outline-none">
        <Icon name="lamp" className="w-9 h-9 text-gold" />
        <h3 className="text-2xl mt-2">Thank you — we have your enquiry</h3>
        <p className="mt-2 text-ink-2">
          We will reply on WhatsApp, usually the same day. If it is urgent, call us on{" "}
          <a href={telLink} className="text-maroon font-semibold hover:underline">{site.phone}</a>.
        </p>
      </div>
    );
  }

  const values = state.status === "error" ? state.values : undefined;
  const fieldErrors = (state.status === "error" && state.fields) || {};

  const input = "w-full min-h-12 rounded-xl border bg-offwhite px-4 text-ink placeholder:text-ink-2/60 focus:outline-none focus:border-gold focus:ring-3 focus:ring-gold/25";
  const border = (key: string) => (fieldErrors[key] ? "border-maroon" : "border-line");
  const label = "block text-[0.8rem] font-semibold text-ink mb-1.5";

  return (
    <form action={action} className="grid gap-4">
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="startedAt" value={startedAt} />
      {/* Honeypot: hidden from people, irresistible to bots. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div>
        <label className={label} htmlFor={`${kind}-name`}>Your name</label>
        <input id={`${kind}-name`} name="name" required defaultValue={values?.name} className={`${input} ${border("name")}`} autoComplete="name" />
        <FieldError message={fieldErrors.name} />
      </div>

      {kind === "classes" ? (
        <div>
          <label className={label} htmlFor="age">Student&rsquo;s age</label>
          <input id="age" name="age" required type="number" min={3} max={99} defaultValue={values?.age} className={`${input} ${border("age")}`} placeholder="We teach all ages, from 4 upwards" />
          <FieldError message={fieldErrors.age} />
        </div>
      ) : (
        <>
          <div>
            <label className={label} htmlFor="occasion">Type of occasion</label>
            <select id="occasion" name="occasion" defaultValue={values?.occasion} className={`${input} border-line`}>
              {OCCASIONS.map((o) => (<option key={o}>{o}</option>))}
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label} htmlFor="eventDate">Event date</label>
              <input id="eventDate" name="eventDate" type="date" defaultValue={values?.eventDate} className={`${input} border-line`} />
            </div>
            <div>
              <label className={label} htmlFor="location">Venue / city</label>
              <input id="location" name="location" defaultValue={values?.location} className={`${input} border-line`} />
            </div>
          </div>
        </>
      )}

      <div>
        <label className={label} htmlFor={`${kind}-phone`}>Phone / WhatsApp number</label>
        <input id={`${kind}-phone`} name="phone" required type="tel" defaultValue={values?.phone} className={`${input} ${border("phone")}`} autoComplete="tel" placeholder="+91" />
        <FieldError message={fieldErrors.phone} />
      </div>

      <div>
        <label className={label} htmlFor={`${kind}-msg`}>Message (optional)</label>
        <textarea id={`${kind}-msg`} name="message" rows={3} maxLength={1000} defaultValue={values?.message} className={`${input} border-line py-3`} />
      </div>

      {state.status === "error" && !state.fields && (
        <p role="alert" className="text-[0.9rem] text-maroon bg-maroon/5 border border-maroon/20 rounded-lg px-3 py-2">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 min-h-12 px-6 rounded-xl bg-maroon text-[#FFF8EC] font-semibold hover:bg-maroon-2 transition-colors disabled:opacity-60 focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-3"
      >
        {pending ? "Sending…" : "Send Enquiry"}
      </button>
      <p className="text-[0.78rem] text-ink-2">We only use your details to reply to your enquiry.</p>
    </form>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p role="alert" className="mt-1.5 text-[0.8rem] text-maroon">{message}</p>;
}
