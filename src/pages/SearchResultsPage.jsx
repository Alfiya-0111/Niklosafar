import { useSearchParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarkerAlt, FaExclamationTriangle } from "react-icons/fa";
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
      <div style={styles.page}>
        <Navbar />
        <div style={styles.emptyState}>
          <FaExclamationTriangle size={48} color="#FF6B35" style={{ marginBottom: 16 }} />
          <p style={styles.emptyText}>Koi destination select nahi kiya.</p>
          <button onClick={handleBack} style={styles.backBtn}>
            <FaArrowLeft size={14} /> Go to Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Navbar />
      
      {/* Header Bar */}
      <div style={styles.headerBar}>
        <div style={styles.headerContainer}>
          <button onClick={handleBack} style={styles.headerBackBtn}>
            <FaArrowLeft size={14} /> Back
          </button>
          <div style={styles.routeInfo}>
            <FaMapMarkerAlt size={14} color="#FF6B35" />
            <span style={styles.routeText}>Bilimora → {destination}</span>
          </div>
        </div>
      </div>

      <SearchResults destination={destination} onSelectCar={handleSelectCar} />
      <Footer />

      {/* Responsive Styles */}
      <style>{responsiveCSS}</style>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'DM Sans', sans-serif",
    color: "#222",
    background: "#f5f5f5",
    minHeight: "100vh",
  },
  headerBar: {
    background: "#fff",
    borderBottom: "1px solid #e8e8e8",
    padding: "16px 24px",
  },
  headerContainer: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
  },
  headerBackBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "#fff3e6",
    border: "1px solid #FF6B35",
    color: "#FF6B35",
    padding: "8px 16px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    fontFamily: "inherit",
  },
  routeInfo: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    fontWeight: 600,
    color: "#222",
  },
  routeText: {
    color: "#222",
  },
  emptyState: {
    padding: "80px 24px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  emptyText: {
    color: "#666",
    fontSize: 16,
    marginBottom: 20,
  },
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    marginTop: 20,
    padding: "12px 28px",
    background: "#FF6B35",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 14,
    fontFamily: "inherit",
  },
};

/* ============ RESPONSIVE CSS ============ */
const responsiveCSS = `
  @media (max-width: 768px) {
    .search-results-page-header-bar {
      padding: 12px 16px !important;
    }
    .search-results-page-header-container {
      gap: 12px !important;
    }
    .search-results-page-header-back-btn {
      padding: 6px 12px !important;
      font-size: 12px !important;
    }
    .search-results-page-route-text {
      font-size: 13px !important;
    }
    .search-results-page-empty-state {
      padding: 60px 16px !important;
    }
  }
  @media (max-width: 480px) {
    .search-results-page-header-bar {
      padding: 10px 12px !important;
    }
    .search-results-page-route-text {
      font-size: 12px !important;
    }
    .search-results-page-empty-text {
      font-size: 14px !important;
    }
    .search-results-page-back-btn {
      padding: 10px 24px !important;
      font-size: 13px !important;
    }
  }
`;