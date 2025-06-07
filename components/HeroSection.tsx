export function HeroSection() {
  return (
    <section className="container mx-auto px-4 pt-32 pb-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary bg-clip-text text-transparent">
          Transforming Humanitarian Aid Through Blockchain
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Direct, transparent, and secure aid distribution using XRPL technology. 
          Empowering donors and recipients with decentralized solutions.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-3 rounded-full bg-brand-primary hover:bg-brand-primary/80 text-white font-medium transition-all">
            Get Started
          </button>
          <button className="px-8 py-3 rounded-full border border-brand-primary text-brand-primary hover:bg-brand-primary/10 font-medium transition-all">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
} 