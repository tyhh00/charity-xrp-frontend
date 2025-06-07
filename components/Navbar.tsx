"use client";
import Link from "next/link";
import Image from "next/image";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const { scrollY: frameScrollY } = useScroll();
  
  // Transform background opacity based on scroll position
  // From 1 (100%) at 0px scroll to 0.05 (5%) at 100px scroll
  const bgOpacity = useTransform(frameScrollY, [0, 100], [1, 0.05]);
  const shadowOpacity = useTransform(frameScrollY, [0, 100], [0, 0.1]);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <motion.nav 
      className="fixed py-4 h-auto w-full z-50 border-b border-white/10"
      style={{
        backgroundColor: useTransform(bgOpacity, (value) => `rgba(255, 255, 255, ${value})`),
        boxShadow: useTransform(shadowOpacity, (value) => `0 4px 6px -1px rgba(0, 0, 0, ${value})`),
        backdropFilter: useTransform(frameScrollY, [0, 100], ["none", "blur(8px)"])
      }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src="/safeaid-logo.png"
              alt="AidSafe Logo"
              width={200}
              height={200}
              className="cursor-pointer max-h-36 max-w-36"
            />
          </Link>
        </div>
        <div className="flex items-center gap-8 text-lg font-medium">
          <Link href="/how-it-works" className="text-gray-900 hover:bg-gradient-to-r hover:from-brand-primary hover:to-brand-accent hover:bg-clip-text hover:text-transparent hover:transition-colors transition-colors">How it works</Link>
          <Link href="/donate" className="text-gray-900 hover:bg-gradient-to-r hover:from-brand-primary hover:to-brand-accent hover:bg-clip-text hover:text-transparent hover:transition-colors">Donate</Link>
          <Link href="/beneficiaries" className="text-gray-900 hover:bg-gradient-to-r hover:from-brand-primary hover:to-brand-accent hover:bg-clip-text hover:text-transparent hover:transition-colors">Beneficiaries</Link>
          <Link href="/about" className="text-gray-900 hover:bg-gradient-to-r hover:from-brand-primary hover:to-brand-accent hover:bg-clip-text hover:text-transparent hover:transition-colors">About</Link>
        </div>
        <div>
          <ConnectWalletButton />
        </div>
      </div>
    </motion.nav>
  );
} 