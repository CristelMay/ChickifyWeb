import React, { useMemo } from "react";
import { FiAlertCircle } from "react-icons/fi";

/* ---------------- default data (from image) ---------------- */
const DEFAULT_DATA = {
  header: {
    title: "Dirty eggs: what it means and what to do",
    subtitle:
      "Dirty shells raise contamination risk — fix the source first, then clean correctly.",
  },
  bullets: [
    "Dirty eggs usually mean the egg contacted manure, wet litter, or dirty nest areas.",
    "It increases the risk of contamination and lowers market value.",
    "Fix the source: keep nests dry/clean, change litter often, and collect eggs more frequently.",
    "Clean eggs properly: start with dry cleaning (brush/light sandpaper). If wet washing is needed, wash quickly using clean warm running water, then dry completely.",
    "Never mix very dirty eggs with clean eggs in the same tray for selling.",
  ],
  alert:
    'Do not soak when wet washing, as this removes the protective "bloom" layer, requiring immediate refrigeration.',
  sections: [
    {
      key: "s1",
      title: "Fix the source (prevention)",
      points: ["Keep nests dry", "Change litter often", "Collect eggs more frequently"],
    },
    {
      key: "s2",
      title: "Clean correctly",
      points: [
        "Dry clean first (brush / light sandpaper)",
        "If needed: quick warm running water wash",
        "Dry completely after washing",
      ],
    },
    {
      key: "s3",
      title: "Sorting & selling",
      points: ["Separate very dirty eggs", "Do not mix with clean eggs in the same tray"],
    },
  ],
};

/* ---------------- small UI bits ---------------- */
function BadgeIcon() {
  return (
    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-yellow-400 text-slate-900 ring-1 ring-yellow-300">
      <FiAlertCircle className="text-lg" />
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-extrabold text-slate-800 ring-1 ring-yellow-200">
      {children}
    </span>
  );
}

/* ---------------- main tab (VIEW ONLY) ---------------- */
export default function DirtyEggsTab() {
  const data = useMemo(() => DEFAULT_DATA, []);
  const bullets = useMemo(() => data.bullets, [data.bullets]);
  const sections = useMemo(() => data.sections, [data.sections]);

  const chipText = useMemo(() => {
    const t = bullets.join(" ").toLowerCase();
    const chips = [];
    if (t.includes("manure") || t.includes("dirty")) chips.push("Contamination risk");
    if (t.includes("nest") || t.includes("litter")) chips.push("Nest hygiene");
    if (t.includes("collect")) chips.push("Frequent collection");
    if (t.includes("dry clean") || t.includes("sandpaper")) chips.push("Dry cleaning first");
    if (t.includes("soak")) chips.push("No soaking");
    return chips.slice(0, 4);
  }, [bullets]);

  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.06)] ring-1 ring-slate-200">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-[260px]">
          <div className="flex items-start gap-3">
            <BadgeIcon />
            <div>
              <div className="text-xl font-bold text-slate-900">{data.header.title}</div>
              <div className="mt-1 text-sm text-slate-600">{data.header.subtitle}</div>

              {!!chipText.length && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {chipText.map((c) => (
                    <Pill key={c}>{c}</Pill>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Top bullets */}
      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="text-sm font-extrabold text-slate-900">What it means</div>
        <div className="mt-3 grid gap-2">
          {bullets.map((b, idx) => (
            <div
              key={idx}
              className="flex gap-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200"
            >
              <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-yellow-400" />
              <div className="text-sm text-slate-700">{b}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Action sections */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {sections.map((sec) => (
          <div key={sec.key} className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-sm font-extrabold text-slate-900">{sec.title}</div>

            <div className="mt-3 grid gap-2">
              {sec.points.map((p, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700 ring-1 ring-slate-200"
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Warning */}
      <div className="mt-4 rounded-2xl bg-yellow-50 p-4 ring-1 ring-yellow-200">
        <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
          <FiAlertCircle />
          Do this (important)
        </div>
        <div className="mt-2 text-sm text-slate-800">{data.alert}</div>
      </div>
    </div>
  );
}
