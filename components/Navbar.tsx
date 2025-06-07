import Link from "next/link";
import Image from "next/image";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";

export function Navbar() {
  return (
    <nav className="fixed w-full z-50 border-b border-white/10 bg-white transition-shadow duration-200 hover:shadow-lg backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src="/safeaid-logo.png"
            alt="AidSafe Logo"
            width={200}
            height={200}
          />
        </div>
        <div className="flex items-center gap-8 text-lg font-medium">
          <Link href="#how-it-works" className="text-gray-900 hover:text-brand-accent transition-colors">How it works</Link>
          <Link href="#impact" className="text-gray-900 hover:text-brand-accent transition-colors">Impact</Link>
          <Link href="#about" className="text-gray-900 hover:text-brand-accent transition-colors">About</Link>
        </div>
        <div className="ml-4 bg-brand-primary hover:bg-[#a81b1b] text-white rounded px-4 py-2 transition-colors">
  <ConnectWalletButton />
</div>
      </div>
    </nav>
  );
} 