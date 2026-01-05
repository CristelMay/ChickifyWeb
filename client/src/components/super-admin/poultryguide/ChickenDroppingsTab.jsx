import React, { useMemo } from "react";
import { LuDroplet } from "react-icons/lu";

/* ---------------- styles + data ---------------- */
const STATUS_STYLES = {
  Normal: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  Watch: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  Urgent: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
};

const DEFAULT_DATA = {
  header: { title: "Chicken poop" },
  bullets: [
    "Normal poop: brown + white cap (urates).",
    "One weird poop is common; repeated abnormal poop is the warning.",
    "Always check behavior: appetite, energy, egg production, hydration.",
  ],
  alert:
    "Blood/red repeatedly, tar-black, or very watery for 2+ days = isolate and consult a vet.",
  items: [
    {
      key: "normal",
      title: "Normal",
      status: "Normal",
      description:
        "Usually brown + a white cap. Stool is semi-solid; urates look like white dusting/cap.",
      looksLike: "Brown stool with a white urate cap",
      imageUrl: "",
    },
    {
      key: "green",
      title: "Green",
      status: "Watch",
      description:
        "Often from too many greens. If repeated and bird looks weak, watch for illness signs.",
      looksLike: "Dark/bright green droppings",
      imageUrl: "",
    },
    {
      key: "yellow",
      title: "Yellow",
      status: "Watch",
      description:
        "Can be diet-related. If watery + lethargic, watch for coccidiosis and other issues.",
      looksLike: "Yellow/mustard poop",
      imageUrl: "",
    },
    {
      key: "black",
      title: "Black",
      status: "Urgent",
      description:
        "Sometimes from dark treats. Persistent black/tarry poop can signal internal bleeding.",
      looksLike: "Very dark/black, tarry droppings",
      imageUrl: "",
    },
    {
      key: "orange",
      title: "Orange",
      status: "Watch",
      description:
        "Often intestinal lining (can be normal sometimes). Monitor if it repeats.",
      looksLike: "Orange stool",
      imageUrl: "",
    },
    {
      key: "bluegreen",
      title: "Aquamarine / Blue-green",
      status: "Watch",
      description:
        "Can happen with diet change. If weak + repeated, investigate further.",
      looksLike: "Blue-green poop",
      imageUrl: "",
    },
    {
      key: "white",
      title: "White (mostly white)",
      status: "Watch",
      description:
        "Can be too much water. If repeated + sick-looking, watch for disease signs.",
      looksLike: "Mostly white watery droppings",
      imageUrl: "",
    },
    {
      key: "watery",
      title: "Clear / Watery",
      status: "Watch",
      description:
        "Often excess water/heat stress. If persistent, could be digestive issue — monitor closely.",
      looksLike: "Mostly clear liquid with small bits",
      imageUrl: "",
    },
  ],
};

/* ---------------- ui bits ---------------- */
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

/* ---------------- main tab (VIEW ONLY) ---------------- */
export default function ChickenPoopTab() {
  const data = useMemo(() => DEFAULT_DATA, []);
  const ordered = useMemo(() => data.items, [data.items]);

  return (
    <div>
      {/* Header row */}
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-[260px]">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-50 ring-1 ring-yellow-200">
              <LuDroplet className="text-xl text-yellow-700" />
            </div>

            <div>
              <div className="text-xl font-extrabold text-slate-900">
                {data.header.title}
              </div>

              <div className="mt-1 text-sm text-slate-600">
                Quick visual guide for common droppings — focus on patterns, not one off.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes + alert */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <ul className="grid gap-2 text-sm text-slate-700">
          {data.bullets.map((b, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow-400" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 rounded-xl bg-yellow-50 p-4 text-sm text-slate-800 ring-1 ring-yellow-200">
          <span className="font-bold">Heads up:</span> {data.alert}
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

            <div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs text-slate-700 ring-1 ring-slate-200">
              <div className="font-bold text-slate-800">Looks like</div>
              <div className="mt-1">{it.looksLike}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
