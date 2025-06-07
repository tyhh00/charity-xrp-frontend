import { FaShieldAlt, FaHeartbeat, FaEye } from "react-icons/fa";

export function HowItWorksXRPL() {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center gap-8 py-16 px-4 bg-[#fff6f6] rounded-xl mt-8">
      {/* Left: Features */}
      <div className="flex-1 flex flex-col gap-8 max-w-lg">
        <div className="flex items-start gap-4">
          <div className="bg-[#ffeaea] text-[#cb2121] rounded-xl p-3 flex items-center justify-center">
            <FaShieldAlt className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-lg md:text-xl mb-1">Tamper-Proof Security</div>
            <div className="text-gray-600 text-base">All transactions are cryptographically secured and immutably recorded on the blockchain, ensuring complete data integrity.</div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="bg-[#ffeaea] text-[#cb2121] rounded-xl p-3 flex items-center justify-center">
            <FaHeartbeat className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-lg md:text-xl mb-1">Lightning Fast Settlements</div>
            <div className="text-gray-600 text-base">Transactions settle in 3-5 seconds with minimal fees, ensuring aid reaches recipients quickly and efficiently.</div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="bg-[#ffeaea] text-[#cb2121] rounded-xl p-3 flex items-center justify-center">
            <FaEye className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-lg md:text-xl mb-1">Complete Transparency</div>
            <div className="text-gray-600 text-base">Every transaction is publicly verifiable while protecting individual beneficiary privacy through advanced cryptographic techniques.</div>
          </div>
        </div>
      </div>
      {/* Right: Metrics Card */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-[#ffeaea] rounded-2xl p-8 w-full max-w-md shadow flex flex-col items-center">
          <div className="font-bold text-xl mb-6 text-black text-center">XRPL Performance Metrics</div>
          <div className="grid grid-cols-2 gap-8 w-full text-center">
            <div>
              <div className="text-3xl font-bold text-[#cb2121]">99.97%</div>
              <div className="text-gray-600 text-sm mt-1">Network Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#cb2121]">$0.0002</div>
              <div className="text-gray-600 text-sm mt-1">Avg Transaction Fee</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#cb2121]">3-5s</div>
              <div className="text-gray-600 text-sm mt-1">Settlement Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#cb2121]">1.5M+</div>
              <div className="text-gray-600 text-sm mt-1">Daily Transactions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 