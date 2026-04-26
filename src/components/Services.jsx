import { MdFlightTakeoff, MdFavorite, MdStar, MdMap } from "react-icons/md";

const services = [
  {
    title: "Airport Drop & Pickup",
    desc: "Timely pickups and drops to Surat, Ahmedabad & Mumbai airports. Flight tracking included — we wait for you.",
    price: "Surat Airport from ₹1,200",
    Icon: MdFlightTakeoff,
    color: "#4F8EF7",
  },
  {
    title: "Wedding & Functions",
    desc: "Decorated car available for weddings, engagements & special family functions. Make your day memorable.",
    price: "Special wedding packages",
    Icon: MdFavorite,
    color: "#E8607A",
  },
  {
    title: "Pilgrimage Tours",
    desc: "Comfortable journeys to Dwarka, Somnath, Ambaji & other sacred destinations. Safe travel for elders too.",
    price: "Dwarka from ₹4,500",
    Icon: MdStar,
    color: "#D4A853",
  },
  {
    title: "Outstation Trips",
    desc: "Long distance travel to Surat, Ahmedabad, Mumbai, Vadodara & beyond. One-way or round trips available.",
    price: "Ahmedabad from ₹3,200",
    Icon: MdMap,
    color: "#22c55e",
  },
];

export default function Services() {
  return (
    <section id="services" style={{
      padding: "100px 48px",
      background: "#0f0f1e",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(212,168,83,0.4), transparent)",
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
        }}>Our Services</span>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(32px, 5vw, 52px)",
          color: "#ffffff",
          lineHeight: 1.2,
          marginBottom: 16,
          fontWeight: 700,
        }}>
          Every Journey,<br />
          <span style={{
            background: "linear-gradient(135deg, #D4A853, #F0C878)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>Perfectly Handled</span>
        </h2>
        <div style={{ width: 56, height: 3, background: "linear-gradient(90deg, #D4A853, #F0C878)", borderRadius: 2, marginBottom: 16 }} />
        <p style={{ color: "#8B9BB4", fontSize: 16, maxWidth: 500, lineHeight: 1.7 }}>
          From airport runs to sacred pilgrimages — comfortable, reliable travel for every occasion.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 24,
      }}>
        {services.map((s) => (
          <ServiceCard key={s.title} {...s} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ title, desc, price, Icon, color }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 20,
        padding: "36px 28px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-8px) perspective(800px) rotateX(3deg)";
        e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.4), 0 0 30px ${color}18`;
        e.currentTarget.style.borderColor = `${color}40`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0) perspective(800px) rotateX(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${color}, transparent)`,
        opacity: 0.7,
      }} />

      {/* Icon */}
      <div style={{
        width: 56, height: 56,
        background: `${color}15`,
        border: `1px solid ${color}30`,
        borderRadius: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
        boxShadow: `0 0 20px ${color}20`,
      }}>
        <Icon size={28} color={color} />
      </div>

      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 20,
        color: "#F5F0E8",
        marginBottom: 12,
        fontWeight: 700,
      }}>{title}</h3>

      <p style={{
        color: "#8B9BB4",
        fontSize: 14,
        lineHeight: 1.7,
        marginBottom: 20,
      }}>{desc}</p>

      <span style={{
        display: "inline-block",
        background: `${color}12`,
        color: color,
        fontSize: 12,
        fontWeight: 600,
        padding: "6px 14px",
        borderRadius: 40,
        border: `1px solid ${color}25`,
        letterSpacing: "0.3px",
      }}>{price}</span>
    </div>
  );
}