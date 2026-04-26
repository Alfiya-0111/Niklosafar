import { TbStarFilled } from "react-icons/tb";
import { MdFormatQuote } from "react-icons/md";

const reviews = [
  {
    text: "Bahut accha experience tha. Airport drop ke liye time pe aaye, car saaf thi aur driver bahut cooperative tha. Definitely recommend karunga!",
    name: "Ramesh Patel",
    location: "Bilimora",
    initial: "R",
    color: "#4F8EF7",
  },
  {
    text: "Dwarka yatra ke liye inhone book kiya tha. Poora trip bahut comfortable raha. Elderly parents ke saath travel tha — driver ne bahut dhyan rakha.",
    name: "Sunita Desai",
    location: "Navsari",
    initial: "S",
    color: "#D4A853",
  },
  {
    text: "Wedding mein decorated car liya tha. Sab bahut khush the. Price bhi reasonable tha aur service top class thi. Thank you NikloSafar!",
    name: "Kavya Shah",
    location: "Valsad",
    initial: "K",
    color: "#E8607A",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" style={{
      padding: "100px 48px",
      background: "linear-gradient(180deg, #0A0A1A 0%, #0f0f1e 100%)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(212,168,83,0.3), transparent)",
      }} />

      <div style={{ marginBottom: 64 }}>
        <span style={{
          display: "inline-block",
          background: "rgba(212,168,83,0.1)",
          color: "#D4A853",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "3px",
          textTransform: "uppercase",
          padding: "8px 18px",
          borderRadius: 40,
          border: "1px solid rgba(212,168,83,0.2)",
          marginBottom: 20,
        }}>Reviews</span>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(32px, 5vw, 52px)",
          color: "#ffffff",
          lineHeight: 1.2,
          fontWeight: 700,
        }}>
          What Our{" "}
          <span style={{
            background: "linear-gradient(135deg, #D4A853, #F0C878)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>Travellers Say</span>
        </h2>
        <div style={{ width: 56, height: 3, background: "linear-gradient(90deg, #D4A853, #F0C878)", borderRadius: 2, marginTop: 16 }} />
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 24,
      }}>
        {reviews.map((r) => (
          <div key={r.name} style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 20,
            padding: "32px 28px",
            position: "relative",
            transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.borderColor = `${r.color}30`;
              e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.3), 0 0 20px ${r.color}12`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Quote icon */}
            <MdFormatQuote size={36} color={`${r.color}40`} style={{ marginBottom: 12 }} />

            {/* Stars */}
            <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
              {[...Array(5)].map((_, i) => (
                <TbStarFilled key={i} size={16} color="#D4A853" />
              ))}
            </div>

            <p style={{
              color: "#8B9BB4",
              fontSize: 14,
              lineHeight: 1.8,
              fontStyle: "italic",
              marginBottom: 24,
            }}>"{r.text}"</p>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 42, height: 42,
                borderRadius: "50%",
                background: `${r.color}18`,
                border: `1px solid ${r.color}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Playfair Display', serif",
                fontSize: 18,
                color: r.color,
                fontWeight: 700,
              }}>{r.initial}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#F5F0E8" }}>{r.name}</div>
                <div style={{ fontSize: 12, color: "#8B9BB4" }}>{r.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}