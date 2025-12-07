import React, { useContext, useEffect, useMemo, useState } from "react";
import Button from "./Button";
import { AppContext } from "../context/AppContext";

const fieldStyles =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-base text-white placeholder:text-white/50 focus:border-emerald-300 focus:bg-white/10 focus:outline-none transition";

function ProfileModal({ isOpen, onClose }) {
  const { user, updateProfile } = useContext(AppContext);
  const [formState, setFormState] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    password: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormState({
        name: user?.name ?? "",
        email: user?.email ?? "",
        password: "",
      });
      setStatus({ type: "", message: "" });
    }
  }, [isOpen, user?.name, user?.email]);

  const hasChanges = useMemo(() => {
    const nameChanged = formState.name.trim() !== (user?.name ?? "");
    const emailChanged = formState.email.trim() !== (user?.email ?? "");
    const passwordChanged = Boolean(formState.password);
    return nameChanged || emailChanged || passwordChanged;
  }, [formState, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (status.message) {
      setStatus({ type: "", message: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasChanges) {
      setStatus({ type: "warning", message: "No changes detected." });
      return;
    }
    setLoading(true);
    setStatus({ type: "", message: "" });
    try {
      await updateProfile(formState);
      setStatus({ type: "success", message: "Profile updated successfully." });
      setFormState((prev) => ({ ...prev, password: "" }));
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to update profile.";
      setStatus({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };

  const alertColor =
    status.type === "success"
      ? "text-emerald-300"
      : status.type === "warning"
        ? "text-amber-300"
        : "text-rose-300";

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="glass-panel relative w-full max-w-2xl rounded-3xl border-white/10 p-6 sm:p-10 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              Profile settings
            </p>
            <h2 className="text-2xl font-semibold text-white">Your identity</h2>
            <p className="mt-1 text-sm text-white/60">
              Update your display name, login email, or password.
            </p>
          </div>
          <span className="rounded-full border border-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            {user?.role}
          </span>
        </div>

        <form className="grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 text-sm font-semibold tracking-tight text-white/70 sm:col-span-1">
            Display name
            <input
              className={fieldStyles}
              name="name"
              type="text"
              placeholder="Jane Doe"
              value={formState.name}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold tracking-tight text-white/70 sm:col-span-1">
            Email
            <input
              className={fieldStyles}
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formState.email}
              onChange={handleChange}
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold tracking-tight text-white/70 sm:col-span-2">
            New password
            <input
              className={fieldStyles}
              name="password"
              type="password"
              placeholder="Leave blank to keep current password"
              value={formState.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </label>
          {status.message ? (
            <p className={`${alertColor} text-sm font-medium sm:col-span-2`}>
              {status.message}
            </p>
          ) : null}
          <div className="sm:col-span-2 flex gap-4">
            <Button
              type="button"
              text="Cancel"
              varient="ghost"
              onclick={onClose}
              classname="flex-1 py-3"
            />
            <Button
              type="submit"
              text={loading ? "Updating..." : "Save changes"}
              disabled={loading}
              classname="flex-1 py-3"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileModal;

