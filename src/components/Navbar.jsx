import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { BsCarFront } from "react-icons/bs";

const links = ["services", "about", "fleet", "booking", "contact"];

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
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 48px",
          background: scrolled
            ? "rgba(10,10,26,0.92)"
            : "rgba(10,10,26,0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(212,168,83,0.25)"
            : "1px solid rgba(212,168,83,0.1)",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <a href="#home" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: "linear-gradient(135deg, #D4A853, #F0C878)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 18px rgba(212,168,83,0.4)",
          }}>
            <BsCarFront size={20} color="#0A0A1A" />
          </div>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 22,
            color: "#D4A853",
            letterSpacing: "0.5px",
            fontWeight: 700,
          }}>NikloSafar</span>
        </a>

        {/* Desktop Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}
          className="ns-desktop-nav">
          {links.map((l) => (
            <a key={l} href={`#${l}`} style={{
              color: "#8B9BB4",
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
              textTransform: "capitalize",
              letterSpacing: "0.5px",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = "#D4A853"}
              onMouseLeave={e => e.target.style.color = "#8B9BB4"}
            >{l}</a>
          ))}
          <a href="#booking" style={{
            background: "linear-gradient(135deg, #D4A853, #F0C878)",
            color: "#0A0A1A",
            padding: "8px 22px",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: "0.5px",
            boxShadow: "0 4px 15px rgba(212,168,83,0.3)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 6px 20px rgba(212,168,83,0.45)"; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 15px rgba(212,168,83,0.3)"; }}
          >Book Now</a>
        </div>

        {/* Hamburger */}
        <button
          className="ns-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "transparent", border: "none", cursor: "pointer",
            color: "#D4A853", padding: 4,
          }}
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "fixed",
          top: 72,
          left: 0,
          right: 0,
          background: "rgba(10,10,26,0.97)",
          backdropFilter: "blur(20px)",
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
          padding: "24px 32px",
          gap: 0,
          borderBottom: "1px solid rgba(212,168,83,0.2)",
        }}>
          {links.map((l) => (
            <a key={l} href={`#${l}`}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "#8B9BB4",
                fontSize: 16,
                textDecoration: "none",
                textTransform: "capitalize",
                padding: "14px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >{l}</a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .ns-desktop-nav { display: none !important; }
          .ns-hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .ns-hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}