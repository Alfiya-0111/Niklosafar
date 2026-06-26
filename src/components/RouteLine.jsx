import { MdLocationOn } from "react-icons/md";
import { TbArrowRight } from "react-icons/tb";

export default function RouteLine({ from, to }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      background: "#fff", borderRadius: 12, padding: "16px 24px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <MdLocationOn size={18} color="#FF6B35" />
        <span style={{ color: "#333", fontSize: 14, fontWeight: 600 }}>{from}</span>
      </div>
      <TbArrowRight size={20} color="#ccc" />
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <MdLocationOn size={18} color="#FF6B35" />
        <span style={{ color: "#333", fontSize: 14, fontWeight: 600 }}>{to}</span>
      </div>
    </div>
  );
}