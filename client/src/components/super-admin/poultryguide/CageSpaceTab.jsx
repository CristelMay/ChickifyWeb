import React, { useMemo } from "react";
import { LuLayoutGrid } from "react-icons/lu";

export default function CageSpaceRequirementsTab() {
  const data = useMemo(
    () => ({
      title: "Cage Space Requirements",
      subtitle: "guide from DA",
      bullets: [
        "Layers (space guide): Day-old to 4 weeks — 15 sq.in./chick.",
        "Layers (space guide): 4 to 8 weeks — 30 sq.in./chick.",
        "Layers (space guide): 9 weeks to laying age — 50–60 sq.cm./bird.",
      ],
    }),
    []
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {/* ICON IN SQUARE */}
          <div className="mt-0.5 grid h-11 w-11 place-items-center rounded-2xl bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200">
            <LuLayoutGrid className="text-[20px]" />
          </div>

          <div>
            <div className="text-lg font-bold text-slate-900">{data.title}</div>
            <div className="mt-0.5 text-[15px] font-medium text-slate-500">
              {data.subtitle}
            </div>
          </div>
        </div>
      </div>

      {/* Yellow bullets */}
      <ul className="mt-5 space-y-3">
        {(data.bullets || []).map((b, i) => (
          <li key={i} className="flex gap-3 text-[15.5px] text-slate-700">
            <span className="mt-[10px] h-2 w-2 shrink-0 rounded-full bg-yellow-500 ring-2 ring-yellow-100" />
            <span className="leading-7">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
