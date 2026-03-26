import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { blogPosts } from "@/lib/blog-posts";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog — ApolloSRM",
  description:
    "Insights on student relationship management, AI in education, and higher education technology.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  // Fetch dynamic blog posts from database
  let dynamicPosts: { slug: string; title: string; excerpt: string; category: string; readTime: string; createdAt: Date }[] = [];
  try {
    dynamicPosts = await prisma.dynamicBlogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      select: { slug: true, title: true, excerpt: true, category: true, readTime: true, createdAt: true },
    });
  } catch {}

  // Combine static + dynamic posts
  const allPosts = [
    ...blogPosts.map((p) => ({ ...p, isDynamic: false })),
    ...dynamicPosts.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      date: p.createdAt.toISOString().split("T")[0],
      category: p.category,
      readTime: p.readTime,
      isDynamic: true,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-apollo-400">
              Blog
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Insights &amp; <span className="gradient-text">Updates</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
              Thoughts on student success, AI in education, and building better
              tools for colleges and career schools.
            </p>
          </div>

          {/* Post grid */}
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all hover:border-apollo-500/20 hover:bg-white/[0.04]"
              >
                {/* Category badge */}
                <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-apollo-500/20 bg-apollo-500/10 px-3 py-1 text-xs font-medium text-apollo-300">
                  <Tag className="h-3 w-3" />
                  {post.category}
                </div>

                <h2 className="text-xl font-bold leading-snug transition group-hover:text-apollo-400">
                  {post.title}
                </h2>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-400">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="mt-6 flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-apollo-400 transition group-hover:gap-2">
                  Read more <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
