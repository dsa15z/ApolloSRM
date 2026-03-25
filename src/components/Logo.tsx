interface LogoProps {
  className?: string;
  size?: number;
  /** Color variant: "white" for dark backgrounds, "dark" for light backgrounds */
  variant?: "white" | "dark";
}

export function LogoIcon({ className = "", size = 32, variant }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <g fill={variant === "dark" ? "#0b1a2e" : "currentColor"}>
        {/* Rocket body */}
        <path d="M72 6C72 6 65.5 10 57 19.5C48.5 29 42 40 40 47.5C38 55 37.5 59.5 37.5 59.5L47 69L56.5 78.5C56.5 78.5 61 78 68.5 76C76 74 87 67.5 96.5 58C106 48.5 110 40 110 40C97 27 84 14 72 6Z" />
        {/* Window (porthole) — cut out */}
        <circle cx="72" cy="42" r="8" fill={variant === "dark" ? "white" : "#031225"} />
        <circle cx="72" cy="42" r="5.5" fill={variant === "dark" ? "#0b1a2e" : "currentColor"} />
        {/* Left fin */}
        <path d="M37 59C37 59 25 60.5 15.5 70.5C15.5 70.5 17 80 21.5 85C21.5 75.5 28.5 68 37.5 64.5L37 59Z" />
        {/* Bottom fin */}
        <path d="M57 79C57 79 55.5 91 65.5 100.5C65.5 100.5 75.5 99 80 94.5C70.5 94.5 63 87.5 60 79L57 79Z" />
        {/* Exhaust trail 1 — outermost sweep */}
        <path
          d="M6 114C6 114 16 92 36 72"
          fill="none"
          stroke={variant === "dark" ? "#0b1a2e" : "currentColor"}
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        {/* Exhaust trail 2 — middle sweep */}
        <path
          d="M14 110C14 110 22 92 38 76"
          fill="none"
          stroke={variant === "dark" ? "#0b1a2e" : "currentColor"}
          strokeWidth="3.8"
          strokeLinecap="round"
        />
        {/* Exhaust trail 3 — innermost sweep */}
        <path
          d="M22 105C22 105 30 90 42 80"
          fill="none"
          stroke={variant === "dark" ? "#0b1a2e" : "currentColor"}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export function LogoFull({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <LogoIcon size={28} />
      <span className="text-xl font-bold tracking-tight">
        Apollo<span className="text-apollo-500">SRM</span>
      </span>
    </span>
  );
}
