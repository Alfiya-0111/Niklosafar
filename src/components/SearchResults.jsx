import { useState, useEffect, useMemo } from "react";
import RouteLine from "./RouteLine";
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
        const dest = (car.destinations || []).find((d) => d.name.toLowerCase().includes(term));
        if (!dest) return null;
        return { ...car, matchedDestination: dest };
      })
      .filter(Boolean)
      .filter((car) => fuelFilter === "All" || car.matchedDestination.fuelPrices?.[fuelFilter] !== undefined);
  }, [cars, destination, fuelFilter]);

  if (!destination) return null;

  return (
    <section id="results" style={{ padding: "80px 48px 100px", background: "#14182B", minHeight: "60vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <RouteLine from={BASE_CITY} to={destination} />
        </div>

        {loading ? (
          <p style={{ color: "#9CA3C4", fontSize: 14, textAlign: "center", padding: "40px 0" }}>
            Cars dhoondh rahe hain...
          </p>
        ) : loadError ? (
          <p style={{ color: "#E8607A", fontSize: 14, textAlign: "center", padding: "40px 0" }}>
            Cars load nahi ho payi. Internet check karke page reload karein.
          </p>
        ) : matches.length === 0 ? (
          <ServiceNotAvailable destination={destination} />
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: "#F5F3ED", fontWeight: 600 }}>
                {matches.length} car{matches.length > 1 ? "s" : ""} available for {destination}
              </h2>
              <div style={{ display: "flex", gap: 8 }}>
                {fuelFilters.map((f) => (
                  <button key={f} onClick={() => setFuelFilter(f)} style={{
                    background: fuelFilter === f ? "#5ED4C4" : "rgba(255,255,255,0.05)",
                    color: fuelFilter === f ? "#14182B" : "#9CA3C4",
                    border: "1px solid " + (fuelFilter === f ? "#5ED4C4" : "rgba(255,255,255,0.1)"),
                    padding: "8px 16px", borderRadius: 40, fontSize: 12.5, fontWeight: 600,
                    cursor: "pointer", transition: "all 0.2s",
                  }}>{f}</button>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
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
