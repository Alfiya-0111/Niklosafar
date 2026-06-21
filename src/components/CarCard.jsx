import { BsCarFrontFill } from "react-icons/bs";
import { MdLocalGasStation, MdEco } from "react-icons/md";
import { TbStarFilled } from "react-icons/tb";

const fuelIcon = (fuel) => (fuel === "CNG" ? <MdEco size={13} /> : <MdLocalGasStation size={13} />);
const fuelColor = (fuel) => (fuel === "CNG" ? "#5ED4C4" : fuel === "Diesel" ? "#FFB088" : "#FF8B5E");

export default function CarCard({ car, onSelect }) {
  const fuels = Object.entries(car.matchedDestination.fuelPrices || {});
  const lowestPrice = fuels.length ? Math.min(...fuels.map(([, price]) => price)) : null;

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 18,
      padding: 24,
      display: "flex", flexDirection: "column", gap: 16,
      transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = "rgba(255,139,94,0.35)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.3)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: "rgba(255,139,94,0.1)", border: "1px solid rgba(255,139,94,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <BsCarFrontFill size={24} color="#FF8B5E" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#5ED4C4", fontSize: 13, fontWeight: 700 }}>
          <TbStarFilled size={14} /> {car.rating ?? "New"}
        </div>
      </div>

      <div>
        <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: "#F5F3ED", fontWeight: 600, marginBottom: 4 }}>
          {car.carName}
        </h3>
        <p style={{ color: "#9CA3C4", fontSize: 12.5 }}>
          {car.type} · {car.seats} seater · {car.ownerName}
        </p>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {fuels.map(([fuel, price]) => (
          <span key={fuel} style={{
            display: "flex", alignItems: "center", gap: 5,
            background: `${fuelColor(fuel)}14`, border: `1px solid ${fuelColor(fuel)}35`,
            color: fuelColor(fuel), fontSize: 12, fontWeight: 600,
            padding: "5px 11px", borderRadius: 40,
          }}>
            {fuelIcon(fuel)} {fuel} · ₹{price}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div>
          <p style={{ color: "#9CA3C4", fontSize: 10.5, textTransform: "uppercase", letterSpacing: "1px" }}>Starting from</p>
          <p style={{ color: "#F5F3ED", fontSize: 19, fontWeight: 700 }}>{lowestPrice != null ? `₹${lowestPrice}` : "Contact for price"}</p>
        </div>
        <button onClick={onSelect} style={{
          background: "linear-gradient(135deg, #FF8B5E, #FF6B35)",
          color: "#14182B", border: "none", borderRadius: 10,
          padding: "11px 22px", fontWeight: 700, fontSize: 13, cursor: "pointer",
          transition: "transform 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
        >Select</button>
      </div>
    </div>
  );
}
