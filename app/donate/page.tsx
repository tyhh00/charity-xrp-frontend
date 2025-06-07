"use client";
import Link from "next/link";
import { useState } from "react";
// import { motion } from "framer-motion/dist/framer-motion";

const charities = [
  { name: "Red Cross", address: "rRedCrossXRPAddress123" },
  { name: "UNICEF", address: "rUnicefXRPAddress456" },
  { name: "Doctors Without Borders", address: "rDoctorsXRPAddress789" },
  { name: "Save the Children", address: "rSaveChildrenXRPAddress321" },
];

export default function Donate() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setIsLoading(true);
    setTimeout(() => {
      if (recipient && amount) {
        setStatus({ type: 'success', message: 'Donation successful! Thank you for your support.' });
      } else {
        setStatus({ type: 'error', message: 'Please select a charity and enter an amount.' });
      }
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-4xl font-bold mb-4 text-[#cb2121]">Donate to AidSafe</h1>
      <form onSubmit={handleDonate} className="w-full max-w-md bg-[#fff0f0] rounded-xl shadow p-8 mb-6 flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Address</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#cb2121]"
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
          >
            <option value="">Select a charity</option>
            {charities.map((charity) => (
              <option key={charity.address} value={charity.address}>
                {charity.name} ({charity.address})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <input
            type="number"
            min="0"
            step="any"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#cb2121]"
            placeholder="Enter amount in XRP"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-[#cb2121] hover:bg-[#a81b1b] text-white font-semibold text-lg transition-all shadow-md mt-2 disabled:opacity-60"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Donate XRP'}
        </button>
        {status && (
          <div className={`w-full text-center py-2 rounded mt-2 font-medium ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {status.message}
          </div>
        )}
      </form>
      <Link href="/">
        <button className="px-6 py-2 rounded-full border-2 border-[#cb2121] text-[#cb2121] bg-white hover:bg-[#cb2121] hover:text-white font-medium transition-all shadow-md">
          Back to Home
        </button>
      </Link>
    </div>
  );
} 