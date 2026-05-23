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
       <title>NikloSafar Travels Bilimora – Travels Near Me | Cab, Taxi & Tour Service Gujarat</title>
<meta name="description" content="NikloSafar Travels – best travels near me in Bilimora & Navsari. Airport drop, outstation cab, wedding car & pilgrimage tours. Travels in Bilimora 24/7. Book via WhatsApp +91 9054270660." />

        <meta name="keywords" content="cab service Bilimora, taxi Bilimora, cab Navsari, airport drop Surat, Dwarka tour Gujarat, wedding car Bilimora, outstation cab South Gujarat, NikloSafar" />
        <link rel="canonical" href="https://www.niklosafar.com/" />

        {/* Open Graph */}
       <meta property="og:title" content="NikloSafar Travels Bilimora – Travels Near Me | Cab & Tour Service Gujarat" />
<meta property="og:description" content="Best travels near you in Bilimora & Navsari. Airport drops, pilgrimage tours & outstation trips. 24/7 available." />
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