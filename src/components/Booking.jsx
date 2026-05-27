import { useState } from "react";
import { db } from "../firebase";
import { ref, push, serverTimestamp } from "firebase/database";
import { MdSend, MdInfo } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";

const WHATSAPP_NUMBER = "919054270660"; // Admin number

function generateBookingId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "NS-";
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(212,168,83,0.15)",
  borderRadius: 10,
  padding: "12px 16px",
  color: "#F5F0E8",
  fontSize: 14,
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const labelStyle = {
  display: "block",
  fontSize: 11,
  fontWeight: 700,
  color: "#8B9BB4",
  textTransform: "uppercase",
  letterSpacing: "1.5px",
  marginBottom: 8,
};

export default function Booking() {
  const [form, setForm] = useState({
    name: "", phone: "", date: "", time: "",
    service: "", route: "", message: "",
  });
  const [step, setStep] = useState("form");
  const [bookingId, setBookingId] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10)
      return "Please enter a valid 10-digit phone number.";
    if (!form.date) return "Please select a travel date.";
    if (!form.service) return "Please select a service type.";
    if (!form.route.trim()) return "Please enter your route (From → To).";
    return null;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const err = validateForm();
    if (err) { setError(err); return; }
    setLoading(true);

    const newBookingId = generateBookingId();
    setBookingId(newBookingId);
    const capturedForm = { ...form };

    try {
      await push(ref(db, "bookings"), {
        bookingId: newBookingId,
        ...capturedForm,
        time: capturedForm.time || "Not specified",
        message: capturedForm.message || "",
        advancePaid: 0,
        paymentId: null,
        paymentOrderId: null,
        paymentSignature: null,
        status: "confirmed",
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Firebase error:", err);
      setError("Booking save failed. Please try again.");
      setLoading(false);
      return;
    }

    setBookingDetails({ ...capturedForm });
    setStep("success");

    // Admin ko WhatsApp notification
    sendAdminWhatsApp(newBookingId, capturedForm);

    // Customer ko WhatsApp confirmation (1 second baad)
    setTimeout(() => {
      sendCustomerWhatsApp(newBookingId, capturedForm);
    }, 1000);

    setLoading(false);
  };

  // Admin notification
  const sendAdminWhatsApp = (bId, f) => {
    const timeStr = f.time ? `%0A⏰ Pickup Time: ${f.time}` : "";
    const msgStr = f.message ? `%0A📝 Note: ${encodeURIComponent(f.message)}` : "";

    const text =
      `🚗 *NEW BOOKING - NikloSafar*%0A%0A` +
      `━━━━━━━━━━━━━━━━━━%0A` +
      `🆔 Booking ID: *${bId}*%0A` +
      `━━━━━━━━━━━━━━━━━━%0A` +
      `👤 Name: ${encodeURIComponent(f.name)}%0A` +
      `📞 Phone: ${encodeURIComponent(f.phone)}%0A` +
      `📅 Travel Date: ${f.date}` +
      `${timeStr}%0A` +
      `🛣️ Route: ${encodeURIComponent(f.route)}%0A` +
      `🚘 Service: ${encodeURIComponent(f.service)}` +
      `${msgStr}%0A%0A` +
      `💰 Advance Paid: ₹0 (Free Booking)%0A%0A` +
      `✅ Please confirm this booking with the customer.`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  // Customer confirmation
  const sendCustomerWhatsApp = (bId, f) => {
    const customerPhone = f.phone.replace(/\D/g, "");
    const phoneWithCode = customerPhone.startsWith("91")
      ? customerPhone
      : `91${customerPhone}`;

    const timeStr = f.time ? `%0A⏰ Pickup Time: ${f.time}` : "";
    const msgStr = f.message ? `%0A📝 Note: ${encodeURIComponent(f.message)}` : "";

    const text =
      `🙏 *Namaste ${encodeURIComponent(f.name)}!*%0A%0A` +
      `Aapki NikloSafar booking *confirmed* ho gayi hai! ✅%0A%0A` +
      `━━━━━━━━━━━━━━━━━━%0A` +
      `🆔 *Booking ID: ${bId}*%0A` +
      `━━━━━━━━━━━━━━━━━━%0A` +
      `📅 Travel Date: ${f.date}` +
      `${timeStr}%0A` +
      `🛣️ Route: ${encodeURIComponent(f.route)}%0A` +
      `🚘 Service: ${encodeURIComponent(f.service)}` +
      `${msgStr}%0A%0A` +
      `💰 Advance Paid: ₹0%0A%0A` +
      `Koi sawaal ho toh hume is number pe WhatsApp karein.%0A` +
      `Dhanyawad for choosing NikloSafar! 🚗✨`;

    window.open(`https://wa.me/${phoneWithCode}?text=${text}`, "_blank");
  };

  const resetForm = () => {
    setStep("form");
    setForm({ name: "", phone: "", date: "", time: "", service: "", route: "", message: "" });
    setBookingId("");
    setBookingDetails(null);
    setError("");
  };

  return (
    <section id="booking" style={{
      padding: "100px 48px",
      background: "linear-gradient(180deg, #0A0A1A 0%, #0f0f1e 100%)",
      position: "relative",
    }}>
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(212,168,83,0.3), transparent)",
      }} />

      {/* Header */}
      <div style={{ marginBottom: 56 }}>
        <span style={{
          display: "inline-block",
          background: "rgba(212,168,83,0.1)",
          color: "#D4A853",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "3px",
          textTransform: "uppercase",
          padding: "8px 18px",
          borderRadius: 40,
          border: "1px solid rgba(212,168,83,0.2)",
          marginBottom: 20,
        }}>Book a Ride</span>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(32px, 5vw, 52px)",
          color: "#ffffff",
          lineHeight: 1.2,
          fontWeight: 700,
          marginBottom: 16,
        }}>
          Reserve Your{" "}
          <span style={{
            background: "linear-gradient(135deg, #D4A853, #F0C878)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>Journey</span>
        </h2>
        <div style={{ width: 56, height: 3, background: "linear-gradient(90deg, #D4A853, #F0C878)", borderRadius: 2, marginBottom: 16 }} />
        <p style={{ color: "#8B9BB4", fontSize: 15, maxWidth: 480, lineHeight: 1.7 }}>
          Fill the form to confirm your booking instantly. No advance payment required.
        </p>
      </div>

      {/* Free booking notice */}
      <div style={{
        marginBottom: 40,
        background: "rgba(34,197,94,0.06)",
        border: "1px solid rgba(34,197,94,0.2)",
        borderRadius: 14,
        padding: "16px 20px",
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        maxWidth: 640,
      }}>
        <MdInfo size={20} color="#22c55e" style={{ marginTop: 1, flexShrink: 0 }} />
        <div>
          <p style={{ color: "#22c55e", fontSize: 14, fontWeight: 600, marginBottom: 4 }}>100% Free Booking</p>
          <p style={{ color: "#8B9BB4", fontSize: 13, lineHeight: 1.6 }}>
            No advance payment required. Book your ride now and pay on the day of travel. Instant confirmation via WhatsApp.
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="ns-booking-grid">

        {/* LEFT: Form or Success */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(212,168,83,0.1)",
          borderRadius: 24,
          padding: 40,
        }}>
          {step !== "success" ? (
            <>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#D4A853", marginBottom: 6 }}>
                Book via Form
              </h3>
              <p style={{ color: "#8B9BB4", fontSize: 12, marginBottom: 28 }}>
                Free booking · Instant confirmation · Pay on ride day
              </p>

              {error && (
                <div style={{
                  marginBottom: 20,
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  borderRadius: 10,
                  padding: "12px 16px",
                  color: "#f87171",
                  fontSize: 13,
                }}>{error}</div>
              )}

              <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <label style={labelStyle}>Your Name *</label>
                  <input name="name" value={form.name} onChange={handleChange}
                    placeholder="Enter your full name" required style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#D4A853"}
                    onBlur={e => e.target.style.borderColor = "rgba(212,168,83,0.15)"}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input name="phone" value={form.phone} onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX" required type="tel" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#D4A853"}
                    onBlur={e => e.target.style.borderColor = "rgba(212,168,83,0.15)"}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={labelStyle}>Travel Date *</label>
                    <input type="date" name="date" value={form.date} onChange={handleChange}
                      required min={new Date().toISOString().split("T")[0]} style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "#D4A853"}
                      onBlur={e => e.target.style.borderColor = "rgba(212,168,83,0.15)"}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Pickup Time</label>
                    <input type="time" name="time" value={form.time} onChange={handleChange} style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "#D4A853"}
                      onBlur={e => e.target.style.borderColor = "rgba(212,168,83,0.15)"}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Service Type *</label>
                  <select name="service" value={form.service} onChange={handleChange} required
                    style={{ ...inputStyle, background: "#0f0f1e", appearance: "none", cursor: "pointer" }}
                    onFocus={e => e.target.style.borderColor = "#D4A853"}
                    onBlur={e => e.target.style.borderColor = "rgba(212,168,83,0.15)"}
                  >
                    <option value="">Select a service</option>
                    <option>Airport Drop/Pickup</option>
                    <option>Wedding &amp; Functions</option>
                    <option>Pilgrimage Tour</option>
                    <option>Outstation Trip</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>From → To *</label>
                  <input name="route" value={form.route} onChange={handleChange}
                    placeholder="e.g. Bilimora → Surat Airport" required style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#D4A853"}
                    onBlur={e => e.target.style.borderColor = "rgba(212,168,83,0.15)"}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Message (optional)</label>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    rows={2} placeholder="Any special requirements..."
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={e => e.target.style.borderColor = "#D4A853"}
                    onBlur={e => e.target.style.borderColor = "rgba(212,168,83,0.15)"}
                  />
                </div>

                <button type="submit" disabled={loading} style={{
                  width: "100%",
                  background: "linear-gradient(135deg, #D4A853, #F0C878)",
                  color: "#0A0A1A",
                  padding: "14px",
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: "0.5px",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  boxShadow: "0 8px 25px rgba(212,168,83,0.3)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                  onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 35px rgba(212,168,83,0.45)"; } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 25px rgba(212,168,83,0.3)"; }}
                >
                  {loading ? "Processing..." : (<><MdSend size={18} /> Confirm Booking</>)}
                </button>

                <p style={{ textAlign: "center", color: "#8B9BB4", fontSize: 12 }}>
                  No payment required · Pay on ride day
                </p>
              </form>
            </>
          ) : (
            /* SUCCESS STATE */
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "24px 0", gap: 18 }}>
              <div style={{
                width: 76, height: 76, borderRadius: "50%",
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <BsCheckCircleFill size={38} color="#22c55e" />
              </div>

              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: "#fff" }}>
                Booking Confirmed! 🎉
              </h3>

              <div style={{
                background: "rgba(212,168,83,0.08)",
                border: "1px solid rgba(212,168,83,0.3)",
                borderRadius: 14,
                padding: "16px 28px",
                width: "100%",
              }}>
                <p style={{ color: "#8B9BB4", fontSize: 11, marginBottom: 4, letterSpacing: "1px", textTransform: "uppercase" }}>Your Booking ID</p>
                <p style={{ color: "#D4A853", fontWeight: 700, fontSize: 24, letterSpacing: "3px" }}>{bookingId}</p>
              </div>

              {/* Booking summary */}
              {bookingDetails && (
                <div style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12,
                  padding: "16px 20px",
                  textAlign: "left",
                }}>
                  <p style={{ color: "#8B9BB4", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 12 }}>
                    Booking Summary
                  </p>
                  {[
                    { label: "Name", value: bookingDetails.name },
                    { label: "Route", value: bookingDetails.route },
                    { label: "Service", value: bookingDetails.service },
                    { label: "Date", value: bookingDetails.date },
                    { label: "Payment", value: "Pay on ride day" },
                  ].map(({ label, value }) => (
                    <div key={label} style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "6px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      fontSize: 13,
                    }}>
                      <span style={{ color: "#8B9BB4" }}>{label}</span>
                      <span style={{ color: "#F5F0E8", fontWeight: 500 }}>{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* WhatsApp info */}
              <div style={{
                background: "rgba(37,211,102,0.06)",
                border: "1px solid rgba(37,211,102,0.2)",
                borderRadius: 12,
                padding: "14px 18px",
                width: "100%",
                textAlign: "left",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <FaWhatsapp size={16} color="#25D366" />
                  <span style={{ color: "#25D366", fontSize: 13, fontWeight: 600 }}>WhatsApp Messages Sent</span>
                </div>
                <p style={{ color: "#8B9BB4", fontSize: 12, lineHeight: 1.6 }}>
                  ✅ Admin ko booking notification bhej di gayi hai<br />
                  ✅ Aapko confirmation message bheja ja raha hai
                </p>
              </div>

              <p style={{ color: "#8B9BB4", fontSize: 13, lineHeight: 1.6, maxWidth: 300 }}>
                Hum jaldi aapki booking confirm karenge. Koi sawaal ho toh{" "}
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"
                  style={{ color: "#25D366", textDecoration: "none" }}>
                  WhatsApp karein
                </a>.
              </p>

              <button onClick={resetForm} style={{
                color: "#8B9BB4", fontSize: 13,
                background: "transparent", border: "none",
                cursor: "pointer", textDecoration: "underline",
              }}>
                Make another booking
              </button>
            </div>
          )}
        </div>

        {/* RIGHT: WhatsApp Direct */}
        <div style={{
          background: "rgba(37,211,102,0.04)",
          border: "1px solid rgba(37,211,102,0.15)",
          borderRadius: 24,
          padding: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 20,
        }}>
          <div style={{
            width: 72, height: 72,
            background: "rgba(37,211,102,0.1)",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 30px rgba(37,211,102,0.2)",
          }}>
            <FaWhatsapp size={36} color="#25D366" />
          </div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#fff" }}>
            Book via WhatsApp
          </h3>
          <p style={{ color: "#8B9BB4", fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
            Prefer chatting? Message us directly on WhatsApp. We'll confirm your ride instantly. Available 24/7.
          </p>

          <div style={{
            width: "100%",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 14,
            padding: "20px",
            textAlign: "left",
          }}>
            <p style={{ color: "#8B9BB4", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 14 }}>
              How it works
            </p>
            {[
              "Send us your ride details on WhatsApp",
              "We'll confirm your booking instantly",
              "Pay on the day of your ride",
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                <span style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: "rgba(37,211,102,0.15)",
                  color: "#25D366",
                  fontSize: 11, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>{i + 1}</span>
                <p style={{ color: "#8B9BB4", fontSize: 13, lineLine: 1.5 }}>{s}</p>
              </div>
            ))}
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Namaste%21+I+want+to+book+a+ride+with+NikloSafar.`}
            target="_blank" rel="noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "#25D366",
              color: "#fff",
              padding: "14px 32px",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
              boxShadow: "0 8px 25px rgba(37,211,102,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 35px rgba(37,211,102,0.45)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 25px rgba(37,211,102,0.3)"; }}
          >
            <FaWhatsapp size={20} /> Chat on WhatsApp
          </a>
          <p style={{ color: "rgba(139,155,180,0.5)", fontSize: 12 }}>
            Response within minutes · Available 24/7
          </p>
        </div>
      </div>

      <style>{`
        @media(max-width:768px) {
          .ns-booking-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}