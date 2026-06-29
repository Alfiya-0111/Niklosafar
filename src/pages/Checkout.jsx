import { useState, useMemo } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  BsCarFrontFill,
  BsShieldCheck,
  BsArrowLeft,
  BsCalendar,
  BsClock,
  BsGeoAlt,
  BsPerson,
  BsTelephone,
  BsSticky,
  BsCheckCircle,
  BsClockHistory,
} from "react-icons/bs";
import { MdLocalGasStation, MdEco } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import RouteLine from "../components/RouteLine";
import { createBooking } from "../firebase/bookingsService";
import { BASE_CITY } from "../data/constants";

// Admin WhatsApp number
const ADMIN_PHONE = "919054270660";

const fuelIcon = (fuel) =>
  fuel === "CNG" ? <MdEco size={14} /> : <MdLocalGasStation size={14} />;
const fuelColor = (fuel) =>
  fuel === "CNG" ? "#28a745" : fuel === "Diesel" ? "#6c757d" : "#FF8B5E";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { car, destination } = location.state || {};

  const fuelOptions = useMemo(
    () => (car ? Object.entries(car.matchedDestination?.fuelPrices || {}) : []),
    [car]
  );

  const [selectedFuel, setSelectedFuel] = useState(fuelOptions[0]?.[0] || "");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    pickup: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [bookingState, setBookingState] = useState("idle");
  const [bookingId, setBookingId] = useState(null);

  if (!car || !destination) {
    return (
      <div style={styles.errorPage}>
        <div style={styles.errorIcon}>
          <BsCarFrontFill size={48} color="#FF6B35" />
        </div>
        <p style={styles.errorText}>
          Koi car selected nahi hai. Pehle destination search karke car chunein.
        </p>
        <Link to="/" style={styles.errorLink}>
          <BsArrowLeft size={14} /> Home pe wapas jaayein
        </Link>
      </div>
    );
  }

  const price = car.matchedDestination?.fuelPrices?.[selectedFuel] ?? 0;

  const updateField = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Naam likhein";
    if (!/^\d{10}$/.test(form.phone.trim()))
      e.phone = "10 digit phone number likhein";
    if (!form.date) e.date = "Travel date chunein";
    if (!form.time) e.time = "Pickup time chunein";
    if (!form.pickup.trim()) e.pickup = "Pickup address likhein";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);

    try {
      const id = await createBooking({
        carId: car.id,
        carName: car.carName,
        ownerName: car.ownerName,
        ownerPhone: car.ownerPhone || null,
        fromCity: BASE_CITY,
        toCity: destination,
        fuelType: selectedFuel,
        price,
        riderName: form.name.trim(),
        riderPhone: form.phone.trim(),
        travelDate: form.date,
        pickupTime: form.time,
        pickupAddress: form.pickup.trim(),
        notes: form.notes.trim(),
        status: "pending", // Admin assign karega
        driverAssigned: null,
      });
      setBookingId(id);
      setBookingState("confirmed");
    } catch (err) {
      console.error("Booking save nahi hui:", err);
      alert("Booking save nahi ho payi. Internet check karke dobara try karein.");
    } finally {
      setSubmitting(false);
    }
  };

  // ===== CONFIRMED STATE =====
  if (bookingState === "confirmed") {
    // Customer ke liye WhatsApp message
    const customerWaText = encodeURIComponent(
      `✅ Booking Request Received!\n\n` +
      `Booking ID: #${bookingId?.slice(-6).toUpperCase()}\n` +
      `Car: ${car.carName}\n` +
      `Route: ${BASE_CITY} → ${destination}\n` +
      `Date: ${form.date} at ${form.time}\n` +
      `Pickup: ${form.pickup}\n` +
      `Fuel: ${selectedFuel}\n` +
      `Estimated Fare: ₹${price}\n\n` +
      `Hum jaldi driver assign karenge aur aapko confirm karenge! 🚗`
    );

    // Admin ke liye WhatsApp notification
    const adminWaText = encodeURIComponent(
      `🚨 NAYI BOOKING REQUEST!\n\n` +
      `Booking ID: #${bookingId?.slice(-6).toUpperCase()}\n` +
      `Customer: ${form.name} (${form.phone})\n` +
      `Route: ${BASE_CITY} → ${destination}\n` +
      `Car Requested: ${car.carName} (${selectedFuel})\n` +
      `Date: ${form.date} at ${form.time}\n` +
      `Pickup: ${form.pickup}\n` +
      `Fare: ₹${price}\n` +
      `Notes: ${form.notes || "None"}\n\n` +
      `Admin panel pe jaake driver assign karein! ✅`
    );

    return (
      <div style={styles.confirmedPage}>
        <div style={styles.confirmedCard}>
          {/* Success Icon */}
          <div style={styles.confirmedIcon}>
            <BsClockHistory size={32} color="#FF8B5E" />
          </div>

          <h2 style={styles.confirmedTitle}>Booking Request Sent! 🎉</h2>

          {/* Booking ID */}
          <div style={styles.bookingIdBox}>
            <span style={styles.bookingIdLabel}>Booking ID</span>
            <span style={styles.bookingIdValue}>
              #{bookingId?.slice(-6).toUpperCase()}
            </span>
          </div>

          <p style={styles.confirmedText}>
            Aapki booking request{" "}
            <strong style={{ color: "#222" }}>{BASE_CITY} → {destination}</strong> ke
            liye receive ho gayi hai.{" "}
            <strong style={{ color: "#222" }}>{form.date}</strong> ko{" "}
            <strong style={{ color: "#222" }}>{form.time}</strong> baje pickup hogi.
          </p>

          {/* Steps */}
          <div style={styles.stepsBox}>
            <div style={styles.step}>
              <div style={{ ...styles.stepDot, background: "#FF8B5E" }}>1</div>
              <span style={styles.stepText}>Aapki request admin ko gayi ✅</span>
            </div>
            <div style={styles.stepLine} />
            <div style={styles.step}>
              <div style={{ ...styles.stepDot, background: "#e8e8e8" }}>2</div>
              <span style={styles.stepText}>Admin driver assign karega</span>
            </div>
            <div style={styles.stepLine} />
            <div style={styles.step}>
              <div style={{ ...styles.stepDot, background: "#e8e8e8" }}>3</div>
              <span style={styles.stepText}>Aapko WhatsApp pe confirm milega</span>
            </div>
          </div>

          <div style={styles.confirmedActions}>
            {/* Admin ko WhatsApp */}
            <a
              href={`https://wa.me/${ADMIN_PHONE}?text=${adminWaText}`}
              target="_blank"
              rel="noreferrer"
              style={styles.whatsappBtn}
              onClick={() => {
                // Customer ko bhi open kar denge
                setTimeout(() => {
                  window.open(`https://wa.me/${ADMIN_PHONE}?text=${customerWaText}`, "_blank");
                }, 1000);
              }}
            >
              <FaWhatsapp size={18} /> Booking WhatsApp pe Confirm Karein
            </a>

            <Link to="/" style={styles.backLink}>
              <BsArrowLeft size={14} /> Home pe jaayein
            </Link>
          </div>

          <p style={styles.noteText}>
            💡 Driver assign hone ke baad aapko call/WhatsApp aayega. Trip pe
            driver ko seedha ₹{price} pay karein.
          </p>
        </div>
      </div>
    );
  }

  // ===== MAIN CHECKOUT =====
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Back Link */}
        <Link to="/" style={styles.backLinkTop}>
          <BsArrowLeft size={14} /> Back to search
        </Link>

        {/* Route Line */}
        <div style={styles.routeWrap}>
          <RouteLine from={BASE_CITY} to={destination} animate={false} />
        </div>

        {/* Main Grid */}
        <div style={styles.grid}>
          {/* LEFT COLUMN */}
          <div style={styles.leftCol}>

            {/* Trip Details */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>
                <BsCalendar size={18} style={styles.cardTitleIcon} />
                Trip Details
              </h3>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <BsCalendar size={14} style={styles.labelIcon} />
                    Travel Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={form.date}
                    onChange={updateField("date")}
                    style={styles.input}
                  />
                  {errors.date && <p style={styles.error}>{errors.date}</p>}
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <BsClock size={14} style={styles.labelIcon} />
                    Pickup Time
                  </label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={updateField("time")}
                    style={styles.input}
                  />
                  {errors.time && <p style={styles.error}>{errors.time}</p>}
                </div>
              </div>

              <div style={styles.formGroupFull}>
                <label style={styles.label}>
                  <BsGeoAlt size={14} style={styles.labelIcon} />
                  Pickup Address
                </label>
                <input
                  value={form.pickup}
                  onChange={updateField("pickup")}
                  placeholder="e.g. Station Road, Bilimora"
                  style={styles.input}
                />
                {errors.pickup && <p style={styles.error}>{errors.pickup}</p>}
              </div>

              <div style={styles.formGroupFull}>
                <label style={styles.label}>
                  <BsSticky size={14} style={styles.labelIcon} />
                  Notes for Driver (Optional)
                </label>
                <textarea
                  value={form.notes}
                  onChange={updateField("notes")}
                  placeholder="e.g. 2 bags, senior citizen onboard..."
                  rows={2}
                  style={{ ...styles.input, resize: "vertical" }}
                />
              </div>
            </div>

            {/* Your Details */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>
                <BsPerson size={18} style={styles.cardTitleIcon} />
                Your Details
              </h3>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <BsPerson size={14} style={styles.labelIcon} />
                    Full Name
                  </label>
                  <input
                    value={form.name}
                    onChange={updateField("name")}
                    placeholder="Your name"
                    style={styles.input}
                  />
                  {errors.name && <p style={styles.error}>{errors.name}</p>}
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <BsTelephone size={14} style={styles.labelIcon} />
                    Phone Number
                  </label>
                  <input
                    value={form.phone}
                    onChange={updateField("phone")}
                    placeholder="10 digit number"
                    style={styles.input}
                  />
                  {errors.phone && <p style={styles.error}>{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Policy */}
            <PolicySection />
          </div>

          {/* RIGHT COLUMN — Summary */}
          <div style={styles.rightCol}>
            <div style={styles.summaryCard}>

              {/* Free Booking Badge */}
              <div style={styles.freeBadge}>
                <BsCheckCircle size={14} color="#28a745" />
                <span>FREE Booking — No Advance Required!</span>
              </div>

              {/* Car Header */}
              <div style={styles.carHeader}>
                {car.carImage ? (
                  <img
                    src={car.carImage}
                    alt={car.carName}
                    style={styles.carImage}
                  />
                ) : (
                  <div style={styles.carIconBox}>
                    <BsCarFrontFill size={24} color="#FF8B5E" />
                  </div>
                )}
                <div style={styles.carInfo}>
                  <p style={styles.carName}>{car.carName}</p>
                  <p style={styles.carMeta}>
                    {car.type} · {car.seats} seater · {car.ownerName}
                  </p>
                </div>
              </div>

              {/* Fuel Selection */}
              {fuelOptions.length > 1 && (
                <div style={styles.fuelSection}>
                  <label style={styles.fuelLabel}>Select Fuel Type</label>
                  <div style={styles.fuelGrid}>
                    {fuelOptions.map(([fuel, p]) => (
                      <button
                        key={fuel}
                        type="button"
                        onClick={() => setSelectedFuel(fuel)}
                        style={{
                          ...styles.fuelBtn,
                          background:
                            selectedFuel === fuel
                              ? `${fuelColor(fuel)}15`
                              : "#f8f9fa",
                          border: `2px solid ${
                            selectedFuel === fuel
                              ? fuelColor(fuel)
                              : "#e8e8e8"
                          }`,
                          color:
                            selectedFuel === fuel ? fuelColor(fuel) : "#666",
                        }}
                      >
                        <span style={{ color: fuelColor(fuel) }}>
                          {fuelIcon(fuel)}
                        </span>
                        <span style={{ flex: 1 }}>{fuel}</span>
                        <span style={{ fontWeight: 700, color: fuelColor(fuel) }}>
                          ₹{p.toLocaleString()}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Single Fuel */}
              {fuelOptions.length === 1 && (
                <div style={styles.singleFuel}>
                  <span style={{ color: fuelColor(fuelOptions[0][0]) }}>
                    {fuelIcon(fuelOptions[0][0])}
                  </span>
                  <span style={{ flex: 1, color: "#666", fontSize: 13, fontWeight: 600 }}>
                    {fuelOptions[0][0]}
                  </span>
                  <span style={{ fontWeight: 700, fontSize: 14, color: fuelColor(fuelOptions[0][0]) }}>
                    ₹{fuelOptions[0][1].toLocaleString()}
                  </span>
                </div>
              )}

              {/* Price Breakdown */}
              <div style={styles.priceBreakdown}>
                <div style={styles.priceRow}>
                  <span style={{ color: "#888", fontSize: 14 }}>Trip Fare</span>
                  <span style={{ fontWeight: 700, color: "#222", fontSize: 15 }}>
                    ₹{price.toLocaleString()}
                  </span>
                </div>
                <div style={styles.priceRow}>
                  <span style={{ color: "#888", fontSize: 14 }}>Advance Now</span>
                  <span style={{ fontWeight: 700, color: "#28a745", fontSize: 15 }}>
                    ₹0 FREE
                  </span>
                </div>
                <div style={styles.divider} />
                <div style={styles.priceRow}>
                  <span style={{ color: "#555", fontSize: 13 }}>Pay Driver on Trip</span>
                  <span style={{ fontWeight: 700, color: "#FF8B5E", fontSize: 16 }}>
                    ₹{price.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={submitting}
                style={{
                  ...styles.submitBtn,
                  opacity: submitting ? 0.7 : 1,
                  cursor: submitting ? "not-allowed" : "pointer",
                }}
              >
                {submitting ? "Booking ho rahi hai..." : "🚗 Book FREE — Confirm Karo"}
              </button>

              <p style={styles.payNote}>
                <BsCheckCircle size={10} style={{ marginRight: 4 }} />
                Koi advance payment nahi. Driver ko seedha trip pe pay karein.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{responsiveCSS}</style>
    </div>
  );
}

// ===== POLICY SECTION =====
function PolicySection() {
  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>
        <BsShieldCheck size={18} style={styles.cardTitleIcon} />
        Booking Policy
      </h3>
      <ul style={styles.policyList}>
        {[
          "Booking bilkul FREE hai — koi advance payment nahi.",
          "Driver assign hone ke baad aapko call/WhatsApp aayega.",
          "Trip ka poora payment driver ko seedha karein.",
          "Cancel karna ho toh kam se kam 4 ghante pehle inform karein.",
          "ConnectCab driver availability guarantee nahi karta — hum best try karenge.",
        ].map((text, i) => (
          <li key={i} style={styles.policyItem}>
            <BsCheckCircle size={12} color="#FF8B5E" style={{ marginTop: 3, flexShrink: 0 }} />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ===== STYLES =====
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f5f5",
    fontFamily: "'DM Sans', sans-serif",
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "32px 24px 80px",
  },
  backLinkTop: {
    color: "#888",
    fontSize: 13,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    marginBottom: 20,
  },
  routeWrap: { marginBottom: 28 },
  grid: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: 24,
    alignItems: "start",
  },
  leftCol: { display: "flex", flexDirection: "column", gap: 20 },
  rightCol: { position: "relative" },
  card: {
    background: "#fff",
    border: "1px solid #e8e8e8",
    borderRadius: 16,
    padding: 24,
  },
  cardTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: 17,
    fontWeight: 600,
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    color: "#222",
  },
  cardTitleIcon: { marginRight: 10, color: "#FF8B5E" },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
    marginBottom: 16,
  },
  formGroup: { display: "flex", flexDirection: "column" },
  formGroupFull: { marginBottom: 16 },
  label: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    color: "#888",
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: "0.3px",
  },
  labelIcon: { color: "#FF8B5E" },
  input: {
    width: "100%",
    background: "#f8f9fa",
    border: "1px solid #e8e8e8",
    borderRadius: 10,
    padding: "13px 14px",
    color: "#222",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
  },
  error: { color: "#e74c3c", fontSize: 11.5, marginTop: 6 },
  summaryCard: {
    background: "#fff",
    border: "1px solid #e8e8e8",
    borderRadius: 16,
    padding: 24,
    position: "sticky",
    top: 24,
  },
  freeBadge: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#f0fff4",
    border: "1px solid #b7ebc8",
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 13,
    fontWeight: 700,
    color: "#28a745",
    marginBottom: 20,
  },
  carHeader: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
    paddingBottom: 16,
    borderBottom: "1px solid #f0f0f0",
  },
  carImage: {
    width: 64,
    height: 48,
    objectFit: "cover",
    borderRadius: 8,
    flexShrink: 0,
  },
  carIconBox: {
    width: 52,
    height: 52,
    borderRadius: 12,
    background: "#fff3e6",
    border: "1px solid #ffd4b8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  carInfo: { minWidth: 0 },
  carName: { fontWeight: 700, fontSize: 16, margin: 0, color: "#222" },
  carMeta: { color: "#888", fontSize: 12, margin: "4px 0 0 0" },
  fuelSection: { marginBottom: 20 },
  fuelLabel: {
    color: "#888",
    fontSize: 11,
    fontWeight: 600,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    display: "block",
  },
  fuelGrid: { display: "flex", flexDirection: "column", gap: 8 },
  fuelBtn: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 14px",
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s",
    width: "100%",
  },
  singleFuel: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 14px",
    background: "#f8f9fa",
    borderRadius: 10,
    marginBottom: 20,
    border: "1px solid #e8e8e8",
  },
  priceBreakdown: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    paddingTop: 16,
    borderTop: "1px solid #f0f0f0",
    marginBottom: 20,
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  divider: { height: 1, background: "#f0f0f0", margin: "4px 0" },
  submitBtn: {
    width: "100%",
    background: "linear-gradient(135deg, #FF8B5E, #FF6B35)",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "16px 0",
    fontWeight: 700,
    fontSize: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
    boxShadow: "0 4px 20px rgba(255,107,53,0.3)",
    transition: "all 0.2s",
  },
  payNote: {
    color: "#888",
    fontSize: 11,
    textAlign: "center",
    marginTop: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  policyList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  policyItem: {
    color: "#666",
    fontSize: 13,
    lineHeight: 1.6,
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
  },

  // ===== CONFIRMED PAGE =====
  confirmedPage: {
    minHeight: "100vh",
    background: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    fontFamily: "'DM Sans', sans-serif",
  },
  confirmedCard: {
    maxWidth: 500,
    width: "100%",
    background: "#fff",
    border: "1px solid #e8e8e8",
    borderRadius: 20,
    padding: "48px 36px",
    textAlign: "center",
    boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
  },
  confirmedIcon: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    margin: "0 auto 24px",
    background: "#fff3e6",
    border: "1px solid #ffd4b8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmedTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: 26,
    fontWeight: 700,
    marginBottom: 16,
    color: "#222",
  },
  bookingIdBox: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    background: "#fff3e6",
    border: "1px solid #ffd4b8",
    borderRadius: 10,
    padding: "10px 20px",
    marginBottom: 20,
  },
  bookingIdLabel: { color: "#888", fontSize: 12, fontWeight: 600 },
  bookingIdValue: { color: "#FF6B35", fontSize: 18, fontWeight: 800 },
  confirmedText: {
    color: "#666",
    fontSize: 14,
    lineHeight: 1.8,
    marginBottom: 24,
  },
  stepsBox: {
    background: "#f8f9fa",
    borderRadius: 12,
    padding: "20px 24px",
    marginBottom: 28,
    textAlign: "left",
  },
  step: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  stepDot: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    color: "#fff",
    fontSize: 12,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  stepText: { color: "#444", fontSize: 13 },
  stepLine: {
    width: 2,
    height: 16,
    background: "#e8e8e8",
    marginLeft: 13,
    marginTop: 4,
    marginBottom: 4,
  },
  confirmedActions: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 20,
  },
  whatsappBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    background: "#25D366",
    color: "#fff",
    padding: "14px 24px",
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 14,
    textDecoration: "none",
  },
  backLink: {
    color: "#888",
    fontSize: 13,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    justifyContent: "center",
  },
  noteText: {
    color: "#888",
    fontSize: 12,
    lineHeight: 1.7,
    background: "#f8f9fa",
    borderRadius: 8,
    padding: "12px 16px",
  },

  // ===== ERROR PAGE =====
  errorPage: {
    minHeight: "100vh",
    background: "#f5f5f5",
    color: "#222",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 16,
    padding: 24,
    textAlign: "center",
    fontFamily: "'DM Sans', sans-serif",
  },
  errorIcon: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "#fff3e6",
    border: "1px solid #ffd4b8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: { fontSize: 16, color: "#666", maxWidth: 400, lineHeight: 1.6 },
  errorLink: {
    color: "#FF6B35",
    fontWeight: 700,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "10px 20px",
    background: "#fff3e6",
    borderRadius: 8,
    border: "1px solid #ffd4b8",
  },
};

const responsiveCSS = `
  @media (max-width: 900px) {
    .checkout-grid { grid-template-columns: 1fr !important; }
    .checkout-summary-card { position: static !important; }
  }
  @media (max-width: 768px) {
    .checkout-container { padding: 20px 16px 60px !important; }
    .checkout-form-row { grid-template-columns: 1fr !important; gap: 12px !important; }
  }
  @media (max-width: 480px) {
    .checkout-container { padding: 16px 12px 40px !important; }
    .checkout-confirmed-card { padding: 32px 16px !important; }
  }
`;