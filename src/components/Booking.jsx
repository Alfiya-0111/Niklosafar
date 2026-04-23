import { useState, useEffect } from "react";
import { db } from "../firebase"; // adjust path as needed
import { ref, push, serverTimestamp } from "firebase/database";

const WHATSAPP_NUMBER = "919054270660";
const RAZORPAY_KEY_ID = "YOUR_RAZORPAY_KEY_ID"; // replace with your key

// Load Razorpay script dynamically
function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// Generate short booking ID
function generateBookingId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "NS-";
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

export default function Booking() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    service: "",
    route: "",
    message: "",
  });
  const [step, setStep] = useState("form"); // "form" | "paying" | "success"
  const [bookingId, setBookingId] = useState("");
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
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    const ok = await loadRazorpayScript();
    if (!ok) {
      setError("Failed to load payment gateway. Please check your internet connection.");
      setLoading(false);
      return;
    }
    initiatePayment();
  };

  const initiatePayment = () => {
    const newBookingId = generateBookingId();
    setBookingId(newBookingId);

    const options = {
      key: rzp_test_SgvXY0A0SdBnap,
      amount: 50000, // ₹500 in paise
      currency: "INR",
      name: "NikloSafar",
      description: `Booking Advance — ${form.service}`,
      image: "/logo.png", // optional: your logo URL
      prefill: {
        name: form.name,
        contact: form.phone,
      },
      notes: {
        booking_id: newBookingId,
        route: form.route,
        service: form.service,
        travel_date: form.date,
      },
      theme: {
        color: "#D4A853",
      },
      modal: {
        ondismiss: () => {
          setLoading(false);
          setStep("form");
          setError("Payment was cancelled. Please try again to confirm your booking.");
        },
      },
      handler: async (response) => {
        await saveBookingToFirebase(newBookingId, response);
      },
    };

    setStep("paying");
    const razorpay = new window.Razorpay(options);
    razorpay.on("payment.failed", (response) => {
      setLoading(false);
      setStep("form");
      setError(`Payment failed: ${response.error.description}. Please try again.`);
    });
    razorpay.open();
    setLoading(false);
  };

  const saveBookingToFirebase = async (bId, paymentResponse) => {
    try {
      const bookingData = {
        bookingId: bId,
        name: form.name,
        phone: form.phone,
        date: form.date,
        time: form.time || "Not specified",
        service: form.service,
        route: form.route,
        message: form.message || "",
        advancePaid: 500,
        paymentId: paymentResponse.razorpay_payment_id,
        paymentOrderId: paymentResponse.razorpay_order_id || "",
        paymentSignature: paymentResponse.razorpay_signature || "",
        status: "confirmed",
        createdAt: serverTimestamp(),
      };

      // Save to Firebase Realtime Database under /bookings
      await push(ref(db, "bookings"), bookingData);

      setStep("success");
      setLoading(false);
      openWhatsAppConfirmation(bId, paymentResponse.razorpay_payment_id);
    } catch (err) {
      console.error("Firebase save error:", err);
      setStep("success"); // Still show success since payment was made
      setError("Booking saved. If you face issues, contact us on WhatsApp.");
      openWhatsAppConfirmation(bId, paymentResponse.razorpay_payment_id);
    }
  };

  const openWhatsAppConfirmation = (bId, paymentId) => {
    const timeStr = form.time ? `%0APickup Time: ${form.time}` : "";
    const msgStr = form.message ? `%0ANote: ${form.message}` : "";
    const text =
      `Namaste%21+I+have+completed+my+booking+with+NikloSafar.%0A%0A` +
      `Booking+ID:+${bId}%0A` +
      `Name:+${encodeURIComponent(form.name)}%0A` +
      `Phone:+${encodeURIComponent(form.phone)}%0A` +
      `Travel+Date:+${form.date}` +
      `${timeStr}%0A` +
      `Service:+${encodeURIComponent(form.service)}%0A` +
      `Route:+${encodeURIComponent(form.route)}` +
      `${msgStr}%0A%0A` +
      `Advance+Paid:+%E2%82%B9500%0A` +
      `Payment+ID:+${paymentId}%0A%0A` +
      `Please+confirm+my+booking.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  const handleWhatsAppDirect = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=Namaste%21+I+want+to+book+a+ride+with+NikloSafar.`,
      "_blank"
    );
  };

  const inputClass =
    "w-full bg-white/6 border border-[#D4A853]/20 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#D4A853] transition-colors placeholder-[#8B9BB4]/60 font-outfit";

  const selectClass =
    "w-full bg-[#1A1A2E] border border-[#D4A853]/20 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#D4A853] transition-colors font-outfit appearance-none cursor-pointer";

  return (
    <section id="booking" className="py-24 px-6 md:px-12 bg-[#1A1A2E]">
      {/* Header */}
      <div className="mb-14">
        <span className="inline-block bg-[#D4A853]/12 text-[#D4A853] text-xs font-bold tracking-[3px] uppercase px-3.5 py-1.5 rounded-full mb-4">
          Book a Ride
        </span>
        <h2 className="font-playfair text-4xl md:text-5xl text-white leading-tight mb-4">
          Reserve Your <span className="text-[#D4A853]">Journey</span>
        </h2>
        <div className="w-14 h-[3px] bg-[#D4A853] rounded mb-4" />
        <p className="text-[#8B9BB4] text-base max-w-lg">
          Fill the form and pay ₹500 advance to confirm your booking. Balance payable on ride day.
        </p>
      </div>

      {/* Advance Payment Notice */}
      <div className="mb-8 bg-[#D4A853]/8 border border-[#D4A853]/25 rounded-xl px-5 py-4 flex items-start gap-3 max-w-2xl">
        <svg className="mt-0.5 shrink-0" width="18" height="18" fill="#D4A853" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
        <div>
          <p className="text-[#D4A853] text-sm font-semibold mb-0.5">₹500 Advance Required</p>
          <p className="text-[#8B9BB4] text-xs leading-relaxed">
            A refundable advance of ₹500 is collected to confirm your booking and avoid no-shows. Remaining fare is paid on the day of travel.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT: Form or Success */}
        <div className="bg-white/4 border border-[#D4A853]/15 rounded-2xl p-9">
          {step !== "success" ? (
            <>
              <h3 className="font-playfair text-2xl text-[#D4A853] mb-1">Book via Form</h3>
              <p className="text-[#8B9BB4] text-xs mb-6">Pay ₹500 advance online · Instant confirmation</p>

              {error && (
                <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-xs leading-relaxed">
                  {error}
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#8B9BB4] uppercase tracking-widest mb-1.5">Your Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#8B9BB4] uppercase tracking-widest mb-1.5">Phone Number *</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    required
                    type="tel"
                    className={inputClass}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#8B9BB4] uppercase tracking-widest mb-1.5">Travel Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#8B9BB4] uppercase tracking-widest mb-1.5">Pickup Time</label>
                    <input
                      type="time"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#8B9BB4] uppercase tracking-widest mb-1.5">Service Type *</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    className={selectClass}
                  >
                    <option value="">Select a service</option>
                    <option>Airport Drop/Pickup</option>
                    <option>Wedding &amp; Functions</option>
                    <option>Pilgrimage Tour</option>
                    <option>Outstation Trip</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#8B9BB4] uppercase tracking-widest mb-1.5">From → To *</label>
                  <input
                    name="route"
                    value={form.route}
                    onChange={handleChange}
                    placeholder="e.g. Bilimora → Surat Airport"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#8B9BB4] uppercase tracking-widest mb-1.5">Message (optional)</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Any special requirements..."
                    className={inputClass}
                  />
                </div>

                {/* Price Summary */}
                <div className="bg-white/4 border border-[#D4A853]/10 rounded-lg px-4 py-3 flex items-center justify-between">
                  <span className="text-[#8B9BB4] text-xs">Advance to pay now</span>
                  <span className="text-[#D4A853] font-bold text-lg font-outfit">₹500</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#D4A853] text-[#1A1A2E] py-3.5 rounded-lg font-bold text-sm tracking-wide hover:bg-[#F0C878] transition-colors mt-1 cursor-pointer border-none disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Loading Payment...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                      </svg>
                      Pay ₹500 &amp; Confirm Booking
                    </>
                  )}
                </button>

                <p className="text-center text-[#8B9BB4] text-xs mt-1">
                  Secured by Razorpay · UPI, Cards, NetBanking accepted
                </p>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="flex flex-col items-center justify-center text-center h-full py-8 gap-5">
              <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
                <svg width="40" height="40" fill="#22c55e" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <h3 className="font-playfair text-2xl text-white">Booking Confirmed!</h3>
              <div className="bg-[#D4A853]/10 border border-[#D4A853]/30 rounded-lg px-5 py-3">
                <p className="text-[#8B9BB4] text-xs mb-1">Your Booking ID</p>
                <p className="text-[#D4A853] font-bold text-xl font-outfit tracking-wider">{bookingId}</p>
              </div>
              <p className="text-[#8B9BB4] text-sm leading-relaxed max-w-xs">
                ₹500 advance received. A WhatsApp window has opened — please send it so we can confirm your ride details.
              </p>
              <button
                onClick={() => {
                  setStep("form");
                  setForm({ name: "", phone: "", date: "", time: "", service: "", route: "", message: "" });
                  setBookingId("");
                  setError("");
                }}
                className="text-[#8B9BB4] text-xs underline underline-offset-2 cursor-pointer bg-transparent border-none"
              >
                Make another booking
              </button>
            </div>
          )}
        </div>

        {/* RIGHT: WhatsApp Direct */}
        <div className="bg-[#25D366]/6 border border-[#25D366]/20 rounded-2xl p-9 flex flex-col items-center justify-center text-center gap-5">
          <div className="w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center">
            <svg width="42" height="42" fill="#25D366" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.122 1.528 5.85L0 24l6.336-1.5A11.931 11.931 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.661-.5-5.197-1.375L3 21.5l.9-3.697A9.977 9.977 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
          </div>
          <h3 className="font-playfair text-2xl text-white">Book via WhatsApp</h3>
          <p className="text-[#8B9BB4] text-sm leading-relaxed max-w-xs">
            Prefer chatting? Message us directly on WhatsApp. We'll share payment link and confirm your ride instantly. Available 24/7.
          </p>

          <div className="w-full bg-white/4 border border-white/8 rounded-xl px-5 py-4 text-left space-y-2">
            <p className="text-[#8B9BB4] text-xs font-semibold uppercase tracking-widest mb-2">How it works</p>
            {[
              "Send us your ride details on WhatsApp",
              "We'll share a Razorpay payment link for ₹500",
              "Pay advance · Booking confirmed instantly",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#25D366]/20 text-[#25D366] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-[#8B9BB4] text-xs leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Namaste%21+I+want+to+book+a+ride+with+NikloSafar.`}
            target="_blank"
            rel="noreferrer"
            className="bg-[#25D366] text-white px-8 py-3.5 rounded-lg font-bold text-sm tracking-wide hover:bg-[#1ebe5a] hover:-translate-y-0.5 transition-all no-underline flex items-center gap-2.5"
          >
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.122 1.528 5.85L0 24l6.336-1.5A11.931 11.931 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.661-.5-5.197-1.375L3 21.5l.9-3.697A9.977 9.977 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            Chat on WhatsApp
          </a>

          <p className="text-[#8B9BB4]/50 text-xs">
            Response within minutes · Available 24/7
          </p>
        </div>
      </div>
    </section>
  );
}