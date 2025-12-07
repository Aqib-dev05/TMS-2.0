import React from "react";

function TaskCount({
  count,
  info,
  trend = "+0%",
  accent = "from-emerald-400/60 via-emerald-500/50 to-teal-500/40",
}) {
  return (
    <div className="glass-panel relative overflow-hidden rounded-3xl border-white/10 p-6">
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-60 blur-3xl`}
      />
      <div className="relative">
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">
          {info}
        </p>
        <h3 className="mt-4 text-4xl font-semibold text-white">{count}</h3>
        <p className="mt-2 text-sm font-medium text-emerald-300">{trend}</p>
      </div>
    </div>
  );
}

export default TaskCount;
