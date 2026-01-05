import React, { useMemo, useState } from "react";
import { FiEdit2, FiX, FiCheck, FiPlus, FiTrash2 } from "react-icons/fi";
import { LuActivity, LuChevronDown, LuChevronUp } from "react-icons/lu";

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function autoGrowTextarea(e) {
  e.currentTarget.style.height = "auto";
  e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
}

function makeKey(prefix = "phase") {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

const DEFAULT_DATA = {
  header: {
    title: "Chicken phases (egg layers)",
    tag: "Guide",
  },
  phases: [
    {
      key: "chick",
      name: "Chick",
      range: "0–6 weeks",
      note: "warmth, clean water, chick starter feed, dry litter.",
    },
    {
      key: "grower",
      name: "Grower/Pullet",
      range: "6–16 weeks",
      note: "steady growth; avoid too much fat.",
    },
    {
      key: "pol",
      name: "Point-of-Lay",
      range: "16–20 weeks",
      note: "gradually increase light; shift to layer feed when laying starts.",
    },
    {
      key: "peak",
      name: "Peak Lay",
      range: "20–35 weeks",
      note: "stable routine, enough calcium, good ventilation, low stress.",
    },
    {
      key: "late",
      name: "Mid/Late Lay",
      range: "35+ weeks",
      note: "expect slow decline; keep nutrition consistent; check parasites.",
    },
    {
      key: "molt",
      name: "Molting",
      range: "",
      note: "many hens stop laying; support with good feed/protein and reduce stress.",
    },
  ],
  alert:
    "Big sudden changes (feed, light, moving coop) can trigger stress + egg drop.",
};

function EditModal({ open, onClose, draft, setDraft, onSave }) {
  if (!open) return null;

  const addPhase = () => {
    const next = deepCopy(draft);
    next.phases.push({
      key: makeKey(),
      name: "New phase",
      range: "",
      note: "",
    });
    setDraft(next);
  };

  const removePhase = (idx) => {
    const next = deepCopy(draft);
    next.phases.splice(idx, 1);
    setDraft(next);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/45 p-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
          <div>
            <div className="text-base font-bold text-slate-900">
              Edit Chicken Phases Guide
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
                <label className="text-xs font-semibold text-slate-600">
                  Title
                </label>
                <input
                  value={draft.header.title}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      header: { ...draft.header, title: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-yellow-200"
                />
              </div>

              <div className="grid gap-1">
                {/* <label className="text-xs font-semibold text-slate-600">
                  Tag (chip)
                </label>
                <input
                  value={draft.header.tag}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      header: { ...draft.header, tag: e.target.value },
                    })
                  }
                  placeholder="e.g. Guide"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-yellow-200"
                /> */}
              </div>
            </div>
          </div>

          {/* Phases */}
          <div className="mt-5 rounded-2xl border border-slate-200 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-sm font-bold text-slate-800">Phases</div>

              <button
                type="button"
                onClick={addPhase}
                className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2 text-sm font-bold text-slate-900 hover:bg-yellow-300"
              >
                <FiPlus />
                Add phase
              </button>
            </div>

            <div className="mt-3 grid gap-4">
              {draft.phases.map((p, idx) => (
                <div
                  key={p.key}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm font-bold text-slate-900">
                      Phase {idx + 1}
                    </div>

                    <button
                      type="button"
                      onClick={() => removePhase(idx)}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <FiTrash2 />
                      Remove
                    </button>
                  </div>

                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <div className="grid gap-1">
                      <label className="text-xs font-semibold text-slate-600">
                        Name
                      </label>
                      <input
                        value={p.name}
                        onChange={(e) => {
                          const next = deepCopy(draft);
                          next.phases[idx].name = e.target.value;
                          setDraft(next);
                        }}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-yellow-200"
                      />
                    </div>

                    <div className="grid gap-1">
                      <label className="text-xs font-semibold text-slate-600">
                        Age range
                      </label>
                      <input
                        value={p.range}
                        onChange={(e) => {
                          const next = deepCopy(draft);
                          next.phases[idx].range = e.target.value;
                          setDraft(next);
                        }}
                        placeholder="e.g. 0–6 weeks"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-yellow-200"
                      />
                    </div>
                  </div>

                  <div className="mt-3 grid gap-1">
                    <label className="text-xs font-semibold text-slate-600">
                      Note
                    </label>
                    <textarea
                      value={p.note}
                      onChange={(e) => {
                        const next = deepCopy(draft);
                        next.phases[idx].note = e.target.value;
                        setDraft(next);
                      }}
                      onInput={autoGrowTextarea}
                      rows={2}
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-yellow-200"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alert */}
          <div className="mt-5 rounded-2xl border border-slate-200 p-4">
            <div className="text-sm font-bold text-slate-800">Warning Box</div>

            <div className="mt-3 grid gap-1">
              <label className="text-xs font-semibold text-slate-600">
                Alert text
              </label>
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

export default function ChickenPhasesTab() {
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

  const phases = useMemo(() => data.phases, [data.phases]);

  return (
    <div>
      {/* Header row */}
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-[260px]">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-50 ring-1 ring-yellow-200">
              <LuActivity className="text-xl text-yellow-700" />
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
                Quick overview of common egg-layer stages and what to focus on.
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
          {/* Bullets */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <ul className="grid gap-2 text-sm text-slate-700">
              {phases.map((p) => (
                <li key={p.key} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow-400" />
                  <span>
                    <span className="font-bold text-slate-900">
                      {p.name}
                      {p.range ? ` (${p.range})` : ""}:
                    </span>{" "}
                    {p.note}
                  </span>
                </li>
              ))}
            </ul>

            {/* Warning box */}
            <div className="mt-4 rounded-xl bg-yellow-50 p-4 text-sm text-slate-800 ring-1 ring-yellow-200">
              <span className="font-bold">Note:</span> {data.alert}
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
