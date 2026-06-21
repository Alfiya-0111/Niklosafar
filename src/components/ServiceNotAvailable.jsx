import { MdLocationOff } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

export default function ServiceNotAvailable({ destination }) {
  return (
    <div style={{
      textAlign: "center", padding: "64px 24px",
      background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 20,
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: "50%", margin: "0 auto 24px",
        background: "rgba(232,96,122,0.1)", border: "1px solid rgba(232,96,122,0.25)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <MdLocationOff size={28} color="#E8607A" />
      </div>
      <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: "#F5F3ED", fontWeight: 600, marginBottom: 10 }}>
        This area — ConnectCab service not available
      </h3>
      <p style={{ color: "#9CA3C4", fontSize: 14, maxWidth: 420, margin: "0 auto 28px", lineHeight: 1.7 }}>
        Hum abhi <strong style={{ color: "#F5F3ED" }}>{destination}</strong> ke liye koi car cover nahi kar rahe. Naye drivers regularly onboard ho rahe hain — WhatsApp pe bata dein, available hote hi inform karenge.
      </p>

      <a href={`https://wa.me/919054270660?text=Hi%2C%20mujhe%20${encodeURIComponent(destination)}%20ke%20liye%20cab%20chahiye.%20Kab%20available%20hogi%3F`}
        target="_blank" rel="noreferrer"
        style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.3)",
          color: "#25D366", padding: "11px 24px", borderRadius: 10,
          fontWeight: 600, fontSize: 13, textDecoration: "none",
        }}
      >
        <FaWhatsapp size={16} /> Notify me when available
      </a>
    </div>
  );
}
