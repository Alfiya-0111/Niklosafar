import { useState } from "react";
import { MdLocationOn, MdSearch, MdSwapHoriz, MdDateRange, MdAccessTime } from "react-icons/md";
import { popularDestinations } from "../data/constants";

const tabs = ["ONE WAY", "ROUND TRIP", "LOCAL", "AIRPORT"];

export default function Hero({ onSearch }) {
  const [activeTab, setActiveTab] = useState("ONE WAY");
  const [from, setFrom] = useState("Bilimora, Gujarat");
  const [to, setTo] = useState("");
  const [pickupDate, setPickupDate] = useState(new Date().toISOString().split('T')[0]);
  const [pickupTime, setPickupTime] = useState("07:00");
  const [returnDate, setReturnDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!to.trim()) return;
    onSearch(to.trim());
  };

  const handleChipClick = (d) => {
    setTo(d);
    onSearch(d);
  };

  const showReturnDate = activeTab === "ROUND TRIP";

  return (
    <section id="home" style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #1a1f3c 0%, #2d3561 50%, #1a1f3c 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "100px 24px 60px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.3,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 900, margin: "0 auto", width: "100%", textAlign: "center" }}>
        
        {/* Headline */}
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: "clamp(32px, 5vw, 52px)",
          color: "#fff",
          lineHeight: 1.15,
          marginBottom: 8,
          fontWeight: 700,
        }}>
          SERVICES ACROSS <span style={{ color: "#FF8B5E" }}>MULTIPLE CITIES</span>
        </h1>

        {/* Search Card */}
        <div style={{
          background: "#fff",
          borderRadius: 20,
          padding: "28px 32px",
          marginTop: 32,
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}>
          {/* Tabs */}
          <div style={{
            display: "flex", justifyContent: "center", marginBottom: 24,
            border: "1px solid #e0e0e0", borderRadius: 8, overflow: "hidden",
          }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  background: activeTab === tab ? "#FF8B5E" : "#fff",
                  color: activeTab === tab ? "#fff" : "#666",
                  border: "none",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  borderRight: tab !== "AIRPORT" ? "1px solid #e0e0e0" : "none",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit}>
            <div style={{
              display: "grid",
              gridTemplateColumns: showReturnDate 
                ? "1fr 1fr 1fr 1fr 1fr" 
                : "1fr 1fr 1fr 1fr",
              gap: 16,
              alignItems: "end",
              marginBottom: 20,
            }} className="hero-form-grid">
              
              {/* FROM */}
              <div style={{ textAlign: "left" }}>
                <label style={{ display: "block", color: "#333", fontSize: 11, fontWeight: 700, letterSpacing: "1px", marginBottom: 8, textTransform: "uppercase" }}>
                  {activeTab === "LOCAL" ? "CITY" : activeTab === "AIRPORT" ? "TRIP" : "FROM"}
                </label>
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  borderBottom: "2px solid #e0e0e0", paddingBottom: 8,
                }}>
                  <MdLocationOn size={18} color="#FF8B5E" />
                  {activeTab === "AIRPORT" ? (
                    <select value={from} onChange={(e) => setFrom(e.target.value)} style={{
                      flex: 1, border: "none", outline: "none", fontSize: 14, color: "#333", background: "transparent",
                    }}>
                      <option>Drop to Airport</option>
                      <option>Pickup from Airport</option>
                    </select>
                  ) : (
                    <input
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      placeholder="Enter city"
                      style={{
                        flex: 1, border: "none", outline: "none", fontSize: 14, color: "#333", background: "transparent",
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Swap Icon (mobile pe hide hoga) */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: 8 }} className="swap-icon">
                <button type="button" onClick={() => { const t = from; setFrom(to); setTo(t); }} style={{
                  background: "#f5f5f5", border: "none", borderRadius: "50%",
                  width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "#FF8B5E",
                }}>
                  <MdSwapHoriz size={20} />
                </button>
              </div>

              {/* TO */}
              <div style={{ textAlign: "left" }}>
                <label style={{ display: "block", color: "#333", fontSize: 11, fontWeight: 700, letterSpacing: "1px", marginBottom: 8, textTransform: "uppercase" }}>
                  {activeTab === "LOCAL" ? "" : activeTab === "AIRPORT" ? "PICKUP ADDRESS" : "TO"}
                </label>
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  borderBottom: "2px solid #e0e0e0", paddingBottom: 8,
                }}>
                  <MdLocationOn size={18} color="#FF8B5E" />
                  <input
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder={activeTab === "AIRPORT" ? "Enter Pickup Location" : "Enter destination"}
                    style={{
                      flex: 1, border: "none", outline: "none", fontSize: 14, color: "#333", background: "transparent",
                    }}
                  />
                </div>
              </div>

              {/* PICK UP DATE */}
              <div style={{ textAlign: "left" }}>
                <label style={{ display: "block", color: "#333", fontSize: 11, fontWeight: 700, letterSpacing: "1px", marginBottom: 8, textTransform: "uppercase" }}>
                  {showReturnDate ? "PICK UP DATE" : "PICK UP DATE"}
                </label>
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  borderBottom: "2px solid #e0e0e0", paddingBottom: 8,
                }}>
                  <MdDateRange size={18} color="#FF8B5E" />
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    style={{
                      flex: 1, border: "none", outline: "none", fontSize: 14, color: "#333", background: "transparent",
                    }}
                  />
                </div>
              </div>

              {/* RETURN DATE (Round Trip only) */}
              {showReturnDate && (
                <div style={{ textAlign: "left" }}>
                  <label style={{ display: "block", color: "#333", fontSize: 11, fontWeight: 700, letterSpacing: "1px", marginBottom: 8, textTransform: "uppercase" }}>
                    RETURN DATE
                  </label>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    borderBottom: "2px solid #e0e0e0", paddingBottom: 8,
                  }}>
                    <MdDateRange size={18} color="#FF8B5E" />
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      style={{
                        flex: 1, border: "none", outline: "none", fontSize: 14, color: "#333", background: "transparent",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* PICK UP TIME */}
              {!showReturnDate && (
                <div style={{ textAlign: "left" }}>
                  <label style={{ display: "block", color: "#333", fontSize: 11, fontWeight: 700, letterSpacing: "1px", marginBottom: 8, textTransform: "uppercase" }}>
                    PICK UP TIME
                  </label>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    borderBottom: "2px solid #e0e0e0", paddingBottom: 8,
                  }}>
                    <MdAccessTime size={18} color="#FF8B5E" />
                    <input
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      style={{
                        flex: 1, border: "none", outline: "none", fontSize: 14, color: "#333", background: "transparent",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Explore Cabs Button */}
            <button type="submit" style={{
              background: "linear-gradient(135deg, #FF8B5E, #FF6B35)",
              color: "#fff", border: "none", borderRadius: 8,
              padding: "14px 48px", fontWeight: 700, fontSize: 15,
              cursor: "pointer", letterSpacing: "1px",
              boxShadow: "0 8px 24px rgba(255,107,53,0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(255,107,53,0.45)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,107,53,0.35)"; }}
            >
              EXPLORE CABS
            </button>
          </form>
        </div>

        {/* Popular Destinations Chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 28 }}>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginRight: 4, alignSelf: "center" }}>Popular:</span>
          {popularDestinations.map((d) => (
            <button key={d} onClick={() => handleChipClick(d)} type="button" style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff", fontSize: 12.5, padding: "7px 16px", borderRadius: 40,
              cursor: "pointer", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#FF8B5E"; e.currentTarget.style.color = "#FF8B5E"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "#fff"; }}
            >{d}</button>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width: 768px) {
          .hero-form-grid { 
            grid-template-columns: 1fr !important; 
            gap: 16px !important;
          }
          .swap-icon { display: none !important; }
        }
      `}</style>
    </section>
  );
}