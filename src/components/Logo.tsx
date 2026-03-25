interface LogoProps {
  className?: string;
  size?: number;
}

export function LogoIcon({ className = "", size = 32 }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      {/* Rocket body */}
      <path
        d="M16 3L22 23H10L16 3Z"
        fill="url(#rocketGrad)"
        stroke="#52AAF0"
        strokeWidth="0.5"
      />
      {/* Window */}
      <circle cx="16" cy="11" r="2.5" fill="#073763" stroke="#52AAF0" strokeWidth="0.5" />
      {/* Left fin */}
      <path d="M10 17C7.5 16 6 13.5 6 13.5L10 20Z" fill="#2794EB" opacity="0.8" />
      {/* Right fin */}
      <path d="M22 17C24.5 16 26 13.5 26 13.5L22 20Z" fill="#2794EB" opacity="0.8" />
      {/* Exhaust flames */}
      <path d="M12 23L10 28H14L12 23Z" fill="#52AAF0" opacity="0.6" />
      <path d="M16 23L14.5 29H17.5L16 23Z" fill="#2794EB" opacity="0.8" />
      <path d="M20 23L18 28H22L20 23Z" fill="#52AAF0" opacity="0.6" />
      <defs>
        <linearGradient id="rocketGrad" x1="16" y1="3" x2="16" y2="23" gradientUnits="userSpaceOnUse">
          <stop stopColor="#52AAF0" />
          <stop offset="1" stopColor="#2794EB" />
        </linearGradient>
      </defs>
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
