import { Helmet } from "react-helmet-async";
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
    <>
      <Helmet>
        <title>NikloSafar – Cab & Tour Service Bilimora, Gujarat | Airport, Wedding, Pilgrimage</title>
        <meta name="description" content="NikloSafar offers premium cab service from Bilimora, Navsari, South Gujarat. Airport drop/pickup, wedding car, pilgrimage tours to Dwarka & Somnath, outstation trips. Book now – 24/7 available." />
        <meta name="keywords" content="cab service Bilimora, taxi Bilimora, cab Navsari, airport drop Surat, Dwarka tour Gujarat, wedding car Bilimora, outstation cab South Gujarat, NikloSafar" />
        <link rel="canonical" href="https://www.niklosafar.com/" />

        {/* Open Graph */}
        <meta property="og:title" content="NikloSafar – Cab & Tour Service Bilimora, Gujarat" />
        <meta property="og:description" content="Premium cab service for airport drops, weddings, pilgrimages & outstation journeys from Bilimora. Safe, reliable & always on time." />
        <meta property="og:url" content="https://www.niklosafar.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.niklosafar.com/og-image.jpg" />

        {/* Local Business Schema */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "NikloSafar",
          "description": "Premium cab and tour service based in Bilimora, serving South Gujarat with airport drops, wedding cars, pilgrimage tours and outstation trips.",
          "url": "https://www.niklosafar.com",
          "telephone": "+919054270660",
          "email": "info@niklosafar.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bilimora",
            "addressRegion": "Gujarat",
            "postalCode": "396321",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "20.7608",
            "longitude": "72.9616"
          },
          "areaServed": [
            "Bilimora", "Navsari", "Surat", "Valsad",
            "Ahmedabad", "Mumbai", "South Gujarat"
          ],
          "priceRange": "₹₹",
          "openingHours": "Mo-Su 00:00-23:59",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "500"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Cab Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Airport Drop & Pickup",
                  "description": "Timely pickups and drops to Surat, Ahmedabad & Mumbai airports"
                },
                "price": "1200",
                "priceCurrency": "INR"
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Pilgrimage Tours",
                  "description": "Tours to Dwarka, Somnath, Ambaji and other sacred destinations"
                },
                "price": "4500",
                "priceCurrency": "INR"
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Outstation Trips",
                  "description": "Long distance travel to Surat, Ahmedabad, Mumbai, Vadodara"
                },
                "price": "3200",
                "priceCurrency": "INR"
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Wedding & Functions Car",
                  "description": "Decorated car for weddings, engagements & special functions"
                }
              }
            ]
          }
        })}</script>
      </Helmet>

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
    </>
  );
}