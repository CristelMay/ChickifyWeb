import React, { useMemo, useState } from "react";

const PAGE_SIZE = 9;

// ✅ 9+ rows so pagination shows next page
const INITIAL_ROWS = [
  { week: 1, feedName: "Chick Starter", gramsPerHead: 25.0, mealsPerDay: 4, lightingHrs: 22.0, remarks: "Intro" },
  { week: 2, feedName: "Chick Starter", gramsPerHead: 30.0, mealsPerDay: 4, lightingHrs: 22.0, remarks: "" },
  { week: 3, feedName: "Chick Starter", gramsPerHead: 35.0, mealsPerDay: 4, lightingHrs: 20.0, remarks: "" },
  { week: 4, feedName: "Chick Starter", gramsPerHead: 40.0, mealsPerDay: 4, lightingHrs: 20.0, remarks: "" },
  { week: 5, feedName: "Chick Starter", gramsPerHead: 45.0, mealsPerDay: 4, lightingHrs: 19.0, remarks: "" },
  { week: 6, feedName: "Chick Starter", gramsPerHead: 50.0, mealsPerDay: 4, lightingHrs: 18.0, remarks: "" },
  { week: 7, feedName: "Chick Starter", gramsPerHead: 55.0, mealsPerDay: 4, lightingHrs: 18.0, remarks: "" },
  { week: 8, feedName: "Grower", gramsPerHead: 60.0, mealsPerDay: 3, lightingHrs: 17.0, remarks: "" },
  { week: 9, feedName: "Grower", gramsPerHead: 65.0, mealsPerDay: 3, lightingHrs: 17.0, remarks: "" },

  // page 2
  { week: 10, feedName: "Grower", gramsPerHead: 70.0, mealsPerDay: 3, lightingHrs: 17.0, remarks: "" },
  { week: 11, feedName: "Grower", gramsPerHead: 72.0, mealsPerDay: 3, lightingHrs: 16.5, remarks: "" },
  { week: 12, feedName: "Grower", gramsPerHead: 74.0, mealsPerDay: 3, lightingHrs: 16.5, remarks: "" },
  { week: 13, feedName: "Grower", gramsPerHead: 76.0, mealsPerDay: 3, lightingHrs: 16.0, remarks: "" },
  { week: 14, feedName: "Grower", gramsPerHead: 78.0, mealsPerDay: 3, lightingHrs: 16.0, remarks: "" },
  { week: 15, feedName: "Grower", gramsPerHead: 80.0, mealsPerDay: 3, lightingHrs: 16.0, remarks: "" },
  { week: 16, feedName: "Grower", gramsPerHead: 82.0, mealsPerDay: 3, lightingHrs: 16.0, remarks: "" },
  { week: 17, feedName: "Grower", gramsPerHead: 84.0, mealsPerDay: 3, lightingHrs: 16.0, remarks: "" },
  { week: 18, feedName: "Grower", gramsPerHead: 85.0, mealsPerDay: 3, lightingHrs: 16.0, remarks: "Transition to layer" },
];

function format2(n) {
  const x = Number(n);
  if (!Number.isFinite(x)) return "-";
  return x.toFixed(2);
}

export default function FeedGuideTable() {
  const [rows] = useState(INITIAL_ROWS);

  // ✅ pagination
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const paged = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return rows.slice(start, start + PAGE_SIZE);
  }, [rows, safePage]);

  return (
    <div>
      {/* ✅ Table wrapper */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full table-fixed text-left text-sm">
          {/* table-fixed + col widths => data aligns with header */}
          <colgroup>
            <col className="w-[90px]" />
            <col className="w-[180px]" />
            <col className="w-[140px]" />
            <col className="w-[140px]" />
            <col className="w-[170px]" />
            <col className="w-[160px]" />
          </colgroup>

          <thead className="bg-slate-50 text-slate-700">
            <tr className="border-b border-slate-200">
              <th className="px-6 py-3 font-">Week</th>
              <th className="px-6 py-3 font-semibold">Feed Name</th>
              <th className="px-6 py-3 font-semibold">g/hd/day</th>
              <th className="px-6 py-3 font-semibold">Meals/day</th>
              <th className="px-6 py-3 font-semibold">Lighting (hrs)</th>
              <th className="px-6 py-3 font-semibold">Remarks</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {paged.map((r, i) => (
              <tr
                key={`${r.week}-${(safePage - 1) * PAGE_SIZE + i}`}
                className={i % 2 ? "bg-yellow-50/30" : "bg-white"}
              >
                <td className="px-6 py-4 text-slate-800 font-bold">{r.week}</td>
                <td className="px-6 py-4 text-slate-900 truncate">{r.feedName}</td>
                <td className="px-6 py-4 text-slate-800">{format2(r.gramsPerHead)}</td>
                <td className="px-11 py-4 text-slate-800">{r.mealsPerDay}</td>
                <td className="px-11 py-4 text-slate-800">{format2(r.lightingHrs)}</td>
                <td className="px-6 py-4 text-slate-800 truncate">{r.remarks || "-"}</td>
              </tr>
            ))}

            {paged.length === 0 && (
              <tr>
                <td className="px-6 py-10 text-center text-slate-500" colSpan={6}>
                  No results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination (like “next page”) */}
      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          className="h-9 w-9 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={safePage === 1}
        >
          ‹
        </button>

        {Array.from({ length: totalPages }).map((_, idx) => {
          const num = idx + 1;
          const active = num === safePage;
          return (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={[
                "h-9 w-9 rounded-lg border text-sm font-semibold transition",
                active
                  ? "border-yellow-400 bg-yellow-50 text-yellow-800"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
              ].join(" ")}
            >
              {num}
            </button>
          );
        })}

        <button
          className="h-9 w-9 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={safePage === totalPages}
        >
          ›
        </button>
      </div>
    </div>
  );
}
