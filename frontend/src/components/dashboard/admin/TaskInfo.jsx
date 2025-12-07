import React, { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

function TaskInfo() {
  const { teamSnapshot, teamLoading } = useContext(AppContext);

  return (
    <section className="glass-panel rounded-3xl border-white/10 p-6 sm:p-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            Team pulse
          </p>
          <h2 className="text-2xl font-semibold text-white">
            Workload distribution
          </h2>
          <p className="mt-1 text-sm text-white/60">
            Monitor assignments and flow across your team in real time.
          </p>
        </div>
        <span className="rounded-full border border-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
          {teamLoading ? "Updating…" : "Live"}
        </span>
      </div>

      <div className="mt-8 overflow-x-auto">
        {teamSnapshot.length === 0 ? (
          <p className="px-4 py-6 text-sm text-white/60">
            {teamLoading
              ? "Fetching team snapshot..."
              : "No employees found yet."}
          </p>
        ) : (
        <table className="min-w-full divide-y divide-white/10 text-left">
          <thead className="text-xs uppercase tracking-[0.3em] text-white/50">
            <tr>
              <th className="px-4 py-4 font-semibold">Employee</th>
              <th className="px-4 py-4 font-semibold text-center">New</th>
              <th className="px-4 py-4 font-semibold text-center">Active</th>
                <th className="px-4 py-4 font-semibold text-center">
                  Completed
                </th>
              <th className="px-4 py-4 font-semibold text-center">Failed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {teamSnapshot.map((member) => (
              <tr
                  key={member.userId}
                  className="transition-colors hover:bg-white/5"
              >
                  <td className="px-4 py-4 font-semibold">
                    <div className="flex flex-col">
                      <span>{member.name}</span>
                      <span className="text-xs font-medium text-white/50">
                        {member.email}
                      </span>
                    </div>
                  </td>
                <td className="px-4 py-4 text-center text-emerald-300">
                  {member.newTask}
                </td>
                <td className="px-4 py-4 text-center text-amber-300">
                  {member.active}
                </td>
                <td className="px-4 py-4 text-center text-sky-300">
                  {member.completed}
                </td>
                <td className="px-4 py-4 text-center text-rose-300">
                  {member.failed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>
    </section>
  );
}

export default TaskInfo;
