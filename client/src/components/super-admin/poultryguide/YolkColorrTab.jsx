import React, { useMemo } from "react";
import { FiDroplet, FiInfo } from "react-icons/fi";

/* ---------------- helpers ---------------- */
function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

/* ---------------- default data (from your image) ---------------- */
const DEFAULT_DATA = {
  header: {
    title: "Yolk color: what it usually means",
    badge: "Quality",
    subtitle: "Simple guide on why yolks look lighter or deeper in color.",
  },
  bullets: [
    "Yolk color is mostly affected by feed pigments (carotenoids/xanthophylls).",
    "More corn, greens, marigold, or pigment-rich feeds often produce deeper yellow/orange yolks.",
    "Paler yolks usually mean less pigment in the diet (not automatically “bad”).",
    "Yolk color alone doesn’t guarantee nutrition — focus on balanced feed and bird health.",
  ],
  note: "Use yolk color as a diet signal, not a single “quality score.”",
};

/* ---------------- small UI bits ---------------- */
function MiniPill({ icon, label }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-700 ring-1 ring-slate-200">
      <span className="text-slate-600">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

/* ---------------- main tab (VIEW ONLY) ---------------- */
export default function YolkColorTab() {
  const data = useMemo(() => DEFAULT_DATA, []);
  const bullets = useMemo(() => data.bullets, [data.bullets]);

  // purely visual, derived from bullet count (keeps it UI-only)
  const strength = clamp(bullets.length, 1, 6);

  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.06)] ring-1 ring-slate-200">
      {/* Header row */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-[240px]">
          <div className="text-xl font-bold text-slate-900">{data.header.title}</div>
          <div className="mt-1 text-sm text-slate-600">{data.header.subtitle}</div>
        </div>
      </div>

      {/* New layout */}
      <div className="mt-5 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        {/* Left: key points card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-yellow-400 text-slate-900 ring-1 ring-yellow-300">
                <FiDroplet />
              </div>
              <div>
                <div className="text-sm font-extrabold text-slate-900">Key points</div>
                <div className="text-xs text-slate-500">
                  What yolk color usually tells you
                </div>
              </div>
            </div>

            {/* “signal bar” purely for style */}
            <div className="hidden items-center gap-1 sm:flex" aria-hidden="true">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className={[
                    "h-2 w-5 rounded-full ring-1 ring-slate-200",
                    i < strength ? "bg-yellow-300" : "bg-slate-100",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-2">
            {bullets.map((b, idx) => (
              <div
                key={idx}
                className="flex gap-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200"
              >
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-yellow-400" />
                <div className="text-sm text-slate-700">{b}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: takeaway + chips */}
        <div className="grid gap-4">
          <div className="rounded-2xl bg-yellow-50 p-4 ring-1 ring-yellow-200">
            <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
              <FiInfo />
              Quick takeaway
            </div>
            <div className="mt-2 text-sm text-slate-700">{data.note}</div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-sm font-extrabold text-slate-900">At a glance</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <MiniPill icon={<FiDroplet />} label="Feed pigments matter most" />
              <MiniPill icon={<FiDroplet />} label="Deeper color = more pigment" />
              <MiniPill icon={<FiDroplet />} label="Paler = less pigment" />
              <MiniPill icon={<FiDroplet />} label="Color ≠ guaranteed nutrition" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
