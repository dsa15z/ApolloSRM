import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function SubmissionsPage() {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <h1 className="text-3xl font-bold">Contact Submissions</h1>
      <p className="mt-2 text-gray-400">{submissions.length} submissions</p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/5 bg-white/[0.02]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              <th className="px-4 py-3 text-left font-medium text-gray-400">Date</th>
              <th className="px-4 py-3 text-left font-medium text-gray-400">Name</th>
              <th className="px-4 py-3 text-left font-medium text-gray-400">Email</th>
              <th className="px-4 py-3 text-left font-medium text-gray-400">Phone</th>
              <th className="px-4 py-3 text-left font-medium text-gray-400">Institution</th>
              <th className="px-4 py-3 text-left font-medium text-gray-400">Message</th>
              <th className="px-4 py-3 text-left font-medium text-gray-400">HubSpot</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                  {new Date(s.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 font-medium whitespace-nowrap">
                  {s.firstName} {s.lastName}
                </td>
                <td className="px-4 py-3 text-apollo-400">
                  <a href={`mailto:${s.email}`}>{s.email}</a>
                </td>
                <td className="px-4 py-3 text-gray-300 whitespace-nowrap">
                  {s.phone || "—"}
                </td>
                <td className="px-4 py-3 text-gray-300">
                  {s.institution || "—"}
                </td>
                <td className="px-4 py-3 text-gray-400 max-w-xs truncate">
                  {s.message}
                </td>
                <td className="px-4 py-3">
                  {s.hubspotLink ? (
                    <a
                      href={s.hubspotLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-apollo-400 hover:underline"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-gray-600">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
