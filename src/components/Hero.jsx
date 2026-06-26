import { useState } from "react";
import {
  MdLocationOn,
  MdSearch,
  MdSwapHoriz,
  MdDateRange,
  MdAccessTime,
} from "react-icons/md";
import { popularDestinations } from "../data/constants";

const tabs = ["ONE WAY", "ROUND TRIP", "LOCAL", "AIRPORT"];

export default function Hero({ onSearch }) {
  const [activeTab, setActiveTab] = useState("ONE WAY");
  const [from, setFrom] = useState("Bilimora, Gujarat");
  const [to, setTo] = useState("");
  const [pickupDate, setPickupDate] = useState(
    new Date().toISOString().split("T")[0]
  );
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
    <section style={styles.section}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={styles.videoBg}
      >
        <source src="/assets/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div style={styles.overlay} />

     

      <div style={styles.content}>
        {/* Headline */}
        <h1 style={styles.headline}>
          SERVICES ACROSS{" "}
          <span style={{ color: "#FF8B5E" }}>MULTIPLE CITIES</span>
        </h1>
        <p style={styles.subheadline}>
          Compare cabs, fuel types & prices — book in seconds
        </p>

        {/* Glass Search Card */}
        <div style={styles.glassCard}>
          {/* Tabs */}
          <div style={styles.tabsContainer}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  ...styles.tabBtn,
                  background:
                    activeTab === tab
                      ? "rgba(255, 139, 94, 0.9)"
                      : "transparent",
                  color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.7)",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={styles.formGrid} className="hero-form-grid">
              {/* FROM */}
              <div style={styles.fieldGroup}>
                <label style={styles.fieldLabel}>
                  {activeTab === "LOCAL"
                    ? "CITY"
                    : activeTab === "AIRPORT"
                    ? "TRIP"
                    : "FROM"}
                </label>
                <div style={styles.inputWrap}>
                  <MdLocationOn size={18} color="#FF8B5E" />
                  {activeTab === "AIRPORT" ? (
                    <select
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      style={styles.select}
                    >
                      <option>Drop to Airport</option>
                      <option>Pickup from Airport</option>
                    </select>
                  ) : (
                    <input
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      placeholder="Enter city"
                      style={styles.input}
                    />
                  )}
                </div>
              </div>

              {/* Swap */}
              <div style={styles.swapWrap} className="swap-icon">
                <button
                  type="button"
                  onClick={() => {
                    const t = from;
                    setFrom(to);
                    setTo(t);
                  }}
                  style={styles.swapBtn}
                >
                  <MdSwapHoriz size={20} />
                </button>
              </div>

              {/* TO */}
              <div style={styles.fieldGroup}>
                <label style={styles.fieldLabel}>
                  {activeTab === "LOCAL"
                    ? ""
                    : activeTab === "AIRPORT"
                    ? "PICKUP ADDRESS"
                    : "TO"}
                </label>
                <div style={styles.inputWrap}>
                  <MdLocationOn size={18} color="#FF8B5E" />
                  <input
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder={
                      activeTab === "AIRPORT"
                        ? "Enter Pickup Location"
                        : "Enter destination"
                    }
                    style={styles.input}
                  />
                </div>
              </div>

              {/* PICK UP DATE */}
              <div style={styles.fieldGroup}>
                <label style={styles.fieldLabel}>PICK UP DATE</label>
                <div style={styles.inputWrap}>
                  <MdDateRange size={18} color="#FF8B5E" />
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    style={styles.input}
                  />
                </div>
              </div>

              {/* RETURN DATE */}
              {showReturnDate && (
                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>RETURN DATE</label>
                  <div style={styles.inputWrap}>
                    <MdDateRange size={18} color="#FF8B5E" />
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      style={styles.input}
                    />
                  </div>
                </div>
              )}

              {/* PICK UP TIME */}
              {!showReturnDate && (
                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>PICK UP TIME</label>
                  <div style={styles.inputWrap}>
                    <MdAccessTime size={18} color="#FF8B5E" />
                    <input
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      style={styles.input}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" style={styles.submitBtn}>
              <MdSearch size={18} style={{ marginRight: 8 }} />
              EXPLORE CABS
            </button>
          </form>
        </div>

        {/* Popular Destinations */}
        <div style={styles.chipsContainer}>
          <span style={styles.chipsLabel}>Popular:</span>
          {popularDestinations.map((d) => (
            <button
              key={d}
              onClick={() => handleChipClick(d)}
              type="button"
              style={styles.chip}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#FF8B5E";
                e.currentTarget.style.color = "#FF8B5E";
                e.currentTarget.style.background = "rgba(255,139,94,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{responsiveCSS}</style>
    </section>
  );
}

/* ============ STYLES ============ */
const styles = {
  section: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "100px 20px 60px",
    position: "relative",
    overflow: "hidden",
  },
  videoBg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
   
    zIndex: 0,
  },
  overlay: {
    position: "absolute",
    inset: 0,
   
    zIndex: 1,
  },
  // ✅ GRID PATTERN HATA DIYA — Glow Effect Add Kiya
  glowEffect: {
    position: "absolute",
    inset: 0,

    zIndex: 1,
    pointerEvents: "none",
  },
  content: {
    position: "relative",
    zIndex: 2,
    maxWidth: 1000,
    margin: "0 auto",
    width: "100%",
    textAlign: "center",
  },
  headline: {
    fontFamily: "'Fraunces', serif",
    fontSize: "clamp(28px, 5vw, 52px)",
    color: "#fff",
    lineHeight: 1.15,
    marginBottom: 10,
    fontWeight: 700,
    textShadow: "0 2px 20px rgba(0,0,0,0.3)",
  },
  subheadline: {
    color: "rgba(255,255,255,0.6)",
    fontSize: "clamp(14px, 2vw, 18px)",
    marginBottom: 32,
    fontWeight: 400,
  },
  glassCard: {
    background: "rgba(255, 255, 255, 0.06)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: 24,
    padding: "32px 36px",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
    marginTop: 24,
  },
  tabsContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 28,
    gap: 8,
    flexWrap: "wrap",
  },
  tabBtn: {
    padding: "10px 20px",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.5px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    fontFamily: "inherit",
    background: "transparent",
    color: "rgba(255,255,255,0.7)",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 16,
    alignItems: "end",
    marginBottom: 24,
  },
  fieldGroup: {
    textAlign: "left",
  },
  fieldLabel: {
    display: "block",
    color: "rgba(255,255,255,0.6)",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "1.2px",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  inputWrap: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    borderBottom: "2px solid rgba(255,255,255,0.15)",
    paddingBottom: 10,
    transition: "border-color 0.2s",
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: 14,
    color: "#fff",
    background: "transparent",
    fontFamily: "inherit",
    width: "100%",
  },
  select: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: 14,
    color: "#fff",
    background: "transparent",
    fontFamily: "inherit",
    cursor: "pointer",
    width: "100%",
  },
  swapWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
  },
  swapBtn: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "50%",
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#FF8B5E",
    transition: "all 0.2s",
    fontFamily: "inherit",
  },
  submitBtn: {
    background: "linear-gradient(135deg, #FF8B5E, #FF6B35)",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "14px 48px",
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
    letterSpacing: "1px",
    boxShadow: "0 8px 24px rgba(255,107,53,0.35)",
    transition: "all 0.2s",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
  },
  chipsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
    marginTop: 32,
    alignItems: "center",
  },
  chipsLabel: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    marginRight: 4,
  },
  chip: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff",
    fontSize: 12.5,
    padding: "8px 18px",
    borderRadius: 40,
    cursor: "pointer",
    transition: "all 0.2s",
    fontFamily: "inherit",
  },
};

/* ============ RESPONSIVE ============ */
const responsiveCSS = `
  @media (max-width: 900px) {
    .hero-form-grid {
      grid-template-columns: repeat(3, 1fr) !important;
    }
  }
  @media (max-width: 768px) {
    .hero-form-grid {
      grid-template-columns: 1fr 1fr !important;
      gap: 20px !important;
    }
    .swap-icon {
      display: none !important;
    }
  }
  @media (max-width: 560px) {
    .hero-form-grid {
      grid-template-columns: 1fr !important;
      gap: 16px !important;
    }
    .hero-glass-card {
      padding: 24px 20px !important;
      border-radius: 16px !important;
    }
    .hero-tab-btn {
      padding: 8px 14px !important;
      font-size: 11px !important;
    }
    .hero-submit-btn {
      width: 100% !important;
      padding: 14px 0 !important;
    }
    .hero-chip {
      padding: 6px 14px !important;
      font-size: 11px !important;
    }
  }
`;