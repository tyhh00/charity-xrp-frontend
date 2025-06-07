import Image from "next/image";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { HeroSection } from "@/components/HeroSection";
import { Features } from "@/components/Features";
import { Stats } from "@/components/Stats";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-brand-dark to-black text-brand-light">
      <BackgroundBeams />
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.svg" // You'll need to create this
              alt="AidSafe Logo"
              width={40}
              height={40}
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
              AidSafe
            </span>
          </div>
          <ConnectWalletButton />
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Grid */}
      <Features />

      {/* Impact Stats */}
      <Stats />
    </div>
  );
}


