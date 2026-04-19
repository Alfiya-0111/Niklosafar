const features = [
  {
    title: "Safe & Verified Driver",
    desc: "Experienced driver with clean record. Your safety is our priority.",
    icon: (
      <svg width="16" height="16" fill="none" stroke="#D4A853" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Always On Time",
    desc: "Punctuality is our promise. We track flights and plan routes smartly.",
    icon: (
      <svg width="16" height="16" fill="none" stroke="#D4A853" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "Transparent Pricing",
    desc: "No hidden charges. Price decided upfront before every trip.",
    icon: (
      <svg width="16" height="16" fill="none" stroke="#D4A853" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const stats = [
  { num: "500+", label: "Trips Completed", sub: "Across South Gujarat & beyond" },
  { num: "4.9", label: "Star Rating", sub: "Average customer satisfaction" },
  { num: "24/7", label: "Available", sub: "Call or WhatsApp anytime" },
  { num: "3+", label: "Years Experience", sub: "Serving Bilimora & Navsari" },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-[#1A1A2E]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div>
          <span className="inline-block bg-[#D4A853]/12 text-[#D4A853] text-xs font-bold tracking-[3px] uppercase px-3.5 py-1.5 rounded-full mb-4">
            About Us
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl text-white leading-tight mb-4">
            Your Trusted{" "}
            <span className="text-[#D4A853]">Travel Partner</span>
          </h2>
          <div className="w-14 h-[3px] bg-[#D4A853] rounded mb-6" />
          <p className="text-[#8B9BB4] text-base leading-relaxed mb-4">
            NikloSafar was born from a simple belief — every journey should be
            comfortable, safe &amp; stress-free. Based in Bilimora, we serve
            travellers across South Gujarat with pride.
          </p>
          <p className="text-[#8B9BB4] text-base leading-relaxed mb-8">
            Whether it's a late-night airport pickup or a family pilgrimage
            trip, we treat every customer like family. Clean car, honest
            pricing, and always on time.
          </p>
          <div className="flex flex-col gap-5">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#D4A853]/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-[#F5F0E8] text-sm font-semibold mb-1">{f.title}</h4>
                  <p className="text-[#8B9BB4] text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white/3 border border-[#D4A853]/15 rounded-2xl p-10 flex flex-col gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-[#D4A853]/06 border border-[#D4A853]/12 rounded-xl px-6 py-5 flex items-center gap-5"
            >
              <div className="font-playfair text-4xl text-[#D4A853] font-bold min-w-[72px]">
                {s.num}
              </div>
              <div>
                <h4 className="text-[#F5F0E8] text-sm font-semibold mb-0.5">{s.label}</h4>
                <p className="text-[#8B9BB4] text-xs">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}