import { LogoIcon } from "@/components/Logo";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950">
      <div className="animate-pulse">
        <LogoIcon size={48} />
      </div>
    </div>
  );
}
