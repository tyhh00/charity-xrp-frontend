import Image from "next/image";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { HeroSection } from "@/components/HeroSection";
import { Features } from "@/components/Features";
import { Stats } from "@/components/Stats";
import { Navbar } from "@/components/Navbar";
import { ImpactDashboard } from "@/components/ImpactDashboard";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden pb-16 bg-white">
      
      {/* Navigation */}

      {/* Hero Section */}
      <HeroSection />

      {/* Features Grid */}
      <Features />

      {/* Impact Stats */}
      <Stats />

      {/* Impact Dashboard */}
      <ImpactDashboard />
    </div>
  );
}


