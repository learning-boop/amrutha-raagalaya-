"use client";

import { useActionState, useState } from "react";
import { addSlots, type SlotFormState } from "./actions";

const field =
  "w-full min-h-11 px-3 rounded-lg border border-line bg-offwhite text-[0.92rem] focus-visible:outline-3 focus-visible:outline-gold";
const label = "block text-[0.8rem] font-medium mb-1";

export default function AddSlotsForm({ minDate }: { minDate: string }) {
  const [state, formAction, pending] = useActionState<SlotFormState, FormData>(addSlots, {});
  const [mode, setMode] = useState("online");

  return (
    <form action={formAction} className="rounded-2xl border border-line bg-cream/50 p-6">
      <h2 className="text-xl">Add available times</h2>
      <p className="mt-1 text-[0.85rem] text-ink-2">Times are India time (IST). Parents can book until 1 hour before a slot starts.</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="date" className={label}>Date</label>
          <input id="date" name="date" type="date" min={minDate} required className={field} />
        </div>
        <div>
          <label htmlFor="time" className={label}>Start time</label>
          <input id="time" name="time" type="time" step={300} required className={field} />
        </div>
        <div>
          <label htmlFor="duration" className={label}>Duration</label>
          <select id="duration" name="duration" defaultValue="30" className={field}>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">60 minutes</option>
          </select>
        </div>
        <div>
          <label htmlFor="mode" className={label}>Where</label>
          <select id="mode" name="mode" value={mode} onChange={(e) => setMode(e.target.value)} className={field}>
            <option value="online">Online (Zoom)</option>
            <option value="in-person">In person</option>
          </select>
        </div>

        {mode === "online" && (
          <div className="sm:col-span-2">
            <label htmlFor="meetingLink" className={label}>Zoom link (optional — can be added later)</label>
            <input id="meetingLink" name="meetingLink" type="url" placeholder="https://us05web.zoom.us/j/…" className={field} />
          </div>
        )}
        <div>
          <label htmlFor="capacity" className={label}>Children per slot</label>
          <input id="capacity" name="capacity" type="number" min={1} max={10} defaultValue={1} className={field} />
        </div>
        <div>
          <label htmlFor="repeat" className={label}>Repeat weekly</label>
          <select id="repeat" name="repeat" defaultValue="1" className={field}>
            <option value="1">Just this date</option>
            {[2, 3, 4, 6, 8, 12].map((n) => (
              <option key={n} value={n}>For {n} weeks</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center min-h-11 px-6 rounded-xl font-semibold text-[0.92rem] bg-maroon text-[#FFF8EC] hover:bg-maroon-2 disabled:opacity-60 transition-colors focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-3"
        >
          {pending ? "Adding…" : "Add time"}
        </button>
        {state.error && <p role="alert" className="text-[0.88rem] text-maroon">{state.error}</p>}
        {state.ok && <p role="status" className="text-[0.88rem] text-gold font-medium">{state.ok}</p>}
      </div>
    </form>
  );
}
