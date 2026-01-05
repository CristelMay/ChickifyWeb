import React, { useMemo, useState } from "react";
import { LuFeather, LuChevronDown, LuChevronUp } from "react-icons/lu";

const DEFAULT_DATA = {
  header: {
    title: "Molting: how to spot it",
  },
  bullets: [
    "Patchy feather loss (often starts head/neck then moves down body).",
    "Egg production drops or stops—molting uses lots of protein/energy.",
    "Pin feathers appear as spiky “quills” (new growth) and can be painful.",
    "More feathers on the coop floor (looks like pillow fight).",
    "Support: minimize stress, keep routine stable, ensure good protein + clean water.",
  ],
  alert:
    "If feather loss + intense itching/scabs that don’t regrow, check mites/lice.",
  items: [
    {
      key: "patchy",
      title: "Patchy molt",
      status: "Watch",
      description:
        "Feather loss around neck/body is common. Egg production usually drops or stops.",
      imageUrl: "",
    },
    {
      key: "heavy",
      title: "Heavy feather drop",
      status: "Watch",
      description:
        "Can be normal molt. If itching is extreme, check for mites/lice too.",
      imageUrl: "",
    },
    {
      key: "pin",
      title: "Pin feathers",
      status: "Watch",
      description:
        "New feather growth looks like spikes/quills and can be tender or painful.",
      imageUrl: "",
    },
  ],
};

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

export default function MoltingTab() {
  const [expanded, setExpanded] = useState(true);

  const items = useMemo(() => DEFAULT_DATA.items, []);

  return (
    <div>
      {/* Header row */}
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-[260px]">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-50 ring-1 ring-yellow-200">
              <LuFeather className="text-xl text-yellow-700" />
            </div>

            <div>
              <div className="text-xl font-bold text-slate-900">
                {DEFAULT_DATA.header.title}
              </div>

              <div className="mt-1 text-sm text-slate-600">
                Molting is common; focus on support and watch for parasites.
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
          {/* Bullets */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <ul className="grid gap-2 text-sm text-slate-700">
              {DEFAULT_DATA.bullets.map((b, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* Warning box */}
            <div className="mt-4 rounded-xl bg-yellow-50 p-4 text-sm text-slate-800 ring-1 ring-yellow-200">
              <span className="font-bold">Note:</span> {DEFAULT_DATA.alert}
            </div>
          </div>

          {/* Cards */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it) => (
              <div
                key={it.key}
                className="group rounded-2xl bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.05)] ring-1 ring-slate-200 transition hover:-translate-y-[1px] hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-base font-extrabold text-slate-900">{it.title}</div>
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
