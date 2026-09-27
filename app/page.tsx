import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeTicker from "@/components/MarqueeTicker";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import WhyWorkWithMe from "@/components/WhyWorkWithMe";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-cinema-black text-white selection:bg-cinema-accent selection:text-white">
      {/* Sticky Compactable Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Cinematic Marquee Banner */}
      <MarqueeTicker />

      {/* About Section - Behind The Edit */}
      <About />

      {/* Skills Section */}
      <Skills />

      {/* Services Section - What I Can Do For You */}
      <Services />

      {/* Why Work With Me */}
      <WhyWorkWithMe />

      {/* Selected Work Portfolio Grid & Modal */}
      <Portfolio />

      {/* Client Feedback Testimonials */}
      <Testimonials />

      {/* Pre-Footer Action CTA */}
      <CTA />

      {/* Contact Section & Form */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}
