import React, { useMemo, useState } from "react";
import { FiEdit2, FiX } from "react-icons/fi";

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

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-slate-600">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function FeedGuideTable() {
  const [rows, setRows] = useState(INITIAL_ROWS);

  // ✅ pagination
  const [page, setPage] = useState(1);

  // ✅ modal
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({
    week: "",
    feedName: "",
    gramsPerHead: "",
    mealsPerDay: "",
    lightingHrs: "",
    remarks: "",
  });

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const paged = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return rows.slice(start, start + PAGE_SIZE);
  }, [rows, safePage]);

  function openEdit(globalIndex) {
    const r = rows[globalIndex];
    setEditingIndex(globalIndex);
    setForm({
      week: String(r.week ?? ""),
      feedName: r.feedName ?? "",
      gramsPerHead: String(r.gramsPerHead ?? ""),
      mealsPerDay: String(r.mealsPerDay ?? ""),
      lightingHrs: String(r.lightingHrs ?? ""),
      remarks: r.remarks ?? "",
    });
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
    setEditingIndex(null);
  }

  function saveEdit() {
    if (editingIndex === null) return;

    const next = [...rows];
    next[editingIndex] = {
      week: Number(form.week),
      feedName: form.feedName,
      gramsPerHead: Number(form.gramsPerHead),
      mealsPerDay: Number(form.mealsPerDay),
      lightingHrs: Number(form.lightingHrs),
      remarks: form.remarks,
    };

    setRows(next);
    closeModal();
  }

  // ✅ map page row index -> global index in rows
  function globalIndexFromPageIndex(i) {
    return (safePage - 1) * PAGE_SIZE + i;
  }

  return (
    <div>
      {/* ✅ Keep only title
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900">Feeding Guide Table</h2>
      </div> */}

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
            <col className="w-[150px]" />
          </colgroup>

          <thead className="bg-slate-50 text-slate-700">
            <tr className="border-b border-slate-200">
              {/* ✅ tighter padding */}
              <th className="px-6 py-3 font-">Week</th>
              <th className="px-6 py-3 font-semibold">Feed Name</th>
              <th className="px-6 py-3 font-semibold">g/hd/day</th>
              <th className="px-6 py-3 font-semibold">Meals/day</th>
              <th className="px-6 py-3 font-semibold">Lighting (hrs)</th>
              <th className="px-6 py-3 font-semibold">Remarks</th>
              <th className="px-11 py-3 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {paged.map((r, i) => {
              const gi = globalIndexFromPageIndex(i);
              return (
                <tr key={`${r.week}-${gi}`} className={i % 2 ? "bg-yellow-50/30" : "bg-white"}>
                  {/* ✅ same padding as header so it aligns */}
                  <td className="px-6 py-4 text-slate-800 font-bold">{r.week}</td>
                  <td className="px-6 py-4 text-slate-900 truncate">
                    {r.feedName}
                  </td>
                  <td className="px-6 py-4 text-slate-800">{format2(r.gramsPerHead)}</td>
                  <td className="px-11 py-4 text-slate-800">{r.mealsPerDay}</td>
                  <td className="px-11 py-4 text-slate-800">{format2(r.lightingHrs)}</td>
                  <td className="px-6 py-4 text-slate-800 truncate">
                    {r.remarks || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => openEdit(gi)}
                      className="inline-flex items-center gap-2 rounded-xl border border-yellow-300 bg-white px-4 py-2 text-sm font-semibold text-yellow-900 hover:bg-yellow-50"
                    >
                      <FiEdit2 />
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}

            {paged.length === 0 && (
              <tr>
                <td className="px-6 py-10 text-center text-slate-500" colSpan={7}>
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

      {/* ✅ Edit Modal (UI only) */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-6">
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-[0_25px_60px_rgba(15,23,42,0.2)]">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <h3 className="text-base font-bold text-slate-900">Edit Feed Guide</h3>
              <button
                onClick={closeModal}
                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close"
              >
                <FiX />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
              <Field label="Week">
                <input
                  value={form.week}
                  onChange={(e) => setForm((s) => ({ ...s, week: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-yellow-300 focus:ring-4 focus:ring-yellow-100"
                />
              </Field>

              <Field label="Feed Name">
                <input
                  value={form.feedName}
                  onChange={(e) => setForm((s) => ({ ...s, feedName: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-yellow-300 focus:ring-4 focus:ring-yellow-100"
                />
              </Field>

              <Field label="g/hd/day">
                <input
                  value={form.gramsPerHead}
                  onChange={(e) => setForm((s) => ({ ...s, gramsPerHead: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-yellow-300 focus:ring-4 focus:ring-yellow-100"
                />
              </Field>

              <Field label="Meals/day">
                <input
                  value={form.mealsPerDay}
                  onChange={(e) => setForm((s) => ({ ...s, mealsPerDay: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-yellow-300 focus:ring-4 focus:ring-yellow-100"
                />
              </Field>

              <Field label="Lighting (hrs)">
                <input
                  value={form.lightingHrs}
                  onChange={(e) => setForm((s) => ({ ...s, lightingHrs: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-yellow-300 focus:ring-4 focus:ring-yellow-100"
                />
              </Field>

              <Field label="Remarks">
                <input
                  value={form.remarks}
                  onChange={(e) => setForm((s) => ({ ...s, remarks: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-yellow-300 focus:ring-4 focus:ring-yellow-100"
                />
              </Field>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-5">
              <button
                onClick={closeModal}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="rounded-xl bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-yellow-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
