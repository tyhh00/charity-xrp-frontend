import { FaDollarSign, FaHeartbeat, FaUsers, FaRegHeart } from "react-icons/fa";

export function Stats() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-2  bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">Real-Time Impact</h2>
        <p className="text-center text-gray-500 mb-12 text-lg">
          Track every transaction and see the difference your donations make
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Total Disbursed */}
          <div className="rounded-2xl p-8 bg-[#fff0f0] border border-[#ffd6d6] shadow-sm flex flex-col justify-between min-h-[220px]">
            <div className="flex items-center justify-between mb-2">
              <FaDollarSign className="text-3xl text-[#cb2121]" />
              <span className="text-[#cb2121] font-medium">+2.4% this week</span>
            </div>
            <div className="text-4xl font-bold text-[#7a1a1a] mb-1">$2,884,073</div>
            <div className="text-lg font-semibold text-[#7a1a1a]">Total Disbursed (RLUSD)</div>
            <div className="text-[#cb2121] mt-2 text-sm">+2.4% this week</div>
          </div>

          {/* Active Campaigns */}
          <div className="rounded-2xl p-8 bg-[#f7fafd] border border-[#e5eaf0] shadow-sm flex flex-col justify-between min-h-[220px]">
            <div className="flex items-center justify-between mb-2">
              <FaHeartbeat className="text-3xl text-[#1a2a3a]" />
              <span className="text-gray-500 font-medium">3 new this month</span>
            </div>
            <div className="text-4xl font-bold text-[#1a2a3a] mb-1">491</div>
            <div className="text-lg font-semibold text-[#1a2a3a]">Active Campaigns</div>
            <div className="text-gray-500 mt-2 text-sm">3 new this month</div>
          </div>

          {/* People Helped */}
          <div className="rounded-2xl p-8 bg-[#fff0f0] border border-[#ffd6d6] shadow-sm flex flex-col justify-between min-h-[220px]">
            <div className="flex items-center justify-between mb-2">
              <FaUsers className="text-3xl text-[#cb2121]" />
              <span className="text-[#cb2121] font-medium">+847 this week</span>
            </div>
            <div className="text-4xl font-bold text-[#7a1a1a] mb-1">19,183</div>
            <div className="text-lg font-semibold text-[#7a1a1a]">People Helped</div>
            <div className="text-[#cb2121] mt-2 text-sm">+847 this week</div>
          </div>

          {/* Average Aid per Person */}
          <div className="rounded-2xl p-8 bg-[#f7fafd] border border-[#e5eaf0] shadow-sm flex flex-col justify-between min-h-[220px]">
            <div className="flex items-center justify-between mb-2">
              <FaRegHeart className="text-3xl text-[#1a2a3a]" />
              <span className="text-gray-500 font-medium">Efficient RLUSD</span>
            </div>
            <div className="text-4xl font-bold text-[#1a2a3a] mb-1">$498</div>
            <div className="text-lg font-semibold text-[#1a2a3a]">Average Aid per Person</div>
            <div className="text-gray-500 mt-2 text-sm">Efficient RLUSD</div>
          </div>
        </div>
      </div>
    </section>
  );
} 