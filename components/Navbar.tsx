import Link from "next/link";
import Image from "next/image";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";

export function Navbar() {
  return (
    <nav className="fixed h-auto w-full z-50 border-b border-white/10 bg-white transition-shadow duration-200 hover:shadow-lg backdrop-blur-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src="/safeaid-logo.png"
              alt="AidSafe Logo"
              width={200}
              height={200}
              className="cursor-pointer h-full w-full"
            />
          </Link>
        </div>
        <div className="flex items-center gap-8 text-lg font-medium">
          <Link href="/how-it-works" className="text-gray-900 hover:bg-gradient-to-r hover:from-brand-primary hover:to-brand-accent hover:bg-clip-text hover:text-transparent hover:transition-colors transition-colors">How it works</Link>
          <Link href="/donate" className="text-gray-900 hover:bg-gradient-to-r hover:from-brand-primary hover:to-brand-accent hover:bg-clip-text hover:text-transparent hover:transition-colors">Donate</Link>
          <Link href="#impact" className="text-gray-900 hover:bg-gradient-to-r hover:from-brand-primary hover:to-brand-accent hover:bg-clip-text hover:text-transparent hover:transition-colorstransition-colors">Impact</Link>
          <Link href="#about" className="text-gray-900 hover:bg-gradient-to-r hover:from-brand-primary hover:to-brand-accent hover:bg-clip-text hover:text-transparent hover:transition-colors transition-colors">About</Link>
        </div>
        <div className="">
          <ConnectWalletButton />
        </div>
      </div>
    </nav>
  );
} 