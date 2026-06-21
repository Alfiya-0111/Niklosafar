import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { TbRoute } from "react-icons/tb";
import { Link } from "react-router-dom";

const links = [
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Destinations", href: "/#home" },
];

const OWNER_WHATSAPP =
  "https://wa.me/919054270660?text=Hi%2C%20mujhe%20apni%20car%20ConnectCab%20pe%20list%20karwani%20hai.";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: 72,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px",
        background: scrolled ? "rgba(20,24,43,0.94)" : "rgba(20,24,43,0.7)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(94,212,196,0.2)" : "1px solid rgba(255,255,255,0.06)",
        transition: "all 0.4s ease",
      }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #FF8B5E, #FF6B35)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <TbRoute size={19} color="#14182B" />
          </div>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 21, color: "#F5F3ED", fontWeight: 600 }}>
            Connect<span style={{ color: "#FF8B5E" }}>Cab</span>
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="cc-desktop-nav">
          {links.map((l) => (
            <a key={l.label} href={l.href} style={{
              color: "#9CA3C4", fontSize: 13, fontWeight: 500, textDecoration: "none", letterSpacing: "0.3px",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = "#5ED4C4"}
              onMouseLeave={e => e.target.style.color = "#9CA3C4"}
            >{l.label}</a>
          ))}
          <a href={OWNER_WHATSAPP} target="_blank" rel="noreferrer" style={{
            background: "linear-gradient(135deg, #FF8B5E, #FF6B35)",
            color: "#14182B", padding: "8px 20px", borderRadius: 8,
            fontSize: 13, fontWeight: 700, textDecoration: "none",
          }}>List Your Car</a>
        </div>

        <button className="cc-hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{
          background: "transparent", border: "none", cursor: "pointer", color: "#5ED4C4", padding: 4,
        }}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      {menuOpen && (
        <div style={{
          position: "fixed", top: 72, left: 0, right: 0, zIndex: 40,
          background: "rgba(20,24,43,0.98)", backdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column", padding: "24px 32px",
          borderBottom: "1px solid rgba(94,212,196,0.15)",
        }}>
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{
              color: "#9CA3C4", fontSize: 16, textDecoration: "none", padding: "14px 0",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>{l.label}</a>
          ))}
          <a href={OWNER_WHATSAPP} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} style={{ color: "#FF8B5E", fontSize: 16, padding: "14px 0", textDecoration: "none", fontWeight: 700 }}>List Your Car</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .cc-desktop-nav { display: none !important; }
          .cc-hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .cc-hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}
