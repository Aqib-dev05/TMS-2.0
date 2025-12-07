import React from "react";
import Button from "../../Button";

const statusLabel = {
  new: "Awaiting",
  active: "In progress",
  completed: "Completed",
  failed: "Failed",
};

function ActiveTask({ task, onStatusChange, updatingTaskId }) {
  const { _id, title, description, dueDate, status } = task;

  const formattedDate = dueDate
    ? new Date(dueDate).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      })
    : "No due date";

  const isUpdating = updatingTaskId === _id;

  const renderActions = () => {
    if (status === "new") {
      return (
        <Button
          onclick={() => onStatusChange(_id, "active")}
          text={isUpdating ? "Updating..." : "Accept task"}
          varient="primary"
          classname="w-full py-3"
          disabled={isUpdating}
        />
      );
    }

    if (status === "active") {
      return (
        <div className="flex flex-wrap gap-4">
          <Button
            text={isUpdating ? "Saving..." : "Mark completed"}
            varient="primary"
            classname="flex-1 py-3 min-w-[150px]"
            onclick={() => onStatusChange(_id, "completed")}
            disabled={isUpdating}
          />
          <Button
            text={isUpdating ? "Saving..." : "Mark failed"}
            varient="danger"
            classname="flex-1 py-3 min-w-[150px]"
            onclick={() => onStatusChange(_id, "failed")}
            disabled={isUpdating}
          />
        </div>
      );
    }

    return (
      <p className="text-sm font-medium text-white/70">
        Task is already {statusLabel[status] ?? status}.
      </p>
    );
  };

  return (
    <article className="glass-panel relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border-white/10 p-6">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-40" />
      <div className="relative flex items-center justify-between text-sm text-white/60">
        <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em]">
          {statusLabel[status] ?? status}
        </span>
        <span className="text-white font-semibold">{formattedDate}</span>
      </div>

      <div className="relative mt-6">
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <p className="mt-3 text-white/70">
          {description || "No description provided."}
        </p>
      </div>

      <div className="relative mt-8">{renderActions()}</div>
    </article>
  );
}

export default ActiveTask;
