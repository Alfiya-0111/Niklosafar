const specs = [
  { val: "7", key: "Seater" },
  { val: "AC", key: "Climate" },
  { val: "Clean", key: "Interior" },
  { val: "Music", key: "System" },
];

export default function Fleet() {
  return (
    <section id="fleet" className="py-24 px-6 md:px-12 bg-[#F5F0E8]">
      <div className="text-center mb-14">
        <span className="inline-block bg-[#D4A853]/12 text-[#D4A853] text-xs font-bold tracking-[3px] uppercase px-3.5 py-1.5 rounded-full mb-4">
          Our Fleet
        </span>
        <h2 className="font-playfair text-4xl md:text-5xl text-[#1A1A2E] leading-tight">
          Travel in a <span className="text-[#D4A853]">Premium Ertiga</span>
        </h2>
        <div className="w-14 h-[3px] bg-[#D4A853] rounded mx-auto mt-4" />
      </div>

      <div className="bg-white border border-[#EDE6D6] rounded-2xl p-10 flex flex-col md:flex-row items-center gap-10 max-w-2xl mx-auto">
        {/* Car illustration */}
        <div className="w-32 h-32 bg-[#1A1A2E] rounded-2xl flex items-center justify-center flex-shrink-0">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <rect x="8" y="32" width="64" height="24" rx="6" fill="#2C2C4A" stroke="#D4A853" strokeWidth="1.5" />
            <path d="M14 32 Q20 18 40 18 Q60 18 66 32" fill="#1A1A2E" stroke="#D4A853" strokeWidth="1.5" />
            <circle cx="22" cy="58" r="8" fill="#1A1A2E" stroke="#D4A853" strokeWidth="1.5" />
            <circle cx="58" cy="58" r="8" fill="#1A1A2E" stroke="#D4A853" strokeWidth="1.5" />
            <circle cx="22" cy="58" r="3.5" fill="#D4A853" />
            <circle cx="58" cy="58" r="3.5" fill="#D4A853" />
            <rect x="24" y="21" width="13" height="11" rx="2" fill="#2C2C4A" stroke="#D4A853" strokeWidth="1" />
            <rect x="43" y="21" width="13" height="11" rx="2" fill="#2C2C4A" stroke="#D4A853" strokeWidth="1" />
            <rect x="8" y="40" width="5" height="7" rx="1" fill="#D4A853" opacity="0.6" />
            <rect x="67" y="40" width="5" height="7" rx="1" fill="#D4A853" opacity="0.6" />
          </svg>
        </div>

        {/* Info */}
        <div>
          <h3 className="font-playfair text-3xl text-[#1A1A2E] mb-2">Maruti Suzuki Ertiga</h3>
          <p className="text-[#5a6070] text-sm leading-relaxed mb-6">
            A premium 7-seater MPV — perfect for families, groups &amp; outstation
            travel. Spacious, comfortable &amp; fuel efficient.
          </p>
          <div className="flex flex-wrap gap-5">
            {specs.map((s) => (
              <div key={s.key}>
                <div className="text-lg font-semibold text-[#1A1A2E]">{s.val}</div>
                <div className="text-xs text-[#5a6070] uppercase tracking-wide">{s.key}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-[#5a6070] text-sm italic mt-8">
        More vehicles being added soon as our fleet grows. Stay tuned!
      </p>
    </section>
  );
}