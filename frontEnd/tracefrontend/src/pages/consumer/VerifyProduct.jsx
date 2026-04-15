import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../../services/api"

function VerifyProduct() {
  const { id } = useParams()
  const [stages, setStages] = useState([])
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.get(`/stages/verify/${id}`)
      .then((res) => {
        const data = res.data ?? res
        const stagesArray = Array.isArray(data) ? data : []
        setStages(stagesArray)
        if (stagesArray.length > 0 && stagesArray[0].productId) {
          return api.get(`/products/${stagesArray[0].productId}`)
        }
      })
      .then((res) => {
        if (res) setProduct(res.data ?? res)
      })
      .catch((err) => {
        console.error("VerifyProduct error:", err)
        setError("Could not load product details.")
      })
  }, [id])

  const loading = stages.length === 0 && !error

  if (loading) {
    return (
      <div style={S.fullPage}>
        <div style={S.blob1} /><div style={S.blob2} />
        <div style={S.blob3} /><div style={S.blob4} />
        <div style={S.loadingCard}>
          <div style={S.loadingIconTile}><GridIcon /></div>
          <div style={S.spinnerWrap}>
            <div style={S.spinner} className="vp-spin" />
          </div>
          <p style={S.loadingText}>Verifying product…</p>
          <div style={S.dotsRow}>
            {[0,1,2].map(i => (
              <div key={i} style={S.dot} className={`vp-dot-${i}`} />
            ))}
          </div>
        </div>
        <style>{`
          @keyframes vp-spin { to { transform: rotate(360deg); } }
          .vp-spin { animation: vp-spin 0.9s linear infinite; }
          @keyframes vp-dot { 0%,80%,100%{opacity:0.25;transform:scale(0.85)} 40%{opacity:1;transform:scale(1.1)} }
          .vp-dot-0 { animation: vp-dot 1.2s ease-in-out infinite 0.0s; }
          .vp-dot-1 { animation: vp-dot 1.2s ease-in-out infinite 0.2s; }
          .vp-dot-2 { animation: vp-dot 1.2s ease-in-out infinite 0.4s; }
        `}</style>
      </div>
    )
  }

  if (error) {
    return (
      <div style={S.fullPage}>
        <div style={S.blob1} /><div style={S.blob2} />
        <div style={S.blob3} /><div style={S.blob4} />
        <div style={S.errorCard}>
          <div style={S.errorIconTile}><ErrorIcon /></div>
          <p style={S.errorTitle}>Verification Failed</p>
          <p style={S.errorDesc}>{error}</p>
        </div>
      </div>
    )
  }

  const formatDate = (ts) => {
    if (!ts) return ""
    try {
      return new Date(ts).toLocaleString("en-GB", {
        day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      })
    } catch { return ts }
  }

  return (
    <div style={S.fullPage}>

      {/* Ambient blobs */}
      <div style={S.blob1} /><div style={S.blob2} />
      <div style={S.blob3} /><div style={S.blob4} />

      {/* Outer glass card */}
      <div style={S.outerCard}>

        {/* Header */}
        <div style={S.cardHeader}>
          <div style={S.headerIconTile}><GridIcon /></div>
          <div style={S.headerText}>
            <div style={S.headerLabel}>TraceSure Verification</div>
            <div style={S.headerSub}>Manufacturing Traceability</div>
          </div>
          <span style={S.verifiedBadge}>
            <CheckIcon /> Verified
          </span>
        </div>

        <div style={S.headerDivider} />

        {/* Product name */}
        <h1 style={S.productName}>
          {product?.name ?? product?.productName ?? "Product"}
        </h1>

        {/* Manufacturer */}
        {(product?.company || product?.companyName || product?.manufacturer) && (
          <p style={S.manufacturer}>
            Manufactured by{" "}
            <span style={S.manufacturerName}>
              {product?.company ?? product?.companyName ?? product?.manufacturer}
            </span>
          </p>
        )}

        {/* Stage count badge */}
        <div style={{ display:"flex", justifyContent:"center", marginBottom:"1.25rem" }}>
          <span style={S.stageBadge}>
            {stages.length} stage{stages.length !== 1 ? "s" : ""} verified
          </span>
        </div>

        {/* Inner card — timeline */}
        <div style={S.innerCard}>
          <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
            {stages.map((stage, index) => (
              <div key={stage._id ?? index} style={{ display:"flex", alignItems:"stretch", gap:0 }}>

                {/* Icon + connector */}
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                  <div style={S.stageCircle}>
                    <CheckIconSm />
                  </div>
                  {index < stages.length - 1 && (
                    <div style={S.connector} />
                  )}
                </div>

                {/* Stage card */}
                <div style={S.stageCard}>
                  <div style={S.stageAccent} />
                  <h2 style={S.stageName}>
                    {stage.stageName ?? "Unnamed Stage"}
                  </h2>
                  {stage.data && (
                    <p style={S.stageData}>{stage.data}</p>
                  )}
                  <p style={S.stageTime}>{formatDate(stage.timestamp)}</p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p style={S.footer}>
          Scan verified · Powered by TraceSure
        </p>

      </div>

      <style>{`
        @keyframes vp-spin { to { transform: rotate(360deg); } }
        .vp-spin { animation: vp-spin 0.9s linear infinite; }
        @keyframes vp-dot { 0%,80%,100%{opacity:0.25;transform:scale(0.85)} 40%{opacity:1;transform:scale(1.1)} }
        .vp-dot-0 { animation: vp-dot 1.2s ease-in-out infinite 0.0s; }
        .vp-dot-1 { animation: vp-dot 1.2s ease-in-out infinite 0.2s; }
        .vp-dot-2 { animation: vp-dot 1.2s ease-in-out infinite 0.4s; }
      `}</style>
    </div>
  )
}

/* ── Icons ── */
function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="rgba(255,200,200,0.85)" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="#4ade80" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}
function CheckIconSm() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <polyline points="3,8 6.5,12 13,4"
        stroke="white" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function ErrorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="rgba(255,160,160,0.85)" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  )
}

