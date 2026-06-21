import { useState } from "react";
import { MdLocationOn, MdSearch } from "react-icons/md";
import { TbRoute } from "react-icons/tb";
import { popularDestinations } from "../data/constants";

export default function Hero({ onSearch }) {
  const [destination, setDestination] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination.trim()) return;
    onSearch(destination.trim());
  };

  const handleChipClick = (d) => {
    setDestination(d);
    onSearch(d);
  };

  return (
    <section id="home" style={{
      minHeight: "92vh",
      background: "linear-gradient(160deg, #14182B 0%, #1D2240 55%, #181C32 100%)",
      display: "flex",
      alignItems: "center",
      padding: "110px 48px 64px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5,
        backgroundImage: "linear-gradient(rgba(94,212,196,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(94,212,196,0.04) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }} />
      <div style={{ position: "absolute", top: "10%", right: "8%", width: 480, height: 480, background: "radial-gradient(circle, rgba(255,139,94,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 720, margin: "0 auto", width: "100%" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(94,212,196,0.08)", border: "1px solid rgba(94,212,196,0.3)",
          color: "#5ED4C4", padding: "8px 18px", borderRadius: 40,
          fontSize: 11, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase",
          marginBottom: 28,
        }}>
          <TbRoute size={14} /> South Gujarat's Local Cab Network
        </div>

        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: "clamp(38px, 6vw, 64px)",
          color: "#F5F3ED",
          lineHeight: 1.12,
          marginBottom: 20,
          fontWeight: 600,
          textAlign: "center",
        }}>
          Tell us where you're going.{" "}
          <span style={{
            background: "linear-gradient(135deg, #FF8B5E, #FFB088)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>We'll show you who's driving there.</span>
        </h1>

        <p style={{ color: "#9CA3C4", fontSize: 16, textAlign: "center", maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.7 }}>
          Verified local cab owners across Bilimora, Navsari & Surat — compare fuel type and price before you book.
        </p>

        <form onSubmit={handleSubmit} style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 18,
          padding: 10,
          display: "flex",
          gap: 10,
          backdropFilter: "blur(20px)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
        }} className="cc-search-form">
          <div style={{
            flex: 1, display: "flex", alignItems: "center", gap: 10,
            background: "rgba(0,0,0,0.2)", borderRadius: 12, padding: "0 16px",
          }}>
            <MdLocationOn size={20} color="#FF8B5E" />
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where do you want to go? e.g. Dwarka, Surat..."
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                color: "#F5F3ED", fontSize: 15, padding: "16px 0", fontFamily: "inherit",
              }}
            />
          </div>
          <button type="submit" style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "linear-gradient(135deg, #FF8B5E, #FF6B35)",
            color: "#14182B", border: "none", borderRadius: 12,
            padding: "0 26px", fontWeight: 700, fontSize: 14, cursor: "pointer",
            boxShadow: "0 8px 24px rgba(255,139,94,0.35)",
            transition: "transform 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <MdSearch size={18} /> Search Cabs
          </button>
        </form>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 24 }}>
          <span style={{ color: "#9CA3C4", fontSize: 12, marginRight: 4, alignSelf: "center" }}>Popular:</span>
          {popularDestinations.map((d) => (
            <button key={d} onClick={() => handleChipClick(d)} type="button" style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#F5F3ED", fontSize: 12.5, padding: "7px 16px", borderRadius: 40,
              cursor: "pointer", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#5ED4C4"; e.currentTarget.style.color = "#5ED4C4"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#F5F3ED"; }}
            >{d}</button>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 64, flexWrap: "wrap" }}>
          {[
            { num: "40+", label: "Verified Cars" },
            { num: "12", label: "Destinations" },
            { num: "4.7★", label: "Avg Rating" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 30, color: "#FF8B5E", fontWeight: 600 }}>{s.num}</div>
              <div style={{ color: "#9CA3C4", fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width: 640px) {
          .cc-search-form { flex-direction: column; }
        }
      `}</style>
    </section>
  );
}
