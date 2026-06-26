import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();

  const handleSearch = (destination) => {
    if (!destination.trim()) return;
    navigate(`/results?destination=${encodeURIComponent(destination.trim())}`);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#F5F0E8", background: "#0A0A1A" }}>
      <Navbar />
      <Hero onSearch={handleSearch} />
      <Footer />
    </div>
  );
}