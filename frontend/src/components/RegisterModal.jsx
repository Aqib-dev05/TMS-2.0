import React, { useState } from "react";
import Button from "./Button";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const inputStyles =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-base text-white placeholder:text-white/50 focus:border-emerald-300 focus:bg-white/10 focus:outline-none transition";

function RegisterModal({ isOpen, onClose }) {
  const { registerUser, authError, authLoading, dbStatus } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    secretKey: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    if (formData.password.length < 6) {
      return;
    }

    if (!formData.secretKey || formData.secretKey.trim().length < 3) {
      return;
    }

    try {
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        secretKey: formData.secretKey,
      });
      onClose();
    } catch (error) {
      // Error handled by context
    }
  };

  if (!isOpen) return null;

  const isFirstUser = dbStatus?.isEmpty;

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
            {isFirstUser ? "First User Setup" : "Register"}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            {isFirstUser
              ? "Create Admin Account"
              : "Create New Account"}
          </h2>
          <p className="mt-2 text-sm text-white/60">
            {isFirstUser
              ? "You'll be set as the administrator."
              : "Register as a new employee."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="flex flex-col gap-2 text-sm font-semibold tracking-tight text-white/70">
            Name
            <input
              className={inputStyles}
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

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
            Password
            <input
              className={inputStyles}
              type="password"
              name="password"
              required
              minLength={6}
              placeholder="Minimum 6 characters"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold tracking-tight text-white/70">
            Confirm Password
            <input
              className={inputStyles}
              type="password"
              name="confirmPassword"
              required
              minLength={6}
              placeholder="Re-enter password"
              value={formData.confirmPassword}
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
              placeholder="Set a secret key (min 3 characters)"
              value={formData.secretKey}
              onChange={handleChange}
            />
            <span className="text-xs text-white/50 mt-1">
              Required for password reset. Keep it safe!
            </span>
          </label>

          {formData.password &&
            formData.confirmPassword &&
            formData.password !== formData.confirmPassword ? (
            <p className="text-sm font-medium text-rose-300">
              Passwords do not match
            </p>
          ) : null}

          {formData.secretKey &&
            formData.secretKey.trim().length > 0 &&
            formData.secretKey.trim().length < 3 ? (
            <p className="text-sm font-medium text-rose-300">
              Secret key must be at least 3 characters
            </p>
          ) : null}

          {authError ? (
            <p className="text-sm font-medium text-rose-300">{authError}</p>
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
              text={authLoading ? "Registering..." : "Register"}
              disabled={authLoading}
              classname="flex-1 py-3"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;

