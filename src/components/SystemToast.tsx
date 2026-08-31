import React from "react";
import { ShieldCheck, Flame } from "lucide-react";

interface SystemToastProps {
  show: boolean;
  message?: string;
  subMessage?: string;
}

export const SystemToast: React.FC<SystemToastProps> = ({
  show,
  message = "SHADOW REALM READY - ARISE",
  subMessage = "Portfolio authorization SSS-Rank confirmed",
}) => {
  return (
    <div
      id="systemToast"
      role="status"
      aria-live="polite"
      className={`fixed top-24 right-6 sm:right-10 z-[99990] w-80 bg-black/90 border-l-4 border-fuchsia-600 p-4 backdrop-blur-xl shadow-2xl neon-border transition-all duration-500 rounded-r-lg ${
        show
          ? "translate-y-0 opacity-100 scale-100"
          : "-translate-y-10 opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="flex justify-between items-start mb-1">
        <span className="text-[10px] font-bold text-fuchsia-400 tracking-wider font-mono flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-fuchsia-400" />
          SYSTEM NOTIFICATION
        </span>
        <span className="text-[10px] text-gray-500 font-mono">NOW</span>
      </div>
      <p className="text-sm font-medium text-white font-space tracking-tight">
        {message}
      </p>
      {subMessage && (
        <p className="text-xs text-fuchsia-300/80 font-mono mt-0.5">
          {subMessage}
        </p>
      )}
    </div>
  );
};
