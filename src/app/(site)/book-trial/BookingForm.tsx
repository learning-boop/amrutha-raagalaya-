"use client";

import { useActionState, useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { requestTrial, type RequestState } from "./actions";

export type SlotDay = {
  key: string;
  label: string;
  slots: { id: string; iso: string; time: string; durationMinutes: number; mode: string; modeLabel: string }[];
};

const field =
  "w-full min-h-12 px-4 rounded-xl border bg-offwhite text-ink placeholder:text-ink-2/60 focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-1";

// The visitor's time zone is only known in the browser. Reading it through
// useSyncExternalStore renders nothing on the server and fills in after
// hydration, avoiding a mismatch.
const noopSubscribe = () => () => {};
const browserZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;
const serverZone = () => null;

export default function BookingForm({ days, renderedAt }: { days: SlotDay[]; renderedAt: number }) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<RequestState, FormData>(requestTrial, { status: "idle" });
  const zone = useSyncExternalStore(noopSubscribe, browserZone, serverZone);
  const abroad = zone !== null && zone !== "Asia/Kolkata" && zone !== "Asia/Calcutta";

  const fieldErrors = state.status === "error" ? (state.fields ?? {}) : {};
  const values = state.status === "error" ? state.values : undefined;

  // If the chosen time was taken meanwhile, reload the list so it disappears.
  useEffect(() => {
    if (state.status === "error" && fieldErrors.slotId) router.refresh();
  }, [state, fieldErrors.slotId, router]);

  if (state.status === "done") {
    return (
      <div role="status" className="rounded-2xl border border-gold-soft bg-cream p-8 text-center">
        <p className="eyebrow">Request received</p>
        <div className="divider divider-center" />
        <h2 className="text-2xl">Thank you!</h2>
        <p className="mt-4 text-lg">
          We have your request for <b>{state.childName}</b>&rsquo;s trial class on <b>{state.when}</b> ({state.mode}).
        </p>
        <p className="mt-3 text-ink-2">We will confirm on WhatsApp shortly{state.mode.startsWith("Online") ? ", with the Zoom joining link" : ""}.</p>
      </div>
    );
  }

  const localTime = (iso: string) =>
    new Intl.DateTimeFormat(undefined, { weekday: "short", hour: "numeric", minute: "2-digit", timeZoneName: "short" }).format(new Date(iso));

  return (
    <form action={formAction} className="space-y-8" noValidate>
      <input type="hidden" name="startedAt" value={renderedAt} />
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label>Website <input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <fieldset>
        <legend className="font-serif text-2xl text-maroon font-semibold">1. Choose a time</legend>
        <p className="mt-1 text-[0.9rem] text-ink-2">
          All times are India time (IST).{abroad && " Your local time is shown under each option."}
        </p>
        {fieldErrors.slotId && <p role="alert" className="mt-3 text-[0.9rem] text-maroon font-medium">{fieldErrors.slotId}</p>}

        <div className="mt-5 space-y-6">
          {days.map((day) => (
            <div key={day.key}>
              <h3 className="text-lg">{day.label}</h3>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {day.slots.map((slot) => {
                  return (
                    // Selection lives in the radio itself and is styled with :has(),
                    // because React's form reset would clear a state-driven choice.
                    <label
                      key={slot.id}
                      className="group relative flex flex-col gap-0.5 rounded-xl border-[1.5px] border-line bg-offwhite px-4 py-3 cursor-pointer transition-colors hover:border-gold has-[:checked]:border-maroon has-[:checked]:bg-maroon/5 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-gold"
                    >
                      <input
                        type="radio"
                        name="slotId"
                        value={slot.id}
                        defaultChecked={values?.slotId === slot.id}
                        className="sr-only"
                      />
                      <span className="font-semibold text-ink">{slot.time}</span>
                      <span className="text-[0.82rem] text-ink-2">{slot.modeLabel} · {slot.durationMinutes} min</span>
                      {abroad && <span className="text-[0.78rem] text-gold font-medium">{localTime(slot.iso)}</span>}
                      <span aria-hidden="true" className="hidden group-has-[:checked]:block absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-maroon" />
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-line bg-cream/50 p-6 space-y-4">
        <legend className="font-serif text-2xl text-maroon font-semibold px-1">2. Your details</legend>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="parentName" label="Your name" error={fieldErrors.parentName}>
            <input id="parentName" name="parentName" defaultValue={values?.parentName} autoComplete="name" required className={`${field} ${fieldErrors.parentName ? "border-maroon" : "border-line"}`} />
          </Field>
          <Field id="phone" label="WhatsApp number" error={fieldErrors.phone} hint="We confirm the booking here.">
            <input id="phone" name="phone" defaultValue={values?.phone} type="tel" inputMode="tel" autoComplete="tel" required placeholder="98765 43210" className={`${field} ${fieldErrors.phone ? "border-maroon" : "border-line"}`} />
          </Field>
          <Field id="childName" label="Student's name" error={fieldErrors.childName}>
            <input id="childName" name="childName" defaultValue={values?.childName} required className={`${field} ${fieldErrors.childName ? "border-maroon" : "border-line"}`} />
          </Field>
          <Field id="childAge" label="Student's age" error={fieldErrors.childAge}>
            <input id="childAge" name="childAge" defaultValue={values?.childAge} type="number" inputMode="numeric" min={3} max={99} required className={`${field} ${fieldErrors.childAge ? "border-maroon" : "border-line"}`} />
          </Field>
        </div>

        <Field id="notes" label="Anything we should know? (optional)">
          <textarea id="notes" name="notes" defaultValue={values?.notes} rows={3} maxLength={500} placeholder="Previous music learning, questions, preferred language…" className={`${field} border-line py-3`} />
        </Field>

        <p className="text-[0.8rem] text-ink-2">We use these details only to arrange your trial class.</p>

        {state.status === "error" && !fieldErrors.slotId && (
          <p role="alert" className="text-[0.9rem] text-maroon bg-maroon/5 border border-maroon/20 rounded-lg px-3 py-2">{state.message}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full sm:w-auto inline-flex items-center justify-center min-h-12 px-8 rounded-xl font-semibold text-[0.95rem] bg-maroon text-[#FFF8EC] hover:bg-maroon-2 disabled:opacity-60 transition-colors focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-3"
        >
          {pending ? "Sending request…" : "Request this trial class"}
        </button>
      </fieldset>
    </form>
  );
}

function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.85rem] font-medium mb-1.5">{label}</label>
      {children}
      {error ? (
        <p role="alert" className="mt-1 text-[0.8rem] text-maroon">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-[0.78rem] text-ink-2">{hint}</p>
      ) : null}
    </div>
  );
}
