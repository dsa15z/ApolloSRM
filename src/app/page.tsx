import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProductDemo from "@/components/ProductDemo";
import WhyChooseUs from "@/components/WhyChooseUs";
import AISection from "@/components/AISection";
import Workflow from "@/components/Workflow";
import Integrations from "@/components/Integrations";
import ComparisonMatrix from "@/components/ComparisonMatrix";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import ROICalculator from "@/components/ROICalculator";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <Navbar />
      <main id="main">
        <Hero />
        <Features />
        <ProductDemo />
        <WhyChooseUs />
        <AISection />
        <Workflow />
        <Integrations />
        <ComparisonMatrix />
        <Pricing />
        <Testimonials />
        <About />
        <ROICalculator />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </PageTransition>
  );
}
