import React, { useContext, useState } from "react";
import Button from "./Button";
import ProfileModal from "./ProfileModal";
import { AppContext } from "../context/AppContext";

function Nav() {
  const { user, logout } = useContext(AppContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const role = user?.role ?? "guest";

  const greeting =
    role === "admin"
      ? "Command center"
      : role === "employee"
        ? "Focus mode"
        : "Welcome";

  const statusLabel =
    role === "admin"
      ? "Admin privileges"
      : role === "employee"
        ? "Team member"
        : "Guest";

  const initials =
    user?.name?.slice(0, 2)?.toUpperCase() ??
    user?.email?.slice(0, 2)?.toUpperCase() ??
    role.slice(0, 2).toUpperCase();

  return (
    <>
      <header className="border-b border-white/5 bg-[#070b11]/80 backdrop-blur-2xl">
        <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-white sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
              {greeting}
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-white">
              Hello, {user?.name || user?.email || "there"} 👋
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                Status
              </p>
              <p className="text-sm font-semibold">{statusLabel}</p>
            </div>
            <button
              onClick={() => setIsProfileOpen(true)}
              className="glow-ring inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-lg font-semibold uppercase hover:bg-white/10 transition cursor-pointer"
              aria-label="Open profile settings"
            >
              {initials}
            </button>
            <Button
              onclick={logout}
              text="Log out"
              varient="ghost"
              classname="px-5 py-3"
            />
          </div>
        </nav>
      </header>
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
}

export default Nav;
