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
  BsCreditCard,
  BsCheckCircle,
} from "react-icons/bs";
import { MdLocalGasStation, MdEco } from "react-icons/md";
import { FaWhatsapp, FaTag } from "react-icons/fa";
import RouteLine from "../components/RouteLine";
import { createBooking } from "../firebase/bookingsService";
import { BASE_CITY } from "../data/constants";

const ADVANCE_AMOUNT = Number(import.meta.env.VITE_ADVANCE_AMOUNT) || 500;
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

const fuelIcon = (fuel) =>
  fuel === "CNG" ? <MdEco size={14} /> : <MdLocalGasStation size={14} />;
const fuelColor = (fuel) =>
  fuel === "CNG" ? "#5ED4C4" : fuel === "Diesel" ? "#FFB088" : "#FF8B5E";

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

  if (!car || !destination) {
    return (
      <div style={styles.errorPage}>
        <div style={styles.errorIcon}>
          <BsCarFrontFill size={48} color="#FF6B35" />
        </div>
        <p style={styles.errorText}>
          Koi booking selected nahi hai. Pehle ek destination search karke car select karein.
        </p>
        <Link to="/" style={styles.errorLink}>
          <BsArrowLeft size={14} /> Home pe wapas jaayein
        </Link>
      </div>
    );
  }

  const price = car.matchedDestination?.fuelPrices?.[selectedFuel] ?? 0;
  const balanceDue = Math.max(price - ADVANCE_AMOUNT, 0);

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

  const saveBookingAndConfirm = async (paymentInfo) => {
    try {
      await createBooking({
        carId: car.id,
        carName: car.carName,
        ownerName: car.ownerName,
        ownerPhone: car.ownerPhone || null,
        fromCity: BASE_CITY,
        toCity: destination,
        fuelType: selectedFuel,
        price,
        advancePaid: ADVANCE_AMOUNT,
        balanceDue,
        riderName: form.name.trim(),
        riderPhone: form.phone.trim(),
        travelDate: form.date,
        pickupTime: form.time,
        pickupAddress: form.pickup.trim(),
        notes: form.notes.trim(),
        status: paymentInfo ? "advance_paid" : "pending_payment",
        razorpayPaymentId: paymentInfo?.razorpay_payment_id || null,
      });
      setBookingState("confirmed");
    } catch (err) {
      console.error("Could not save booking:", err);
      alert("Booking save nahi ho payi. Internet check karke dobara try karein, ya WhatsApp pe directly contact karein.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePay = () => {
    if (!validate()) return;
    setSubmitting(true);

    if (!RAZORPAY_KEY || !window.Razorpay) {
      saveBookingAndConfirm(null);
      return;
    }

    const rzp = new window.Razorpay({
      key: RAZORPAY_KEY,
      amount: ADVANCE_AMOUNT * 100,
      currency: "INR",
      name: "ConnectCab",
      description: `Advance for ${BASE_CITY} → ${destination} (${car.carName})`,
      prefill: { name: form.name.trim(), contact: form.phone.trim() },
      theme: { color: "#FF6B35" },
      handler: (response) => saveBookingAndConfirm(response),
      modal: { ondismiss: () => setSubmitting(false) },
    });

    rzp.on("payment.failed", () => {
      setSubmitting(false);
      alert("Payment fail ho gaya. Dobara try karein ya card/UPI check karein.");
    });

    rzp.open();
  };

  // ===== CONFIRMED STATE =====
  if (bookingState === "confirmed") {
    const waText = encodeURIComponent(
      `Booking confirmed!\nCar: ${car.carName}\nRoute: ${BASE_CITY} → ${destination}\nDate: ${form.date} at ${form.time}\nPickup: ${form.pickup}\nName: ${form.name}\nPhone: ${form.phone}`
    );
    return (
      <div style={styles.confirmedPage}>
        <div style={styles.confirmedCard}>
          <div style={styles.confirmedIcon}>
            <BsShieldCheck size={32} color="#5ED4C4" />
          </div>
          <h2 style={styles.confirmedTitle}>Booking Confirmed!</h2>
          <p style={styles.confirmedText}>
            <strong style={{ color: "#F5F3ED" }}>{car.carName}</strong> aapko{" "}
            <strong style={{ color: "#F5F3ED" }}>{form.date}</strong> ko{" "}
            <strong style={{ color: "#F5F3ED" }}>{form.time}</strong> par{" "}
            <strong style={{ color: "#F5F3ED" }}>{form.pickup}</strong> se pick
            karegi. Driver details WhatsApp/call par bhi share kiye jaayenge.
          </p>
          <div style={styles.confirmedActions}>
            <a
              href={`https://wa.me/919054270660?text=${waText}`}
              target="_blank"
              rel="noreferrer"
              style={styles.whatsappBtn}
            >
              <FaWhatsapp size={18} /> Confirm on WhatsApp
            </a>
            <Link to="/" style={styles.backLink}>
              <BsArrowLeft size={14} /> Back to home
            </Link>
          </div>
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
          {/* LEFT COLUMN — Forms */}
          <div style={styles.leftCol}>
            {/* Trip Details Card */}
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

            {/* Your Details Card */}
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

            {/* Policy Card */}
            <PolicySection />
          </div>

          {/* RIGHT COLUMN — Car Summary */}
          <div style={styles.rightCol}>
            <div style={styles.summaryCard}>
              {/* Car Header */}
              <div style={styles.carHeader}>
                <div style={styles.carIconBox}>
                  <BsCarFrontFill size={24} color="#FF8B5E" />
                </div>
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
                              ? `${fuelColor(fuel)}20`
                              : "rgba(255,255,255,0.04)",
                          border: `2px solid ${
                            selectedFuel === fuel
                              ? fuelColor(fuel)
                              : "rgba(255,255,255,0.08)"
                          }`,
                          color:
                            selectedFuel === fuel
                              ? fuelColor(fuel)
                              : "#9CA3C4",
                        }}
                      >
                        <span style={styles.fuelBtnIcon}>
                          {fuelIcon(fuel)}
                        </span>
                        <span style={styles.fuelBtnName}>{fuel}</span>
                        <span
                          style={{
                            ...styles.fuelBtnPrice,
                            color: fuelColor(fuel),
                          }}
                        >
                          ₹{p.toLocaleString()}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Single Fuel Display */}
              {fuelOptions.length === 1 && (
                <div style={styles.singleFuel}>
                  <span style={styles.singleFuelIcon}>
                    {fuelIcon(fuelOptions[0][0])}
                  </span>
                  <span style={styles.singleFuelName}>
                    {fuelOptions[0][0]}
                  </span>
                  <span
                    style={{
                      ...styles.singleFuelPrice,
                      color: fuelColor(fuelOptions[0][0]),
                    }}
                  >
                    ₹{fuelOptions[0][1].toLocaleString()}
                  </span>
                </div>
              )}

              {/* Price Breakdown */}
              <div style={styles.priceBreakdown}>
                <div style={styles.priceRow}>
                  <span style={styles.priceLabel}>Trip Fare</span>
                  <span style={styles.priceValue}>₹{price.toLocaleString()}</span>
                </div>
                <div style={styles.priceRow}>
                  <span style={styles.priceLabel}>Advance (Pay Now)</span>
                  <span style={styles.priceValueHighlight}>
                    ₹{ADVANCE_AMOUNT.toLocaleString()}
                  </span>
                </div>
                <div style={styles.divider} />
                <div style={styles.priceRow}>
                  <span style={styles.priceLabelMuted}>Balance (Pay Driver)</span>
                  <span style={styles.priceValueMuted}>
                    ₹{balanceDue.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePay}
                disabled={submitting}
                style={{
                  ...styles.payBtn,
                  opacity: submitting ? 0.7 : 1,
                  cursor: submitting ? "not-allowed" : "pointer",
                }}
              >
                <BsCreditCard size={16} style={{ marginRight: 8 }} />
                {submitting
                  ? "Processing..."
                  : `Pay ₹${ADVANCE_AMOUNT.toLocaleString()} Advance`}
              </button>

              <p style={styles.payNote}>
                <BsCheckCircle size={10} style={{ marginRight: 4 }} />
                Secure payment via Razorpay. Balance paid directly to driver.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
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
        <li style={styles.policyItem}>
          <BsCheckCircle size={12} color="#5ED4C4" style={styles.policyBullet} />
          ₹{ADVANCE_AMOUNT} advance confirms your booking; rest paid to driver on travel day.
        </li>
        <li style={styles.policyItem}>
          <BsCheckCircle size={12} color="#5ED4C4" style={styles.policyBullet} />
          Free cancellation up to 24 hours before pickup — advance refunded in full.
        </li>
        <li style={styles.policyItem}>
          <BsCheckCircle size={12} color="#5ED4C4" style={styles.policyBullet} />
          Cancellations within 24 hours of pickup are non-refundable.
        </li>
        <li style={styles.policyItem}>
          <BsCheckCircle size={12} color="#5ED4C4" style={styles.policyBullet} />
          If car owner cancels, your advance is fully refunded.
        </li>
      </ul>
    </div>
  );
}

