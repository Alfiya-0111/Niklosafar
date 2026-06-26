import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchResults from "../components/SearchResults";
import Footer from "../components/Footer";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const destination = searchParams.get("destination") || "";

  const handleSelectCar = (car) => {
    navigate("/checkout", { state: { car, destination } });
  };

  const handleBack = () => {
    navigate("/");
  };

  if (!destination) {
    return (
      <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#F5F0E8", background: "#0A0A1A", minHeight: "100vh" }}>
        <Navbar />
        <div style={{ padding: 80, textAlign: "center" }}>
          <p style={{ color: "#888", fontSize: 16 }}>Koi destination select nahi kiya.</p>
          <button onClick={handleBack} style={{
            marginTop: 20, padding: "12px 28px", background: "#FF6B35", color: "#fff",
            border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 14
          }}>
            Go to Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#F5F0E8", background: "#0A0A1A", minHeight: "100vh" }}>
      <Navbar />
      <SearchResults destination={destination} onSelectCar={handleSelectCar} />
      <Footer />
    </div>
  );
}