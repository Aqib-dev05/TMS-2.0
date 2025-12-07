import React from "react";

function Button({
  text,
  type = "button",
  onclick,
  classname = "",
  varient = "primary",
  disabled = false,
}) {
  const baseStyles =
    "inline-flex items-center justify-center whitespace-nowrap rounded-2xl font-semibold tracking-tight transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 disabled:cursor-not-allowed disabled:opacity-60";

  const styles = {
    primary:
      "bg-gradient-to-r from-emerald-400 via-lime-400 to-teal-400 text-slate-900 shadow-emerald-500/40 shadow-lg hover:shadow-emerald-400/50 hover:-translate-y-0.5",
    ghost:
      "border border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-white/30",
    secondary:
      "bg-white text-slate-900 border border-white/70 shadow-sm hover:bg-slate-100",
    danger:
      "bg-gradient-to-r from-rose-500 to-orange-400 text-white shadow-rose-500/40 hover:shadow-rose-400/60",
    inVar:
      "bg-gradient-to-r from-emerald-400 via-lime-400 to-teal-400 text-slate-900 hover:shadow-emerald-400/60",
    outVar:
      "border border-white/20 text-white/90 hover:bg-white/10 hover:text-white",
    blueVar:
      "bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:shadow-sky-500/60",
  };

  const variantClass = styles[varient] ?? styles.primary;

  return (
    <button
      onClick={onclick}
      className={`${baseStyles} ${variantClass} ${classname}`.trim()}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
