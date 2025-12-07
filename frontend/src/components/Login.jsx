import React, { useState } from "react";
import Button from "./Button";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import RegisterModal from "./RegisterModal";
import ResetPasswordModal from "./ResetPasswordModal";

function Login() {
  const {
    handleInputChange,
    handleFormSubmittion,
    authError,
    authLoading,
    formData,
    dbStatus,
  } = useContext(AppContext);
  const [showRegister, setShowRegister] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const inputStyles =
    "w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-base text-white placeholder:text-white/60 focus:border-emerald-300 focus:bg-white/10 focus:outline-none transition";

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-10 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(16,185,129,0.25),transparent_45%),radial-gradient(circle_at_80%_0,rgba(59,130,246,0.18),transparent_40%)]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -top-10 right-4 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-3xl">
        <div className="glass-panel rounded-3xl border-white/10 p-8 sm:p-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/70">
            Task Manager
          </span>
          <h1 className="mt-6 text-3xl font-semibold sm:text-4xl">
            Login to your account
          </h1>

          <form
            onSubmit={handleFormSubmittion}
            className="mt-10 flex flex-col gap-5"
          >
            <label className="flex flex-col gap-2 text-sm font-semibold tracking-tight text-white/70">
              Email
              <input
                className={inputStyles}
                type="email"
                required
                placeholder="mail@example.com"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold tracking-tight text-white/70">
              Password
              <input
                className={inputStyles}
                type="password"
                required
                placeholder="••••••••"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </label>

            {authError ? (
              <p className="text-sm font-medium text-rose-300">{authError}</p>
            ) : null}

            <Button
              type="submit"
              varient="primary"
              classname="mt-4 w-full py-4 text-base"
              disabled={authLoading}
              text={authLoading ? "Authenticating..." : "Enter workspace"}
            />

            <div className="mt-6 flex flex-col gap-3 text-center">
              <button
                type="button"
                onClick={() => setShowReset(true)}
                className="text-sm text-white/70 hover:text-emerald-300 transition"
              >
                Forgot password?
              </button>

              {dbStatus?.isEmpty ? (
                <div className="pt-3 border-t border-white/10">
                  <p className="text-sm text-white/60 mb-3">
                    No users found. Create the first admin account:
                  </p>
                  <Button
                    type="button"
                    varient="ghost"
                    onclick={() => setShowRegister(true)}
                    text="Register as Admin"
                    classname="w-full py-3"
                  />
                </div>
              ) : (
                <div className="pt-3 border-t border-white/10">
                  <p className="text-sm text-white/60 mb-3">
                    Don't have an account?
                  </p>
                  <Button
                    type="button"
                    varient="ghost"
                    onclick={() => setShowRegister(true)}
                    text="Register"
                    classname="w-full py-3"
                  />
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
      />
      <ResetPasswordModal
        isOpen={showReset}
        onClose={() => setShowReset(false)}
      />
    </div>
  );
}

export default Login;
