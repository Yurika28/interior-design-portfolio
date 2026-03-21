import HeroSection from "./components/Hero";
import Navbar from "./components/Navbar";
import WhoWeAre from "./components/WhoAreWe";
import Services from "./components/Services"
import HowItWorks from "./components/HowItWorks"
import OurProjects from "./components/OurProjects"
import ProjectInquiry from "./components/ProjectInquiry"



export default function HomePage() {
  return (
    <>
      <header className="relative bg-[url('/marble-bg.jpg')] bg-cover bg-center min-h-screen overflow-hidden">
        <Navbar />
        <HeroSection/>
      </header>
      <section>
        <WhoWeAre />
        <HowItWorks/>
        <OurProjects/>
        <Services/>
      </section>
      <footer>
        <ProjectInquiry/>
      </footer>
    </>

  );
}
