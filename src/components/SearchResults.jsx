import { useState, useEffect, useMemo } from "react";
import {
  FaHome,
  FaCarSide,
  FaMoneyBillWave,
  FaCheckCircle,
  FaHeadset,
  FaSpinner,
  FaGasPump,
  FaFilter,
} from "react-icons/fa";
import { MdLocalGasStation, MdEco } from "react-icons/md";
import CarCard from "./CarCard";
import ServiceNotAvailable from "./ServiceNotAvailable";
import { subscribeToCars } from "../firebase/carsService";
import { BASE_CITY, fuelTypes } from "../data/constants";

const fuelFilters = ["All", ...fuelTypes];

const fuelIcon = (fuel) => {
  if (fuel === "CNG") return <MdEco size={14} color="#28a745" />;
  if (fuel === "Diesel") return <MdLocalGasStation size={14} color="#6c757d" />;
  return <MdLocalGasStation size={14} color="#FF6B35" />;
};

const fuelColor = (fuel) => {
  if (fuel === "CNG") return "#28a745";
  if (fuel === "Diesel") return "#6c757d";
  return "#FF6B35";
};

export default function SearchResults({ destination, onSelectCar }) {
  const [fuelFilter, setFuelFilter] = useState("All");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToCars(
      (liveCars) => {
        setCars(liveCars);
        setLoading(false);
      },
      () => {
        setLoadError(true);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const matches = useMemo(() => {
    if (!destination) return [];
    const term = destination.toLowerCase();
    return cars
      .filter((car) => car.subscriptionActive)
      .map((car) => {
        const dest = (car.destinations || []).find((d) =>
          d.name.toLowerCase().includes(term)
        );
        if (!dest) return null;
        return { ...car, matchedDestination: dest };
      })
      .filter(Boolean)
      .filter(
        (car) =>
          fuelFilter === "All" ||
          car.matchedDestination.fuelPrices?.[fuelFilter] !== undefined
      );
  }, [cars, destination, fuelFilter]);

  if (!destination) return null;

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        {/* Breadcrumb + Title */}
        <div style={styles.header}>
          <p style={styles.breadcrumb}>
            <FaHome size={11} style={styles.breadcrumbIcon} />
            Home <span style={styles.breadcrumbSep}>&gt;</span>{" "}
            <FaCarSide size={11} style={styles.breadcrumbIcon} /> Select Car
          </p>
          <h2 style={styles.title}>
            {BASE_CITY} <span style={styles.arrow}>→</span> {destination}
          </h2>
        </div>

        {/* Promo Banner */}
        <div style={styles.promoContainer}>
          {[
            {
              icon: <FaMoneyBillWave size={20} />,
              text: "Book Now\nat Zero Cost",
              color: "#FF6B35",
            },
            {
              icon: <FaCheckCircle size={20} />,
              text: "Free Cancellations\nUpto 1 Hour",
              color: "#28a745",
            },
            {
              icon: <FaHeadset size={20} />,
              text: "24x7 Customer\nSupport",
              color: "#6c757d",
            },
          ].map((item, i) => (
            <div key={i} style={styles.promoCard}>
              <span style={{ ...styles.promoIcon, color: item.color }}>
                {item.icon}
              </span>
              <span style={styles.promoText}>{item.text}</span>
            </div>
          ))}
        </div>

        {loading ? (
          <div style={styles.loadingBox}>
            <FaSpinner
              size={40}
              color="#FF6B35"
              style={{ animation: "spin 1s linear infinite" }}
            />
            <p style={styles.loadingText}>Cars dhoondh rahe hain...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : loadError ? (
          <div style={styles.errorBox}>
            <p style={styles.errorText}>
              Cars load nahi ho payi. Internet check karke page reload karein.
            </p>
          </div>
        ) : matches.length === 0 ? (
          <ServiceNotAvailable destination={destination} />
        ) : (
          <>
            {/* Filter & Count */}
            <div style={styles.filterBar}>
              <h3 style={styles.countText}>
                {matches.length} car{matches.length > 1 ? "s" : ""} available
                for {destination}
              </h3>
              <div style={styles.filterButtons}>
                <FaFilter size={12} color="#888" style={{ marginRight: 4 }} />
                {fuelFilters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFuelFilter(f)}
                    style={{
                      ...styles.filterBtn,
                      background: fuelFilter === f ? "#FF6B35" : "#fff",
                      color: fuelFilter === f ? "#fff" : "#666",
                      border:
                        "1px solid " +
                        (fuelFilter === f ? "#FF6B35" : "#ddd"),
                    }}
                  >
                    {f !== "All" && (
                      <span style={{ marginRight: 4 }}>{fuelIcon(f)}</span>
                    )}
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Fuel Price Reference */}
            <div style={styles.fuelRefBox}>
              <FaGasPump size={14} color="#FF6B35" style={{ marginRight: 8 }} />
              <span style={styles.fuelRefText}>
                Fuel prices shown are per-trip rates set by car owners
              </span>
            </div>

            {/* Car Cards */}
            <div style={styles.cardsContainer}>
              {matches.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  destination={destination}
                  onSelect={() => onSelectCar(car)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <style>{responsiveCSS}</style>
    </section>
  );
}

const styles = {
  section: {
    padding: "40px 24px 80px",
    background: "#f5f5f5",  // ✅ White theme
    minHeight: "60vh",
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
  },
  header: {
    marginBottom: 24,
  },
  breadcrumb: {
    color: "#888",
    fontSize: 12,
    margin: "0 0 10px 0",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  breadcrumbIcon: {
    verticalAlign: "middle",
  },
  breadcrumbSep: {
    margin: "0 4px",
    color: "#888",
  },
  title: {
    fontSize: "clamp(20px, 4vw, 26px)",
    color: "#222",
    fontWeight: 700,
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  arrow: {
    color: "#FF6B35",
    fontWeight: 400,
  },
  promoContainer: {
    display: "flex",
    gap: 12,
    marginBottom: 28,
    flexWrap: "wrap",
  },
  promoCard: {
    flex: 1,
    minWidth: "clamp(140px, 30%, 280px)",
    background: "#fff",
    borderRadius: 12,
    padding: "16px 18px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  promoIcon: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    background: "#fff3e6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    flexShrink: 0,
  },
  promoText: {
    color: "#444",
    fontSize: 12,
    fontWeight: 600,
    whiteSpace: "pre-line",
    lineHeight: 1.4,
  },
  loadingBox: {
    textAlign: "center",
    padding: "80px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    color: "#888",
    fontSize: 14,
  },
  errorBox: {
    textAlign: "center",
    padding: "40px 24px",
    background: "#fff",
    borderRadius: 16,
    border: "1px solid #e8e8e8",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 14,
  },
  filterBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 20,
  },
  countText: {
    fontSize: "clamp(14px, 3vw, 16px)",
    color: "#222",
    fontWeight: 700,
    margin: 0,
  },
  filterButtons: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  filterBtn: {
    padding: "8px 16px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    fontFamily: "inherit",
  },
  fuelRefBox: {
    display: "flex",
    alignItems: "center",
    padding: "10px 16px",
    background: "#fff",
    border: "1px solid #e8e8e8",
    borderRadius: 8,
    marginBottom: 20,
  },
  fuelRefText: {
    color: "#888",
    fontSize: 12,
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
};

const responsiveCSS = `
  @media (max-width: 768px) {
    .search-results-section {
      padding: 24px 16px 60px !important;
    }
    .search-results-promo-card {
      min-width: 100% !important;
    }
    .search-results-filter-bar {
      flex-direction: column !important;
      align-items: flex-start !important;
    }
    .search-results-filter-buttons {
      width: 100% !important;
      overflow-x: auto !important;
      flex-wrap: nowrap !important;
      padding-bottom: 4px !important;
    }
    .search-results-filter-btn {
      white-space: nowrap !important;
      flex-shrink: 0 !important;
    }
  }
  @media (max-width: 480px) {
    .search-results-section {
      padding: 16px 12px 40px !important;
    }
    .search-results-promo-card {
      padding: 12px 14px !important;
    }
    .search-results-promo-icon {
      width: 36px !important;
      height: 36px !important;
    }
    .search-results-title {
      font-size: 18px !important;
    }
  }
`;