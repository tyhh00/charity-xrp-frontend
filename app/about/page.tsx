"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function About() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-white pb-0">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.0&auto=format&fit=crop&w=1200&q=80"
            alt="People helping"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#cb2121]/80 to-[#cb2121]/50"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 flex flex-col justify-center h-full text-white">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Transparent Aid <br /> on the XRP Ledger
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We're building the future of humanitarian assistance through transparent blockchain governance.
          </motion.p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#cb2121]">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-10 leading-relaxed">
              AidSafe is revolutionizing humanitarian aid by leveraging the XRP Ledger to create a fully transparent, efficient, and accountable donation platform. We connect donors directly with verified charities and beneficiaries, eliminating intermediaries and ensuring that resources reach those who need them most.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <motion.div 
                className="bg-[#fff0f0] p-6 rounded-xl border border-[#ffd6d6]"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-[#cb2121] rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  🔍
                </div>
                <h3 className="text-xl font-bold mb-3">Transparency</h3>
                <p className="text-gray-600">
                  Every transaction is recorded on the XRP Ledger, creating an immutable audit trail that anyone can verify. No more wondering where your donation went.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-[#fff0f0] p-6 rounded-xl border border-[#ffd6d6]"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-[#cb2121] rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  🗳️
                </div>
                <h3 className="text-xl font-bold mb-3">Governance</h3>
                <p className="text-gray-600">
                  Donors have voting rights on how funds are allocated, creating a democratic system that ensures accountability and community oversight.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-[#fff0f0] p-6 rounded-xl border border-[#ffd6d6]"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-[#cb2121] rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  ⚡
                </div>
                <h3 className="text-xl font-bold mb-3">Efficiency</h3>
                <p className="text-gray-600">
                  By leveraging the XRPL's fast and low-cost transactions, we minimize overhead and ensure more of your donation reaches those in need.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#cb2121] text-center">How It Works</h2>
            
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#ffd6d6]"></div>
              
              <div className="space-y-16 relative">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-6 md:mb-0 md:pr-12 text-right">
                    <h3 className="text-2xl font-bold mb-2">Donate</h3>
                    <p className="text-gray-600">
                      Connect your XRPL wallet and make transparent donations to verified charities. Every transaction is recorded on the blockchain.
                    </p>
                  </div>
                  <div className="flex-shrink-0 z-10 w-12 h-12 rounded-full bg-[#cb2121] flex items-center justify-center text-white font-bold">1</div>
                  <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-6 md:mb-0 md:pr-12 text-right hidden md:block"></div>
                  <div className="flex-shrink-0 z-10 w-12 h-12 rounded-full bg-[#cb2121] flex items-center justify-center text-white font-bold">2</div>
                  <div className="md:w-1/2 md:pl-12">
                    <h3 className="text-2xl font-bold mb-2">Govern</h3>
                    <p className="text-gray-600">
                      Vote on funding proposals based on your contribution. Charity organizations must create detailed proposals for fund withdrawals.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-6 md:mb-0 md:pr-12 text-right">
                    <h3 className="text-2xl font-bold mb-2">Track</h3>
                    <p className="text-gray-600">
                      Monitor how funds are being used in real-time. See which projects are being funded and their impact metrics.
                    </p>
                  </div>
                  <div className="flex-shrink-0 z-10 w-12 h-12 rounded-full bg-[#cb2121] flex items-center justify-center text-white font-bold">3</div>
                  <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-6 md:mb-0 md:pr-12 text-right hidden md:block"></div>
                  <div className="flex-shrink-0 z-10 w-12 h-12 rounded-full bg-[#cb2121] flex items-center justify-center text-white font-bold">4</div>
                  <div className="md:w-1/2 md:pl-12">
                    <h3 className="text-2xl font-bold mb-2">Verify</h3>
                    <p className="text-gray-600">
                      Beneficiaries and service providers verify fund usage through DID verification, ensuring resources reach intended recipients.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Team Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-5xl mx-auto text-center"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#cb2121]">Our Team</h2>
            <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
              We're a diverse team of blockchain developers, humanitarian experts, and financial technology innovators committed to transforming aid distribution worldwide.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-[#fff0f0] rounded-xl p-6 border border-[#ffd6d6]">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.0&auto=format&fit=crop&w=200&q=80" 
                    alt="Div" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Div</h3>
                <p className="text-[#cb2121] font-medium mb-3">Business Development</p>
                <p className="text-gray-600 text-sm">
                  Leading our strategic partnerships and business growth initiatives to expand our impact in humanitarian aid.
                </p>
              </div>
              
              <div className="bg-[#fff0f0] rounded-xl p-6 border border-[#ffd6d6]">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.0&auto=format&fit=crop&w=200&q=80" 
                    alt="Harini" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Harini</h3>
                <p className="text-[#cb2121] font-medium mb-3">Backend / Data Analytics</p>
                <p className="text-gray-600 text-sm">
                  Creating robust backend systems and data analytics solutions to ensure transparency and efficiency.
                </p>
              </div>
              
              <div className="bg-[#fff0f0] rounded-xl p-6 border border-[#ffd6d6]">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?ixlib=rb-4.0.0&auto=format&fit=crop&w=200&q=80" 
                    alt="Yong Hong" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Yong Hong</h3>
                <p className="text-[#cb2121] font-medium mb-3">Lead Developer</p>
                <p className="text-gray-600 text-sm">
                  Spearheading the development of our XRPL-based platform and governance solutions.
                </p>
              </div>
              
              <div className="bg-[#fff0f0] rounded-xl p-6 border border-[#ffd6d6]">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.0&auto=format&fit=crop&w=200&q=80" 
                    alt="Cody" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Cody</h3>
                <p className="text-[#cb2121] font-medium mb-3">Developer</p>
                <p className="text-gray-600 text-sm">
                  Building innovative blockchain solutions and smart contracts for transparent aid distribution.
                </p>
              </div>
              
              <div className="bg-[#fff0f0] rounded-xl p-6 border border-[#ffd6d6]">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.0&auto=format&fit=crop&w=200&q=80" 
                    alt="Zhi Xian" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Zhi Xian</h3>
                <p className="text-[#cb2121] font-medium mb-3">Data Analytics</p>
                <p className="text-gray-600 text-sm">
                  Creating powerful data insights to measure impact and optimize aid distribution effectiveness.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-[#cb2121]">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center text-white"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Movement</h2>
            <p className="text-xl mb-8">
              Together, we can transform how humanitarian aid reaches those who need it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/donate">
                <button className="px-8 py-3 bg-white text-[#cb2121] rounded-full font-semibold text-lg hover:bg-gray-100 transition-all shadow-md">
                  Donate Now
                </button>
              </Link>
              <Link href="/roadmap">
                <button className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all">
                  View Roadmap
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
