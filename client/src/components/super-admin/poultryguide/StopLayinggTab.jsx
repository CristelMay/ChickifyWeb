import React, { useMemo, useState } from "react";
import { FiHelpCircle } from "react-icons/fi";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

const DEFAULT_DATA = {
  header: {
    title: "Why chickens stop laying eggs",
    tag: "Checklist",
  },
  bullets: [
    "Not enough light hours (short days).",
    "Molting.",
    "Stress: predators, overcrowding, loud noise, heat/cold stress.",
    "Nutrition: low protein, no calcium source, too many treats, sudden feed change.",
    "Water issues: dirty/low water, dehydration in heat.",
    "Parasites/illness: worms, mites, respiratory, digestive infection.",
    "Age (older hens lay less).",
    "Broodiness (wants to sit).",
  ],
  alert: "Egg drop + lethargy, pale comb, or blood in poop = urgent check.",
};

export default function StopLayingTab() {
  const [expanded, setExpanded] = useState(true);

  const bullets = useMemo(() => DEFAULT_DATA.bullets, []);

  return (
    <div>
      {/* Header row */}
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-[260px]">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-50 ring-1 ring-yellow-200">
              <FiHelpCircle className="text-xl text-yellow-700" />
            </div>

            <div>
              <div className="text-xl font-bold text-slate-900">
                {DEFAULT_DATA.header.title}
              </div>

              <div className="mt-1 text-sm text-slate-600">
                Quick checklist to troubleshoot egg drop before panicking.
              </div>
            </div>
          </div>
        </div>

        {/* Collapse/Expand only */}
        {/* <button
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          title={expanded ? "Collapse" : "Expand"}
        >
          {expanded ? <LuChevronUp /> : <LuChevronDown />}
          {expanded ? "Collapse" : "Expand"}
        </button> */}
      </div>

      {!expanded ? null : (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          {/* Checklist bullets */}
          <ul className="grid gap-2 text-sm text-slate-700">
            {bullets.map((b, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow-400" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* Warning box */}
          <div className="mt-4 rounded-xl bg-yellow-50 p-4 text-sm text-slate-800 ring-1 ring-yellow-200">
            <span className="font-bold">Warning:</span> {DEFAULT_DATA.alert}
          </div>
        </div>
      )}
    </div>
  );
}
