"use client";

import { useState, useEffect } from "react";
import { Upload, RefreshCw, Trash2, FileText, Loader2 } from "lucide-react";

interface Doc {
  id: string;
  title: string;
  fileName: string;
  fileType: string;
  source: string;
  status: string;
  error?: string;
  chunkCount: number;
  createdAt: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [reindexing, setReindexing] = useState(false);

  const fetchDocs = async () => {
    const res = await fetch("/api/admin/documents");
    if (res.ok) setDocuments(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchDocs(); }, []);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/documents", { method: "POST", body: form });
      if (res.ok) {
        e.currentTarget.reset();
        await fetchDocs();
      } else {
        const data = await res.json();
        alert(data.error || "Upload failed");
      }
    } catch {
      alert("Upload failed");
    }
    setUploading(false);
  };

  const handleReindex = async () => {
    setReindexing(true);
    try {
      const res = await fetch("/api/admin/documents/reindex", { method: "POST" });
      const data = await res.json();
      const ready = data.results?.filter((r: { status: string }) => r.status === "ready").length || 0;
      const errors = data.results?.filter((r: { status: string }) => r.status === "error").length || 0;
      alert(`Indexed: ${ready} documents, ${errors} errors`);
      await fetchDocs();
    } catch {
      alert("Reindex failed");
    }
    setReindexing(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}" and all its chunks?`)) return;
    await fetch(`/api/admin/documents?id=${id}`, { method: "DELETE" });
    await fetchDocs();
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "ready": return "text-emerald-400 bg-emerald-400/10";
      case "processing": return "text-yellow-400 bg-yellow-400/10";
      case "error": return "text-red-400 bg-red-400/10";
      default: return "text-gray-400 bg-gray-400/10";
    }
  };

  const sourceColor = (source: string) => {
    switch (source) {
      case "upload": return "text-apollo-400 bg-apollo-400/10";
      case "blog": return "text-purple-400 bg-purple-400/10";
      case "download": return "text-cyan-400 bg-cyan-400/10";
      default: return "text-gray-400 bg-gray-400/10";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Knowledge Base</h1>
          <p className="mt-2 text-gray-400">
            {documents.length} documents, {documents.reduce((sum, d) => sum + d.chunkCount, 0)} chunks
          </p>
        </div>
        <button
          onClick={handleReindex}
          disabled={reindexing}
          className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 disabled:opacity-50"
        >
          {reindexing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          {reindexing ? "Indexing..." : "Re-index Blogs & Downloads"}
        </button>
      </div>

      {/* Upload form */}
      <form onSubmit={handleUpload} className="mt-8 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
        <h2 className="text-lg font-semibold mb-4">Upload Document</h2>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-1">Title</label>
            <input
              name="title"
              type="text"
              placeholder="Document title (auto-filled from filename)"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-apollo-500/50"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-1">File (PDF, DOCX, TXT)</label>
            <input
              name="file"
              type="file"
              required
              accept=".pdf,.docx,.txt,.md"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white file:mr-3 file:rounded file:border-0 file:bg-apollo-500/20 file:px-3 file:py-1 file:text-xs file:text-apollo-400"
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="flex items-center gap-2 rounded-lg bg-apollo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-apollo-400 disabled:opacity-50"
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? "Processing..." : "Upload & Index"}
          </button>
        </div>
      </form>

      {/* Documents table */}
      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/5 bg-white/[0.02]">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
          </div>
        ) : documents.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <FileText className="mx-auto h-8 w-8 mb-2 opacity-50" />
            No documents yet. Upload a document or re-index content.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="px-4 py-3 text-left font-medium text-gray-400">Title</th>
                <th className="px-4 py-3 text-left font-medium text-gray-400">Source</th>
                <th className="px-4 py-3 text-left font-medium text-gray-400">Type</th>
                <th className="px-4 py-3 text-left font-medium text-gray-400">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-400">Chunks</th>
                <th className="px-4 py-3 text-left font-medium text-gray-400">Date</th>
                <th className="px-4 py-3 text-left font-medium text-gray-400"></th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="px-4 py-3 font-medium">{doc.title}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${sourceColor(doc.source)}`}>
                      {doc.source}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 uppercase text-xs">{doc.fileType}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${statusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                    {doc.error && <p className="mt-1 text-xs text-red-400">{doc.error}</p>}
                  </td>
                  <td className="px-4 py-3 text-gray-400">{doc.chunkCount}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(doc.id, doc.title)}
                      className="text-gray-600 hover:text-red-400 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
