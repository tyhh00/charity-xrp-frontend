import Link from "next/link";

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 pt-48 pb-20 bg-white rounded-xl shadow-lg">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block text-sm md:text-base font-semibold mb-4 px-4 py-2 bg-[#fff0f0] text-[#cb2121] rounded-full shadow-sm">
          Revolutionizing Aid Distribution
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#cb2121] to-[#a81b1b] bg-clip-text text-transparent leading-tight pb-5">
          Transforming Humanitarian Aid Through Blockchain
        </h1>
        <p className="text-base md:text-lg text-gray-700 mb-8">
          Direct, transparent, and secure aid distribution using XRPL technology. 
          Empowering donors and recipients with decentralized solutions.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/donate">
            <button
              className="px-8 py-3 rounded-full bg-[#cb2121] hover:bg-[#a81b1b] text-white font-medium transition-all shadow-md"
            >
              Donate Now
            </button>
          </Link>
          <button
            className="px-8 py-3 rounded-full border-2 border-[#cb2121] text-[#cb2121] bg-white hover:bg-[#cb2121] hover:text-white font-medium transition-all shadow-md"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
} 