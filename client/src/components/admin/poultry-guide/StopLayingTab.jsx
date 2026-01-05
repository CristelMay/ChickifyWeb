import React, { useMemo, useState } from "react";
import { FiEdit2, FiX, FiCheck, FiPlus, FiTrash2, FiHelpCircle } from "react-icons/fi";
import {  LuChevronDown, LuChevronUp } from "react-icons/lu";

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function autoGrowTextarea(e) {
  e.currentTarget.style.height = "auto";
  e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
}

function makeKey(prefix = "why") {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

const DEFAULT_DATA = {
  header: {
    title: "Why chickens stop laying eggs",
    tag: "Checklist",
  },
  bullets: [
    "Not enough light hours (short days).",
    "Molting.",
    "Stress: predators, overcrowding, loud noise, heat/cold stress.",
    "Nutrition: low protein, no calcium source, too many treats, sudden feed change.",
    "Water issues: dirty/low water, dehydration in heat.",
    "Parasites/illness: worms, mites, respiratory, digestive infection.",
    "Age (older hens lay less).",
    "Broodiness (wants to sit).",
  ],
  alert: "Egg drop + lethargy, pale comb, or blood in poop = urgent check.",
};

function EditModal({ open, onClose, draft, setDraft, onSave }) {
  if (!open) return null;

  const addBullet = () => {
    const next = deepCopy(draft);
    next.bullets.push("New checklist item...");
    setDraft(next);
  };

  const removeBullet = (idx) => {
    const next = deepCopy(draft);
    next.bullets.splice(idx, 1);
    setDraft(next);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/45 p-4">
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
          <div>
            <div className="text-base font-bold text-slate-900">
              Edit Stop-Laying Checklist
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-600 hover:bg-white hover:text-slate-900 ring-1 ring-slate-200"
            aria-label="Close"
          >
            <FiX />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[75vh] overflow-auto px-5 py-5">
          {/* Header fields */}
          <div className="rounded-2xl border border-slate-200 p-4">
            <div className="text-sm font-bold text-slate-800">Header</div>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className="grid gap-1">
                <label className="text-xs font-semibold text-slate-600">Title</label>
                <input
                  value={draft.header.title}
                  onChange={(e) =>
                    setDraft({ ...draft, header: { ...draft.header, title: e.target.value } })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-yellow-200"
                />
              </div>

              <div className="grid gap-1">
                {/* <label className="text-xs font-semibold text-slate-600">Tag (chip)</label>
                <input
                  value={draft.header.tag}
                  onChange={(e) =>
                    setDraft({ ...draft, header: { ...draft.header, tag: e.target.value } })
                  }
                  placeholder="e.g. Checklist"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-yellow-200"
                /> */}
              </div>
            </div>
          </div>

          {/* Checklist bullets */}
          <div className="mt-5 rounded-2xl border border-slate-200 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-sm font-bold text-slate-800">Checklist</div>

              <button
                type="button"
                onClick={addBullet}
                className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2 text-sm font-bold text-slate-900 hover:bg-yellow-300"
              >
                <FiPlus />
                Add item
              </button>
            </div>

            <div className="mt-3 grid gap-3">
              {draft.bullets.map((b, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-full">
                      <label className="text-xs font-semibold text-slate-600">
                        Item {idx + 1}
                      </label>
                      <textarea
                        value={b}
                        onChange={(e) => {
                          const next = deepCopy(draft);
                          next.bullets[idx] = e.target.value;
                          setDraft(next);
                        }}
                        onInput={autoGrowTextarea}
                        rows={2}
                        className="mt-1 w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-yellow-200"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => removeBullet(idx)}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      title="Remove"
                    >
                      <FiTrash2 />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alert */}
          <div className="mt-5 rounded-2xl border border-slate-200 p-4">
            <div className="text-sm font-bold text-slate-800">Warning Box</div>
            <div className="mt-3 grid gap-1">
              <label className="text-xs font-semibold text-slate-600">Alert text</label>
              <textarea
                value={draft.alert}
                onChange={(e) => setDraft({ ...draft, alert: e.target.value })}
                onInput={autoGrowTextarea}
                rows={2}
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-yellow-200"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-slate-200 bg-white px-5 py-4">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <FiX />
            Cancel
          </button>
          <button
            onClick={onSave}
            className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2 text-sm font-bold text-slate-900 hover:bg-yellow-300"
          >
            <FiCheck />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StopLayingTab() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [openEdit, setOpenEdit] = useState(false);
  const [draft, setDraft] = useState(() => deepCopy(DEFAULT_DATA));
  const [expanded, setExpanded] = useState(true);

  const open = () => {
    setDraft(deepCopy(data));
    setOpenEdit(true);
  };

  const close = () => setOpenEdit(false);

  const save = () => {
    setData(deepCopy(draft));
    setOpenEdit(false);
  };

  const bullets = useMemo(() => data.bullets, [data.bullets]);

  return (
    <div>
      {/* Header row */}
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-[260px]">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-50 ring-1 ring-yellow-200">
              <FiHelpCircle className="text-xl text-yellow-700" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <div className="text-xl font-bold text-slate-900">
                  {data.header.title}
                </div>

                {/* {data.header.tag ? (
                  <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-700 ring-1 ring-slate-200">
                    {data.header.tag}
                  </span>
                ) : null} */}
              </div>

              <div className="mt-1 text-sm text-slate-600">
                Quick checklist to troubleshoot egg drop before panicking.
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            title="Collapse/Expand"
          >
            {/* {expanded ? <LuChevronUp /> : <LuChevronDown />}
            {expanded ? "Collapse" : "Expand"} */}
          </button>

          <button
            onClick={open}
            className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2 text-sm font-bold text-slate-900 hover:bg-yellow-300"
          >
            <FiEdit2 />
            Edit
          </button>
        </div>
      </div>

      {!expanded ? null : (
        <>
          {/* Checklist bullets */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <ul className="grid gap-2 text-sm text-slate-700">
              {bullets.map((b, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* Warning box */}
            <div className="mt-4 rounded-xl bg-yellow-50 p-4 text-sm text-slate-800 ring-1 ring-yellow-200">
              <span className="font-bold">Warning:</span> {data.alert}
            </div>
          </div>
        </>
      )}

      {/* Edit modal */}
      <EditModal
        open={openEdit}
        onClose={close}
        draft={draft}
        setDraft={setDraft}
        onSave={save}
      />
    </div>
  );
}
