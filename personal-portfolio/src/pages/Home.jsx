import { Navbar } from "../components/Navbar";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";
import HeroSection from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import SlideShow from "../components/SlideShow";
import { Footer } from "../components/Footer";
import Documentary from "../components/Documentary";
import Certification from "../components/Certification";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Theme Toggle */}
      <ThemeToggle />
      {/* Background Effects */}
      <StarBackground />

      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <Certification />
        <ProjectsSection />
        <SlideShow />
        <Documentary />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
