"use client";

import { useState, useEffect } from "react";
import { Upload, RefreshCw, Trash2, FileText, Loader2, X, BookOpen, Download, Database } from "lucide-react";

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

type PublishTarget = "knowledgebase" | "blog" | "download";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [reindexing, setReindexing] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Upload form state
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [publishTargets, setPublishTargets] = useState<PublishTarget[]>(["knowledgebase"]);

  // Blog fields
  const [blogSlug, setBlogSlug] = useState("");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("ApolloSRM Team");
  const [blogCategory, setBlogCategory] = useState("Product Updates");

  // Download fields
  const [downloadDescription, setDownloadDescription] = useState("");

  const fetchDocs = async () => {
    const res = await fetch("/api/admin/documents");
    if (res.ok) setDocuments(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchDocs(); }, []);

  const toggleTarget = (target: PublishTarget) => {
    setPublishTargets((prev) => {
      if (target === "knowledgebase") return prev; // always included
      return prev.includes(target)
        ? prev.filter((t) => t !== target)
        : [...prev, target];
    });
  };

  const resetForm = () => {
    setFile(null);
    setTitle("");
    setPublishTargets(["knowledgebase"]);
    setBlogSlug("");
    setBlogExcerpt("");
    setBlogAuthor("ApolloSRM Team");
    setBlogCategory("Product Updates");
    setDownloadDescription("");
    setShowUploadModal(false);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    const form = new FormData();
    form.append("file", file);
    form.append("title", title || file.name.replace(/\.[^.]+$/, ""));
    form.append("publishTargets", JSON.stringify(publishTargets));

    if (publishTargets.includes("blog")) {
      form.append("blogSlug", blogSlug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
      form.append("blogExcerpt", blogExcerpt);
      form.append("blogAuthor", blogAuthor);
      form.append("blogCategory", blogCategory);
    }

    if (publishTargets.includes("download")) {
      form.append("downloadDescription", downloadDescription);
    }

    try {
      const res = await fetch("/api/admin/documents", { method: "POST", body: form });
      if (res.ok) {
        resetForm();
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
      case "website": return "text-emerald-400 bg-emerald-400/10";
      default: return "text-gray-400 bg-gray-400/10";
    }
  };

  const inputClass = "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-apollo-500/50";

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Knowledge Base</h1>
          <p className="mt-2 text-gray-400">
            {documents.length} documents, {documents.reduce((sum, d) => sum + d.chunkCount, 0)} chunks
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReindex}
            disabled={reindexing}
            className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 disabled:opacity-50"
          >
            {reindexing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            {reindexing ? "Indexing..." : "Re-index All"}
          </button>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 rounded-xl bg-apollo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-apollo-400"
          >
            <Upload className="h-4 w-4" />
            Upload Document
          </button>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-navy-950 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Upload & Publish</h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* File & Title */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">File (PDF, DOCX, TXT)</label>
                <input
                  type="file"
                  accept=".pdf,.docx,.txt,.md"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setFile(f);
                      if (!title) setTitle(f.name.replace(/\.[^.]+$/, ""));
                    }
                  }}
                  className={`${inputClass} file:mr-3 file:rounded file:border-0 file:bg-apollo-500/20 file:px-3 file:py-1 file:text-xs file:text-apollo-400`}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Document title"
                  className={inputClass}
                />
              </div>

              {/* Publish targets */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Publish to:</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
                      publishTargets.includes("knowledgebase")
                        ? "border-apollo-500 bg-apollo-500/10 text-apollo-400"
                        : "border-white/10 bg-white/5 text-gray-400"
                    }`}
                    disabled
                  >
                    <Database className="h-4 w-4" />
                    Knowledge Base
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleTarget("blog")}
                    className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
                      publishTargets.includes("blog")
                        ? "border-purple-500 bg-purple-500/10 text-purple-400"
                        : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    <BookOpen className="h-4 w-4" />
                    Blog
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleTarget("download")}
                    className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
                      publishTargets.includes("download")
                        ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                        : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    <Download className="h-4 w-4" />
                    Downloads
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-600">Knowledge Base is always included. Select additional publish targets.</p>
              </div>

              {/* Blog fields */}
              {publishTargets.includes("blog") && (
                <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4 space-y-3">
                  <h3 className="text-sm font-semibold text-purple-400">Blog Post Details</h3>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">URL Slug</label>
                    <input
                      value={blogSlug}
                      onChange={(e) => setBlogSlug(e.target.value)}
                      placeholder={title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "my-blog-post"}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Excerpt / Summary</label>
                    <textarea
                      value={blogExcerpt}
                      onChange={(e) => setBlogExcerpt(e.target.value)}
                      placeholder="Brief summary for the blog listing page..."
                      rows={2}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Author</label>
                      <input
                        value={blogAuthor}
                        onChange={(e) => setBlogAuthor(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Category</label>
                      <select
                        value={blogCategory}
                        onChange={(e) => setBlogCategory(e.target.value)}
                        className={inputClass}
                      >
                        <option value="Product Updates">Product Updates</option>
                        <option value="Industry Insights">Industry Insights</option>
                        <option value="Best Practices">Best Practices</option>
                        <option value="Case Studies">Case Studies</option>
                        <option value="Company News">Company News</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Download fields */}
              {publishTargets.includes("download") && (
                <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 space-y-3">
                  <h3 className="text-sm font-semibold text-cyan-400">Download Page Details</h3>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Description</label>
                    <textarea
                      value={downloadDescription}
                      onChange={(e) => setDownloadDescription(e.target.value)}
                      placeholder="Description shown on the downloads page..."
                      rows={2}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleUpload}
                disabled={uploading || !file}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-apollo-500 py-3 text-sm font-semibold text-white hover:bg-apollo-400 disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing & Publishing...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Upload & Publish
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

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
