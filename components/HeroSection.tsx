"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative h-[90vh] sm:h-[85vh] md:h-[80vh] pt-4 sm:pt-6 md:pt-8 lg:pt-12 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.0&auto=format&fit=crop&w=1200&q=80"
          alt="People helping"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#cb2121]/90 to-[#cb2121]/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col justify-center h-full text-white">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-block text-xs sm:text-sm md:text-base font-semibold mb-1 sm:mb-2 md:mb-3 px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 bg-white text-[#cb2121] rounded-full shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Revolutionizing Aid Distribution
          </motion.div>
          
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Transforming<br />
            Humanitarian Aid<br />
            <span className="text-white drop-shadow-md mt-1 inline-block">Through Blockchain</span>
          </motion.h1>
          
          <motion.p 
            className="text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 md:mb-6 text-white max-w-2xl font-medium drop-shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Direct, transparent, and secure aid distribution using XRPL technology. 
            Empowering donors and recipients with decentralized solutions.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-2 sm:gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link href="/donate">
              <button
                className="px-4 sm:px-5 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-2.5 rounded-full bg-white text-[#cb2121] font-semibold text-xs sm:text-sm md:text-base lg:text-lg hover:bg-gray-100 transition-all shadow-md"
              >
                Donate Now
              </button>
            </Link>
            <Link href="/how-it-works">
              <button
                className="px-4 sm:px-5 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-2.5 rounded-full border-2 border-white text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg hover:bg-white/10 transition-all"
              >
                Learn More
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 