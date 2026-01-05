import React, { useMemo } from "react";
import { FiAlertTriangle } from "react-icons/fi";

/* ---------------- default data (from image) ---------------- */
const DEFAULT_DATA = {
  header: {
    title: "Soft / Thin Egg Shells: Common causes",
    subtitle: "Most cases come down to calcium, absorption, stress, age, or illness.",
  },
  bullets: [
    "Not enough calcium in the layer diet (or inconsistent calcium intake).",
    "Low vitamin D3 / poor mineral balance (affects calcium absorption).",
    "Heat stress, dehydration, or sudden feed changes (temporary shell issues).",
    "Older hens often lay thinner shells; very young layers can lay odd shells too.",
    "Disease can also cause shell issues—watch for a sudden drop in egg production plus soft-shelled eggs and abnormal droppings.",
  ],
  alert:
    "If you see sudden drop in egg production + soft-shelled eggs + sick birds, isolate and consult a veterinarian ASAP.",
};

/* ---------------- small UI bits ---------------- */
function IconBadge() {
  return (
    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-yellow-400 text-slate-900 ring-1 ring-yellow-300">
      <FiAlertTriangle className="text-lg" />
    </div>
  );
}

/* ---------------- main tab (VIEW ONLY) ---------------- */
export default function SoftThinEggShellsTab() {
  const data = useMemo(() => DEFAULT_DATA, []);
  const bullets = useMemo(() => data.bullets, [data.bullets]);

  // UI-only tags derived from content (no backend)
  const tags = useMemo(() => {
    const t = new Set();
    const text = bullets.join(" ").toLowerCase();
    if (text.includes("calcium")) t.add("Calcium");
    if (text.includes("vitamin d")) t.add("Vitamin D3");
    if (text.includes("heat") || text.includes("dehyd")) t.add("Heat/Water");
    if (text.includes("older") || text.includes("young")) t.add("Age");
    if (text.includes("disease")) t.add("Illness");
    return Array.from(t);
  }, [bullets]);

  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.06)] ring-1 ring-slate-200">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-[260px]">
          <div className="flex items-start gap-3">
            <IconBadge />
            <div>
              <div className="text-xl font-bold text-slate-900">
                {data.header.title}
              </div>
              <div className="mt-1 text-sm text-slate-600">
                {data.header.subtitle}
              </div>

              {!!tags.length && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((x) => (
                    <span
                      key={x}
                      className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-extrabold text-slate-800 ring-1 ring-yellow-200"
                    >
                      {x}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Causes list */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-sm font-extrabold text-slate-900">Common causes</div>
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

        {/* Alert + quick check */}
        <div className="grid gap-4">
          <div className="rounded-2xl bg-yellow-50 p-4 ring-1 ring-yellow-200">
            <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
              <FiAlertTriangle />
              Important warning
            </div>
            <div className="mt-2 text-sm text-slate-800">{data.alert}</div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-sm font-extrabold text-slate-900">Quick checks</div>
            <div className="mt-3 grid gap-2 text-sm text-slate-700">
              <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
                <div className="font-extrabold text-slate-900">Diet</div>
                <div className="mt-1">
                  Calcium source + consistency (layer feed, oyster shell).
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
                <div className="font-extrabold text-slate-900">Environment</div>
                <div className="mt-1">
                  Heat stress + water access (hydration affects shells).
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
                <div className="font-extrabold text-slate-900">Pattern</div>
                <div className="mt-1">
                  Sudden production drop + sick signs = act fast.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
