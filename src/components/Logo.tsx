import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: number;
}

export function LogoIcon({ className = "", size = 32 }: LogoProps) {
  return (
    <Image
      src="/logos/apollo-rocket-white.png"
      alt="ApolloSRM"
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}

export function LogoFull({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/logos/apollo-rocket-white.png"
        alt=""
        width={28}
        height={28}
        className="h-7 w-7"
        priority
      />
      <span className="text-xl font-bold tracking-tight">
        Apollo<span className="text-apollo-500">SRM</span>
      </span>
    </span>
  );
}
