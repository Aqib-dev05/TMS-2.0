import React, { useState } from "react";
import Button from "./Button";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const inputStyles =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-base text-white placeholder:text-white/50 focus:border-emerald-300 focus:bg-white/10 focus:outline-none transition";

function ResetPasswordModal({ isOpen, onClose }) {
  const { resetPassword, authError, authLoading } = useContext(AppContext);
  const [formData, setFormData] = useState({ email: "", newPassword: "", secretKey: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    try {
      await resetPassword(formData.email, formData.newPassword, formData.secretKey);
      setSuccess(true);
      setFormData({ email: "", newPassword: "", secretKey: "" });
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (error) {
      // Error handled by context
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="glass-panel relative w-full max-w-md rounded-3xl border-white/10 p-6 sm:p-10 text-white"
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

        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            Password Reset
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Reset Your Password
          </h2>
          <p className="mt-2 text-sm text-white/60">
            Enter your email and new password to reset.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="flex flex-col gap-2 text-sm font-semibold tracking-tight text-white/70">
            Email
            <input
              className={inputStyles}
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold tracking-tight text-white/70">
            New Password
            <input
              className={inputStyles}
              type="password"
              name="newPassword"
              required
              minLength={6}
              placeholder="Minimum 6 characters"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold tracking-tight text-white/70">
            Secret Key
            <input
              className={inputStyles}
              type="text"
              name="secretKey"
              required
              minLength={3}
              placeholder="Enter your secret key"
              value={formData.secretKey}
              onChange={handleChange}
            />
            <span className="text-xs text-white/50 mt-1">
              Required to verify your identity
            </span>
          </label>

          {authError ? (
            <p className="text-sm font-medium text-rose-300">{authError}</p>
          ) : null}

          {success ? (
            <p className="text-sm font-medium text-emerald-300">
              Password reset successfully! You can now login.
            </p>
          ) : null}

          <div className="flex gap-4">
            <Button
              type="button"
              text="Cancel"
              varient="ghost"
              onclick={onClose}
              classname="flex-1 py-3"
            />
            <Button
              type="submit"
              text={authLoading ? "Resetting..." : "Reset Password"}
              disabled={authLoading}
              classname="flex-1 py-3"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordModal;

