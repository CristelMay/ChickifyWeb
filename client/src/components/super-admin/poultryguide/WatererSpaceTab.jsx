import React, { useMemo } from "react";
import { LuDroplet } from "react-icons/lu";

export default function WatererSpaceRequirementsTab() {
  const data = useMemo(
    () => ({
      title: "Waterer space requirements",
      subtitle: "guide from DA",
      bullets: [
        "Watering space (minimum): Day-old to 4 weeks — 0.5 cm/bird OR two 1-gal fountains/100 birds.",
        "Watering space (minimum): 4 to 8 weeks — 0.6 to 1 cm/bird OR two 2-gal fountains/100 birds.",
        "Watering space (minimum): 9 weeks to near laying age — 1 to 2 cm/bird OR four 2-gal fountains/100 birds.",
      ],
      warning: "",
    }),
    []
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {/* icon square */}
          <div className="mt-0.5 grid h-11 w-11 place-items-center rounded-2xl bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200">
            <LuDroplet className="text-[20px]" />
          </div>

          <div>
            <div className="text-lg font-bold text-slate-900">{data.title}</div>
            <div className="mt-0.5 text-[15px] font-medium text-slate-500">
              {data.subtitle}
            </div>
          </div>
        </div>
      </div>

      {/* yellow bullets */}
      <ul className="mt-5 space-y-3">
        {(data.bullets || []).map((b, i) => (
          <li key={i} className="flex gap-3 text-[15.5px] text-slate-700">
            <span className="mt-[10px] h-2 w-2 shrink-0 rounded-full bg-yellow-500 ring-2 ring-yellow-100" />
            <span className="leading-7">{b}</span>
          </li>
        ))}
      </ul>

      {!!data.warning?.trim() && (
        <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-[15px] text-slate-700">
          {data.warning}
        </div>
      )}
    </div>
  );
}
