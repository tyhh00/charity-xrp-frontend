import { IconHeart, IconShield, IconWorld } from "@/components/ui/icons";

const features = [
  {
    title: "Secure Aid Wallet",
    description: "Geo-fenced RLUSD distribution with smart expiry and verified recipient system",
    icon: IconShield,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Decentralized Identity",
    description: "Blockchain-based identity solution for displaced individuals with NGO attestation",
    icon: IconWorld,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Transparent Distribution",
    description: "Real-time tracking of aid distribution with immutable XRPL ledger records",
    icon: IconHeart,
    gradient: "from-orange-500 to-red-500",
  },
];

export function Features() {
  return (
    <section className="py-20 px-4 ">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 py-2 h-full bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
          Revolutionizing Aid Distribution 
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-[#f7fafd] border border-[#e5eaf0]backdrop-blur-lg  transition-all"
            >
              <div className={`w-12 h-12 mb-4 rounded-full bg-gradient-to-r ${feature.gradient} p-2 flex items-center justify-center`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-brand-dark/75">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 