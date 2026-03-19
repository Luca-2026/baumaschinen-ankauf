import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";

interface BlogArticleLayoutProps {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
  publishDate: string;
  readingTime: string;
  category: string;
  children: React.ReactNode;
}

export function BlogArticleLayout({
  title,
  description,
  keywords,
  canonicalPath,
  publishDate,
  readingTime,
  category,
  children,
}: BlogArticleLayoutProps) {
  return (
    <Layout>
      <SEOHead
        title={title}
        description={description}
        keywords={keywords}
        canonicalPath={canonicalPath}
        ogType="article"
      />
      <article className="bg-background py-10 md:py-16">
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link
              to="/ratgeber"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück zum Ratgeber
            </Link>

            {/* Article header */}
            <header className="mb-10">
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-xs">
                  <Tag className="h-3 w-3" />
                  {category}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {publishDate}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {readingTime}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-headline leading-tight">
                {title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">{description}</p>
            </header>

            {/* Article content */}
            <div className="prose prose-lg max-w-none text-foreground prose-headings:text-headline prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-headline prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
              {children}
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 bg-primary/5 rounded-2xl border border-primary/10 text-center">
              <h3 className="text-xl font-bold text-headline mb-2">
                Bereit, Ihre Baumaschine zu verkaufen?
              </h3>
              <p className="text-muted-foreground mb-6">
                Kostenlose Bewertung in 2 Minuten – unverbindlich und fair.
              </p>
              <Link
                to="/ankauf"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold transition-colors"
              >
                Jetzt Ankaufpreis erhalten
              </Link>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}
