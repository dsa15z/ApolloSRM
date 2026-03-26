import Link from "next/link";
import { LogoFull } from "@/components/Logo";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-navy-950">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-white/5 bg-white/[0.02] p-6">
        <Link href="/">
          <LogoFull />
        </Link>
        <nav className="mt-8 space-y-1">
          <Link
            href="/admin"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/submissions"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
          >
            Contact Submissions
          </Link>
          <Link
            href="/"
            className="mt-8 block rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition hover:bg-white/5 hover:text-gray-300"
          >
            ← Back to site
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
