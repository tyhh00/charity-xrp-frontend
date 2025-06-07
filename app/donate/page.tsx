import Link from "next/link";

export default function Donate() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold mb-4 text-[#cb2121]">Donate to AidSafe</h1>
      <p className="text-lg text-gray-700 mb-8">Thank you for your interest in supporting humanitarian aid. Donation functionality coming soon!</p>
      <Link href="/">
        <button className="px-6 py-2 rounded-full border-2 border-[#cb2121] text-[#cb2121] bg-white hover:bg-[#cb2121] hover:text-white font-medium transition-all shadow-md">
          Back to Home
        </button>
      </Link>
    </div>
  );
} 