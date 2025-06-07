// 'use client';

// import { useState, useEffect } from 'react';
// import { DollarSign, Activity, Users, Heart, TrendingUp, MapPin, ExternalLink, Filter, Calendar } from 'lucide-react';
// // import Header from '@/components/ui/Header';
// // import Footer from '@/components/layout/Footer';
// // import StatsCard from '@/components/ui/StatsCard';
// // import CampaignCard from '@/components/ui/CampaignCard';

// export default function Dashboard() {
//   const [liveStats, setLiveStats] = useState({
//     totalDisbursed: 2847592,
//     activeCampaigns: 491,
//     peopleHelped: 18439,
//     averageAid: 498,
//     totalDonations: 3200000,
//     vendorsActive: 1247
//   });

//   const [selectedFilter, setSelectedFilter] = useState('all');
//   const [selectedTimeframe, setSelectedTimeframe] = useState('30days');

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setLiveStats(prev => ({
//         ...prev,
//         totalDisbursed: prev.totalDisbursed + Math.floor(Math.random() * 100),
//         peopleHelped: prev.peopleHelped + Math.floor(Math.random() * 3)
//       }));
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   const campaigns = [
//     {
//       id: "edu-kenya",
//       name: "Education Initiative - Kenya",
//       location: "Kenya",
//       status: "Active" as const,
//       progress: 78,
//       disbursed: 124500,
//       target: 200000,
//       beneficiaries: 2400
//     },
//     {
//       id: "food-bangladesh",
//       name: "Food Security - Bangladesh",
//       location: "Bangladesh",
//       status: "Funding" as const,
//       progress: 45,
//       disbursed: 89500,
//       target: 150000,
//       beneficiaries: 1800
//     },
//     {
//       id: "health-uganda",
//       name: "Healthcare Access - Uganda",
//       location: "Uganda",
//       status: "Active" as const,
//       progress: 92,
//       disbursed: 184000,
//       target: 200000,
//       beneficiaries: 3200
//     },
//     {
//       id: "water-ethiopia",
//       name: "Clean Water Initiative - Ethiopia",
//       location: "Ethiopia",
//       status: "Completed" as const,
//       progress: 100,
//       disbursed: 150000,
//       target: 150000,
//       beneficiaries: 2800
//     }
//   ];

//   const recentTransactions = [
//     {
//       id: 1,
//       type: "Aid Disbursed",
//       amount: "$125",
//       beneficiary: "Sarah K.",
//       vendor: "Local Market",
//       time: "2 mins ago",
//       txHash: "0x1234...5678",
//       color: "bg-red-500"
//     },
//     {
//       id: 2,
//       type: "New Beneficiary",
//       amount: "DID Created",
//       beneficiary: "Ahmed M.",
//       vendor: "Registration",
//       time: "5 mins ago",
//       txHash: "0x2345...6789",
//       color: "bg-red-600"
//     },
//     {
//       id: 3,
//       type: "Vendor Verified",
//       amount: "Approved",
//       beneficiary: "MedSupply Co.",
//       vendor: "Health Sector",
//       time: "8 mins ago",
//       txHash: "0x3456...7890",
//       color: "bg-red-700"
//     },
//     {
//       id: 4,
//       type: "Donation Received",
//       amount: "$500",
//       beneficiary: "Anonymous Donor",
//       vendor: "General Fund",
//       time: "12 mins ago",
//       txHash: "0x4567...8901",
//       color: "bg-green-500"
//     },
//     {
//       id: 5,
//       type: "Aid Disbursed",
//       amount: "$75",
//       beneficiary: "Maria L.",
//       vendor: "Food Store",
//       time: "15 mins ago",
//       txHash: "0x5678...9012",
//       color: "bg-red-500"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
//       <Header />

//       {/* Dashboard Header */}
//       <section className="py-12 bg-white border-b border-red-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <div>
//               <h1 className="text-4xl font-bold text-gray-900 mb-2">Impact Dashboard</h1>
//               <p className="text-gray-600">Real-time transparency and analytics for humanitarian aid distribution</p>
//             </div>
//             <div className="flex gap-4">
//               <select 
//                 value={selectedFilter}
//                 onChange={(e) => setSelectedFilter(e.target.value)}
//                 className="px-4 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
//               >
//                 <option value="all">All Campaigns</option>
//                 <option value="education">Education</option>
//                 <option value="healthcare">Healthcare</option>
//                 <option value="food">Food Security</option>
//                 <option value="water">Water & Sanitation</option>
//               </select>
//               <select 
//                 value={selectedTimeframe}
//                 onChange={(e) => setSelectedTimeframe(e.target.value)}
//                 className="px-4 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
//               >
//                 <option value="7days">Last 7 Days</option>
//                 <option value="30days">Last 30 Days</option>
//                 <option value="90days">Last 90 Days</option>
//                 <option value="1year">Last Year</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Stats Grid */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <StatsCard
//               icon={DollarSign}
//               title="Total Disbursed"
//               value={`$${liveStats.totalDisbursed.toLocaleString()}`}
//               subtitle="Total Aid Disbursed (RLUSD)"
//               trend="+2.4% this week"
//               color="red"
//             />
//             <StatsCard
//               icon={Heart}
//               title="Total Donations"
//               value={`$${liveStats.totalDonations.toLocaleString()}`}
//               subtitle="Total Donations Received"
//               trend="+5.2% this week"
//               color="red"
//             />
//             <StatsCard
//               icon={Activity}
//               title="Active Campaigns"
//               value={liveStats.activeCampaigns}
//               subtitle="Currently Running"
//               trend="3 new this month"
//               color="gray"
//             />
//             <StatsCard
//               icon={Users}
//               title="People Helped"
//               value={liveStats.peopleHelped.toLocaleString()}
//               subtitle="Beneficiaries Reached"
//               trend="+847 this week"
//               color="red"
//             />
//             <StatsCard
//               icon={Users}
//               title="Active Vendors"
//               value={liveStats.vendorsActive.toLocaleString()}
//               subtitle="Verified Aid Vendors"
//               trend="+23 this month"
//               color="gray"
//             />
//             <StatsCard
//               icon={TrendingUp}
//               title="Average Aid"
//               value={`$${liveStats.averageAid}`}
//               subtitle="Per Beneficiary"
//               trend="Efficient Distribution"
//               color="red"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Campaigns and Transactions */}
//       <section className="py-16 bg-red-50/50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* All Campaigns */}
//             <div className="lg:col-span-2">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-gray-900">All Campaigns</h2>
//                 <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
//                   Create Campaign
//                 </button>
//               </div>
//               <div className="grid gap-6">
//                 {campaigns.map((campaign) => (
//                   <CampaignCard key={campaign.id} campaign={campaign} />
//                 ))}
//               </div>
//             </div>

//             {/* Live Transaction Feed */}
//             <div>
//               <div className="flex items-center gap-2 mb-6">
//                 <h2 className="text-2xl font-bold text-gray-900">Live Transactions</h2>
//                 <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
//               </div>
//               <div className="space-y-3">
//                 {recentTransactions.map((transaction) => (
//                   <div key={transaction.id} className="bg-white p-4 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-all">
//                     <div className="flex items-start gap-3">
//                       <div className={`w-3 h-3 ${transaction.color} rounded-full mt-2`}></div>
//                       <div className="flex-1">
//                         <div className="flex justify-between items-start mb-1">
//                           <span className="font-medium text-gray-900">{transaction.type}</span>
//                           <span className="text-sm text-gray-500">{transaction.time}</span>
//                         </div>
//                         <div className="text-sm text-gray-600">
//                           <div>{transaction.beneficiary}</div>
//                           <div className="text-xs text-gray-500">{transaction.vendor}</div>
//                         </div>
//                         <div className="flex justify-between items-center mt-2">
//                           <div className="text-sm font-semibold text-gray-900">{transaction.amount}</div>
//                           <button className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1">
//                             View Tx
//                             <ExternalLink className="w-3 h-3" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 <button className="w-full py-3 text-red-600 hover:text-red-700 font-medium text-sm flex items-center justify-center gap-1 hover:bg-red-50 rounded-lg transition-all">
//                   View All Transactions
//                   <ExternalLink className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }