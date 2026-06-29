import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BsCarFrontFill, BsCheckCircle, BsClock,
  BsPerson, BsTelephone, BsArrowLeft,
} from "react-icons/bs";
import {
  MdDirectionsCar, MdStar, MdVerified,
  MdSupportAgent, MdTrendingUp,
} from "react-icons/md";
import { FaWhatsapp, FaRupeeSign } from "react-icons/fa";
import { TbRoute } from "react-icons/tb";
import { ref, push, set, serverTimestamp } from "firebase/database";
import { db } from "../firebase/config";

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;
const ADMIN_PHONE = "919054270660";
const SUBSCRIPTION_AMOUNT = 500;

const FEATURES = [
  { icon: <MdVerified size={18} />, text: "Search results mein car dikhegi" },
  { icon: <MdTrendingUp size={18} />, text: "Unlimited bookings receive karo" },
  { icon: <MdSupportAgent size={18} />, text: "24x7 admin support" },
  { icon: <BsCheckCircle size={16} />, text: "Customer seedha aapko contact karega" },
  { icon: <MdStar size={18} />, text: "Driver profile + rating system" },
  { icon: <BsCarFrontFill size={16} />, text: "Multiple destinations add karo" },
];

export default function SubscribePage() {
  const [step, setStep] = useState(1); // 1=form, 2=plan, 3=success
  const [form, setForm] = useState({
    ownerName: "",
    phone: "",
    carName: "",
    carType: "Sedan",
    seats: "5",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [trialData, setTrialData] = useState(null);

  const updateField = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.ownerName.trim()) e.ownerName = "Naam likhein";
    if (!/^\d{10}$/.test(form.phone.trim())) e.phone = "10 digit phone number likhein";
    if (!form.carName.trim()) e.carName = "Car ka naam likhein";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Step 1 → Step 2
  const handleNext = () => {
    if (!validate()) return;
    setStep(2);
  };

  // FREE TRIAL — 15 days
  const handleFreeTrial = async () => {
    setSubmitting(true);
    try {
      const today = new Date();
      const expiry = new Date(today);
      expiry.setDate(expiry.getDate() + 15);
      const expiryStr = expiry.toISOString().split("T")[0];

      // Firebase mein save karo
      const subRef = ref(db, "subscriptions");
      const newRef = push(subRef);
      await set(newRef, {
        ownerName: form.ownerName.trim(),
        phone: form.phone.trim(),
        carName: form.carName.trim(),
        carType: form.carType,
        seats: Number(form.seats),
        plan: "trial",
        status: "active",
        trialStart: today.toISOString().split("T")[0],
        expiryDate: expiryStr,
        amountPaid: 0,
        createdAt: serverTimestamp(),
      });

      setTrialData({ expiryDate: expiryStr, subId: newRef.key });
      setStep(3);
    } catch (err) {
      alert("Error aaya. Dobara try karein ya WhatsApp pe contact karein.");
    } finally {
      setSubmitting(false);
    }
  };

  // ₹500 PAID — Razorpay
  const handlePaidSubscription = () => {
    if (!RAZORPAY_KEY || !window.Razorpay) {
      alert("Payment gateway load nahi hua. Page reload karein.");
      return;
    }

    const rzp = new window.Razorpay({
      key: RAZORPAY_KEY,
      amount: SUBSCRIPTION_AMOUNT * 100,
      currency: "INR",
      name: "ConnectCab",
      description: "Driver Monthly Subscription - ₹500/month",
      prefill: { name: form.ownerName.trim(), contact: form.phone.trim() },
      theme: { color: "#FF6B35" },
      handler: async (response) => {
        setSubmitting(true);
        try {
          const today = new Date();
          const expiry = new Date(today);
          expiry.setDate(expiry.getDate() + 30);
          const expiryStr = expiry.toISOString().split("T")[0];

          const subRef = ref(db, "subscriptions");
          const newRef = push(subRef);
          await set(newRef, {
            ownerName: form.ownerName.trim(),
            phone: form.phone.trim(),
            carName: form.carName.trim(),
            carType: form.carType,
            seats: Number(form.seats),
            plan: "monthly",
            status: "active",
            startDate: today.toISOString().split("T")[0],
            expiryDate: expiryStr,
            amountPaid: SUBSCRIPTION_AMOUNT,
            razorpayPaymentId: response.razorpay_payment_id,
            createdAt: serverTimestamp(),
          });

          setTrialData({ expiryDate: expiryStr, subId: newRef.key, paid: true });
          setStep(3);
        } catch (err) {
          alert("Payment hua lekin save nahi ho paya. Screenshot leke admin ko WhatsApp karein.");
        } finally {
          setSubmitting(false);
        }
      },
      modal: { ondismiss: () => {} },
    });

    rzp.on("payment.failed", () => {
      alert("Payment fail ho gayi. Dobara try karein.");
    });

    rzp.open();
  };

  // Admin WhatsApp notification
  const adminWaMsg = () => {
    const msg = encodeURIComponent(
      `🚗 *NAYA DRIVER REGISTERED — ConnectCab*\n\n` +
      `Naam: ${form.ownerName}\n` +
      `Phone: ${form.phone}\n` +
      `Car: ${form.carName} (${form.carType}, ${form.seats} seater)\n` +
      `Plan: ${trialData?.paid ? "₹500 Monthly" : "15 Day Free Trial"}\n` +
      `Expiry: ${trialData?.expiryDate}\n\n` +
      `Admin panel pe car add karein! ✅`
    );
    return `https://wa.me/${ADMIN_PHONE}?text=${msg}`;
  };

  // ===== STEP 3 — SUCCESS =====
  if (step === 3) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={styles.successContainer}>
          <div style={styles.successCard}>
            <div style={styles.successIcon}>
              <BsCheckCircle size={36} color="#FF8B5E" />
            </div>
            <h2 style={styles.successTitle}>
              {trialData?.paid ? "Subscription Active! 🎉" : "Free Trial Shuru! 🎉"}
            </h2>
            <p style={styles.successText}>
              {trialData?.paid
                ? `Aapka ₹500 monthly subscription active ho gaya hai.`
                : `Aapka 15 din ka FREE trial shuru ho gaya hai.`}
              {" "}Expiry: <strong style={{ color: "#FF8B5E" }}>{trialData?.expiryDate}</strong>
            </p>

            <div style={styles.successSteps}>
              {[
                "Admin aapki car platform pe add karega",
                "Aap search results mein dikhne lagenge",
                "Customers directly contact karenge",
                trialData?.paid ? "30 din baad renew karo" : "15 din baad ₹500/month mein upgrade karo",
              ].map((text, i) => (
                <div key={i} style={styles.successStep}>
                  <div style={styles.successStepNum}>{i + 1}</div>
                  <span style={styles.successStepText}>{text}</span>
                </div>
              ))}
            </div>

            <div style={styles.successActions}>
              <a
                href={adminWaMsg()}
                target="_blank"
                rel="noreferrer"
                style={styles.waBtn}
              >
                <FaWhatsapp size={18} /> Admin ko WhatsApp karein
              </a>
              <Link to="/" style={styles.homeLink}>
                <BsArrowLeft size={14} /> Home pe jaayein
              </Link>
            </div>

            <p style={styles.successNote}>
              💡 Car listing activate hone mein 24 ghante lag sakte hain.
              Jaldi chahiye toh admin ko WhatsApp karein.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        {/* HERO */}
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>
            Apni Car <span style={{ color: "#FF8B5E" }}>List Karo</span>
          </h1>
          <p style={styles.heroSub}>
            South Gujarat ka #1 cab network — free trial ke saath shuru karo!
          </p>
        </div>

        <div style={styles.mainGrid}>
          {/* LEFT — Features */}
          <div style={styles.leftCol}>
            {/* Free Trial Banner */}
            <div style={styles.trialBanner}>
              <div style={styles.trialBannerIcon}>
                <BsClock size={24} color="#FF8B5E" />
              </div>
              <div>
                <h3 style={styles.trialBannerTitle}>15 Din FREE Trial!</h3>
                <p style={styles.trialBannerSub}>
                  Koi payment nahi — pehle try karo, pasand aaye toh ₹500/month
                </p>
              </div>
            </div>

            {/* Features */}
            <div style={styles.featuresCard}>
              <h3 style={styles.featuresTitle}>Subscription Mein Kya Milega?</h3>
              {FEATURES.map((f, i) => (
                <div key={i} style={styles.featureItem}>
                  <span style={styles.featureIcon}>{f.icon}</span>
                  <span style={styles.featureText}>{f.text}</span>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div style={styles.pricingCard}>
              <div style={styles.pricingRow}>
                <div style={styles.pricingOption}>
                  <span style={styles.pricingLabel}>Free Trial</span>
                  <span style={styles.pricingPrice}>₹0</span>
                  <span style={styles.pricingDuration}>15 din</span>
                </div>
                <div style={styles.pricingDivider} />
                <div style={styles.pricingOption}>
                  <span style={styles.pricingLabel}>Monthly</span>
                  <span style={{ ...styles.pricingPrice, color: "#FF8B5E" }}>₹500</span>
                  <span style={styles.pricingDuration}>per month</span>
                </div>
              </div>
              <p style={styles.pricingNote}>
                💡 ₹500/month = sirf ₹17/din — ek booking se recover!
              </p>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div style={styles.rightCol}>
            {step === 1 && (
              <div style={styles.formCard}>
                <h2 style={styles.formTitle}>Apni Details Bharein</h2>

                {/* Owner Name */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <BsPerson size={14} /> Aapka Naam
                  </label>
                  <input
                    value={form.ownerName}
                    onChange={updateField("ownerName")}
                    placeholder="e.g. Kaif Khan"
                    style={styles.input}
                  />
                  {errors.ownerName && <p style={styles.error}>{errors.ownerName}</p>}
                </div>

                {/* Phone */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <BsTelephone size={14} /> Phone Number
                  </label>
                  <input
                    value={form.phone}
                    onChange={updateField("phone")}
                    placeholder="10 digit number"
                    maxLength={10}
                    style={styles.input}
                  />
                  {errors.phone && <p style={styles.error}>{errors.phone}</p>}
                </div>

                {/* Car Name */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <BsCarFrontFill size={14} /> Car Ka Naam
                  </label>
                  <input
                    value={form.carName}
                    onChange={updateField("carName")}
                    placeholder="e.g. Maruti Ertiga"
                    style={styles.input}
                  />
                  {errors.carName && <p style={styles.error}>{errors.carName}</p>}
                </div>

                {/* Car Type + Seats */}
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      <MdDirectionsCar size={14} /> Car Type
                    </label>
                    <select
                      value={form.carType}
                      onChange={updateField("carType")}
                      style={styles.input}
                    >
                      {["Sedan", "SUV", "Hatchback", "MPV"].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      <BsPerson size={14} /> Seats
                    </label>
                    <select
                      value={form.seats}
                      onChange={updateField("seats")}
                      style={styles.input}
                    >
                      {["4", "5", "6", "7", "8"].map(s => (
                        <option key={s} value={s}>{s} Seater</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button onClick={handleNext} style={styles.nextBtn}>
                  Aage Badho →
                </button>

                <p style={styles.formNote}>
                  Already registered? Admin se contact karein ya WhatsApp karein.
                </p>
              </div>
            )}

            {step === 2 && (
              <div style={styles.formCard}>
                {/* Back */}
                <button onClick={() => setStep(1)} style={styles.backBtn}>
                  <BsArrowLeft size={14} /> Wapas
                </button>

                <h2 style={styles.formTitle}>Plan Chunein</h2>

                {/* Summary */}
                <div style={styles.summaryBox}>
                  <p style={styles.summaryText}>
                    <BsCarFrontFill size={14} color="#FF8B5E" />
                    <strong>{form.carName}</strong> · {form.carType} · {form.seats} Seater
                  </p>
                  <p style={styles.summaryText}>
                    <BsPerson size={14} color="#FF8B5E" />
                    {form.ownerName} · {form.phone}
                  </p>
                </div>

                {/* Plan Options */}
                <div style={styles.planOptions}>
                  {/* FREE TRIAL */}
                  <div style={styles.planCard}>
                    <div style={styles.planHeader}>
                      <div>
                        <h3 style={styles.planName}>🎁 FREE Trial</h3>
                        <p style={styles.planDesc}>15 din bilkul free mein try karo</p>
                      </div>
                      <div style={styles.planPrice}>
                        <span style={styles.planAmount}>₹0</span>
                        <span style={styles.planDuration}>15 din</span>
                      </div>
                    </div>
                    <button
                      onClick={handleFreeTrial}
                      disabled={submitting}
                      style={{
                        ...styles.trialBtn,
                        opacity: submitting ? 0.7 : 1,
                        cursor: submitting ? "not-allowed" : "pointer",
                      }}
                    >
                      {submitting ? "Please wait..." : "✅ FREE Trial Shuru Karo"}
                    </button>
                  </div>

                  <div style={styles.orDivider}>
                    <div style={styles.orLine} />
                    <span style={styles.orText}>YA</span>
                    <div style={styles.orLine} />
                  </div>

                  {/* PAID */}
                  <div style={{ ...styles.planCard, border: "2px solid rgba(255,139,94,0.4)" }}>
                    <div style={styles.popularBadge}>⭐ Popular</div>
                    <div style={styles.planHeader}>
                      <div>
                        <h3 style={styles.planName}>💎 Monthly Plan</h3>
                        <p style={styles.planDesc}>30 din + seedha active listing</p>
                      </div>
                      <div style={styles.planPrice}>
                        <span style={{ ...styles.planAmount, color: "#FF8B5E" }}>₹500</span>
                        <span style={styles.planDuration}>/month</span>
                      </div>
                    </div>
                    <button
                      onClick={handlePaidSubscription}
                      style={styles.paidBtn}
                    >
                      <FaRupeeSign size={14} /> ₹500 Pay Karke Subscribe Karo
                    </button>
                  </div>
                </div>

                <p style={styles.formNote}>
                  Payment secure hai — Razorpay se powered. UPI, Card, NetBanking sab accept.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== NAVBAR =====
function Navbar() {
  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.navLogo}>
        <div style={styles.logoBox}>
          <TbRoute size={17} color="#14182B" />
        </div>
        <span style={styles.logoText}>
          Connect<span style={{ color: "#FF8B5E" }}>Cab</span>
        </span>
      </Link>
      <a
        href={`https://wa.me/919054270660`}
        target="_blank"
        rel="noreferrer"
        style={styles.waNavBtn}
      >
        <FaWhatsapp size={14} /> Help
      </a>
    </nav>
  );
}

// ===== STYLES =====
const styles = {
  page: {
    minHeight: "100vh",
    background: "#0A0A1A",
    color: "#F5F3ED",
    fontFamily: "'DM Sans', sans-serif",
  },
  navbar: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "18px 48px",
    background: "rgba(20,24,43,0.94)", backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    position: "sticky", top: 0, zIndex: 50,
  },
  navLogo: {
    display: "flex", alignItems: "center", gap: 10, textDecoration: "none",
  },
  logoBox: {
    width: 34, height: 34, borderRadius: 9,
    background: "linear-gradient(135deg, #FF8B5E, #FF6B35)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  logoText: {
    fontFamily: "'Fraunces', serif", fontSize: 19, color: "#F5F3ED", fontWeight: 600,
  },
  waNavBtn: {
    display: "flex", alignItems: "center", gap: 6,
    background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.3)",
    color: "#25D366", padding: "8px 16px", borderRadius: 8,
    fontSize: 13, fontWeight: 600, textDecoration: "none",
  },

  container: { maxWidth: 1100, margin: "0 auto", padding: "48px 24px 80px" },

  hero: { textAlign: "center", marginBottom: 48 },
  heroTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "clamp(28px, 5vw, 48px)",
    fontWeight: 700, marginBottom: 12,
  },
  heroSub: { color: "#9CA3C4", fontSize: 16 },

  mainGrid: {
    display: "grid", gridTemplateColumns: "1fr 1fr",
    gap: 32, alignItems: "start",
  },
  leftCol: { display: "flex", flexDirection: "column", gap: 20 },
  rightCol: {},

  // Trial Banner
  trialBanner: {
    display: "flex", alignItems: "center", gap: 16,
    background: "rgba(255,139,94,0.08)", border: "1px solid rgba(255,139,94,0.25)",
    borderRadius: 16, padding: 20,
  },
  trialBannerIcon: {
    width: 52, height: 52, borderRadius: 12,
    background: "rgba(255,139,94,0.1)", border: "1px solid rgba(255,139,94,0.2)",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  trialBannerTitle: {
    fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 700,
    color: "#FF8B5E", margin: "0 0 6px 0",
  },
  trialBannerSub: { color: "#9CA3C4", fontSize: 13, margin: 0 },

  // Features
  featuresCard: {
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16, padding: 24,
  },
  featuresTitle: {
    fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 600,
    marginBottom: 20, color: "#F5F3ED",
  },
  featureItem: {
    display: "flex", alignItems: "center", gap: 12,
    padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  featureIcon: { color: "#FF8B5E", display: "flex", alignItems: "center", flexShrink: 0 },
  featureText: { color: "#9CA3C4", fontSize: 14 },

  // Pricing
  pricingCard: {
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16, padding: 24,
  },
  pricingRow: { display: "flex", alignItems: "center", gap: 0 },
  pricingOption: {
    flex: 1, display: "flex", flexDirection: "column",
    alignItems: "center", gap: 4,
  },
  pricingLabel: { color: "#9CA3C4", fontSize: 12, fontWeight: 600, textTransform: "uppercase" },
  pricingPrice: { color: "#5ED4C4", fontSize: 28, fontWeight: 800 },
  pricingDuration: { color: "#6B7299", fontSize: 12 },
  pricingDivider: { width: 1, height: 60, background: "rgba(255,255,255,0.08)" },
  pricingNote: { color: "#6B7299", fontSize: 12, textAlign: "center", marginTop: 16 },

  // Form
  formCard: {
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 20, padding: 32,
  },
  formTitle: {
    fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600,
    marginBottom: 24, color: "#F5F3ED",
  },
  formGroup: { marginBottom: 18, display: "flex", flexDirection: "column" },
  formRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  label: {
    display: "flex", alignItems: "center", gap: 6,
    color: "#9CA3C4", fontSize: 12, fontWeight: 600,
    marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.3px",
  },
  input: {
    width: "100%", background: "rgba(0,0,0,0.2)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10, padding: "13px 14px",
    color: "#F5F3ED", fontSize: 14, fontFamily: "inherit",
    outline: "none", boxSizing: "border-box",
  },
  error: { color: "#E8607A", fontSize: 11.5, marginTop: 6 },
  nextBtn: {
    width: "100%", marginTop: 8,
    background: "linear-gradient(135deg, #FF8B5E, #FF6B35)",
    color: "#14182B", border: "none", borderRadius: 12,
    padding: "15px 0", fontWeight: 700, fontSize: 15,
    cursor: "pointer", fontFamily: "inherit",
    boxShadow: "0 4px 20px rgba(255,107,53,0.3)",
  },
  formNote: { color: "#6B7299", fontSize: 12, textAlign: "center", marginTop: 16 },
  backBtn: {
    display: "flex", alignItems: "center", gap: 6,
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    color: "#9CA3C4", borderRadius: 8, padding: "8px 14px",
    fontSize: 13, cursor: "pointer", marginBottom: 20, fontFamily: "inherit",
  },

  // Summary
  summaryBox: {
    background: "rgba(255,139,94,0.06)", border: "1px solid rgba(255,139,94,0.2)",
    borderRadius: 10, padding: "12px 16px", marginBottom: 24,
    display: "flex", flexDirection: "column", gap: 8,
  },
  summaryText: {
    display: "flex", alignItems: "center", gap: 8,
    color: "#9CA3C4", fontSize: 13, margin: 0,
  },

  // Plan Options
  planOptions: { display: "flex", flexDirection: "column", gap: 8 },
  planCard: {
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 14, padding: 20, position: "relative",
  },
  popularBadge: {
    position: "absolute", top: -12, right: 16,
    background: "linear-gradient(135deg, #FF8B5E, #FF6B35)",
    color: "#14182B", fontSize: 11, fontWeight: 700,
    padding: "3px 12px", borderRadius: 20,
  },
  planHeader: {
    display: "flex", justifyContent: "space-between",
    alignItems: "flex-start", marginBottom: 16,
  },
  planName: { fontSize: 16, fontWeight: 700, margin: "0 0 4px 0" },
  planDesc: { color: "#9CA3C4", fontSize: 12, margin: 0 },
  planPrice: { display: "flex", flexDirection: "column", alignItems: "flex-end" },
  planAmount: { fontSize: 24, fontWeight: 800, color: "#5ED4C4" },
  planDuration: { color: "#6B7299", fontSize: 12 },

  trialBtn: {
    width: "100%", background: "rgba(94,212,196,0.1)",
    border: "1px solid rgba(94,212,196,0.3)", color: "#5ED4C4",
    borderRadius: 10, padding: "13px 0", fontWeight: 700,
    fontSize: 14, fontFamily: "inherit",
  },
  orDivider: {
    display: "flex", alignItems: "center", gap: 12, padding: "4px 0",
  },
  orLine: { flex: 1, height: 1, background: "rgba(255,255,255,0.08)" },
  orText: { color: "#6B7299", fontSize: 13, fontWeight: 600 },

  paidBtn: {
    width: "100%",
    background: "linear-gradient(135deg, #FF8B5E, #FF6B35)",
    color: "#14182B", border: "none", borderRadius: 10,
    padding: "13px 0", fontWeight: 700, fontSize: 14,
    cursor: "pointer", fontFamily: "inherit",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    boxShadow: "0 4px 20px rgba(255,107,53,0.3)",
  },

  // Success
  successContainer: {
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "48px 24px", minHeight: "80vh",
  },
  successCard: {
    maxWidth: 520, width: "100%",
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 20, padding: "48px 36px", textAlign: "center",
  },
  successIcon: {
    width: 80, height: 80, borderRadius: "50%", margin: "0 auto 24px",
    background: "rgba(255,139,94,0.1)", border: "1px solid rgba(255,139,94,0.25)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  successTitle: {
    fontFamily: "'Fraunces', serif", fontSize: 26,
    fontWeight: 700, marginBottom: 12, color: "#F5F3ED",
  },
  successText: { color: "#9CA3C4", fontSize: 14, lineHeight: 1.8, marginBottom: 28 },
  successSteps: {
    background: "rgba(255,255,255,0.03)", borderRadius: 12,
    padding: "20px 24px", marginBottom: 28, textAlign: "left",
    display: "flex", flexDirection: "column", gap: 14,
  },
  successStep: { display: "flex", alignItems: "center", gap: 12 },
  successStepNum: {
    width: 28, height: 28, borderRadius: "50%",
    background: "rgba(255,139,94,0.2)", border: "1px solid rgba(255,139,94,0.4)",
    color: "#FF8B5E", fontSize: 13, fontWeight: 700,
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  successStepText: { color: "#9CA3C4", fontSize: 13 },
  successActions: { display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 },
  waBtn: {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
    background: "#25D366", color: "#fff",
    padding: "14px 24px", borderRadius: 10,
    fontWeight: 700, fontSize: 14, textDecoration: "none",
  },
  homeLink: {
    color: "#6B7299", fontSize: 13, textDecoration: "none",
    display: "inline-flex", alignItems: "center", gap: 6, justifyContent: "center",
  },
  successNote: {
    color: "#6B7299", fontSize: 12, lineHeight: 1.7,
    background: "rgba(255,255,255,0.02)", borderRadius: 8, padding: "12px 16px",
  },
};