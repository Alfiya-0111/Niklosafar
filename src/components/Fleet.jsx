import { useRef, useState } from "react";
import { BsPersonFill, BsSnow, BsMusicNote } from "react-icons/bs";
import { MdCleaningServices, Md360 } from "react-icons/md";
import { TbGps } from "react-icons/tb";
import ertigaImg from "../assets/ertiga.png";

const specs = [
  { Icon: BsPersonFill, val: "7", key: "Seater" },
  { Icon: BsSnow, val: "AC", key: "Climate" },
  { Icon: MdCleaningServices, val: "Clean", key: "Interior" },
  { Icon: BsMusicNote, val: "Music", key: "System" },
  { Icon: TbGps, val: "GPS", key: "Tracking" },
];

export default function Fleet() {
  const imgRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const startX = useRef(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startX.current = e.clientX;
    if (imgRef.current) imgRef.current.style.animation = "none";
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !imgRef.current) return;
    const delta = (e.clientX - startX.current) * 0.35;
    setRotation((r) => r + delta);
    startX.current = e.clientX;
    imgRef.current.style.transform = `perspective(1200px) rotateY(${rotation}deg)`;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (imgRef.current) imgRef.current.style.animation = "";
  };

  const spin360 = () => {
    if (!imgRef.current) return;
    imgRef.current.style.transition = "transform 1.4s cubic-bezier(0.4,0,0.2,1)";
    imgRef.current.style.transform = `perspective(1200px) rotateY(${rotation + 360}deg)`;
    setRotation((r) => r + 360);
    setTimeout(() => {
      if (imgRef.current) imgRef.current.style.transition = "";
    }, 1400);
  };

  return (
    <section id="fleet" style={{
      padding: "100px 48px",
      background: "#080818",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle background gradient */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: 800, height: 500,
        transform: "translate(-50%,-50%)",
        background: "radial-gradient(ellipse, rgba(212,168,83,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 64 }}>
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
        }}>Our Fleet</span>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(32px, 5vw, 52px)",
          color: "#ffffff",
          lineHeight: 1.2,
          fontWeight: 700,
        }}>
          Travel in a{" "}
          <span style={{
            background: "linear-gradient(135deg, #D4A853, #F0C878)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>Premium Ertiga</span>
        </h2>
        <div style={{ width: 56, height: 3, background: "linear-gradient(90deg, #D4A853, #F0C878)", borderRadius: 2, margin: "20px auto 0" }} />
      </div>

      {/* Car Stage */}
      <div style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 48,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
      }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Ground glow */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 520,
          height: 40,
          background: "radial-gradient(ellipse, rgba(212,168,83,0.3) 0%, transparent 70%)",
          filter: "blur(10px)",
          pointerEvents: "none",
        }} />

        {/* Car image */}
        <img
          ref={imgRef}
          src={ertigaImg}
          alt="Maruti Suzuki Ertiga"
          draggable={false}
          style={{
            width: "min(580px, 90vw)",
            filter: "drop-shadow(0 30px 50px rgba(212,168,83,0.25)) drop-shadow(0 0 30px rgba(212,168,83,0.1))",
            animation: "floatCar 4.5s ease-in-out infinite",
            display: "block",
          }}
        />

        {/* 360 button */}
        <button onClick={spin360} style={{
          position: "absolute",
          bottom: 16,
          right: "calc(50% - 290px)",
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(212,168,83,0.1)",
          border: "1px solid rgba(212,168,83,0.3)",
          color: "#D4A853",
          padding: "8px 16px",
          borderRadius: 40,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(212,168,83,0.2)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(212,168,83,0.1)"}
        >
          <Md360 size={18} /> 360° Spin
        </button>

        <p style={{
          position: "absolute",
          bottom: -24,
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(139,155,180,0.5)",
          fontSize: 11,
          whiteSpace: "nowrap",
          letterSpacing: "1px",
        }}>← Drag to rotate →</p>
      </div>

      {/* Car name */}
      <div style={{ textAlign: "center", marginBottom: 40, marginTop: 16 }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 28,
          color: "#fff",
          marginBottom: 6,
        }}>Maruti Suzuki Ertiga</h3>
        <p style={{ color: "#8B9BB4", fontSize: 13 }}>Premium MPV · Perfect for families, groups & outstation journeys</p>
      </div>

      {/* Specs grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 1,
        background: "rgba(212,168,83,0.1)",
        border: "1px solid rgba(212,168,83,0.12)",
        borderRadius: 18,
        overflow: "hidden",
        maxWidth: 680,
        margin: "0 auto 40px",
      }} className="ns-specs-grid">
        {specs.map(({ Icon, val, key }) => (
          <div key={key} style={{
            background: "#0f0f1e",
            padding: "24px 12px",
            textAlign: "center",
            transition: "background 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#141428"}
            onMouseLeave={e => e.currentTarget.style.background = "#0f0f1e"}
          >
            <Icon color="#D4A853" size={20} style={{ marginBottom: 8 }} />
            <div style={{ fontSize: 18, fontWeight: 600, color: "#D4A853", lineHeight: 1, marginBottom: 4 }}>{val}</div>
            <div style={{ fontSize: 10, color: "#8B9BB4", letterSpacing: "1px", textTransform: "uppercase" }}>{key}</div>
          </div>
        ))}
      </div>

      <p style={{ textAlign: "center", color: "rgba(139,155,180,0.5)", fontSize: 13, fontStyle: "italic" }}>
        More vehicles being added soon as our fleet grows. Stay tuned!
      </p>

      <style>{`
        @keyframes floatCar {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @media(max-width:600px) {
          .ns-specs-grid { grid-template-columns: repeat(3,1fr) !important; }
        }
      `}</style>
    </section>
  );
}