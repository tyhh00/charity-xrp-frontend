"use client";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { HowItWorksXRPL } from "@/components/HowItWorksXRPL";
import Container from "@/components/ui/container";

export default function HowItWorks() {
  return (
    <Container>
    <div className="min-h-screen bg-white flex flex-col items-center">
      <div className="  flex flex-col items-center justify-center flex-1 w-full px-8 pt-36">
        <h1 className="text-4xl font-bold mb-4 text-[#cb2121]">How It Works</h1>
        <p className="text-lg text-gray-700 mb-8 max-w-xl text-center">
          Learn how AidSafe leverages blockchain technology to ensure transparent, secure, and efficient humanitarian aid distribution. (Add your step-by-step or infographic content here!)
        </p>
        <Link href="/">
          <button className="mb-8 px-6 py-2 rounded-full border-2 border-[#cb2121] text-[#cb2121] bg-white hover:bg-[#cb2121] hover:text-white font-medium transition-all shadow-md">
            Back to Home
          </button>
        </Link>
        <HowItWorksXRPL />
      </div>
    </div>
    </Container>
  );
} 