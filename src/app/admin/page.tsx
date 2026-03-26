import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [contactCount, userCount] = await Promise.all([
    prisma.contactSubmission.count(),
    prisma.user.count(),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-2 text-gray-400">ApolloSRM administration panel</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
          <p className="text-sm text-gray-400">Contact Submissions</p>
          <p className="mt-2 text-3xl font-bold text-apollo-400">{contactCount}</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
          <p className="text-sm text-gray-400">Registered Users</p>
          <p className="mt-2 text-3xl font-bold text-apollo-400">{userCount}</p>
        </div>
      </div>
    </div>
  );
}
