import { useState, useEffect, useMemo } from "react";
import CarCard from "./CarCard";
import ServiceNotAvailable from "./ServiceNotAvailable";
import { subscribeToCars } from "../firebase/carsService";
import { BASE_CITY, fuelTypes } from "../data/constants";

const fuelFilters = ["All", ...fuelTypes];

export default function SearchResults({ destination, onSelectCar }) {
  const [fuelFilter, setFuelFilter] = useState("All");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToCars(
      (liveCars) => { setCars(liveCars); setLoading(false); },
      () => { setLoadError(true); setLoading(false); }
    );
    return () => unsubscribe();
  }, []);

  const matches = useMemo(() => {
    if (!destination) return [];
    const term = destination.toLowerCase();
    return cars
      .filter((car) => car.subscriptionActive)
      .map((car) => {
        const dest = (car.destinations || []).find((d) => d.name.toLowerCase().includes(term));
        if (!dest) return null;
        return { ...car, matchedDestination: dest };
      })
      .filter(Boolean)
      .filter((car) => fuelFilter === "All" || car.matchedDestination.fuelPrices?.[fuelFilter] !== undefined);
  }, [cars, destination, fuelFilter]);

  if (!destination) return null;

  return (
    <section id="results" style={{ padding: "40px 24px 80px", background: "#f5f5f5", minHeight: "60vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        
        {/* Breadcrumb + Title */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ color: "#888", fontSize: 12, margin: "0 0 8px 0" }}>
            Home &gt; Select Car
          </p>
          <h2 style={{ fontSize: 22, color: "#222", fontWeight: 700, margin: 0 }}>
            {BASE_CITY} - {destination}
          </h2>
        </div>

        {/* Promo Banner */}
        <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
          {[
            { icon: "💰", text: "Book Now\nat Zero Cost" },
            { icon: "✓", text: "Free Cancellations\nUpto 1 Hour" },
            { icon: "📞", text: "24x7 Customer\nSupport" },
          ].map((item, i) => (
            <div key={i} style={{
              flex: 1, minWidth: 180,
              background: "#fff", borderRadius: 12,
              padding: "14px 18px", display: "flex", alignItems: "center", gap: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}>
              <span style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "#fff3e6", color: "#FF6B35",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18,
              }}>{item.icon}</span>
              <span style={{ color: "#444", fontSize: 12, fontWeight: 600, whiteSpace: "pre-line" }}>{item.text}</span>
            </div>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{
              width: 40, height: 40, border: "3px solid #f0f0f0",
              borderTopColor: "#FF6B35", borderRadius: "50%",
              animation: "spin 1s linear infinite", margin: "0 auto 16px",
            }} />
            <p style={{ color: "#888", fontSize: 14 }}>Cars dhoondh rahe hain...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : loadError ? (
          <div style={{ textAlign: "center", padding: "40px 0", background: "#fff", borderRadius: 16 }}>
            <p style={{ color: "#e74c3c", fontSize: 14 }}>Cars load nahi ho payi. Internet check karke page reload karein.</p>
          </div>
        ) : matches.length === 0 ? (
          <ServiceNotAvailable destination={destination} />
        ) : (
          <>
            {/* Filter & Count */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              flexWrap: "wrap", gap: 16, marginBottom: 24,
            }}>
              <h3 style={{ fontSize: 16, color: "#222", fontWeight: 700, margin: 0 }}>
                {matches.length} car{matches.length > 1 ? "s" : ""} available for {destination}
              </h3>
              <div style={{ display: "flex", gap: 8 }}>
                {fuelFilters.map((f) => (
                  <button key={f} onClick={() => setFuelFilter(f)} style={{
                    background: fuelFilter === f ? "#FF6B35" : "#fff",
                    color: fuelFilter === f ? "#fff" : "#666",
                    border: "1px solid " + (fuelFilter === f ? "#FF6B35" : "#ddd"),
                    padding: "8px 18px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                    cursor: "pointer", transition: "all 0.2s",
                  }}>{f}</button>
                ))}
              </div>
            </div>

            {/* Car Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {matches.map((car) => (
                <CarCard key={car.id} car={car} onSelect={() => onSelectCar(car)} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}