export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen bg-[#1A1A2E] flex items-center px-6 md:px-12 pt-[72px] relative overflow-hidden"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg,#D4A853 0,#D4A853 1px,transparent 0,transparent 50%)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative z-10 max-w-2xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#D4A853]/10 border border-[#D4A853]/30 text-[#D4A853] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-7">
          <span className="w-1.5 h-1.5 bg-[#D4A853] rounded-full animate-pulse" />
          Based in Bilimora, Gujarat
        </div>

        <h1 className="font-playfair text-5xl md:text-7xl text-white leading-tight mb-6">
          Travel in{" "}
          <span className="text-[#D4A853]">Comfort</span>{" "}
          &amp; Style
        </h1>

        <p className="text-[#8B9BB4] text-lg leading-relaxed mb-10 font-light">
          Premium cab service for airport drops, weddings, pilgrimages &amp;
          outstation journeys — safe, reliable &amp; on time.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="#booking"
            className="bg-[#D4A853] text-[#1A1A2E] px-8 py-3.5 rounded-lg font-semibold text-sm tracking-wide hover:bg-[#F0C878] hover:-translate-y-0.5 transition-all no-underline flex items-center gap-2"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" />
            </svg>
            Book Your Ride
          </a>
          <a
            href="https://wa.me/919999999999?text=Hi%2C%20I%20want%20to%20book%20a%20ride%20with%20NikloSafar"
            target="_blank"
            rel="noreferrer"
            className="bg-transparent text-[#D4A853] px-8 py-3.5 rounded-lg font-semibold text-sm tracking-wide border border-[#D4A853]/50 hover:border-[#D4A853] hover:bg-[#D4A853]/08 transition-all no-underline flex items-center gap-2"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.122 1.528 5.85L0 24l6.336-1.5A11.931 11.931 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.661-.5-5.197-1.375L3 21.5l.9-3.697A9.977 9.977 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="hidden md:flex absolute right-12 bottom-20 gap-10">
        {[
          { num: "500+", label: "Happy Trips" },
          { num: "4.9★", label: "Avg Rating" },
          { num: "24/7", label: "Available" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-playfair text-4xl text-[#D4A853] font-bold">{s.num}</div>
            <div className="text-[#8B9BB4] text-xs tracking-widest uppercase mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}