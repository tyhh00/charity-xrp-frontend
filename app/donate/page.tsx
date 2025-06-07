"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useXRPLClient, subscribeToWalletEvents } from '@/hooks/useXRPLClient';
import sdk from '@crossmarkio/sdk';

const charities = [
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

type Proposal = {
  id: string;
  title: string;
  description: string;
  amount: number;
  votes: { yes: number; no: number };
  status: 'active' | 'passed' | 'rejected';
  endDate: Date;
  createdAt: Date;
};

const sampleProposals: Proposal[] = [
  {
    id: "prop-1",
    title: "Emergency Flood Relief - Bangladesh",
    description: "Funds required for immediate flood relief operations in southern Bangladesh, providing clean water, food, and medical supplies to affected areas.",
    amount: 85000,
    votes: { yes: 65, no: 15 },
    status: 'active',
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: "prop-2",
    title: "Medical Supplies for Yemen",
    description: "Purchase of essential medical equipment and supplies for three clinics in conflict-affected regions of Yemen.",
    amount: 120000,
    votes: { yes: 78, no: 12 },
    status: 'active',
    endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: "prop-3",
    title: "School Rebuilding - Haiti",
    description: "Reconstruction of schools damaged by recent earthquakes in Haiti's southern peninsula.",
    amount: 150000,
    votes: { yes: 92, no: 8 },
    status: 'passed',
    endDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
];

export default function Donate() {
  const { connect, isConnected, address } = useXRPLClient();
  const [txHash, setTxHash] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'donate' | 'info' | 'vote'>('donate');
  const [selectedCharity, setSelectedCharity] = useState<typeof charities[0] | null>(null);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [voteChoice, setVoteChoice] = useState<'yes' | 'no' | null>(null);

  const handleOpenModal = (charity: typeof charities[0], type: 'donate' | 'info') => {
    setSelectedCharity(charity);
    setModalType(type);
    setShowModal(true);
    setStatus(null);
    setAmount("");
  };

  const handleOpenVoteModal = (charity: typeof charities[0], proposal: Proposal) => {
    setSelectedCharity(charity);
    setSelectedProposal(proposal);
    setModalType('vote');
    setShowModal(true);
    setVoteChoice(null);
    setStatus(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setStatus(null);
    setSelectedProposal(null);
    setVoteChoice(null);
  };

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCharity) {
      setStatus({ type: 'error', message: 'No charity selected.' });
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      setStatus({ type: 'error', message: 'Please enter a valid amount.' });
      return;
    }
    
    // Connect wallet first if not connected (exactly like test page)
    if (!isConnected || !address) {
      try {
        await connect();
      } catch (err) {
        setStatus({ type: 'error', message: 'Please connect your wallet first' });
        return;
      }
    }

    setIsLoading(true);
    setStatus(null);
    setTxHash(null);

    try {
      console.log('Donation amount being sent:', {
        enteredAmount: amount,
        parsedAmount: parseFloat(amount),
        donorAddress: address,
        charityAddress: selectedCharity.address
      });
      
      // Step 1: Prepare the transaction - exactly like test page
      const prepareResponse = await fetch(process.env.NEXT_PUBLIC_AIDSAFE_BACKEND_URL + '/api/donate/prepare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorAddress: address,
          charityAddress: 'rNixerUVPwrhxGDt4UooDu6FJ7zuofvjCF',
          amount: amount  // Make sure this is sent as a string to preserve decimal precision
        })
      });
      
      const prepareData = await prepareResponse.json();
      
      if (prepareData.status !== 'success') {
        throw new Error(prepareData.message || 'Failed to prepare transaction');
      }
      
      // Step 2: Sign with wallet - exactly like test page
      const signResponse = await sdk.async.signAndWait(prepareData.unsignedTx);
      
      if (!signResponse || !signResponse.response.data.txBlob) {
        throw new Error('Failed to sign transaction');
      }
      
      // Step 3: Submit - exactly like test page
      const submitResponse = await fetch(process.env.NEXT_PUBLIC_AIDSAFE_BACKEND_URL + '/api/donate/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          signedTx: signResponse.response.data.txBlob
        })
      });
      
      const submitData = await submitResponse.json();
      
      if (submitData.status !== 'success') {
        throw new Error(submitData.message || 'Failed to submit transaction');
      }
      
      setTxHash(submitData.txHash);
      setStatus({ 
        type: 'success', 
        message: 'Donation successfully sent to the charity!' 
      });
      
    } catch (err) {
      console.error('Donation error:', err);
      setStatus({ 
        type: 'error', 
        message: err instanceof Error ? err.message : 'Unknown error occurred' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVote = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setIsLoading(true);
    setTimeout(() => {
      if (voteChoice && selectedProposal) {
        setStatus({ type: 'success', message: `You voted ${voteChoice.toUpperCase()} on this proposal. Thank you!` });
        setTimeout(() => {
          handleCloseModal();
        }, 2000);
      } else {
        setStatus({ type: 'error', message: 'Please select your vote.' });
      }
      setIsLoading(false);
    }, 1200);
  };

  function formatDaysLeft(endDate: Date): string {
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} left`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} left`;
    } else {
      return 'Ending soon';
    }
  }

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

  // Add this effect to refresh connection status when the modal opens
  useEffect(() => {
    if (showModal && modalType === 'donate') {
      const checkConnection = async () => {
        if (!isConnected || !address) {
          try {
            await connect();
          } catch (err) {
            console.error('Failed to check connection status:', err);
          }
        }
      };
      
      checkConnection();
    }
  }, [showModal, modalType, connect, isConnected, address]);

  // Add this near the top of the Donate component to debug wallet connection
  useEffect(() => {
    if (isConnected && address) {
      console.log('Current connected wallet address:', address);
      
      // Check what's available in the SDK session
      if (sdk.session && sdk.session.user) {
        console.log('SDK session user:', sdk.session.user);
      }
    }
  }, [isConnected, address]);

  // Add this effect to listen for wallet connection events
  useEffect(() => {
    // Subscribe to wallet connection events
    const unsubscribe = subscribeToWalletEvents((walletAddress, connected) => {
      console.log('Wallet connection changed:', { walletAddress, connected });
      if (connected && walletAddress) {
        setStatus(null); // Clear any previous status messages
      }
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-white px-4 pt-36 pb-32">
      <div className="container mx-auto">
        <motion.h1 
          className="text-4xl font-bold mb-2 text-[#cb2121] text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Support Our Charities
        </motion.h1>
        <motion.p 
          className="text-gray-500 mb-12 text-center text-base max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Make a difference by supporting these trusted organizations. All donations are transparent and governed by community voting.
        </motion.p>

        {/* Charity List */}
        <div className="max-w-4xl mx-auto mb-12">
          {charities.map((charity, index) => (
            <motion.div 
              key={charity.address} 
              className="bg-[#fff0f0] border border-[#ffd6d6] rounded-2xl p-6 shadow-sm mb-6 overflow-hidden"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 flex-shrink-0">
                  <div className="h-48 md:h-full rounded-lg overflow-hidden">
                    <img 
                      src={charity.image} 
                      alt={charity.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
                    <h2 className="text-2xl font-bold text-black">{charity.name}</h2>
                    <div className="mt-2 md:mt-0 flex items-center bg-white rounded-full px-3 py-1 border border-[#ffd6d6]">
                      <span className="text-[#cb2121] font-semibold">${charity.donated.toLocaleString()}</span>
                      <span className="text-gray-500 text-sm ml-1">donated</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{charity.description.substring(0, 100)}...</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                    <div className="bg-white p-2 rounded-lg border border-gray-100">
                      <div className="text-sm text-gray-500">Active Proposals</div>
                      <div className="font-bold text-lg">{charity.activeProposals}</div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-gray-100">
                      <div className="text-sm text-gray-500">Total Proposals</div>
                      <div className="font-bold text-lg">{charity.proposals}</div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-gray-100">
                      <div className="text-sm text-gray-500">Completed Projects</div>
                      <div className="font-bold text-lg">{charity.completedProjects}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <button 
                      onClick={() => handleOpenModal(charity, 'donate')}
                      className="w-full sm:w-auto py-3 px-6 rounded-md bg-[#cb2121] hover:bg-[#a81b1b] text-white font-semibold transition-all shadow-md"
                    >
                      Donate Now
                    </button>
                    <button 
                      onClick={() => handleOpenModal(charity, 'info')}
                      className="w-full sm:w-auto py-3 px-6 rounded-md border-2 border-[#cb2121] text-[#cb2121] bg-white hover:bg-[#fff0f0] font-semibold transition-all"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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

      {/* Modal */}
      {showModal && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-2xl shadow-lg max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
            >
              ✕
            </button>
            
            {modalType === 'donate' && selectedCharity && (
              <>
                <h2 className="text-2xl font-bold mb-2 text-[#cb2121]">Donate to {selectedCharity.name}</h2>
                <p className="text-gray-500 text-sm mb-4">{selectedCharity.description}</p>
                
                <form onSubmit={handleDonate} className="flex flex-col gap-4">
                  {/* Wallet status indicator - simplified */}

  
             

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Address</label>
                    <div className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 text-gray-700">
                      {selectedCharity.address}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#cb2121]"
                      placeholder="Enter amount in RLUSD"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    <p>By donating, you gain governance rights proportional to your contribution. You'll be able to vote on funding proposals.</p>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#cb2121] hover:bg-[#a81b1b] text-white font-semibold text-lg transition-all shadow-md mt-2 disabled:opacity-60"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Donate RLUSD'}
                  </button>
                  {status && (
                    <div className={`w-full text-center py-3 rounded mt-2 font-medium ${
                      status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      <p>{status.message}</p>
                      
                      {status.type === 'success' && txHash && (
                        <div className="mt-2 text-sm">
                          <p className="font-mono break-all">
                            Transaction Hash: {txHash}
                          </p>
                          <a 
                            href={`https://testnet.xrpl.org/transactions/${txHash}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block mt-2 text-[#cb2121] hover:underline"
                          >
                            View on XRPL Explorer →
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </form>
              </>
            )}
            
            {modalType === 'info' && selectedCharity && (
              <div className="flex flex-col">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-1 text-[#cb2121]">{selectedCharity.name}</h2>
                  <p className="text-gray-700 mb-4">{selectedCharity.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-[#fff0f0] rounded-lg">
                      <div className="text-sm text-gray-500">Location</div>
                      <div className="font-medium">{selectedCharity.location}</div>
                    </div>
                    <div className="p-4 bg-[#fff0f0] rounded-lg">
                      <div className="text-sm text-gray-500">Founded</div>
                      <div className="font-medium">{selectedCharity.yearFounded}</div>
                    </div>
                    <div className="p-4 bg-[#fff0f0] rounded-lg">
                      <div className="text-sm text-gray-500">Total Donations</div>
                      <div className="font-medium">${selectedCharity.donated.toLocaleString()}</div>
                    </div>
                    <div className="p-4 bg-[#fff0f0] rounded-lg">
                      <div className="text-sm text-gray-500">Completed Projects</div>
                      <div className="font-medium">{selectedCharity.completedProjects}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Governance Proposals</h3>
                  
                  {sampleProposals.map((proposal) => (
                    <motion.div 
                      key={proposal.id}
                      className="mb-4 border border-gray-200 rounded-lg p-4 bg-white"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold">{proposal.title}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          proposal.status === 'active' ? 'bg-blue-100 text-blue-700' : 
                          proposal.status === 'passed' ? 'bg-green-100 text-green-700' : 
                          'bg-red-100 text-red-700'
                        }`}>
                          {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{proposal.description}</p>
                      <div className="flex justify-between items-center text-sm mb-3">
                        <span>Amount: <span className="font-semibold">${proposal.amount.toLocaleString()}</span></span>
                        {proposal.status === 'active' && (
                          <span className="text-blue-600">{formatDaysLeft(proposal.endDate)}</span>
                        )}
                      </div>
                      
                      {/* Progress bar for votes */}
                      {(proposal.votes.yes > 0 || proposal.votes.no > 0) && (
                        <div className="mb-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Yes: {Math.round(proposal.votes.yes / (proposal.votes.yes + proposal.votes.no) * 100)}%</span>
                            <span>No: {Math.round(proposal.votes.no / (proposal.votes.yes + proposal.votes.no) * 100)}%</span>
                          </div>
                          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500"
                              style={{ width: `${(proposal.votes.yes / (proposal.votes.yes + proposal.votes.no)) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                      
                      {proposal.status === 'active' && (
                        <button
                          onClick={() => handleOpenVoteModal(selectedCharity, proposal)}
                          className="w-full py-2 rounded-md bg-[#cb2121] hover:bg-[#a81b1b] text-white font-medium text-sm transition-all"
                        >
                          Vote Now
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {modalType === 'vote' && selectedCharity && selectedProposal && (
              <div>
                <h2 className="text-2xl font-bold mb-1 text-[#cb2121]">Vote on Proposal</h2>
                <h3 className="text-lg font-medium mb-4">{selectedProposal.title}</h3>
                
                <div className="bg-[#fff0f0] p-4 rounded-lg mb-6">
                  <p className="text-gray-700 mb-3">{selectedProposal.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Requested Amount:</span>
                    <span className="font-bold">${selectedProposal.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Voting Ends:</span>
                    <span className="font-medium">{selectedProposal.endDate.toLocaleDateString()}</span>
                  </div>
                </div>
                
                <form onSubmit={handleVote} className="flex flex-col gap-4">
                  <div className="mb-4">
                    <p className="font-medium mb-3">Cast your vote:</p>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setVoteChoice('yes')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          voteChoice === 'yes' 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="font-bold text-center text-green-600 mb-1">YES</div>
                        <div className="text-sm text-center text-gray-500">Approve funding</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setVoteChoice('no')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          voteChoice === 'no' 
                            ? 'border-red-500 bg-red-50' 
                            : 'border-gray-200 hover:border-red-300'
                        }`}
                      >
                        <div className="font-bold text-center text-red-600 mb-1">NO</div>
                        <div className="text-sm text-center text-gray-500">Reject funding</div>
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-2">
                    <p>Voting power is proportional to your contributions. Proposals require 51% majority to pass.</p>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#cb2121] hover:bg-[#a81b1b] text-white font-semibold text-lg transition-all shadow-md disabled:opacity-60"
                    disabled={isLoading || !voteChoice}
                  >
                    {isLoading ? 'Processing...' : 'Submit Vote'}
                  </button>
                  
                  {status && (
                    <div className={`w-full text-center py-2 rounded mt-2 font-medium ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {status.message}
                    </div>
                  )}
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
} 