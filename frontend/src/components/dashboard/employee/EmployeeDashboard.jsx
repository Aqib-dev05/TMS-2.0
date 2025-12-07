import React, { useContext, useMemo } from "react";
import Nav from "../../Nav";
import TaskCount from "./TaskCount";
import ActiveTask from "./ActiveTask";
import { AppContext } from "../../../context/AppContext";

function EmployeeDashboard() {
  const { tasks, tasksLoading, updateTaskStatus, updatingTaskId } =
    useContext(AppContext);

  const statusCounts = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      },
      { new: 0, active: 0, completed: 0, failed: 0 }
    );
  }, [tasks]);

  const summaryCards = [
    {
      info: "New tasks",
      count: statusCounts.new,
      trend: statusCounts.new ? `${statusCounts.new} waiting` : "All clear",
    },
    {
      info: "Completed",
      count: statusCounts.completed,
      trend: `${statusCounts.completed} done`,
      accent: "from-sky-400/60 via-blue-500/40 to-indigo-500/30",
    },
    {
      info: "Active",
      count: statusCounts.active,
      trend: statusCounts.active ? "In progress" : "Idle",
      accent: "from-amber-400/50 via-orange-500/40 to-rose-500/30",
    },
    {
      info: "Failed",
      count: statusCounts.failed,
      trend: statusCounts.failed ? "Needs attention" : "Great job",
      accent: "from-rose-500/50 via-red-500/40 to-orange-400/30",
    },
  ];

  return (
    <section className="min-h-screen bg-[#03050a] text-white">
      <Nav />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <TaskCount key={card.info} {...card} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {tasksLoading ? (
            <p className="text-white/70">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-white/60">
              You have no tasks assigned right now.
            </p>
          ) : (
            tasks.map((task) => (
              <ActiveTask
                key={task._id}
                task={task}
                onStatusChange={updateTaskStatus}
                updatingTaskId={updatingTaskId}
              />
            ))
          )}
        </div>
      </main>
    </section>
  );
}

export default EmployeeDashboard;
