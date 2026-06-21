import { TbRoute } from "react-icons/tb";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

export default function Footer() {
  return (
    <footer style={{ background: "#0F1222", padding: "64px 48px 28px", borderTop: "1px solid rgba(94,212,196,0.12)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 48, marginBottom: 48 }} className="cc-footer-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg, #FF8B5E, #FF6B35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TbRoute size={17} color="#14182B" />
            </div>
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: 19, color: "#F5F3ED", fontWeight: 600 }}>ConnectCab</span>
          </div>
          <p style={{ color: "#9CA3C4", fontSize: 13.5, lineHeight: 1.7, maxWidth: 260, marginBottom: 20 }}>
            South Gujarat ka local cab network — destination dalo, available cars dekho, seedha book karo.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            {[{ Icon: FaWhatsapp, color: "#25D366", href: "https://wa.me/919054270660" }, { Icon: FaInstagram, color: "#E8607A", href: "#" }, { Icon: FaFacebook, color: "#4F8EF7", href: "#" }].map(({ Icon, color, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer" style={{ width: 36, height: 36, background: `${color}12`, border: `1px solid ${color}25`, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={15} color={color} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ color: "#5ED4C4", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 18 }}>For Riders</h4>
          {["Find a Cab", "How it Works"].map((l) => (
            <a key={l} href="/#home" style={{ display: "block", color: "#9CA3C4", fontSize: 13.5, textDecoration: "none", marginBottom: 12 }}>{l}</a>
          ))}
        </div>

        <div>
          <h4 style={{ color: "#5ED4C4", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 18 }}>Contact</h4>
          <a href="tel:+919054270660" style={{ display: "flex", alignItems: "center", gap: 8, color: "#9CA3C4", fontSize: 13.5, textDecoration: "none", marginBottom: 12 }}>
            <MdPhone size={14} color="#FF8B5E" /> +91 90542 70660
          </a>
          <a href="mailto:hello@connectcab.in" style={{ display: "flex", alignItems: "center", gap: 8, color: "#9CA3C4", fontSize: 13.5, textDecoration: "none" }}>
            <MdEmail size={14} color="#FF8B5E" /> hello@connectcab.in
          </a>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <p style={{ color: "#9CA3C4", fontSize: 12.5 }}>&copy; {new Date().getFullYear()} ConnectCab. All rights reserved.</p>
        <p style={{ color: "#9CA3C4", fontSize: 12.5 }}>Made in Bilimora, Gujarat</p>
      </div>

      <style>{`
        @media(max-width:860px) { .cc-footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media(max-width:520px) { .cc-footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