// ===== STYLES =====
const styles = {
  page: {
    minHeight: "100vh",
    background: "#fff",
    color: "#F5F3ED",
    fontFamily: "'DM Sans', sans-serif",
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "32px 24px 80px",
  },
  backLinkTop: {
    color: "#9CA3C4",
    fontSize: 13,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    marginBottom: 20,
    transition: "color 0.2s",
  },
  routeWrap: {
    marginBottom: 28,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: 24,
    alignItems: "start",
  },
  leftCol: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  rightCol: {
    position: "relative",
  },
 card: {
  background: "#fff",  // ✅ White card
  border: "1px solid #e8e8e8",  // ✅ Light border
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
  color: "#222",  // ✅ Dark text
},
  cardTitleIcon: {
    marginRight: 10,
    color: "#FF8B5E",
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
    marginBottom: 16,
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  formGroupFull: {
    marginBottom: 16,
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    color: "#9CA3C4",
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 8,
    letterSpacing: "0.3px",
    textTransform: "uppercase",
  },
  labelIcon: {
    color: "#5ED4C4",
  },
  // Line ~450
input: {
  width: "100%",
  background: "#f8f9fa",  // ✅ Light gray input
  border: "1px solid #e8e8e8",  // ✅ Light border
  borderRadius: 10,
  padding: "13px 14px",
  color: "#222",  // ✅ Dark text
  fontSize: 14,
  fontFamily: "inherit",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
},
  error: {
    color: "#E8607A",
    fontSize: 11.5,
    marginTop: 6,
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
 summaryCard: {
  background: "#fff",  // ✅ White card
  border: "1px solid #e8e8e8",
  borderRadius: 16,
  padding: 24,
  position: "sticky",
  top: 24,
},
  carHeader: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
    paddingBottom: 16,
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  carIconBox: {
    width: 52,
    height: 52,
    borderRadius: 12,
    background: "rgba(255,139,94,0.1)",
    border: "1px solid rgba(255,139,94,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  carInfo: {
    minWidth: 0,
  },
 carName: {
  fontWeight: 700,
  fontSize: 16,
  margin: 0,
  color: "#222",  // ✅ Dark text
  lineHeight: 1.3,
},
  carMeta: {
    color: "#6B7299",
    fontSize: 12,
    margin: "4px 0 0 0",
  },
  fuelSection: {
    marginBottom: 20,
  },
  fuelLabel: {
    color: "#9CA3C4",
    fontSize: 11,
    fontWeight: 600,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  fuelGrid: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
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
  textAlign: "left",
  background: "#f8f9fa",  // ✅ Light background
  border: "1px solid #e8e8e8",  // ✅ Light border
},
  fuelBtnIcon: {
    display: "flex",
    alignItems: "center",
  },
  fuelBtnName: {
    flex: 1,
  },
  fuelBtnPrice: {
    fontWeight: 700,
    fontSize: 14,
  },
singleFuel: {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "12px 14px",
  background: "#f8f9fa",  // ✅ Light background
  borderRadius: 10,
  marginBottom: 20,
},
  singleFuelIcon: {
    display: "flex",
    alignItems: "center",
  },
  singleFuelName: {
    flex: 1,
    color: "#9CA3C4",
    fontSize: 13,
    fontWeight: 600,
  },
  singleFuelPrice: {
    fontWeight: 700,
    fontSize: 14,
  },
  priceBreakdown: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    paddingTop: 16,
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 14,
  },
  priceLabel: {
    color: "#9CA3C4",
  },
priceValue: {
  fontWeight: 700,
  color: "#222",  // ✅ Dark text
  fontSize: 15,
},
  priceValueHighlight: {
    fontWeight: 700,
    color: "#FF8B5E",
    fontSize: 15,
  },
  priceLabelMuted: {
    color: "#6B7299",
    fontSize: 13,
  },
  priceValueMuted: {
    fontWeight: 600,
    color: "#6B7299",
    fontSize: 13,
  },
  divider: {
    height: 1,
    background: "rgba(255,255,255,0.06)",
    margin: "4px 0",
  },
  payBtn: {
    width: "100%",
    marginTop: 20,
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
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 20px rgba(255,107,53,0.3)",
  },
  payNote: {
    color: "#6B7299",
    fontSize: 11,
    textAlign: "center",
    marginTop: 12,
    lineHeight: 1.6,
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
    color: "#9CA3C4",
    fontSize: 13,
    lineHeight: 1.6,
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
  },
  policyBullet: {
    marginTop: 3,
    flexShrink: 0,
  },
  errorPage: {
    minHeight: "100vh",
  background: "#f5f5f5",  // ✅ White
  color: "#222",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 16,
    padding: 24,
    textAlign: "center",
  },
  errorIcon: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "rgba(255,107,53,0.1)",
    border: "1px solid rgba(255,107,53,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: "#9CA3C4",
    maxWidth: 400,
    lineHeight: 1.6,
  },
  errorLink: {
    color: "#FF8B5E",
    fontWeight: 700,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
    padding: "10px 20px",
    background: "rgba(255,139,94,0.1)",
    borderRadius: 8,
    border: "1px solid rgba(255,139,94,0.2)",
  },
  confirmedPage: {
    minHeight: "100vh",
    background: "#0A0A1A",
    color: "#F5F3ED",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  confirmedCard: {
    maxWidth: 480,
    width: "100%",
    textAlign: "center",
  background: "#fff", 
    border: "1px solid rgba(94,212,196,0.25)",
    borderRadius: 20,
    padding: "56px 36px",
  },
  confirmedIcon: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    margin: "0 auto 24px",
    background: "rgba(94,212,196,0.12)",
    border: "1px solid rgba(94,212,196,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmedTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: 26,
    fontWeight: 600,
    marginBottom: 16,
    color: "#F5F3ED",
  },
  confirmedText: {
    color: "#9CA3C4",
    fontSize: 14,
    lineHeight: 1.8,
    marginBottom: 32,
  },
  confirmedActions: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  whatsappBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    background: "rgba(37,211,102,0.1)",
    border: "1px solid rgba(37,211,102,0.3)",
    color: "#25D366",
    padding: "14px 24px",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
    textDecoration: "none",
    transition: "all 0.2s",
  },
  backLink: {
    color: "#6B7299",
    fontSize: 13,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    justifyContent: "center",
  },
};

