import React, { useMemo, useState } from "react";
import { LuActivity, LuChevronDown, LuChevronUp } from "react-icons/lu";

/* ---------------- default data ---------------- */
const DEFAULT_DATA = {
  header: {
    title: "Chicken phases (egg layers)",
  },
  phases: [
    {
      key: "chick",
      name: "Chick",
      range: "0–6 weeks",
      note: "warmth, clean water, chick starter feed, dry litter.",
    },
    {
      key: "grower",
      name: "Grower/Pullet",
      range: "6–16 weeks",
      note: "steady growth; avoid too much fat.",
    },
    {
      key: "pol",
      name: "Point-of-Lay",
      range: "16–20 weeks",
      note: "gradually increase light; shift to layer feed when laying starts.",
    },
    {
      key: "peak",
      name: "Peak Lay",
      range: "20–35 weeks",
      note: "stable routine, enough calcium, good ventilation, low stress.",
    },
    {
      key: "late",
      name: "Mid/Late Lay",
      range: "35+ weeks",
      note: "expect slow decline; keep nutrition consistent; check parasites.",
    },
    {
      key: "molt",
      name: "Molting",
      range: "",
      note: "many hens stop laying; support with good feed/protein and reduce stress.",
    },
  ],
  alert:
    "Big sudden changes (feed, light, moving coop) can trigger stress + egg drop.",
};

export default function ChickenPhasesTab() {
  const [expanded, setExpanded] = useState(true);

  const phases = useMemo(() => DEFAULT_DATA.phases, []);

  return (
    <div>
      {/* Header row */}
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-[260px]">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-50 ring-1 ring-yellow-200">
              <LuActivity className="text-xl text-yellow-700" />
            </div>

            <div>
              <div className="text-xl font-bold text-slate-900">
                {DEFAULT_DATA.header.title}
              </div>

              <div className="mt-1 text-sm text-slate-600">
                Quick overview of common egg-layer stages and what to focus on.
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
          <ul className="grid gap-2 text-sm text-slate-700">
            {phases.map((p) => (
              <li key={p.key} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow-400" />
                <span>
                  <span className="font-bold text-slate-900">
                    {p.name}
                    {p.range ? ` (${p.range})` : ""}:
                  </span>{" "}
                  {p.note}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 rounded-xl bg-yellow-50 p-4 text-sm text-slate-800 ring-1 ring-yellow-200">
            <span className="font-bold">Note:</span> {DEFAULT_DATA.alert}
          </div>
        </div>
      )}
    </div>
  );
}
