import React, { useMemo } from "react";
import { FiArchive } from "react-icons/fi";

/* ---------------- default data (from image) ---------------- */
const DEFAULT_DATA = {
  header: {
    title: "Egg Handling",
    subtitle: "Simple habits that reduce cracks, dirt, and spoilage during storage.",
  },
  bullets: [
    "Collect eggs often to reduce cracks and dirt.",
    "Store eggs in a clean tray/carton, away from sunlight and strong odors.",
    "Keep handling gentle: cracks = faster spoilage.",
    "Store eggs with pointed end down to help maintain freshness.",
    "Track date collected (FIFO: first in, first out).",
    "Practice daily fumigation of eggs.",
  ],
  note:
    "Small handling mistakes add up — clean storage + gentle handling protects quality and market value.",
};

/* ---------------- small UI bits ---------------- */
function IconBadge() {
  return (
    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-yellow-400 text-slate-900 ring-1 ring-yellow-300">
      <FiArchive className="text-lg" />
    </div>
  );
}

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-extrabold text-slate-800 ring-1 ring-yellow-200">
      {children}
    </span>
  );
}

/* ---------------- main tab (VIEW ONLY) ---------------- */
export default function EggHandlingTab() {
  const data = useMemo(() => DEFAULT_DATA, []);
  const bullets = useMemo(() => data.bullets, [data.bullets]);

  const chips = useMemo(() => {
    const t = bullets.join(" ").toLowerCase();
    const out = [];
    if (t.includes("collect")) out.push("Frequent collection");
    if (t.includes("tray") || t.includes("carton")) out.push("Clean storage");
    if (t.includes("sunlight") || t.includes("odors")) out.push("Avoid odor & sun");
    if (t.includes("pointed end")) out.push("Pointed end down");
    if (t.includes("fifo")) out.push("FIFO dating");
    if (t.includes("fumigation")) out.push("Daily fumigation");
    return out.slice(0, 5);
  }, [bullets]);

  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.06)] ring-1 ring-slate-200">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-[260px]">
          <div className="flex items-start gap-3">
            <IconBadge />
            <div>
              <div className="text-xl font-bold text-slate-900">{data.header.title}</div>
              <div className="mt-1 text-sm text-slate-600">{data.header.subtitle}</div>

              {!!chips.length && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {chips.map((c) => (
                    <Chip key={c}>{c}</Chip>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* "Checklist" cards */}
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {bullets.map((b, idx) => (
          <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-start gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-yellow-400 font-extrabold text-slate-900 ring-1 ring-yellow-300">
                {idx + 1}
              </div>
              <div className="text-sm text-slate-700">{b}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div className="mt-4 rounded-2xl bg-yellow-50 p-4 text-sm text-slate-800 ring-1 ring-yellow-200">
        <span className="font-extrabold">Reminder:</span> {data.note}
      </div>
    </div>
  );
}
