import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { blogArticles } from "@/data/blogArticles";
import { ArrowRight, Calendar, Clock, Tag, BookOpen } from "lucide-react";

export default function RatgeberIndex() {
  return (
    <Layout>
      <SEOHead
        title="Ratgeber: Baumaschinen verkaufen | Tipps, Bewertung & Marktpreise"
        description="Expertenwissen rund um den Verkauf von Baumaschinen. Tipps zur Wertermittlung, Verkaufsstrategien und aktuelle Marktpreise für Bagger, Arbeitsbühnen & mehr."
        keywords="Baumaschinen verkaufen Ratgeber, Bagger Wert ermitteln, Baumaschinen Tipps, Arbeitsbühne verkaufen Anleitung, Baumaschinen Preise"
        canonicalPath="/ratgeber"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 md:py-20">
        <div className="container px-4 sm:px-6">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <BookOpen className="h-4 w-4" />
              Wissen & Expertise
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-headline tracking-tight">
              Ratgeber: Baumaschinen verkaufen
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Expertenwissen rund um den Verkauf von Baggern, Arbeitsbühnen und Baugeräten. 
              Tipps zur Wertermittlung, Verkaufsstrategien und aktuelle Markttrends.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {blogArticles.map((article, index) => (
              <AnimatedSection key={article.slug} delay={index * 0.07}>
                <Link
                  to={`/ratgeber/${article.slug}`}
                  className="group flex flex-col h-full bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all overflow-hidden"
                >
                  {/* Color strip */}
                  <div className="h-2 bg-gradient-to-r from-primary to-primary/60" />
                  
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium text-xs">
                        <Tag className="h-3 w-3" />
                        {article.category}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readingTime}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-headline mb-2 group-hover:text-primary transition-colors leading-snug">
                      {article.title}
                    </h2>
                    <p className="text-sm text-muted-foreground flex-1 mb-4">
                      {article.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {article.publishDate}
                      </span>
                      <span className="text-sm font-medium text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Lesen
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container px-4 sm:px-6">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Lieber direkt verkaufen?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Starten Sie den kostenlosen Ankauf-Check und erhalten Sie in 2 Minuten Ihren Referenzpreis.
            </p>
            <Link
              to="/ankauf"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold text-lg transition-colors"
            >
              Jetzt Baumaschine bewerten
              <ArrowRight className="h-5 w-5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
