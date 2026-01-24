import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { MachineCategoriesSection } from "@/components/home/MachineCategoriesSection";
import { WhySLTSection } from "@/components/home/WhySLTSection";
import { UsedMachinesTeaser } from "@/components/home/UsedMachinesTeaser";
import { LocalSEOLinks } from "@/components/home/LocalSEOLinks";
import { CTASection } from "@/components/home/CTASection";
import { SEOHead, SEO_CONFIG } from "@/components/SEOHead";

const Index = () => {
  return (
    <Layout>
      <SEOHead {...SEO_CONFIG.home} />
      <HeroSection />
      <HowItWorksSection />
      <MachineCategoriesSection />
      <WhySLTSection />
      <UsedMachinesTeaser />
      <LocalSEOLinks />
      <CTASection />
    </Layout>
  );
};

export default Index;
