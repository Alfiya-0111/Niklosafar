import { MdPhone, MdLocationOn, MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

const areas = [
  "Bilimora → Surat (Airport, City)",
  "Bilimora → Ahmedabad",
  "Bilimora → Mumbai",
  "Bilimora → Dwarka / Somnath",
  "Bilimora → Ambaji / Pavagadh",
  "Navsari, Valsad, Bharuch local",
  "Any custom destination on request",
];

const contacts = [
  {
    Icon: MdPhone,
    label: "Phone / WhatsApp",
    value: "+91 9054270660",
    sub: "Available 24/7",
    href: "tel:+919054270660",
    color: "#22c55e",
    ExtraIcon: FaWhatsapp,
  },
  {
    Icon: MdLocationOn,
    label: "Base Location",
    value: "Bilimora, Navsari District",
    sub: "South Gujarat, India",
    color: "#D4A853",
  },
  {
    Icon: MdEmail,
    label: "Email",
    value: "info@niklosafar.com",
    href: "mailto:info@niklosafar.com",
    color: "#4F8EF7",
  },
];

export default function Contact() {
  return (
    <section id="contact" style={{
      padding: "100px 48px",
      background: "linear-gradient(180deg, #0f0f1e 0%, #0A0A1A 100%)",
      position: "relative",
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
        }}>Contact</span>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(32px, 5vw, 52px)",
          color: "#ffffff",
          lineHeight: 1.2,
          fontWeight: 700,
        }}>
          Get In{" "}
          <span style={{
            background: "linear-gradient(135deg, #D4A853, #F0C878)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>Touch</span>
        </h2>
        <div style={{ width: 56, height: 3, background: "linear-gradient(90deg, #D4A853, #F0C878)", borderRadius: 2, marginTop: 16 }} />
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 64,
        alignItems: "start",
      }} className="ns-contact-grid">
        {/* Contact info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {contacts.map((c) => (
            <div key={c.label} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{
                width: 48, height: 48,
                background: `${c.color}12`,
                border: `1px solid ${c.color}25`,
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: `0 0 20px ${c.color}15`,
              }}>
                <c.Icon size={22} color={c.color} />
              </div>
              <div>
                <h4 style={{ color: "#D4A853", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", marginBottom: 6 }}>
                  {c.label}
                </h4>
                {c.href ? (
                  <a href={c.href} style={{
                    color: "#F5F0E8",
                    fontSize: 16,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    transition: "color 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = "#D4A853"}
                    onMouseLeave={e => e.currentTarget.style.color = "#F5F0E8"}
                  >
                    {c.ExtraIcon && <c.ExtraIcon size={16} color="#22c55e" />}
                    {c.value}
                  </a>
                ) : (
                  <p style={{ color: "#F5F0E8", fontSize: 16 }}>{c.value}</p>
                )}
                {c.sub && <p style={{ color: "#8B9BB4", fontSize: 12, marginTop: 4 }}>{c.sub}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Service Areas */}
        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(212,168,83,0.12)",
          borderRadius: 20,
          padding: "32px 28px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        }}>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 22,
            color: "#D4A853",
            marginBottom: 8,
          }}>Service Areas</h3>
          <p style={{ color: "#8B9BB4", fontSize: 14, marginBottom: 24 }}>
            We cover all major destinations from our Bilimora base:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {areas.map((a) => (
              <div key={a} style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 14,
                color: "#8B9BB4",
                padding: "8px 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}>
                <span style={{
                  width: 8, height: 8,
                  background: "linear-gradient(135deg, #D4A853, #F0C878)",
                  borderRadius: "50%",
                  flexShrink: 0,
                  boxShadow: "0 0 8px rgba(212,168,83,0.4)",
                }} />
                {a}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px) {
          .ns-contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}