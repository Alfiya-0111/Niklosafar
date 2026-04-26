import { MdVerified, MdAccessTime, MdPriceCheck } from "react-icons/md";

const features = [
  {
    title: "Safe & Verified Driver",
    desc: "Experienced driver with clean record. Your safety is our priority.",
    Icon: MdVerified,
    color: "#4F8EF7",
  },
  {
    title: "Always On Time",
    desc: "Punctuality is our promise. We track flights and plan routes smartly.",
    Icon: MdAccessTime,
    color: "#D4A853",
  },
  {
    title: "Transparent Pricing",
    desc: "No hidden charges. Price decided upfront before every trip.",
    Icon: MdPriceCheck,
    color: "#22c55e",
  },
];

const stats = [
  { num: "500+", label: "Trips Completed", sub: "Across South Gujarat & beyond" },
  { num: "4.9", label: "Star Rating", sub: "Average customer satisfaction" },
  { num: "24/7", label: "Available", sub: "Call or WhatsApp anytime" },
  { num: "3+", label: "Years Experience", sub: "Serving Bilimora & Navsari" },
];

export default function About() {
  return (
    <section id="about" style={{
      padding: "100px 48px",
      background: "linear-gradient(180deg, #0f0f1e 0%, #0A0A1A 100%)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 64,
        alignItems: "center",
      }} className="ns-about-grid">

        {/* Left: Text */}
        <div>
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
          }}>About Us</span>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 4vw, 50px)",
            color: "#ffffff",
            lineHeight: 1.2,
            marginBottom: 16,
            fontWeight: 700,
          }}>
            Your Trusted{" "}
            <span style={{
              background: "linear-gradient(135deg, #D4A853, #F0C878)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Travel Partner</span>
          </h2>

          <div style={{ width: 56, height: 3, background: "linear-gradient(90deg, #D4A853, #F0C878)", borderRadius: 2, marginBottom: 24 }} />

          <p style={{ color: "#8B9BB4", fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
            NikloSafar was born from a simple belief — every journey should be
            comfortable, safe &amp; stress-free. Based in Bilimora, we serve
            travellers across South Gujarat with pride.
          </p>
          <p style={{ color: "#8B9BB4", fontSize: 15, lineHeight: 1.8, marginBottom: 40 }}>
            Whether it's a late-night airport pickup or a family pilgrimage
            trip, we treat every customer like family. Clean car, honest
            pricing, and always on time.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {features.map((f) => (
              <div key={f.title} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{
                  width: 44, height: 44,
                  background: `${f.color}12`,
                  border: `1px solid ${f.color}25`,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 2,
                  boxShadow: `0 0 16px ${f.color}15`,
                }}>
                  <f.Icon size={22} color={f.color} />
                </div>
                <div>
                  <h4 style={{ color: "#F5F0E8", fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{f.title}</h4>
                  <p style={{ color: "#8B9BB4", fontSize: 13, lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Stats 3D cards */}
        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(212,168,83,0.12)",
          borderRadius: 24,
          padding: 36,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
          transform: "perspective(1000px) rotateY(-4deg)",
          transition: "transform 0.5s ease",
        }}
          onMouseEnter={e => e.currentTarget.style.transform = "perspective(1000px) rotateY(0deg)"}
          onMouseLeave={e => e.currentTarget.style.transform = "perspective(1000px) rotateY(-4deg)"}
        >
          {stats.map((s) => (
            <div key={s.label} style={{
              background: "rgba(212,168,83,0.04)",
              border: "1px solid rgba(212,168,83,0.1)",
              borderRadius: 16,
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              gap: 20,
              transition: "background 0.2s, border-color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(212,168,83,0.08)"; e.currentTarget.style.borderColor = "rgba(212,168,83,0.25)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(212,168,83,0.04)"; e.currentTarget.style.borderColor = "rgba(212,168,83,0.1)"; }}
            >
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 40,
                color: "#D4A853",
                fontWeight: 700,
                minWidth: 80,
                background: "linear-gradient(135deg, #D4A853, #F0C878)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>{s.num}</div>
              <div>
                <h4 style={{ color: "#F5F0E8", fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{s.label}</h4>
                <p style={{ color: "#8B9BB4", fontSize: 12 }}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:768px) {
          .ns-about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}