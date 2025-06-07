import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#181e29] text-gray-300 pt-12 pb-6 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            {/* <Image src="/safeaid-logo.png" alt="AidSafe Logo" width={120} height={120} className="mb-4" /> */}
            <p className="text-sm mb-4">
              Revolutionizing humanitarian aid distribution through blockchain technology, ensuring transparency, security, and efficiency in every transaction.
            </p>
            <div className="flex gap-3 text-xl">
            </div>
          </div>
          {/* Platform */}
          <div>
            <div className="font-semibold text-white mb-2">Platform</div>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">NGO Portal</a></li>
              <li><a href="#" className="hover:underline">Vendor Portal</a></li>
              <li><a href="#" className="hover:underline">Donor Dashboard</a></li>
              <li><a href="#" className="hover:underline">API Documentation</a></li>
            </ul>
          </div>
          {/* Resources */}
          <div>
            <div className="font-semibold text-white mb-2">Resources</div>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Documentation</a></li>
              <li><a href="#" className="hover:underline">Security</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Support</a></li>
            </ul>
          </div>
          {/* Company */}
          <div>
            <div className="font-semibold text-white mb-2">Company</div>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
        </div>
        <hr className="border-gray-700 mb-4" />
        <div className="text-center text-sm text-gray-400">
          © 2024 AidSafe. All rights reserved. Built with <span className="text-[#cb2121]">♥</span> for humanitarian impact.
        </div>
      </div>
    </footer>
  );
} 