const stats = [
  {
    value: "$2.5M+",
    label: "Aid Distributed",
  },
  {
    value: "15K+",
    label: "Recipients Helped",
  },
  {
    value: "50+",
    label: "NGO Partners",
  },
  {
    value: "99.9%",
    label: "Delivery Success",
  },
];

export function Stats() {
  return (
    <section className="py-20 px-4 bg-black/30">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 