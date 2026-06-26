import { Helmet } from "react-helmet-async";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchResultsPage from "./pages/SearchResultsPage";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <>
      <Helmet>
        <title>ConnectCab – Find Local Cabs in South Gujarat | Compare Fuel Type & Price</title>
        <meta name="description" content="ConnectCab connects you with verified local cab owners across Bilimora, Navsari & Surat. Enter your destination, compare petrol/diesel/CNG cars and prices, and book instantly." />
        <link rel="canonical" href="https://connectcab.niklosafar.com/" />
      </Helmet>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<SearchResultsPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}