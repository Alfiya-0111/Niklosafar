import { BsCarFront } from "react-icons/bs";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const quickLinks = ["services", "about", "fleet", "booking", "contact"];
const services = ["Airport Drop/Pickup", "Wedding & Functions", "Pilgrimage Tours", "Outstation Trips"];

export default function Footer() {
  return (
    <footer style={{
      background: "#050510",
      padding: "72px 48px 32px",
      borderTop: "1px solid rgba(212,168,83,0.12)",
      position: "relative",
    }}>
      {/* Top gold line */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, #D4A853, transparent)",
      }} />

      <div style={{
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
        gap: 48,
        marginBottom: 56,
      }} className="ns-footer-grid">
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{
              width: 38, height: 38,
              background: "linear-gradient(135deg, #D4A853, #F0C878)",
              borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 16px rgba(212,168,83,0.35)",
            }}>
              <BsCarFront size={20} color="#0A0A1A" />
            </div>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22,
              color: "#D4A853",
              fontWeight: 700,
            }}>NikloSafar</span>
          </div>
          <p style={{
            color: "#8B9BB4",
            fontSize: 14,
            lineHeight: 1.7,
            marginBottom: 24,
            maxWidth: 220,
          }}>
            Premium cab service based in Bilimora, serving South Gujarat with comfort &amp; reliability.
          </p>
          {/* Social */}
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { Icon: FaWhatsapp, href: "https://wa.me/919054270660", color: "#22c55e" },
              { Icon: FaInstagram, href: "#", color: "#E8607A" },
              { Icon: FaFacebook, href: "#", color: "#4F8EF7" },
            ].map(({ Icon, href, color }, i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer" style={{
                width: 38, height: 38,
                background: `${color}12`,
                border: `1px solid ${color}25`,
                borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                textDecoration: "none",
                transition: "transform 0.2s, background 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = `${color}22`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${color}12`; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <Icon size={17} color={color} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: "#D4A853", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 20 }}>
            Quick Links
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {quickLinks.map((l) => (
              <a key={l} href={`#${l}`} style={{
                color: "#8B9BB4", fontSize: 14, textDecoration: "none",
                textTransform: "capitalize", transition: "color 0.2s",
              }}
                onMouseEnter={e => e.target.style.color = "#D4A853"}
                onMouseLeave={e => e.target.style.color = "#8B9BB4"}
              >{l}</a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 style={{ color: "#D4A853", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 20 }}>
            Services
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {services.map((s) => (
              <a key={s} href="#booking" style={{
                color: "#8B9BB4", fontSize: 14, textDecoration: "none", transition: "color 0.2s",
              }}
                onMouseEnter={e => e.target.style.color = "#D4A853"}
                onMouseLeave={e => e.target.style.color = "#8B9BB4"}
              >{s}</a>
            ))}
          </div>
        </div>

        {/* Contact quick */}
        <div>
          <h4 style={{ color: "#D4A853", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 20 }}>
            Contact
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <a href="tel:+919054270660" style={{
              display: "flex", alignItems: "center", gap: 8,
              color: "#8B9BB4", fontSize: 14, textDecoration: "none", transition: "color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#D4A853"}
              onMouseLeave={e => e.currentTarget.style.color = "#8B9BB4"}
            >
              <MdPhone size={15} color="#D4A853" /> +91 9054270660
            </a>
            <a href="mailto:info@niklosafar.com" style={{
              display: "flex", alignItems: "center", gap: 8,
              color: "#8B9BB4", fontSize: 14, textDecoration: "none", transition: "color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#D4A853"}
              onMouseLeave={e => e.currentTarget.style.color = "#8B9BB4"}
            >
              <MdEmail size={15} color="#D4A853" /> info@niklosafar.com
            </a>
            <p style={{ color: "#8B9BB4", fontSize: 13, lineHeight: 1.5 }}>
              Bilimora, Navsari District<br />South Gujarat, India
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        paddingTop: 24,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <p style={{ color: "#8B9BB4", fontSize: 13 }}>
          &copy; {new Date().getFullYear()}{" "}
          <span style={{ color: "#D4A853" }}>NikloSafar</span>. All rights reserved.
        </p>
        <p style={{ color: "#8B9BB4", fontSize: 13 }}>
          Made with ♥ in{" "}
          <span style={{ color: "#D4A853" }}>Bilimora, Gujarat</span>
        </p>
      </div>

      <style>{`
        @media(max-width:900px) {
          .ns-footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media(max-width:540px) {
          .ns-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}