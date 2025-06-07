import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-red-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-red-600">
          Charity XRP
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-gray-600 hover:text-red-600">
            Dashboard
          </Link>
          <Link href="/campaigns" className="text-gray-600 hover:text-red-600">
            Campaigns
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-red-600">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
} 