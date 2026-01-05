import React, { useMemo, useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import {
  LuSunrise,
  LuSunset,
  LuFlame,
  LuWheat,
  LuFish,
  LuShell,
  LuDroplet,
  LuLeaf,
  LuBeaker,
  LuCloud,
  LuSun,
} from "react-icons/lu";
import FeedGuideTable from "@/components/super-admin/tables/FeedGuideeTable";

const TABS = [
  "Feeding Guide",
  "Recommended Feeding Time",
  "Can/Can't",
  "Essential Feed Ingredients",
  "Water Intake Requirements",
];

function PlaceholderTab({ title }) {
  return (
    <div>
      <div className="text-lg font-semibold text-slate-800">{title}</div>
      <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
        UI placeholder for: <span className="font-semibold">{title}</span>
      </div>
    </div>
  );
}

/* -------------------- RECOMMENDED FEEDING TIME (VIEW ONLY) -------------------- */
function RecommendedFeedingTimeTab() {
  const data = useMemo(
    () => ({
      schedules: [
        {
          id: "morning",
          title: "Morning feed",
          time: "6:00–8:00 AM",
          note: "keep a consistent routine",
        },
        {
          id: "afternoon",
          title: "Afternoon feed",
          time: "4:00–6:00 PM",
          note: "supports stronger late-day intake",
        },
        {
          id: "hotdays",
          title: "Hot days",
          time: "12:00 noon",
          note: "wet mash can help appetite",
        },
      ],
      habits: [
        { id: "h1", text: "Keep a regular feeding routine", tone: "yellow" },
        { id: "h2", text: "Avoid abrupt feed changes", tone: "rose" },
        {
          id: "h3",
          text: "Wet mash at noon can help appetite on hot days",
          tone: "blue",
        },
      ],
    }),
    []
  );

  const chipClass = (tone) => {
    if (tone === "yellow") return "border-yellow-200 bg-yellow-50 text-slate-800";
    if (tone === "rose") return "border-rose-200 bg-rose-50 text-slate-800";
    if (tone === "blue") return "border-sky-200 bg-sky-50 text-slate-800";
    return "border-slate-200 bg-slate-50 text-slate-800";
  };

  const IconForRow = ({ title, time }) => {
    const cls = "text-xl text-slate-700";
    const t = (title ?? "").toLowerCase();
    const tm = (time ?? "").toLowerCase();

    if (tm.includes("pm") || t.includes("afternoon") || t.includes("evening")) {
      return <LuSunset className={cls} />;
    }
    if (tm.includes("am") || t.includes("morning")) {
      return <LuSunrise className={cls} />;
    }
    if (t.includes("hot") || tm.includes("noon") || tm.includes("12:")) {
      return <LuFlame className={cls} />;
    }
    return <LuSunrise className={cls} />;
  };

  return (
    <div className="grid gap-6">
      {/* Card 1 */}
      <div className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] ring-1 ring-slate-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xl font-bold text-slate-900">Recommended Feeding Time</div>
            <div className="mt-1 text-sm text-slate-500">
              Use a consistent schedule every day.
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {data.schedules.map((row) => (
            <div key={row.id} className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100 ring-1 ring-yellow-200">
                <IconForRow title={row.title} time={row.time} />
              </div>

              <div className="min-w-0">
                <div className="text-base font-semibold text-slate-900">{row.title}</div>
                <div className="mt-0.5 break-words text-sm text-slate-500">
                  {row.time} <span className="mx-1">•</span> {row.note}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card 2 */}
      <div className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] ring-1 ring-slate-200">
        <div className="text-xl font-bold text-slate-900">Good feeding habits</div>
        <div className="mt-1 text-sm text-slate-500">
          Simple reminders that help performance.
        </div>

        <div className="mt-5 flex flex-col gap-3">
          {data.habits.map((h) => (
            <div
              key={h.id}
              className={[
                "w-full rounded-full border px-5 py-3 text-sm font-semibold",
                chipClass(h.tone),
              ].join(" ")}
            >
              {h.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------- CAN / CAN'T (VIEW ONLY) -------------------- */
function CanCantTab() {
  const data = useMemo(
    () => ({
      can: {
        title: "CAN feed (treats)",
        subtitle: "Serve in moderation.",
        items: [
          { id: "veg", title: "Vegetables", note: "lettuce, carrots, squash, cucumbers, kale" },
          { id: "herbs", title: "Herbs", note: "oregano, parsley, cilantro, thyme, basil" },
          { id: "fruits", title: "Fruits", note: "watermelon, strawberries, blueberries" },
          { id: "mealworms", title: "Mealworms", note: "high-protein treats, serve in moderation" },
          { id: "scratch", title: "Scratch grains", note: "treat only so it does not replace complete feed" },
          { id: "water", title: "Clean water", note: "keep available all day" },
        ],
      },
      cannot: {
        title: "CANNOT / AVOID",
        subtitle: "Foods that may be unsafe or harmful.",
        items: [
          { id: "moldy", title: "Moldy or rotten foods", note: "can cause illness or toxicity risk" },
          { id: "avocado", title: "Avocado pits or skins", note: "toxic parts (persin)" },
          { id: "choco", title: "Chocolate / caffeine", note: "can be harmful even in small amounts" },
          { id: "salty", title: "Very salty foods", note: "can cause dehydration and stress" },
          { id: "beans", title: "Raw/undercooked beans", note: "contain harmful compounds unless cooked" },
        ],
      },
    }),
    []
  );

  const Tile = ({ variant }) => {
    const base = "flex h-14 w-14 items-center justify-center rounded-2xl ring-1";
    if (variant === "can") {
      return (
        <div className={`${base} bg-emerald-100 ring-emerald-200`}>
          <FiCheck className="text-xl text-slate-700" />
        </div>
      );
    }
    return (
      <div className={`${base} bg-rose-100 ring-rose-200`}>
        <FiX className="text-xl text-slate-700" />
      </div>
    );
  };

  return (
    <div className="grid gap-6">
      {/* CAN */}
      <div className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] ring-1 ring-slate-200">
        <div>
          <div className="text-xl font-bold text-slate-900">{data.can.title}</div>
          <div className="mt-1 text-sm text-slate-500">{data.can.subtitle}</div>
        </div>

        <div className="mt-6 space-y-4">
          {data.can.items.map((row) => (
            <div key={row.id} className="flex items-start gap-4">
              <Tile variant="can" />
              <div className="min-w-0">
                <div className="text-base font-semibold text-slate-900">{row.title}</div>
                <div className="mt-0.5 whitespace-normal break-words text-sm text-slate-500">
                  {row.note}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CANNOT */}
      <div className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] ring-1 ring-slate-200">
        <div>
          <div className="text-xl font-bold text-slate-900">{data.cannot.title}</div>
          <div className="mt-1 text-sm text-slate-500">{data.cannot.subtitle}</div>
        </div>

        <div className="mt-6 space-y-4">
          {data.cannot.items.map((row) => (
            <div key={row.id} className="flex items-start gap-4">
              <Tile variant="cannot" />
              <div className="min-w-0">
                <div className="text-base font-semibold text-slate-900">{row.title}</div>
                <div className="mt-0.5 whitespace-normal break-words text-sm text-slate-500">
                  {row.note}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------- ESSENTIAL INGREDIENTS (VIEW ONLY) -------------------- */
function EssentialIngredientsTab() {
  const data = useMemo(
    () => ({
      title: "Essential ingredients in feeds",
      subtitle: "Common building blocks of layer feeds.",
      items: [
        { id: "energy", title: "Energy grains", note: "corn/maize, barley, wheat" },
        { id: "protein", title: "Protein meals", note: "soybean meal or canola meal" },
        { id: "calcium", title: "Calcium source", note: "limestone or oyster shell" },
        { id: "oils", title: "Oils or fats", note: "supports energy density" },
        { id: "vit", title: "Vitamin-mineral premix", note: "supports immunity and production" },
        { id: "water", title: "Clean water", note: "supports digestion and egg production" },
      ],
    }),
    []
  );

  const IconForEss = ({ title }) => {
    const cls = "text-xl text-slate-700";
    const t = (title ?? "").toLowerCase();

    if (t.includes("grain") || t.includes("energy")) return <LuWheat className={cls} />;
    if (t.includes("protein")) return <LuFish className={cls} />;
    if (t.includes("calcium") || t.includes("shell") || t.includes("limestone"))
      return <LuShell className={cls} />;
    if (t.includes("oil") || t.includes("fat")) return <LuDroplet className={cls} />;
    if (t.includes("vitamin") || t.includes("mineral") || t.includes("premix"))
      return <LuBeaker className={cls} />;
    if (t.includes("water")) return <LuDroplet className={cls} />;

    return <LuLeaf className={cls} />;
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] ring-1 ring-slate-200">
      <div>
        <div className="text-xl font-bold text-slate-900">{data.title}</div>
        <div className="mt-1 text-sm text-slate-500">{data.subtitle}</div>
      </div>

      <div className="mt-6 space-y-4">
        {data.items.map((row) => (
          <div key={row.id} className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100 ring-1 ring-yellow-200">
              <IconForEss title={row.title} />
            </div>

            <div className="min-w-0">
              <div className="text-base font-semibold text-slate-900">{row.title}</div>
              <div className="mt-0.5 whitespace-normal break-words text-sm text-slate-500">
                {row.note}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------- WATER INTAKE (VIEW ONLY) -------------------- */
function WaterIntakeTab() {
  const data = useMemo(
    () => ({
      title: "Water intake requirements",
      subtitle: "Quick reference for daily drinking needs per head.",
      bands: [
        {
          id: "moderate",
          label: "Moderate weather",
          hint: "cool to warm days",
          icon: "cloud",
          perHeadMin: 189,
          perHeadMax: 265,
          unit: "mL / head / day",
          tips: [
            "Keep waterers clean and filled.",
            "Place water near feeders to encourage intake.",
            "Check flow rate and avoid leaks.",
          ],
        },
        {
          id: "hot",
          label: "Hot weather",
          hint: "heat-stress risk",
          icon: "sun",
          perHeadMin: 265,
          perHeadMax: 341,
          unit: "mL / head / day",
          tips: [
            "Add extra drinkers and keep water cool.",
            "Improve ventilation and reduce overcrowding.",
            "Monitor panting and lethargy signs.",
          ],
        },
      ],
      note: "These are guideline ranges. Actual intake varies by breed, age, feed type, and environment.",
    }),
    []
  );

  const [active, setActive] = useState("moderate");

  const current = useMemo(
    () => data.bands.find((b) => b.id === active) ?? data.bands[0],
    [data.bands, active]
  );

  const IconFor = ({ icon }) => {
    const cls = "text-xl text-slate-700";
    if (icon === "sun") return <LuSun className={cls} />;
    return <LuCloud className={cls} />;
  };

  const pct = useMemo(() => {
    const maxScale = 400; // visual scale only
    const left = Math.max(0, Math.min(100, (current.perHeadMin / maxScale) * 100));
    const right = Math.max(0, Math.min(100, (current.perHeadMax / maxScale) * 100));
    return { left, width: Math.max(2, right - left) };
  }, [current.perHeadMin, current.perHeadMax]);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] ring-1 ring-slate-200">
      {/* header */}
      <div>
        <div className="text-xl font-bold text-slate-900">{data.title}</div>
        <div className="mt-1 text-sm text-slate-500">{data.subtitle}</div>
      </div>

      {/* selector */}
      <div className="mt-5 flex flex-wrap gap-2">
        {data.bands.map((b) => {
          const isActive = b.id === active;
          return (
            <button
              key={b.id}
              onClick={() => setActive(b.id)}
              className={[
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ring-1 transition",
                isActive
                  ? "bg-yellow-500 text-white ring-yellow-500"
                  : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50",
              ].join(" ")}
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/70 ring-1 ring-white/70">
                <IconFor icon={b.icon} />
              </span>
              {b.label}
            </button>
          );
        })}
      </div>

      {/* content */}
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {/* range */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-base font-semibold text-slate-900">{current.label}</div>
              <div className="mt-1 text-sm text-slate-500">{current.hint}</div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
              <IconFor icon={current.icon} />
              Per head guide
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
            <div className="text-sm font-semibold text-slate-700">Daily intake range</div>
            <div className="mt-2 flex flex-wrap items-end gap-2">
              <div className="text-3xl font-semibold text-slate-900">
                {current.perHeadMin}–{current.perHeadMax}
              </div>
              <div className="pb-1 text-sm text-slate-500">{current.unit}</div>
            </div>

            {/* range bar */}
            <div className="mt-4">
              <div className="h-3 w-full rounded-full bg-slate-200" />
              <div className="relative -mt-3 h-3 w-full">
                <div
                  className="absolute h-3 rounded-full bg-yellow-400"
                  style={{ left: `${pct.left}%`, width: `${pct.width}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-slate-500">
                <span>Lower</span>
                <span>Higher</span>
              </div>
            </div>
          </div>
        </div>

        {/* tips */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-sm font-bold text-slate-900">Management tips</div>
          <div className="mt-1 text-sm text-slate-500">Practical actions for better intake.</div>

          <div className="mt-4 space-y-3">
            {current.tips.map((t, i) => (
              <div
                key={i}
                className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700 ring-1 ring-slate-200"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* note */}
      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
        <span className="font-semibold text-slate-800">Note:</span> {data.note}
      </div>
    </div>
  );
}

/* -------------------- PAGE -------------------- */
export default function FeedGuide() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const content = useMemo(() => {
    if (activeTab === "Feeding Guide") return <FeedGuideTable />;
    if (activeTab === "Recommended Feeding Time") return <RecommendedFeedingTimeTab />;
    if (activeTab === "Can/Can't") return <CanCantTab />;
    if (activeTab === "Essential Feed Ingredients") return <EssentialIngredientsTab />;
    if (activeTab === "Water Intake Requirements") return <WaterIntakeTab />;
    return <PlaceholderTab title={activeTab} />;
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => {
            const active = activeTab === t;
            return (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={[
                  "relative",
                  "rounded-t-2xl px-6 py-4 text-sm font-semibold",
                  "transition",
                  active
                    ? [
                        "bg-yellow-50 text-slate-900",
                        "ring-1 ring-yellow-300",
                        "shadow-[0_-1px_0_rgba(255,255,255,1),0_8px_20px_rgba(15,23,42,0.06)]",
                      ].join(" ")
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 ring-1 ring-slate-200",
                  active ? "z-20 -mb-3" : "z-10",
                ].join(" ")}
              >
                {t}
                {active && (
                  <span className="absolute left-0 right-0 -bottom-[10px] h-[12px] bg-white" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Card */}
        <div className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.06)] ring-1 ring-slate-200">
          {content}
        </div>
      </div>
    </div>
  );
}
