import { useState, useMemo } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { BsCarFrontFill, BsShieldCheck } from "react-icons/bs";
import { MdLocalGasStation, MdEco, MdPerson, MdPhone, MdCalendarToday, MdAccessTime, MdLocationOn } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import RouteLine from "../components/RouteLine";
import { createBooking } from "../firebase/bookingsService";
import { BASE_CITY } from "../data/constants";

const ADVANCE_AMOUNT = Number(import.meta.env.VITE_ADVANCE_AMOUNT) || 500;
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

const fuelIcon = (fuel) => (fuel === "CNG" ? <MdEco size={14} /> : <MdLocalGasStation size={14} />);
const fuelColor = (fuel) => (fuel === "CNG" ? "#5ED4C4" : fuel === "Diesel" ? "#FFB088" : "#FF8B5E");

const inputStyle = {
  width: "100%", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 10, padding: "13px 14px 13px 40px", color: "#F5F3ED", fontSize: 14,
  fontFamily: "inherit", outline: "none", boxSizing: "border-box",
};
const labelStyle = { display: "block", color: "#9CA3C4", fontSize: 12, fontWeight: 600, marginBottom: 7, letterSpacing: "0.3px" };
const fieldWrap = { position: "relative" };
const fieldIconStyle = { position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#5ED4C4" };

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { car, destination } = location.state || {};

  const fuelOptions = useMemo(
    () => (car ? Object.entries(car.matchedDestination.fuelPrices || {}) : []),
    [car]
  );

  const [selectedFuel, setSelectedFuel] = useState(fuelOptions[0]?.[0] || "");
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", pickup: "", notes: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [bookingState, setBookingState] = useState("idle"); // idle | confirmed

  if (!car || !destination) {
    return (
      <div style={{ minHeight: "100vh", background: "#0A0A1A", color: "#F5F3ED", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 24, textAlign: "center" }}>
        <p style={{ fontSize: 16, color: "#9CA3C4" }}>Koi booking selected nahi hai. Pehle ek destination search karke car select karein.</p>
        <Link to="/" style={{ color: "#FF8B5E", fontWeight: 700, textDecoration: "none" }}>← Home pe wapas jaayein</Link>
      </div>
    );
  }

  const price = car.matchedDestination.fuelPrices?.[selectedFuel] ?? 0;
  const balanceDue = Math.max(price - ADVANCE_AMOUNT, 0);

  const updateField = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Naam likhein";
    if (!/^\d{10}$/.test(form.phone.trim())) e.phone = "10 digit phone number likhein";
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
      // Fallback if Razorpay isn't configured yet — still record the booking.
      saveBookingAndConfirm(null);
      return;
    }

    const rzp = new window.Razorpay({
      key: RAZORPAY_KEY,
      amount: ADVANCE_AMOUNT * 100, // paise
      currency: "INR",
      name: "ConnectCab",
      description: `Advance for ${BASE_CITY} → ${destination} (${car.carName})`,
      prefill: { name: form.name.trim(), contact: form.phone.trim() },
      theme: { color: "#FF6B35" },
      handler: (response) => saveBookingAndConfirm(response),
      modal: {
        ondismiss: () => setSubmitting(false),
      },
    });

    rzp.on("payment.failed", () => {
      setSubmitting(false);
      alert("Payment fail ho gaya. Dobara try karein ya card/UPI check karein.");
    });

    rzp.open();
  };

  if (bookingState === "confirmed") {
    const waText = encodeURIComponent(
      `Booking confirmed!\nCar: ${car.carName}\nRoute: ${BASE_CITY} → ${destination}\nDate: ${form.date} at ${form.time}\nPickup: ${form.pickup}\nName: ${form.name}\nPhone: ${form.phone}`
    );
    return (
      <div style={{ minHeight: "100vh", background: "#0A0A1A", color: "#F5F3ED", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ maxWidth: 480, textAlign: "center", background: "rgba(94,212,196,0.06)", border: "1px solid rgba(94,212,196,0.25)", borderRadius: 20, padding: "48px 32px" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", margin: "0 auto 20px", background: "rgba(94,212,196,0.12)", border: "1px solid rgba(94,212,196,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BsShieldCheck size={28} color="#5ED4C4" />
          </div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 600, marginBottom: 12 }}>Booking confirmed!</h2>
          <p style={{ color: "#9CA3C4", fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>
            {car.carName} aapko <strong style={{ color: "#F5F3ED" }}>{form.date}</strong> ko <strong style={{ color: "#F5F3ED" }}>{form.time}</strong> par <strong style={{ color: "#F5F3ED" }}>{form.pickup}</strong> se pick karegi. Driver details WhatsApp/call par bhi share kiye jaayenge.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <a href={`https://wa.me/919054270660?text=${waText}`} target="_blank" rel="noreferrer" style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.3)",
              color: "#25D366", padding: "13px 20px", borderRadius: 10, fontWeight: 600, fontSize: 13.5, textDecoration: "none",
            }}>
              <FaWhatsapp size={16} /> Confirm details on WhatsApp
            </a>
            <Link to="/" style={{ color: "#9CA3C4", fontSize: 13, textDecoration: "none" }}>← Back to home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A1A", color: "#F5F3ED", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "48px 24px 100px" }}>
        <Link to="/" style={{ color: "#9CA3C4", fontSize: 13, textDecoration: "none", display: "inline-block", marginBottom: 20 }}>← Back to search</Link>

        <div style={{ marginBottom: 32 }}>
          <RouteLine from={BASE_CITY} to={destination} animate={false} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 28 }} className="cc-checkout-grid">
          {/* Left: booking form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 24 }}>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Trip details</h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>Travel date</label>
                  <div style={fieldWrap}>
                    <MdCalendarToday size={16} style={fieldIconStyle} />
                    <input type="date" min={new Date().toISOString().split("T")[0]} value={form.date} onChange={updateField("date")} style={inputStyle} />
                  </div>
                  {errors.date && <p style={{ color: "#E8607A", fontSize: 11.5, marginTop: 5 }}>{errors.date}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Pickup time</label>
                  <div style={fieldWrap}>
                    <MdAccessTime size={16} style={fieldIconStyle} />
                    <input type="time" value={form.time} onChange={updateField("time")} style={inputStyle} />
                  </div>
                  {errors.time && <p style={{ color: "#E8607A", fontSize: 11.5, marginTop: 5 }}>{errors.time}</p>}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Pickup address</label>
                <div style={fieldWrap}>
                  <MdLocationOn size={16} style={fieldIconStyle} />
                  <input value={form.pickup} onChange={updateField("pickup")} placeholder="e.g. Station Road, Bilimora" style={inputStyle} />
                </div>
                {errors.pickup && <p style={{ color: "#E8607A", fontSize: 11.5, marginTop: 5 }}>{errors.pickup}</p>}
              </div>

              <div style={{ marginBottom: 6 }}>
                <label style={labelStyle}>Notes for the driver (optional)</label>
                <textarea value={form.notes} onChange={updateField("notes")} placeholder="e.g. 2 bags, senior citizen onboard..." rows={2} style={{ ...inputStyle, padding: "13px 14px", resize: "vertical" }} />
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 24 }}>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Your details</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={labelStyle}>Full name</label>
                  <div style={fieldWrap}>
                    <MdPerson size={16} style={fieldIconStyle} />
                    <input value={form.name} onChange={updateField("name")} placeholder="Your name" style={inputStyle} />
                  </div>
                  {errors.name && <p style={{ color: "#E8607A", fontSize: 11.5, marginTop: 5 }}>{errors.name}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Phone number</label>
                  <div style={fieldWrap}>
                    <MdPhone size={16} style={fieldIconStyle} />
                    <input value={form.phone} onChange={updateField("phone")} placeholder="10 digit number" style={inputStyle} />
                  </div>
                  {errors.phone && <p style={{ color: "#E8607A", fontSize: 11.5, marginTop: 5 }}>{errors.phone}</p>}
                </div>
              </div>
            </div>

            <PolicySection />
          </div>

          {/* Right: car + price summary */}
          <div>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 24, position: "sticky", top: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,139,94,0.1)", border: "1px solid rgba(255,139,94,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <BsCarFrontFill size={22} color="#FF8B5E" />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 15 }}>{car.carName}</p>
                  <p style={{ color: "#9CA3C4", fontSize: 12 }}>{car.type} · {car.seats} seater · {car.ownerName}</p>
                </div>
              </div>

              {fuelOptions.length > 1 && (
                <div style={{ marginBottom: 18 }}>
                  <label style={labelStyle}>Fuel type</label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {fuelOptions.map(([fuel, p]) => (
                      <button key={fuel} type="button" onClick={() => setSelectedFuel(fuel)} style={{
                        display: "flex", alignItems: "center", gap: 6,
                        background: selectedFuel === fuel ? `${fuelColor(fuel)}1A` : "rgba(255,255,255,0.04)",
                        border: `1px solid ${selectedFuel === fuel ? fuelColor(fuel) : "rgba(255,255,255,0.1)"}`,
                        color: selectedFuel === fuel ? fuelColor(fuel) : "#9CA3C4",
                        padding: "8px 12px", borderRadius: 10, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
                      }}>
                        {fuelIcon(fuel)} {fuel} · ₹{p}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                <Row label="Trip fare" value={`₹${price}`} />
                <Row label="Advance (pay now)" value={`₹${ADVANCE_AMOUNT}`} highlight />
                <Row label="Balance (pay driver)" value={`₹${balanceDue}`} muted />
              </div>

              <button onClick={handlePay} disabled={submitting} style={{
                width: "100%", marginTop: 20,
                background: submitting ? "rgba(255,139,94,0.5)" : "linear-gradient(135deg, #FF8B5E, #FF6B35)",
                color: "#14182B", border: "none", borderRadius: 12, padding: "15px 0",
                fontWeight: 700, fontSize: 14.5, cursor: submitting ? "not-allowed" : "pointer",
              }}>
                {submitting ? "Processing..." : `Pay ₹${ADVANCE_AMOUNT} Advance & Confirm`}
              </button>
              <p style={{ color: "#6B7299", fontSize: 11, textAlign: "center", marginTop: 10, lineHeight: 1.6 }}>
                Secure payment via Razorpay. Remaining balance is paid directly to the driver on travel day.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .cc-checkout-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function Row({ label, value, highlight, muted }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5 }}>
      <span style={{ color: muted ? "#6B7299" : "#9CA3C4" }}>{label}</span>
      <span style={{ fontWeight: 700, color: highlight ? "#FF8B5E" : muted ? "#6B7299" : "#F5F3ED" }}>{value}</span>
    </div>
  );
}

function PolicySection() {
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 24 }}>
      <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Booking policy</h3>
      <ul style={{ color: "#9CA3C4", fontSize: 12.5, lineHeight: 1.8, paddingLeft: 18, margin: 0 }}>
        <li>₹{ADVANCE_AMOUNT} advance confirms your booking; the rest is paid to the driver on travel day.</li>
        <li>Free cancellation up to 24 hours before pickup — advance refunded in full.</li>
        <li>Cancellations within 24 hours of pickup are non-refundable.</li>
        <li>If the car owner cancels for any reason, your advance is fully refunded.</li>
      </ul>
      <p style={{ color: "#6B7299", fontSize: 11, marginTop: 10 }}>
        (Owner note: update this policy text in <code>Checkout.jsx → PolicySection</code> to match your actual terms.)
      </p>
    </div>
  );
}
