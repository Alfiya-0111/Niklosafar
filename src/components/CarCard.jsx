import { BsCarFrontFill } from "react-icons/bs";
import { MdLocalGasStation, MdEco } from "react-icons/md";
import { TbStarFilled } from "react-icons/tb";

const fuelIcon = (fuel) => (fuel === "CNG" ? <MdEco size={13} /> : <MdLocalGasStation size={13} />);
const fuelColor = (fuel) => (fuel === "CNG" ? "#28a745" : fuel === "Diesel" ? "#6c757d" : "#FF6B35");

export default function CarCard({ car, onSelect }) {
  const fuels = Object.entries(car.matchedDestination?.fuelPrices || {});
  const lowestPrice = fuels.length ? Math.min(...fuels.map(([, price]) => price)) : null;
  const originalPrice = lowestPrice ? Math.round(lowestPrice * 1.18) : null;

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e8e8e8",
      borderRadius: 16,
      padding: 20,
      display: "flex", gap: 20,
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      transition: "box-shadow 0.25s ease, border-color 0.25s ease",
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)"; e.currentTarget.style.borderColor = "#FF6B35"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = "#e8e8e8"; }}
    >
      {/* Car Image */}
      <div style={{
        width: 200, minWidth: 200, height: 140,
        background: "#f8f9fa", borderRadius: 12,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        {car.carImage ? (
          <img src={car.carImage} alt={car.carName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <BsCarFrontFill size={48} color="#ddd" />
        )}
      </div>

      {/* Details */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <h3 style={{ fontSize: 18, color: "#222", fontWeight: 700, margin: 0 }}>
              {car.carName}
            </h3>
            <span style={{
              display: "flex", alignItems: "center", gap: 3,
              background: "#fff3e6", color: "#FF6B35",
              padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 700,
            }}>
              <TbStarFilled size={12} /> {car.rating ?? "New"}
            </span>
          </div>
          <p style={{ color: "#888", fontSize: 13, margin: "0 0 12px 0" }}>
            or equivalent | {car.seats} seater AC Cab
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#666", fontSize: 12.5 }}>
              <span style={{ color: "#28a745" }}>✓</span> Driver allowance included
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#666", fontSize: 12.5 }}>
              <span style={{ color: "#28a745" }}>✓</span> 145 kms included | Post limit: ₹18.25/km
            </div>
          </div>

          {/* Fuel Type */}
          <div style={{ marginTop: 14 }}>
            <p style={{ color: "#666", fontSize: 12, fontWeight: 600, margin: "0 0 8px 0" }}>Select Fuel Type</p>
            <div style={{ display: "flex", gap: 10 }}>
              {fuels.map(([fuel, price]) => (
                <label key={fuel} style={{
                  display: "flex", alignItems: "center", gap: 5,
                  cursor: "pointer", fontSize: 12.5, color: "#444",
                }}>
                  <input type="radio" name={`fuel-${car.id}`} defaultChecked={fuel === fuels[0][0]} style={{ accentColor: "#FF6B35" }} />
                  {fuelIcon(fuel)} {fuel}
                </label>
              ))}
            </div>
          </div>

          <p style={{ color: "#FF6B35", fontSize: 12, margin: "10px 0 0 0", cursor: "pointer" }}>
            Inclusions and Exclusions ▼
          </p>
        </div>
      </div>

      {/* Price & CTA */}
      <div style={{
        minWidth: 180, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "flex-end", gap: 6,
        borderLeft: "1px solid #f0f0f0", paddingLeft: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#28a745", fontSize: 12, fontWeight: 600 }}>
          <span>🎉</span> 16% OFF <span style={{ textDecoration: "line-through", color: "#aaa" }}>₹{originalPrice}</span>
        </div>
        <div style={{ fontSize: 28, color: "#FF6B35", fontWeight: 800 }}>
          ₹{lowestPrice != null ? lowestPrice.toLocaleString() : "—"}
        </div>
        <p style={{ color: "#aaa", fontSize: 11, margin: 0 }}>
          + ₹{Math.round((lowestPrice || 0) * 0.26)} Charges and Taxes
        </p>
        <button onClick={onSelect} style={{
          background: "linear-gradient(135deg, #FF8B5E, #FF6B35)",
          color: "#fff", border: "none", borderRadius: 8,
          padding: "12px 32px", fontWeight: 700, fontSize: 14, cursor: "pointer",
          marginTop: 8, transition: "transform 0.2s, box-shadow 0.2s",
          boxShadow: "0 4px 15px rgba(255,107,53,0.3)",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(255,107,53,0.4)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(255,107,53,0.3)"; }}
        >
          SELECT CAR
        </button>
      </div>
    </div>
  );
}