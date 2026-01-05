// src/components/admin/poultry-guide/HeatStressTab.jsx
import React, { useMemo, useState } from "react";
import { LuChevronDown, LuChevronUp, LuThermometerSun } from "react-icons/lu";

/* ---------------- default data (view-only) ---------------- */
const DEFAULT_DATA = {
  header: {
    title: "Heat stress: signs + what to do",
    tag: "Hot weather",
  },
  bullets: [
    "Early signs: open-mouth panting, faster breathing, wings held away from body.",
    "Behavior: less movement, more resting, reduced feed intake, drinking more water.",
    "Physical: pale comb/wattles, weakness/limp posture.",
    "Egg impact: fewer eggs + thinner shells because birds eat less.",
    "Do now: shade, ventilation, cool clean water (multiple points), electrolytes if available.",
    "Emergency: limp/unresponsive = cool immediately (cool water, not ice; avoid soaking head).",
  ],
  alert:
    "If a chicken becomes limp/unconscious, treat it as an emergency and cool immediately.",
  items: [
    {
      key: "panting",
      title: "Open-mouth panting",
      status: "Watch",
      description:
        "Bird breathes with open beak and faster breathing to release heat. Provide shade and airflow.",
      imageUrl: "",
    },
    {
      key: "wings",
      title: "Wings held out",
      status: "Watch",
      description:
        "Cooling posture: wings away from body to release heat. Improve ventilation and reduce crowding.",
      imageUrl: "",
    },
    {
      key: "lethargy",
      title: "Lethargy / weak posture",
      status: "Watch",
      description:
        "Less movement, sitting more, looks tired. Offer cool water and place in shaded area.",
      imageUrl: "",
    },
    {
      key: "palecomb",
      title: "Pale comb/wattles",
      status: "Watch",
      description:
        "Can indicate stress and reduced circulation. Monitor closely and cool environment.",
      imageUrl: "",
    },
    {
      key: "eggdrop",
      title: "Egg drop / thin shells",
      status: "Watch",
      description:
        "Heat reduces appetite and calcium intake. Ensure access to water and minerals; cool the coop.",
      imageUrl: "",
    },
    {
      key: "collapse",
      title: "Collapse / unresponsive",
      status: "Urgent",
      description:
        "Emergency. Cool immediately using cool water (not ice). Keep airway clear and consult a vet.",
      imageUrl: "",
    },
  ],
};

/* ---------------- small UI bits ---------------- */
const STATUS_STYLES = {
  Normal: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  Watch: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  Urgent: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
};

function Pill({ status }) {
  const cls =
    STATUS_STYLES[status] ?? "bg-slate-50 text-slate-700 ring-1 ring-slate-200";
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-semibold",
        cls,
      ].join(" ")}
    >
      {status}
    </span>
  );
}

function PhotoBox({ imageUrl, title }) {
  return (
    <div className="relative overflow-hidden rounded-xl ring-1 ring-slate-200">
      <div className="aspect-[16/10] w-full bg-gradient-to-br from-yellow-50 via-white to-slate-50">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="rounded-xl bg-white/70 px-3 py-2 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
              Image placeholder
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- main tab (view-only) ---------------- */
export default function HeatStressTab() {
  const [expanded, setExpanded] = useState(true);

  const ordered = useMemo(() => DEFAULT_DATA.items, []);

  return (
    <div>
      {/* Header row */}
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-[260px]">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-50 ring-1 ring-yellow-200">
              <LuThermometerSun className="text-xl text-yellow-700" />
            </div>

            <div>
              <div className="text-xl font-bold text-slate-900">
                {DEFAULT_DATA.header.title}
              </div>

              <div className="mt-1 text-sm text-slate-600">
                Quick checklist for hot days — respond early to prevent collapse.
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
        <>
          {/* Notes + alert */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <ul className="grid gap-2 text-sm text-slate-700">
              {DEFAULT_DATA.bullets.map((b, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 rounded-xl bg-yellow-50 p-4 text-sm text-slate-800 ring-1 ring-yellow-200">
              <span className="font-bold">Emergency:</span> {DEFAULT_DATA.alert}
            </div>
          </div>

          {/* Cards */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ordered.map((it) => (
              <div
                key={it.key}
                className="group rounded-2xl bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.05)] ring-1 ring-slate-200 transition hover:-translate-y-[1px] hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-base font-extrabold text-slate-900">{it.title}</div>
                  <Pill status={it.status} />
                </div>

                <div className="mt-3">
                  <PhotoBox imageUrl={it.imageUrl} title={it.title} />
                </div>

                <div className="mt-3 text-sm text-slate-700">{it.description}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
