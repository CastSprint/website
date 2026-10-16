import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, HelpCircle } from "lucide-react";
import { docPages, pageMetadata, siteUrl, githubUrl } from "@/lib/site";
import { docsRegistry } from "@/content/docs-data";
import "../docs.css";

export const instant = false;

export function generateStaticParams() {
  return docPages.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const reg = docsRegistry[slug];
  if (reg) {
    return pageMetadata(reg.title, reg.subtitle, `/docs/${slug}`);
  }
  const fallback = docPages.find((x) => x.slug === slug);
  if (fallback) {
    return pageMetadata(fallback.title, fallback.summary, `/docs/${slug}`);
  }
  return {};
}

export default async function DocSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = docsRegistry[slug];
  if (!doc) notFound();

  const currentIndex = docPages.findIndex((x) => x.slug === slug);
  const prevDoc = currentIndex > 0 ? docPages[currentIndex - 1] : null;
  const nextDoc = currentIndex < docPages.length - 1 ? docPages[currentIndex + 1] : null;

  // Group pages for the sidebar
  const groups: Record<string, typeof docPages[number][]> = {};
  for (const item of docPages) {
    if (!groups[item.group]) {
      groups[item.group] = [];
    }
    groups[item.group].push(item);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: doc.title,
    description: doc.subtitle,
    dateModified: "2026-10-16",
    author: {
      "@type": "Organization",
      name: "CastSprint",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "CastSprint",
      url: siteUrl,
    },
    mainEntityOfPage: `${siteUrl}/docs/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="docs-article-layout">
        {/* Left Sticky Sidebar */}
        <aside className="docs-sidebar">
          <Link
            href="/docs"
            className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-4 px-2 py-1.5 rounded hover:bg-slate-800/60 transition"
          >
            <ArrowLeft size={14} /> Back to all guides
          </Link>

          <nav aria-label="Documentation navigation">
            {Object.entries(groups).map(([groupTitle, pages]) => (
              <div key={groupTitle} className="mb-4">
                <span className="sidebar-group-title">{groupTitle}</span>
                <div className="space-y-1">
                  {pages.map((p) => {
                    const isActive = p.slug === slug;
                    return (
                      <Link
                        key={p.slug}
                        href={`/docs/${p.slug}`}
                        className={`sidebar-nav-link ${isActive ? "active" : ""}`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span className="truncate">{p.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Article Content */}
        <main className="docs-article">
          <nav aria-label="Breadcrumb" className="breadcrumbs flex items-center gap-2 text-xs text-slate-400 mb-4">
            <Link href="/" className="hover:text-cyan-400">Home</Link>
            <span>/</span>
            <Link href="/docs" className="hover:text-cyan-400">Docs</Link>
            <span>/</span>
            <span className="text-slate-300 font-medium">{doc.group}</span>
          </nav>

          <div className="flex items-center gap-3 mb-3">
            <span className="eyebrow">{doc.group}</span>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded-full border border-cyan-800/40">
              {doc.badge}
            </span>
          </div>

          <h1>{doc.title}</h1>
          <p className="lead">{doc.subtitle}</p>

          <div className="post-meta flex items-center gap-4 text-xs text-slate-400 my-4 pb-4 border-b border-slate-800">
            <span>{doc.readTime} read</span>
            <span>•</span>
            <span>Last updated {doc.updated}</span>
            <span>•</span>
            <a
              href={`${githubUrl}/tree/main/docs`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-cyan-400 transition"
            >
              Source docs <ExternalLink size={12} />
            </a>
          </div>

          {/* Quick Specs Grid */}
          {doc.specs && doc.specs.length > 0 && (
            <div className="docs-specs-grid">
              {doc.specs.map((s) => (
                <div key={s.label} className="spec-item">
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </div>
          )}

          {/* Rendered Guide Body */}
          <article className="prose max-w-none">
            {doc.content}
          </article>

          {/* Bottom Next/Prev Pagination Cards */}
          <nav aria-label="Guide pagination" className="docs-nav-pager">
            {prevDoc ? (
              <Link href={`/docs/${prevDoc.slug}`} className="doc-pager-card">
                <span className="pager-direction">← Previous Guide</span>
                <span className="pager-title">{prevDoc.title}</span>
              </Link>
            ) : (
              <div />
            )}

            {nextDoc && (
              <Link href={`/docs/${nextDoc.slug}`} className="doc-pager-card text-right">
                <span className="pager-direction">Next Guide →</span>
                <span className="pager-title">{nextDoc.title}</span>
              </Link>
            )}
          </nav>
        </main>

        {/* Right Sticky Table of Contents */}
        {doc.tableOfContents && doc.tableOfContents.length > 0 && (
          <aside className="docs-toc">
            <strong>On This Page</strong>
            <nav aria-label="Table of contents" className="space-y-1">
              {doc.tableOfContents.map((toc) => (
                <a key={toc.id} href={`#${toc.id}`}>
                  {toc.title}
                </a>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-400 space-y-2">
              <strong className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block mb-2">
                Need Assistance?
              </strong>
              <a
                href={`${githubUrl}/issues`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-cyan-400 transition"
              >
                <HelpCircle size={14} /> Report an issue
              </a>
              <Link href="/docs/troubleshooting" className="flex items-center gap-2 hover:text-cyan-400 transition">
                <BookOpen size={14} /> Troubleshooting
              </Link>
            </div>
          </aside>
        )}
      </div>
    </>
  );
}
