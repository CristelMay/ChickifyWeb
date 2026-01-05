import React, { useMemo } from "react";
import { LuClock2 } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";

export default function WhatTimeToCleanTab() {
  const data = useMemo(
    () => ({
      title: "What time to clean",
      subtitle: "Best schedule",
      bullets: [
        "Morning (after first egg collection): quick scrape + remove wet spots.",
        "Midday: check drinkers (no leaks), top-up water, remove spilled feed.",
        "Late afternoon: quick sweep, remove trash, prepare for the night.",
        "Weekly deep clean: choose a low-stress time (not during extreme heat).",
      ],
      warning:
        "Do not stress hens during peak laying—be calm and consistent with movement and noise.",
    }),
    []
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {/* Icon square */}
          <div className="mt-0.5 grid h-11 w-11 place-items-center rounded-2xl bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200">
            <LuClock2 className="text-[20px]" />
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

      {/* Warning */}
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
