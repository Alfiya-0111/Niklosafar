import { BsCarFrontFill } from "react-icons/bs";

export default function RouteLine({ from, to, animate = true }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
      <span style={{ color: "#F5F3ED", fontWeight: 700, fontSize: 14, whiteSpace: "nowrap" }}>{from}</span>
      <div style={{
        position: "relative",
        flex: 1,
        height: 2,
        minWidth: 50,
        background: "repeating-linear-gradient(90deg, #5ED4C4 0 8px, transparent 8px 18px)",
      }}>
        {animate && (
          <BsCarFrontFill
            size={15}
            style={{
              position: "absolute",
              top: -7,
              left: 0,
              color: "#FF8B5E",
              animation: "driveRoute 3s linear infinite",
            }}
          />
        )}
      </div>
      <span style={{ color: "#F5F3ED", fontWeight: 700, fontSize: 14, whiteSpace: "nowrap" }}>{to}</span>
      <style>{`
        @keyframes driveRoute {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: calc(100% - 16px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
