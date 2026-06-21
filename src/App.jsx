import { Helmet } from "react-helmet-async";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/admin/ProtectedRoute";

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
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
