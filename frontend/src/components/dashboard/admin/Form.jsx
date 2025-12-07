import React, { useContext, useEffect, useState } from "react";
import Button from "../../Button";
import { AppContext } from "../../../context/AppContext";

const fieldStyles =
  "mt-1 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/50 focus:border-emerald-300 focus:bg-white/10 focus:outline-none transition";

function Form() {
  const { employees, createTask, creatingTask } = useContext(AppContext);
  const [taskForm, setTaskForm] = useState({
    title: "",
    dueDate: "",
    employeeId: employees[0]?.id ?? "",
    description: "",
  });
  useEffect(() => {
    if (employees.length && !taskForm.employeeId) {
      setTaskForm((prev) => ({
        ...prev,
        employeeId: employees[0].id,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employees]);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (submitError) setSubmitError("");
    if (submitSuccess) setSubmitSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    try {
      await createTask(taskForm);
      setSubmitSuccess("Task created successfully.");
      setTaskForm((prev) => ({
        ...prev,
        title: "",
        description: "",
        dueDate: "",
        employeeId: employees[0]?.id ?? "",
      }));
    } catch (error) {
      const message =
        error?.response?.data?.message || "Unable to create task right now.";
      setSubmitError(message);
    }
  };

  return (
    <section className="glass-panel rounded-3xl border-white/10 p-6 sm:p-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            New mission
          </p>
          <h2 className="text-2xl font-semibold text-white">Create a task</h2>
          <p className="mt-1 text-sm text-white/60">
            Define the scope, due date, and owner for the next priority item.
          </p>
        </div>
        <span className="w-fit rounded-full border border-emerald-400/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
          Admin panel
        </span>
      </div>

      <form
        className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-5">
          <label className="flex flex-col text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
            Task title
            <input
              className={fieldStyles}
              type="text"
              required
              placeholder="Design a modern UI"
              name="title"
              value={taskForm.title}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
            Due date
            <input
              className={fieldStyles}
              type="date"
              name="dueDate"
              value={taskForm.dueDate}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
            Assign to
            <select
              className={fieldStyles}
              name="employeeId"
              value={taskForm.employeeId}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select employee
              </option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-col">
          <label className="flex flex-1 flex-col text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
            Description
            <textarea
              className={`${fieldStyles} min-h-[200px] resize-none`}
              placeholder="Describe context, outcomes, and success signals…"
              name="description"
              value={taskForm.description}
              onChange={handleChange}
            />
          </label>
          {submitError ? (
            <p className="mt-4 text-sm font-medium text-rose-300">
              {submitError}
            </p>
          ) : null}
          {submitSuccess ? (
            <p className="mt-4 text-sm font-medium text-emerald-300">
              {submitSuccess}
            </p>
          ) : null}
          <Button
            text={creatingTask ? "Creating..." : "Create task"}
            classname="mt-6 w-full py-4 text-base"
            varient="primary"
            type="submit"
            disabled={creatingTask || employees.length === 0}
          />
        </div>
      </form>
    </section>
  );
}

export default Form;
