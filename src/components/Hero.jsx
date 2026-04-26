import { useEffect, useRef } from "react";
import { BsCalendarCheck } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { TbStarFilled } from "react-icons/tb";
import { MdVerified } from "react-icons/md";

const stats = [
  { num: "500+", label: "Happy Trips" },
  { num: "4.9★", label: "Avg Rating" },
  { num: "24/7", label: "Available" },
];

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    let raf;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,168,83,${p.alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="home" style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0A0A1A 0%, #141428 50%, #0f0f22 100%)",
      display: "flex",
      alignItems: "center",
      padding: "72px 48px 0",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Particle canvas */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      {/* Gold radial glow */}
      <div style={{
        position: "absolute",
        top: "20%",
        left: "30%",
        width: 600,
        height: 600,
        background: "radial-gradient(circle, rgba(212,168,83,0.08) 0%, transparent 65%)",
        transform: "translate(-50%,-50%)",
        pointerEvents: "none",
      }} />

      {/* Grid lines */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(212,168,83,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 680 }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(212,168,83,0.08)",
          border: "1px solid rgba(212,168,83,0.3)",
          color: "#D4A853",
          padding: "8px 18px",
          borderRadius: 40,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          marginBottom: 32,
        }}>
          <MdVerified size={14} />
          Based in Bilimora, Gujarat
          <span style={{
            width: 6, height: 6,
            background: "#22c55e",
            borderRadius: "50%",
            animation: "pulse 2s infinite",
          }} />
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(44px, 7vw, 80px)",
          color: "#ffffff",
          lineHeight: 1.1,
          marginBottom: 24,
          fontWeight: 700,
        }}>
          Travel in{" "}
          <span style={{
            background: "linear-gradient(135deg, #D4A853, #F0C878, #D4A853)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>Comfort</span>
          {" "}& Style
        </h1>

        <p style={{
          color: "#8B9BB4",
          fontSize: 18,
          lineHeight: 1.75,
          marginBottom: 40,
          maxWidth: 520,
          fontWeight: 300,
        }}>
          Premium cab service for airport drops, weddings, pilgrimages &amp;
          outstation journeys — safe, reliable &amp; always on time.
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 64 }}>
          <a href="#booking" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "linear-gradient(135deg, #D4A853, #F0C878)",
            color: "#0A0A1A",
            padding: "14px 32px",
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: "0.5px",
            textDecoration: "none",
            boxShadow: "0 8px 30px rgba(212,168,83,0.35)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(212,168,83,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(212,168,83,0.35)"; }}
          >
            <BsCalendarCheck size={16} /> Book Your Ride
          </a>
          <a
            href="https://wa.me/919054270660?text=Hi%2C%20I%20want%20to%20book%20a%20ride%20with%20NikloSafar"
            target="_blank" rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "transparent",
              color: "#D4A853",
              padding: "14px 32px",
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 14,
              border: "1px solid rgba(212,168,83,0.4)",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(212,168,83,0.08)"; e.currentTarget.style.borderColor = "#D4A853"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(212,168,83,0.4)"; }}
          >
            <FaWhatsapp size={18} /> WhatsApp Us
          </a>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
          {stats.map((s, i) => (
            <div key={i}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 36,
                color: "#D4A853",
                fontWeight: 700,
                lineHeight: 1,
              }}>{s.num}</div>
              <div style={{
                color: "#8B9BB4",
                fontSize: 11,
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginTop: 4,
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3D floating card - right side */}
      <div className="ns-hero-card" style={{
        position: "absolute",
        right: "8%",
        top: "50%",
        transform: "translateY(-50%) perspective(1000px) rotateY(-8deg) rotateX(3deg)",
        background: "rgba(20,20,40,0.7)",
        border: "1px solid rgba(212,168,83,0.2)",
        borderRadius: 24,
        padding: "32px 28px",
        width: 240,
        backdropFilter: "blur(20px)",
        boxShadow: "0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(212,168,83,0.08)",
        animation: "floatCard 5s ease-in-out infinite",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <TbStarFilled color="#D4A853" size={18} />
          <span style={{ color: "#D4A853", fontWeight: 700, fontSize: 14 }}>4.9 Rating</span>
        </div>
        {["Airport Drop/Pickup", "Wedding & Functions", "Pilgrimage Tours", "Outstation Trips"].map((s) => (
          <div key={s} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 0",
            borderBottom: "1px solid rgba(212,168,83,0.08)",
            color: "#8B9BB4",
            fontSize: 12,
          }}>
            <span style={{ width: 6, height: 6, background: "#D4A853", borderRadius: "50%", flexShrink: 0 }} />
            {s}
          </div>
        ))}
        <div style={{
          marginTop: 20,
          background: "linear-gradient(135deg, #D4A853, #F0C878)",
          color: "#0A0A1A",
          padding: "10px",
          borderRadius: 10,
          textAlign: "center",
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: "0.5px",
        }}>✓ 500+ Trips Completed</div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes floatCard {
          0%,100% { transform: translateY(-50%) perspective(1000px) rotateY(-8deg) rotateX(3deg); }
          50% { transform: translateY(calc(-50% - 14px)) perspective(1000px) rotateY(-8deg) rotateX(3deg); }
        }
        @media(max-width:900px) { .ns-hero-card { display: none !important; } }
      `}</style>
    </section>
  );
}