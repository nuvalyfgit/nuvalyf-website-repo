import { ImageResponse } from "next/og";

export const alt = "NuvaLyf: Run your clinic. Fill it with patients.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Link preview for WhatsApp, LinkedIn and X. Applies to every page unless a route overrides it. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", padding: 72,
          background: "radial-gradient(circle at 85% 10%, rgba(57,219,192,0.35), transparent 45%), radial-gradient(circle at 5% 95%, rgba(125,134,255,0.3), transparent 45%), #070d24",
          color: "white", fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg,#39dbc0,#7d86ff)", alignItems: "center", justifyContent: "center", color: "#0b1535", fontSize: 30, fontWeight: 800 }}>N</div>
            <div style={{ display: "flex", fontSize: 36, fontWeight: 700 }}>NuvaLyf</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>Run your clinic.</div>
            <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, color: "#39dbc0" }}>Fill it with patients.</div>
            <div style={{ display: "flex", marginTop: 26, fontSize: 28, color: "rgba(255,255,255,0.65)" }}>Clinic EMR + online booking with a live queue</div>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {["NuvaLyf EMR", "DocConnect", "India · UAE"].map((t) => (
              <div key={t} style={{ display: "flex", padding: "12px 22px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.06)", fontSize: 22, fontWeight: 700 }}>{t}</div>
            ))}
          </div>
        </div>

        {/* Token ticket */}
        <div style={{ display: "flex", flexDirection: "column", width: 300, alignSelf: "center", background: "white", borderRadius: 28, padding: 30, color: "#0b1535", transform: "rotate(4deg)", boxShadow: "14px 14px 0 #39dbc0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700, color: "#71808e", letterSpacing: 3 }}>
            <span>TOKEN</span><span style={{ color: "#0b6b63" }}>● LIVE</span>
          </div>
          <div style={{ display: "flex", fontSize: 120, fontWeight: 800, lineHeight: 1, marginTop: 10 }}>07</div>
          <div style={{ display: "flex", borderTop: "3px dashed #cfdcd9", margin: "22px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {[["AHEAD", "3"], ["ETA", "5:52"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 14, color: "#8a96a1", fontWeight: 700, letterSpacing: 2 }}>{k}</span>
                <span style={{ fontSize: 34, fontWeight: 800, color: k === "ETA" ? "#0b6b63" : "#0b1535" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
