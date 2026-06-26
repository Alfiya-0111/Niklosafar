import { MdLocationOff } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

export default function ServiceNotAvailable({ destination }) {
  return (
    <div style={{
      textAlign: "center", padding: "64px 24px",
      background: "#fff", border: "1px solid #e8e8e8",
      borderRadius: 20,
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: "50%", margin: "0 auto 24px",
        background: "#fff3e6", border: "1px solid #ffd4b8",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <MdLocationOff size={28} color="#FF6B35" />
      </div>
      <h3 style={{ fontSize: 22, color: "#222", fontWeight: 700, marginBottom: 10 }}>
        Service Not Available
      </h3>
      <p style={{ color: "#888", fontSize: 14, maxWidth: 420, margin: "0 auto 28px", lineHeight: 1.7 }}>
        Hum abhi <strong style={{ color: "#222" }}>{destination}</strong> ke liye koi car cover nahi kar rahe.
      </p>
      <a href={`https://wa.me/919054270660?text=Hi%2C%20mujhe%20${encodeURIComponent(destination)}%20ke%20liye%20cab%20chahiye.`}
        target="_blank" rel="noreferrer"
        style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "#25D366", color: "#fff",
          padding: "12px 28px", borderRadius: 10,
          fontWeight: 600, fontSize: 13, textDecoration: "none",
        }}
      >
        <FaWhatsapp size={16} /> Notify me when available
      </a>
    </div>
  );
}