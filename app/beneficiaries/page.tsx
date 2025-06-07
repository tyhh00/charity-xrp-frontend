"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

// Use the same charities data as in donate page
const verifiedNGOs = [
  { 
    name: "Red Cross", 
    address: "rRedCrossXRPAddress123",
    description: "Providing emergency assistance, disaster relief and education in vulnerable communities worldwide. Our focus is on immediate disaster response and long-term recovery programs.",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.0&auto=format&fit=crop&w=800&q=80",
    donated: 245000,
    proposals: 8,
    activeProposals: 2,
    completedProjects: 12,
    location: "Global",
    yearFounded: 1863
  },
  { 
    name: "UNICEF", 
    address: "rUnicefXRPAddress456",
    description: "Working to improve the lives of children worldwide through health, education, protection, and humanitarian response programs in over 190 countries.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.0&auto=format&fit=crop&w=800&q=80",
    donated: 189500,
    proposals: 6,
    activeProposals: 1,
    completedProjects: 9,
    location: "Global",
    yearFounded: 1946
  },
  { 
    name: "Doctors Without Borders", 
    address: "rDoctorsXRPAddress789",
    description: "Delivering emergency medical care where it's needed most, responding to crises and providing healthcare in conflict zones and disaster areas.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.0&auto=format&fit=crop&w=800&q=80",
    donated: 320000,
    proposals: 12,
    activeProposals: 3,
    completedProjects: 15,
    location: "Global",
    yearFounded: 1971
  },
  { 
    name: "Save the Children", 
    address: "rSaveChildrenXRPAddress321",
    description: "Ensuring children's rights to health, education and protection in the world's most vulnerable communities and during humanitarian crises.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.0&auto=format&fit=crop&w=800&q=80",
    donated: 156000,
    proposals: 5,
    activeProposals: 2,
    completedProjects: 7,
    location: "Global",
    yearFounded: 1919
  },
];

export default function Beneficiaries() {
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
      }
    }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 pt-36 py-16">
      <div className="container mx-auto">
        <motion.h1 
          className="text-4xl font-bold mb-2 text-[#cb2121] text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Beneficiaries
        </motion.h1>
        <motion.p 
          className="text-gray-500 mb-12 text-center text-base max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          We partner with trusted organizations around the world to ensure your donations make the greatest impact where help is needed most.
        </motion.p>

        {/* NGO Partners Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[#cb2121]">Verified NGO Partners</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {verifiedNGOs.map((ngo, index) => (
              <motion.div 
                key={ngo.name}
                className="bg-[#fff0f0] border border-[#ffd6d6] rounded-xl p-5 shadow-sm"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-[#ffd6d6]">
                    <img 
                      src={ngo.image} 
                      alt={ngo.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{ngo.name}</h3>
                    <p className="text-sm text-gray-500">Est. {ngo.yearFounded} • {ngo.location}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-3">{ngo.description}</p>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-white p-2 rounded-lg border border-gray-100">
                    <div className="text-sm text-gray-500">Active Proposals</div>
                    <div className="font-bold text-lg">{ngo.activeProposals}</div>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-gray-100">
                    <div className="text-sm text-gray-500">Total Proposals</div>
                    <div className="font-bold text-lg">{ngo.proposals}</div>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-gray-100">
                    <div className="text-sm text-gray-500">Projects</div>
                    <div className="font-bold text-lg">{ngo.completedProjects}</div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-3 border border-[#ffd6d6]">
                  <span className="font-bold text-[#cb2121]">Total Donated: </span>
                  <span>${ngo.donated.toLocaleString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Individual Beneficiaries Coming Soon Section */}
        <motion.div 
          className="max-w-4xl mx-auto mb-12 relative overflow-hidden rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="relative z-10 bg-gradient-to-r from-[#cb2121]/90 to-[#cb2121]/70 p-8 text-white">
            <div className="max-w-lg">
              <h2 className="text-2xl font-bold mb-4">
                Individual Beneficiary Program
                <span className="ml-3 bg-white text-[#cb2121] text-xs px-3 py-1 rounded-full">Coming Soon</span>
              </h2>
              
              <p className="mb-4">
                We're launching a revolutionary program that will allow individuals in crisis situations to receive direct support through verified digital identities.
              </p>
              
              <ul className="list-disc pl-5 mb-6 space-y-2">
                <li>Register with your Decentralized ID (DID)</li>
                <li>Oracle verification of crisis conditions</li>
                <li>Automated distribution of emergency funds</li>
                <li>Transparent tracking and reporting</li>
              </ul>
              
              <button 
                onClick={() => setShowComingSoonModal(true)}
                className="px-6 py-3 bg-white text-[#cb2121] rounded-full font-medium hover:bg-gray-100 transition-all shadow-md"
              >
                Learn More
              </button>
            </div>
          </div>
          
          {/* Blurred background image */}
          <div className="absolute inset-0 blur-sm">
            <img 
              src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.0&auto=format&fit=crop&w=1200&q=80" 
              alt="Crisis support" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
        
        {/* Back to Home button */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link href="/">
            <button className="px-6 py-2 rounded-full border-2 border-[#cb2121] text-[#cb2121] bg-white hover:bg-[#cb2121] hover:text-white font-medium transition-all shadow-md">
              Back to Home
            </button>
          </Link>
        </motion.div>
      </div>
      
      {/* Coming Soon Modal */}
      {showComingSoonModal && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button 
              onClick={() => setShowComingSoonModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-[#fff0f0] rounded-full flex items-center justify-center">
                <span className="text-3xl">🚀</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-2 text-[#cb2121]">Coming Soon!</h3>
              <p className="text-gray-600 mb-4">
                Our Individual Beneficiary Program is currently in development. We're working with humanitarian organizations and blockchain experts to create a secure, efficient system for direct aid distribution.
              </p>
              
              <div className="bg-[#fff0f0] border border-[#ffd6d6] rounded-lg p-4 mb-4">
                <h4 className="font-bold mb-2">How it will work:</h4>
                <ol className="text-left text-sm space-y-2">
                  <li>1. Register your DID as a potential beneficiary</li>
                  <li>2. Our oracle network monitors global crisis situations</li>
                  <li>3. When a crisis is detected in your area, you become eligible</li>
                  <li>4. Request aid through our simple verification process</li>
                  <li>5. Receive funds directly to your wallet</li>
                </ol>
              </div>
              
              <div className="text-sm text-gray-500">
                Want to be notified when this launches? Join our community to stay updated!
              </div>
              
              <button 
                onClick={() => setShowComingSoonModal(false)}
                className="mt-6 px-6 py-3 bg-[#cb2121] hover:bg-[#a81b1b] text-white rounded-full font-medium transition-all shadow-md w-full"
              >
                Stay Tuned
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
