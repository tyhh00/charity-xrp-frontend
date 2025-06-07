"use client";
import { useRouter } from "next/navigation";
import React from "react";

const campaigns = [
  {
    title: "Education Initiative - Kenya",
    location: "Kenya",
    status: "Active",
    statusColor: "bg-green-100 text-green-700",
    progress: 78,
    raised: 124500,
    goal: 200000,
    beneficiaries: 2400,
  },
  {
    title: "Food Security - Bangladesh",
    location: "Bangladesh",
    status: "Funding",
    statusColor: "bg-orange-100 text-orange-700",
    progress: 45,
    raised: 89500,
    goal: 150000,
    beneficiaries: 1800,
  },
];

const transactions = [
  {
    type: "Aid Disbursed",
    user: "Sarah K.",
    detail: "Local Market",
    value: "$125",
    time: "2 mins ago",
    highlight: true,
    sub: undefined,
  },
  {
    type: "New Beneficiary",
    user: "Ahmed M.",
    detail: "Registration",
    value: "DID Created",
    time: "5 mins ago",
    highlight: false,
    sub: true,
  },
  {
    type: "Vendor Verified",
    user: "MedSupply Co.",
    detail: "Health Sector",
    value: "Approved",
    time: "8 mins ago",
    highlight: false,
    sub: true,
  },
];

export function ImpactDashboard() {
  const router = useRouter();
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl text-center font-bold bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent mb-1">Live Impact Dashboard</h2>
        <p className="text-gray-500 mb-8 text-base text-center pb-2">Real-time transparency for all stakeholders</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Active Campaigns */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Active Campaigns</h3>
            <div className="flex flex-col gap-6">
              {campaigns.map((c, i) => (
                <div key={i} className="bg-[#fff0f0] border border-[#ffd6d6] rounded-2xl p-6 shadow-sm flex flex-col gap-2">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <div className="text-lg font-bold text-black">{c.title}</div>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <span>📍</span>
                        <span>{c.location}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${c.statusColor}`}>{c.status}</span>
                  </div>
                  <div className="text-gray-500 text-sm mb-1">Progress: {c.progress}% complete</div>
                  <div className="w-full h-2 rounded-full bg-gray-200 mb-2">
                    <div
                      className="h-2 rounded-full bg-[#cb2121]"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-500">{c.beneficiaries} beneficiaries</span>
                    <span className="text-gray-700 font-medium">
                      ${c.raised.toLocaleString()} / ${c.goal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <button onClick={() => router.push("/donate")} className="px-6 py-2 rounded-md bg-[#cb2121] text-white font-semibold shadow hover:bg-[#a81b1b] transition-all">
                      Donate to Campaign
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Live Transaction Feed */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              Live Transaction Feed <span className="text-[#cb2121] text-2xl">•</span>
            </h3>
            <div className="flex flex-col gap-4">
              {transactions.map((t, i) => (
                <div key={i} className="bg-white border border-[#ffd6d6] rounded-2xl p-5 shadow-sm flex flex-col gap-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="flex items-center gap-2 text-[#cb2121] font-semibold">
                      <span className="text-lg">•</span> {t.type}
                    </span>
                    <span className="text-gray-400 text-xs">{t.time}</span>
                  </div>
                  <div className="text-gray-700 font-medium">{t.user}</div>
                  <div className="text-gray-500 text-sm mb-1">{t.detail}</div>
                  <div className={`font-bold ${t.highlight ? "text-black" : "text-[#cb2121]"} ${t.sub ? "text-xs" : "text-lg"}`}>{t.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 