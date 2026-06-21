import { useState } from "react";
import { MdAdd, MdDelete, MdClose } from "react-icons/md";
import { carTypes, fuelTypes } from "../../data/constants";

const emptyDestination = () => ({ name: "", fuelPrices: { Petrol: "", Diesel: "", CNG: "" } });

const inputStyle = {
  width: "100%", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 9, padding: "10px 12px", color: "#F5F3ED", fontSize: 13.5, outline: "none", boxSizing: "border-box",
};
const labelStyle = { display: "block", color: "#9CA3C4", fontSize: 11.5, fontWeight: 600, marginBottom: 6 };

export default function CarForm({ initialData, onSubmit, onCancel, saving }) {
  const [carName, setCarName] = useState(initialData?.carName || "");
  const [ownerName, setOwnerName] = useState(initialData?.ownerName || "");
  const [ownerPhone, setOwnerPhone] = useState(initialData?.ownerPhone || "");
  const [type, setType] = useState(initialData?.type || carTypes[0]);
  const [seats, setSeats] = useState(initialData?.seats || 5);
  const [rating, setRating] = useState(initialData?.rating || "");
  const [subscriptionActive, setSubscriptionActive] = useState(initialData?.subscriptionActive ?? true);
  const [subscriptionExpiry, setSubscriptionExpiry] = useState(initialData?.subscriptionExpiry || "");
  const [destinations, setDestinations] = useState(
    initialData?.destinations?.length
      ? initialData.destinations.map((d) => ({
          name: d.name,
          fuelPrices: { Petrol: d.fuelPrices?.Petrol ?? "", Diesel: d.fuelPrices?.Diesel ?? "", CNG: d.fuelPrices?.CNG ?? "" },
        }))
      : [emptyDestination()]
  );
  const [error, setError] = useState("");

  const updateDestination = (idx, field, value) => {
    setDestinations((prev) => {
      const next = [...prev];
      if (field === "name") next[idx] = { ...next[idx], name: value };
      else next[idx] = { ...next[idx], fuelPrices: { ...next[idx].fuelPrices, [field]: value } };
      return next;
    });
  };

  const addDestinationRow = () => setDestinations((prev) => [...prev, emptyDestination()]);
  const removeDestinationRow = (idx) => setDestinations((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!carName.trim() || !ownerName.trim()) {
      setError("Car name aur owner name zaroori hai.");
      return;
    }

    const cleanedDestinations = destinations
      .filter((d) => d.name.trim())
      .map((d) => {
        const fuelPrices = {};
        fuelTypes.forEach((f) => {
          const val = d.fuelPrices[f];
          if (val !== "" && val !== null && !isNaN(Number(val))) fuelPrices[f] = Number(val);
        });
        return { name: d.name.trim(), fuelPrices };
      })
      .filter((d) => Object.keys(d.fuelPrices).length > 0);

    if (cleanedDestinations.length === 0) {
      setError("Kam se kam ek destination ke saath ek fuel price daalein.");
      return;
    }

    onSubmit({
      carName: carName.trim(),
      ownerName: ownerName.trim(),
      ownerPhone: ownerPhone.trim(),
      type,
      seats: Number(seats) || 4,
      rating: rating === "" ? null : Number(rating),
      subscriptionActive,
      subscriptionExpiry,
      destinations: cleanedDestinations,
    });
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(10,10,26,0.8)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 100,
    }}>
      <form onSubmit={handleSubmit} style={{
        width: "100%", maxWidth: 640, maxHeight: "88vh", overflowY: "auto",
        background: "#171B30", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: 28,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 19, color: "#F5F3ED", fontWeight: 600 }}>
            {initialData ? "Edit Car" : "Add New Car"}
          </h3>
          <button type="button" onClick={onCancel} style={{ background: "transparent", border: "none", color: "#9CA3C4", cursor: "pointer" }}>
            <MdClose size={22} />
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          <div>
            <label style={labelStyle}>Car name</label>
            <input value={carName} onChange={(e) => setCarName(e.target.value)} placeholder="e.g. Maruti Ertiga" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Car type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} style={inputStyle}>
              {carTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          <div>
            <label style={labelStyle}>Owner name</label>
            <input value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="e.g. Ramesh Patel" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Owner phone</label>
            <input value={ownerPhone} onChange={(e) => setOwnerPhone(e.target.value)} placeholder="10 digit number" style={inputStyle} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
          <div>
            <label style={labelStyle}>Seats</label>
            <input type="number" min={1} value={seats} onChange={(e) => setSeats(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Rating (optional)</label>
            <input type="number" min={1} max={5} step={0.1} value={rating} onChange={(e) => setRating(e.target.value)} placeholder="4.8" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Subscription expiry</label>
            <input type="date" value={subscriptionExpiry} onChange={(e) => setSubscriptionExpiry(e.target.value)} style={inputStyle} />
          </div>
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, cursor: "pointer" }}>
          <input type="checkbox" checked={subscriptionActive} onChange={(e) => setSubscriptionActive(e.target.checked)} style={{ width: 16, height: 16 }} />
          <span style={{ color: "#F5F3ED", fontSize: 13 }}>Subscription active (car will show up in search results)</span>
        </label>

        <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h4 style={{ color: "#5ED4C4", fontSize: 12, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>Destinations & fuel prices</h4>
          <button type="button" onClick={addDestinationRow} style={{
            display: "flex", alignItems: "center", gap: 5, background: "rgba(94,212,196,0.1)", border: "1px solid rgba(94,212,196,0.3)",
            color: "#5ED4C4", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}>
            <MdAdd size={14} /> Add destination
          </button>
        </div>
        <p style={{ color: "#6B7299", fontSize: 11, marginBottom: 14 }}>Leave a fuel field blank if this car doesn't offer that option for the destination.</p>

        {destinations.map((dest, idx) => (
          <div key={idx} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 14, marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-end", marginBottom: 10 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Destination name</label>
                <input value={dest.name} onChange={(e) => updateDestination(idx, "name", e.target.value)} placeholder="e.g. Dwarka" style={inputStyle} />
              </div>
              {destinations.length > 1 && (
                <button type="button" onClick={() => removeDestinationRow(idx)} style={{ background: "rgba(232,96,122,0.1)", border: "1px solid rgba(232,96,122,0.3)", color: "#E8607A", borderRadius: 9, padding: 10, cursor: "pointer" }}>
                  <MdDelete size={15} />
                </button>
              )}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {fuelTypes.map((fuel) => (
                <div key={fuel}>
                  <label style={labelStyle}>{fuel} (₹)</label>
                  <input type="number" min={0} value={dest.fuelPrices[fuel]} onChange={(e) => updateDestination(idx, fuel, e.target.value)} placeholder="—" style={inputStyle} />
                </div>
              ))}
            </div>
          </div>
        ))}

        {error && <p style={{ color: "#E8607A", fontSize: 12.5, marginTop: 8 }}>{error}</p>}

        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <button type="button" onClick={onCancel} style={{
            flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#9CA3C4", borderRadius: 10, padding: "12px 0", fontWeight: 600, fontSize: 13.5, cursor: "pointer",
          }}>Cancel</button>
          <button type="submit" disabled={saving} style={{
            flex: 1, background: saving ? "rgba(255,139,94,0.5)" : "linear-gradient(135deg, #FF8B5E, #FF6B35)",
            color: "#14182B", border: "none", borderRadius: 10, padding: "12px 0", fontWeight: 700, fontSize: 13.5,
            cursor: saving ? "not-allowed" : "pointer",
          }}>{saving ? "Saving..." : initialData ? "Save Changes" : "Add Car"}</button>
        </div>
      </form>
    </div>
  );
}
