export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] px-6 md:px-12 pt-14 pb-8 border-t border-[#D4A853]/10">
      <div className="flex flex-wrap justify-between gap-10 mb-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="17" stroke="#D4A853" strokeWidth="1.2" />
              <path d="M7 22Q13 13 18 16Q23 19 29 12" stroke="#D4A853" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <circle cx="29" cy="12" r="2.5" fill="#D4A853" />
              <rect x="11" y="20" width="14" height="5" rx="2" fill="#2C2C4A" stroke="#D4A853" strokeWidth="0.8" />
            </svg>
            <span className="font-playfair text-xl text-[#D4A853]">NikloSafar</span>
          </div>
          <p className="text-[#8B9BB4] text-sm leading-relaxed max-w-[220px]">
            Premium cab service based in Bilimora, serving South Gujarat with comfort &amp; reliability.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-[#D4A853] text-xs font-bold uppercase tracking-[2px] mb-4">Quick Links</h4>
          <ul className="flex flex-col gap-2.5 list-none">
            {["services", "about", "fleet", "booking", "contact"].map((l) => (
              <li key={l}>
                <a href={`#${l}`} className="text-[#8B9BB4] text-sm no-underline capitalize hover:text-[#D4A853] transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-[#D4A853] text-xs font-bold uppercase tracking-[2px] mb-4">Services</h4>
          <ul className="flex flex-col gap-2.5 list-none">
            {["Airport Drop/Pickup", "Wedding & Functions", "Pilgrimage Tours", "Outstation Trips"].map((s) => (
              <li key={s}>
                <a href="#booking" className="text-[#8B9BB4] text-sm no-underline hover:text-[#D4A853] transition-colors">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/6 pt-6 flex flex-wrap justify-between items-center gap-3">
        <p className="text-[#8B9BB4] text-sm">
          &copy; 2025 <span className="text-[#D4A853]">NikloSafar</span>. All rights reserved.
        </p>
        <p className="text-[#8B9BB4] text-sm">
          Made with love in <span className="text-[#D4A853]">Bilimora, Gujarat</span>
        </p>
      </div>
    </footer>
  );
}