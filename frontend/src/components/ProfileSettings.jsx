import React, { useContext, useEffect, useMemo, useState } from "react";
import Button from "./Button";
import { AppContext } from "../context/AppContext";

const fieldStyles =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-base text-white placeholder:text-white/50 focus:border-emerald-300 focus:bg-white/10 focus:outline-none transition";

function ProfileSettings() {
  const { user, updateProfile } = useContext(AppContext);
  const [formState, setFormState] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    password: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      name: user?.name ?? "",
      email: user?.email ?? "",
    }));
  }, [user?.name, user?.email]);

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

  return (
    <section className="glass-panel rounded-3xl border-white/10 p-6 sm:p-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
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

      <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
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
        <div className="sm:col-span-2">
          <Button
            type="submit"
            text={loading ? "Updating..." : "Save changes"}
            disabled={loading}
            classname="w-full py-4 text-base"
          />
        </div>
      </form>
    </section>
  );
}

export default ProfileSettings;

