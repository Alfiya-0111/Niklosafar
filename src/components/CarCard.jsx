import { BsCarFrontFill } from "react-icons/bs";
import { MdLocalGasStation, MdEco } from "react-icons/md";
import { TbStarFilled } from "react-icons/tb";
import { FaTag, FaCheck, FaArrowRight, FaRoad } from "react-icons/fa";

const fuelIcon = (fuel) =>
  fuel === "CNG" ? <MdEco size={13} /> : <MdLocalGasStation size={13} />;
const fuelColor = (fuel) =>
  fuel === "CNG" ? "#28a745" : fuel === "Diesel" ? "#6c757d" : "#FF6B35";

export default function CarCard({ car, destination, onSelect }) {
  const fuels = Object.entries(car.matchedDestination?.fuelPrices || {});
  const lowestPrice = fuels.length
    ? Math.min(...fuels.map(([, price]) => price))
    : null;
  const originalPrice = lowestPrice ? Math.round(lowestPrice * 1.18) : null;

  return (
    <div style={styles.card}>
      {/* Car Image */}
      <div style={styles.imageBox}>
        {car.carImage ? (
          <img src={car.carImage} alt={car.carName} style={styles.image} />
        ) : (
          <BsCarFrontFill size={48} color="#ddd" />
        )}
      </div>

      {/* Details */}
      <div style={styles.details}>
        <div>
          <div style={styles.header}>
            <h3 style={styles.carName}>{car.carName}</h3>
            <span style={styles.rating}>
              <TbStarFilled size={12} /> {car.rating ?? "New"}
            </span>
          </div>
          <p style={styles.subtitle}>
            <FaRoad size={11} style={{ marginRight: 4 }} />
            {BASE_CITY} → {destination} | {car.seats} seater AC Cab
          </p>

          <div style={styles.features}>
            <div style={styles.featureItem}>
              <FaCheck size={11} color="#28a745" /> Driver allowance included
            </div>
            <div style={styles.featureItem}>
              <FaCheck size={11} color="#28a745" /> 145 kms included | Post
              limit: ₹18.25/km
            </div>
          </div>

          {/* Fuel Prices */}
          <div style={styles.fuelSection}>
            <p style={styles.fuelLabel}>
              <MdLocalGasStation size={12} style={{ marginRight: 4 }} />
              Fuel Options & Prices
            </p>
            <div style={styles.fuelGrid}>
              {fuels.map(([fuel, price]) => (
                <div key={fuel} style={styles.fuelItem}>
                  <span style={{ ...styles.fuelIcon, color: fuelColor(fuel) }}>
                    {fuelIcon(fuel)}
                  </span>
                  <span style={styles.fuelName}>{fuel}</span>
                  <span style={{ ...styles.fuelPrice, color: fuelColor(fuel) }}>
                    ₹{price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p style={styles.inclusionsLink}>Inclusions and Exclusions ▼</p>
        </div>
      </div>

      {/* Price & CTA */}
      <div style={styles.priceSection}>
        <div style={styles.discountBadge}>
          <FaTag size={11} /> 16% OFF{" "}
          <span style={styles.originalPrice}>₹{originalPrice}</span>
        </div>
        <div style={styles.currentPrice}>
          ₹{lowestPrice != null ? lowestPrice.toLocaleString() : "—"}
        </div>
        <p style={styles.chargesText}>
          + ₹{Math.round((lowestPrice || 0) * 0.26)} Charges and Taxes
        </p>
        <button onClick={onSelect} style={styles.selectBtn}>
          SELECT CAR <FaArrowRight size={12} />
        </button>
      </div>

      <style>{responsiveCSS}</style>
    </div>
  );
}

const BASE_CITY = "Bilimora";

const styles = {
  card: {
    background: "#fff",
    border: "1px solid #e8e8e8",
    borderRadius: 16,
    padding: 20,
    display: "flex",
    gap: 20,
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    transition: "box-shadow 0.25s ease, border-color 0.25s ease",
  },
  imageBox: {
    width: 200,
    minWidth: 200,
    height: 140,
    background: "#f8f9fa",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flexShrink: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  details: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minWidth: 0,
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
    flexWrap: "wrap",
  },
  carName: {
    fontSize: "clamp(15px, 3vw, 18px)",
    color: "#222",
    fontWeight: 700,
    margin: 0,
  },
  rating: {
    display: "flex",
    alignItems: "center",
    gap: 3,
    background: "#fff3e6",
    color: "#FF6B35",
    padding: "3px 8px",
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 700,
  },
  subtitle: {
    color: "#888",
    fontSize: 13,
    margin: "0 0 12px 0",
    display: "flex",
    alignItems: "center",
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    color: "#666",
    fontSize: 12.5,
  },
  fuelSection: {
    marginTop: 14,
    padding: "12px",
    background: "#f8f9fa",
    borderRadius: 10,
    border: "1px solid #e8e8e8",
  },
  fuelLabel: {
    color: "#666",
    fontSize: 11,
    fontWeight: 600,
    margin: "0 0 10px 0",
    display: "flex",
    alignItems: "center",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  fuelGrid: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  fuelItem: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 12px",
    background: "#fff",
    borderRadius: 8,
    border: "1px solid #e8e8e8",
  },
  fuelIcon: {
    display: "flex",
    alignItems: "center",
  },
  fuelName: {
    color: "#444",
    fontSize: 12,
    fontWeight: 600,
  },
  fuelPrice: {
    fontSize: 13,
    fontWeight: 700,
  },
  inclusionsLink: {
    color: "#FF6B35",
    fontSize: 12,
    margin: "12px 0 0 0",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
  },
  priceSection: {
    minWidth: 180,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 6,
    borderLeft: "1px solid #f0f0f0",
    paddingLeft: 20,
    flexShrink: 0,
  },
  discountBadge: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    color: "#28a745",
    fontSize: 12,
    fontWeight: 600,
  },
  originalPrice: {
    textDecoration: "line-through",
    color: "#aaa",
  },
  currentPrice: {
    fontSize: "clamp(22px, 5vw, 28px)",
    color: "#FF6B35",
    fontWeight: 800,
  },
  chargesText: {
    color: "#aaa",
    fontSize: 11,
    margin: 0,
  },
  selectBtn: {
    background: "linear-gradient(135deg, #FF8B5E, #FF6B35)",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "12px 28px",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    marginTop: 8,
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 15px rgba(255,107,53,0.3)",
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontFamily: "inherit",
  },
};

const responsiveCSS = `
  @media (max-width: 768px) {
    .car-card {
      flex-direction: column !important;
      padding: 16px !important;
      gap: 16px !important;
    }
    .car-image-box {
      width: 100% !important;
      min-width: unset !important;
      height: 180px !important;
    }
    .car-price-section {
      min-width: unset !important;
      border-left: none !important;
      border-top: 1px solid #f0f0f0 !important;
      padding-left: 0 !important;
      padding-top: 16px !important;
      align-items: flex-start !important;
    }
    .car-select-btn {
      width: 100% !important;
      justify-content: center !important;
    }
    .car-fuel-grid {
      gap: 8px !important;
    }
    .car-fuel-item {
      padding: 5px 10px !important;
      font-size: 11px !important;
    }
  }
  @media (max-width: 480px) {
    .car-card {
      padding: 12px !important;
      border-radius: 12px !important;
    }
    .car-image-box {
      height: 150px !important;
    }
    .car-fuel-grid {
      flex-direction: column !important;
      width: 100% !important;
    }
    .car-fuel-item {
      justify-content: space-between !important;
      width: 100% !important;
      box-sizing: border-box !important;
    }
    .car-select-btn {
      padding: 14px 24px !important;
      font-size: 13px !important;
    }
  }
`;