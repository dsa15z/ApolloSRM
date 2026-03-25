import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import WhyChooseUs from "@/components/WhyChooseUs";
import AISection from "@/components/AISection";
import Workflow from "@/components/Workflow";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <WhyChooseUs />
        <AISection />
        <Workflow />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
