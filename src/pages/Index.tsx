import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { MachineCategoriesSection } from "@/components/home/MachineCategoriesSection";
import { WhySLTSection } from "@/components/home/WhySLTSection";
import { UsedMachinesTeaser } from "@/components/home/UsedMachinesTeaser";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <HowItWorksSection />
      <MachineCategoriesSection />
      <WhySLTSection />
      <UsedMachinesTeaser />
      <CTASection />
    </Layout>
  );
};

export default Index;
