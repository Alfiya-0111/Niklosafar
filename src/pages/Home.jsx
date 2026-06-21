import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchResults from "../components/SearchResults";
import Footer from "../components/Footer";

export default function Home() {
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const handleSelectCar = (car) => {
    navigate("/checkout", { state: { car, destination } });
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#F5F0E8", background: "#0A0A1A" }}>
      <Navbar />
      <Hero onSearch={setDestination} />
      <SearchResults destination={destination} onSelectCar={handleSelectCar} />
      <Footer />
    </div>
  );
}
