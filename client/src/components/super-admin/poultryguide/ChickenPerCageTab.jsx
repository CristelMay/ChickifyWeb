import React, { useMemo } from "react";
import { LuUsers } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";

export default function HeadsPerCageTab() {
  const data = useMemo(
    () => ({
      title: "How many heads per cage",
      subtitle: "Use a quick formula",
      bullets: [
        "Step 1: compute cage floor area = width(cm) × depth(cm).",
        "Step 2: choose your space/hen (cm²) based on your coop standard.",
        "Heads per cage = floor(area ÷ spacePerHen).",
        "Example: 50×45cm = 2,250cm². If 750cm²/hen → 3 hens.",
      ],
      warning:
        "If birds are large or you see feather pecking / heat stress, reduce heads per cage.",
    }),
    []
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {/* icon square */}
          <div className="mt-0.5 grid h-11 w-11 place-items-center rounded-2xl bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200">
            <LuUsers className="text-[20px]" />
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

      {/* warning */}
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
