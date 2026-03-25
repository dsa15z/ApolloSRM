import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { blogPosts } from "@/lib/blog-posts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — ApolloSRM Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  // Simple markdown-like rendering: split by ## headings and paragraphs
  const blocks = post.content
    .trim()
    .split("\n\n")
    .filter((b) => b.trim());

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20">
        <article className="mx-auto max-w-3xl px-6">
          {/* Back link */}
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-apollo-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Header */}
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-apollo-500/20 bg-apollo-500/10 px-3 py-1 text-xs font-medium text-apollo-300">
            {post.category}
          </div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>

          {/* Divider */}
          <hr className="my-10 border-white/5" />

          {/* Content */}
          <div className="prose-apollo space-y-6">
            {blocks.map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="mt-10 text-2xl font-bold tracking-tight"
                  >
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              return (
                <p key={i} className="leading-relaxed text-gray-300">
                  {block.trim()}
                </p>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center">
            <h3 className="text-xl font-bold">
              Ready to see ApolloSRM in action?
            </h3>
            <p className="mt-2 text-gray-400">
              Schedule a demo and see how we can transform your institution.
            </p>
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-apollo-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-apollo-400"
            >
              Contact Us
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
