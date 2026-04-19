import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-[72px] bg-[#1A1A2E]/97 backdrop-blur border-b border-[#D4A853]/15">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 no-underline">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="17" stroke="#D4A853" strokeWidth="1.2" />
            <path d="M7 22Q13 13 18 16Q23 19 29 12" stroke="#D4A853" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <circle cx="29" cy="12" r="2.5" fill="#D4A853" />
            <rect x="11" y="20" width="14" height="5" rx="2" fill="#2C2C4A" stroke="#D4A853" strokeWidth="0.8" />
          </svg>
          <span className="font-playfair text-xl text-[#D4A853] tracking-wide">NikloSafar</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {["services", "about", "fleet", "booking", "contact"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-[#8B9BB4] text-sm font-medium capitalize tracking-wide hover:text-[#D4A853] transition-colors no-underline"
            >
              {item}
            </a>
          ))}
          <a
            href="#booking"
            className="bg-[#D4A853] text-[#1A1A2E] px-5 py-2 rounded-md text-sm font-semibold tracking-wide hover:bg-[#F0C878] transition-colors no-underline"
          >
            Book Now
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1 cursor-pointer bg-transparent border-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-[2px] bg-[#D4A853] rounded block transition-all" />
          <span className="w-6 h-[2px] bg-[#D4A853] rounded block transition-all" />
          <span className="w-6 h-[2px] bg-[#D4A853] rounded block transition-all" />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-[72px] left-0 right-0 bg-[#1A1A2E] z-40 flex flex-col px-6 py-6 gap-5 border-b border-[#D4A853]/20">
          {["services", "about", "fleet", "booking", "contact"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={() => setMenuOpen(false)}
              className="text-[#8B9BB4] text-base font-medium capitalize pb-3 border-b border-white/5 no-underline hover:text-[#D4A853] transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </>
  );
}