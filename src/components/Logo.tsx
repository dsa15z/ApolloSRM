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
    <span className={`flex items-center ${className}`}>
      <Image
        src="/logos/apollo-logo-white.png"
        alt="ApolloSRM — Student Relationship Manager"
        width={140}
        height={48}
        className="h-8 w-auto"
        priority
      />
    </span>
  );
}
