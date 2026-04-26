import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Fleet from "./components/Fleet";
import Booking from "./components/Booking";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#F5F0E8", background: "#0A0A1A" }}>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Fleet />
      <Booking />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}