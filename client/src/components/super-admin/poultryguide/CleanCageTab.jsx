import React, { useMemo } from "react";
import { LuLeaf } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";

export default function HowToCleanCageTab() {
  const data = useMemo(
    () => ({
      title: "How To Clean The Cage",
      subtitle: "Daily + Weekly Routine",
      bullets: [
        "Remove wet droppings and spilled feed (less smell, less flies).",
        "Scrape/brush the wire floor and manure tray (if you have one).",
        "Wash drinkers & feeders with soap + clean water (rinse well).",
        "Disinfect high-touch parts (door latch, feeder lip, drinker line).",
        "Let surfaces dry before birds settle (dry = less bacteria).",
        "Weekly: deep-clean corners, rust spots, and under cages; replace broken wires.",
      ],
      warning:
        "Avoid strong fumes while birds are inside. If using disinfectant, ventilate well and follow label dilution.",
    }),
    []
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {/* icon square */}
          <div className="mt-0.5 grid h-11 w-11 place-items-center rounded-2xl bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200">
            <LuLeaf className="text-[20px]" />
          </div>

          <div>
            <div className="text-lg font-bold text-slate-900">{data.title}</div>
            <div className="mt-0.5 text-[15px] font-medium text-slate-500">
              {data.subtitle}
            </div>
          </div>
        </div>
      </div>

      {/* bullets */}
      <ul className="mt-5 space-y-3">
        {(data.bullets || []).map((b, i) => (
          <li key={i} className="flex gap-3 text-[15.5px] text-slate-700">
            <span className="mt-[10px] h-2 w-2 shrink-0 rounded-full bg-yellow-500 ring-2 ring-yellow-100" />
            <span className="leading-7">{b}</span>
          </li>
        ))}
      </ul>

      {!!data.warning?.trim() && (
        <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
          <div className="flex items-start gap-3 text-[15px] text-slate-700">
            <FiAlertTriangle className="mt-0.5 text-[18px] text-yellow-700" />
            <div className="leading-7">{data.warning}</div>
          </div>
        </div>
      )}
    </div>
  );
}
