import React, { useMemo } from "react";
import { FiClock, FiInfo } from "react-icons/fi";

/* ---------------- default data (from your image) ---------------- */
const DEFAULT_DATA = {
  header: {
    title: "How Eggs Are Formed",
    subtitle: "A quick timeline from yolk release to laying.",
  },
  steps: [
    {
      key: "s1",
      text: "Yolk is released into the oviduct.",
      duration: "around 30 minutes",
    },
    {
      key: "s2",
      text: "Egg white (albumen) forms around the yolk and builds up.",
      duration: "around 3 hours",
    },
    {
      key: "s3",
      text: "Shell membranes are added and the egg shape is formed.",
      duration: "around 1 hour",
    },
    {
      key: "s4",
      text: "Shell is formed in the shell gland.",
      duration: "around 20 hours",
    },
    {
      key: "s5",
      text: "Bloom/cuticle is added, then the egg is laid.",
      duration: "",
    },
  ],
  totalNote:
    "Total time is commonly ~24–26 hours per egg (varies by bird & conditions).",
  tip:
    "The longest stage is usually shell formation in the shell gland. Stress, heat, nutrition, and age can affect timing.",
};

/* ---------------- tiny UI bits ---------------- */
function DurationChip({ value }) {
  if (!value) return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[12px] font-bold text-slate-700 ring-1 ring-slate-200">
      <FiClock className="text-[13px]" />
      {value}
    </span>
  );
}

function StepNumber({ n }) {
  return (
    <div className="grid h-9 w-9 place-items-center rounded-xl bg-yellow-400 text-sm font-extrabold text-slate-900 shadow-sm ring-1 ring-yellow-300">
      {n}
    </div>
  );
}

/* ---------------- main tab (VIEW ONLY) ---------------- */
export default function EggFormationTab() {
  const data = useMemo(() => DEFAULT_DATA, []);
  const steps = useMemo(() => data.steps, [data.steps]);

  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.06)] ring-1 ring-slate-200">
      {/* top header row */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-[240px]">
          <div className="text-xl font-bold text-slate-900">{data.header.title}</div>
          <div className="mt-1 text-sm text-slate-600">{data.header.subtitle}</div>
        </div>
      </div>

      {/* summary strip */}
      <div className="mt-4 grid gap-3 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl bg-yellow-50 p-4 ring-1 ring-yellow-200">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <FiClock />
            Estimated total time
          </div>
          <div className="mt-1 text-sm text-slate-700">{data.totalNote}</div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <FiInfo />
            Tip
          </div>
          <div className="mt-1 text-sm text-slate-700">{data.tip}</div>
        </div>
      </div>

      {/* timeline */}
      <div className="mt-5">
        <div className="text-md font-bold text-slate-800">Timeline steps</div>

        <div className="mt-3 grid gap-3">
          {steps.map((s, idx) => (
            <div
              key={s.key}
              className="relative rounded-2xl border border-slate-200 bg-white p-4"
            >
              <div className="flex gap-4">
                <div className="relative">
                  <StepNumber n={idx + 1} />
                  {idx !== steps.length - 1 ? (
                    <div className="mx-auto mt-2 h-[calc(100%-44px)] w-[3px] rounded-full bg-slate-200" />
                  ) : null}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="text-base font-bold text-slate-900">{s.text}</div>
                    <DurationChip value={s.duration} />
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                    <span>Stage {idx + 1} in the egg-formation process</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