/* ── Styles ── */
const S = {
  fullPage: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    width: "100%",
    overflow: "hidden",
    padding: "clamp(1.5rem, 5vw, 3rem) clamp(1rem, 4vw, 1.25rem)",
    background: "linear-gradient(155deg, #1a0a0a 0%, #3b0d0d 35%, #7f1d1d 65%, #991b1b 100%)",
    boxSizing: "border-box",
    fontFamily: "Georgia, 'Times New Roman', serif",
  },

  blob1: { pointerEvents:"none", position:"absolute", top:"4%", left:"4%", width:"38%", height:"38%", background:"radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(20px)" },
  blob2: { pointerEvents:"none", position:"absolute", top:"8%", right:"6%", width:"28%", height:"28%", background:"radial-gradient(circle, rgba(239,68,68,0.22) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(22px)" },
  blob3: { pointerEvents:"none", position:"absolute", bottom:"12%", left:"8%", width:"32%", height:"32%", background:"radial-gradient(circle, rgba(180,30,30,0.18) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(22px)" },
  blob4: { pointerEvents:"none", position:"absolute", bottom:"10%", right:"4%", width:"30%", height:"30%", background:"radial-gradient(circle, rgba(255,180,180,0.12) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(20px)" },

  // Loading
  loadingCard: {
    position: "relative", zIndex: 1,
    display: "flex", flexDirection: "column", alignItems: "center", gap: "14px",
    background: "rgba(120,20,20,0.28)",
    backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: "20px", padding: "2.5rem 3rem",
    boxShadow: "0 8px 48px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.10)",
  },
  loadingIconTile: {
    width: "44px", height: "44px", borderRadius: "11px",
    background: "rgba(185,28,28,0.45)",
    border: "1px solid rgba(255,200,200,0.18)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  spinnerWrap: {
    position: "relative", width: "38px", height: "38px",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  spinner: {
    position: "absolute", inset: 0,
    borderRadius: "50%",
    border: "2.5px solid rgba(255,200,200,0.12)",
    borderTopColor: "#b91c1c",
    boxSizing: "border-box",
  },
  loadingText: {
    fontSize: "14px", fontWeight: "600",
    color: "rgba(255,200,200,0.75)",
    fontFamily: "Georgia, serif", letterSpacing: "0.03em", margin: 0,
  },
  dotsRow: { display: "flex", gap: "6px", alignItems: "center" },
  dot: {
    width: "6px", height: "6px", borderRadius: "50%",
    background: "#b91c1c", boxShadow: "0 0 6px rgba(185,28,28,0.5)",
  },

  // Error
  errorCard: {
    position: "relative", zIndex: 1,
    display: "flex", flexDirection: "column", alignItems: "center",
    gap: "12px", textAlign: "center",
    background: "rgba(120,20,20,0.28)",
    backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: "20px", padding: "2.5rem 2rem", maxWidth: "320px", width: "100%",
    boxShadow: "0 8px 48px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.10)",
  },
  errorIconTile: {
    width: "44px", height: "44px", borderRadius: "11px",
    background: "rgba(185,28,28,0.35)",
    border: "1px solid rgba(255,160,160,0.2)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  errorTitle: {
    fontSize: "16px", fontWeight: "700", color: "#fff",
    margin: 0, fontFamily: "Georgia, serif", letterSpacing: "0.01em",
  },
  errorDesc: {
    fontSize: "13px", color: "rgba(255,200,200,0.62)",
    margin: 0, fontFamily: "Georgia, serif", lineHeight: 1.6,
  },

  // Main card
  outerCard: {
    position: "relative", zIndex: 10,
    width: "100%", maxWidth: "440px",
    borderRadius: "24px",
    padding: "clamp(1.25rem, 5vw, 2rem) clamp(1rem, 5vw, 1.75rem)",
    background: "rgba(120,20,20,0.28)",
    backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)",
    border: "1px solid rgba(255,255,255,0.14)",
    boxShadow: "0 8px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
    boxSizing: "border-box",
  },

  cardHeader: {
    display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem",
  },
  headerIconTile: {
    width: "36px", height: "36px", borderRadius: "9px",
    background: "rgba(185,28,28,0.45)",
    border: "1px solid rgba(255,200,200,0.18)",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  headerText: { flex: 1, minWidth: 0 },
  headerLabel: {
    fontSize: "13px", fontWeight: "700", color: "#fff",
    fontFamily: "Georgia, serif", letterSpacing: "0.01em", lineHeight: 1.2,
  },
  headerSub: {
    fontSize: "11px", color: "rgba(255,200,200,0.50)",
    fontFamily: "Georgia, serif", letterSpacing: "0.03em",
  },
  verifiedBadge: {
    display: "inline-flex", alignItems: "center", gap: "5px",
    padding: "4px 10px", borderRadius: "100px",
    background: "rgba(74,222,128,0.12)",
    border: "1px solid rgba(74,222,128,0.28)",
    color: "#4ade80", fontSize: "11px", fontWeight: "700",
    fontFamily: "Georgia, serif", letterSpacing: "0.04em", flexShrink: 0,
  },
  headerDivider: {
    height: "1px", background: "rgba(255,255,255,0.09)", margin: "0 0 1.1rem",
  },

  productName: {
    fontSize: "clamp(18px, 5vw, 24px)", fontWeight: "700",
    textAlign: "center", marginBottom: "6px", marginTop: 0,
    color: "#fff", fontFamily: "Georgia, serif", letterSpacing: "0.01em",
  },
  manufacturer: {
    textAlign: "center", fontSize: "clamp(12px, 3.5vw, 13px)",
    marginBottom: "1rem", marginTop: 0,
    color: "rgba(255,200,200,0.55)", fontFamily: "Georgia, serif",
  },
  manufacturerName: {
    fontWeight: "700", color: "rgba(255,220,220,0.88)",
  },

  stageBadge: {
    display: "inline-flex", alignItems: "center", gap: "5px",
    background: "rgba(185,28,28,0.40)",
    border: "1px solid rgba(255,180,180,0.2)",
    color: "rgba(255,210,210,0.92)", borderRadius: "100px",
    padding: "4px 14px", fontSize: "12px", fontWeight: "600",
    fontFamily: "Georgia, serif", letterSpacing: "0.03em",
  },

  // Inner card
  innerCard: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "16px", padding: "1rem",
    boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
  },

  // Timeline
  stageCircle: {
    flexShrink: 0,
    width: "30px", height: "30px", borderRadius: "50%",
    background: "linear-gradient(135deg, #b91c1c, #7f1d1d)",
    boxShadow: "0 2px 10px rgba(185,28,28,0.45)",
    display: "flex", alignItems: "center", justifyContent: "center",
    marginTop: "10px", zIndex: 1,
  },
  connector: {
    width: "2px", flex: 1, minHeight: "12px",
    background: "rgba(185,28,28,0.30)",
    marginTop: "2px", marginBottom: "-2px",
  },
  stageCard: {
    flex: 1, marginLeft: "10px", borderRadius: "12px",
    padding: "clamp(0.5rem, 3vw, 0.75rem) clamp(0.75rem, 3.5vw, 1rem)",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)",
    boxSizing: "border-box", position: "relative", overflow: "hidden",
  },
  stageAccent: {
    position: "absolute", left: 0, top: 0,
    width: "3px", height: "100%",
    background: "linear-gradient(180deg, #b91c1c, #7f1d1d)",
    borderRadius: "3px 0 0 3px",
  },
  stageName: {
    fontWeight: "700", fontSize: "clamp(12px, 3.5vw, 14px)",
    lineHeight: 1.3, color: "#fff",
    fontFamily: "Georgia, serif", margin: "0 0 3px",
    letterSpacing: "0.01em",
  },
  stageData: {
    fontSize: "clamp(10px, 3vw, 12px)", margin: "4px 0 2px",
    color: "rgba(255,200,200,0.65)", fontFamily: "Georgia, serif",
    fontStyle: "italic", lineHeight: 1.5,
  },
  stageTime: {
    fontSize: "clamp(10px, 2.8vw, 11px)", margin: "3px 0 0",
    color: "rgba(255,180,180,0.45)", fontFamily: "Georgia, serif",
  },

  footer: {
    textAlign: "center", marginTop: "1.1rem", marginBottom: 0,
    fontSize: "11px", color: "rgba(255,180,180,0.35)",
    fontFamily: "Georgia, serif", letterSpacing: "0.04em",
  },
}

export default VerifyProduct