// ===== RESPONSIVE CSS =====
const responsiveCSS = `
  @media (max-width: 900px) {
    .checkout-grid {
      grid-template-columns: 1fr !important;
    }
    .checkout-summary-card {
      position: static !important;
    }
  }
  @media (max-width: 768px) {
    .checkout-container {
      padding: 20px 16px 60px !important;
    }
    .checkout-card {
      padding: 18px !important;
    }
    .checkout-form-row {
      grid-template-columns: 1fr !important;
      gap: 12px !important;
    }
    .checkout-card-title {
      font-size: 16px !important;
      margin-bottom: 16px !important;
    }
    .checkout-confirmed-card {
      padding: 40px 24px !important;
    }
    .checkout-confirmed-title {
      font-size: 22px !important;
    }
  }
  @media (max-width: 480px) {
    .checkout-container {
      padding: 16px 12px 40px !important;
    }
    .checkout-card {
      padding: 14px !important;
      border-radius: 12px !important;
    }
    .checkout-input {
      padding: 12px 12px !important;
      font-size: 16px !important;
    }
    .checkout-pay-btn {
      padding: 14px 0 !important;
      font-size: 14px !important;
    }
    .checkout-car-icon-box {
      width: 44px !important;
      height: 44px !important;
    }
    .checkout-car-name {
      font-size: 15px !important;
    }
    .checkout-fuel-btn {
      padding: 10px 12px !important;
    }
    .checkout-confirmed-card {
      padding: 32px 16px !important;
    }
    .checkout-confirmed-icon {
      width: 60px !important;
      height: 60px !important;
    }
    .checkout-confirmed-title {
      font-size: 20px !important;
    }
  }
`;