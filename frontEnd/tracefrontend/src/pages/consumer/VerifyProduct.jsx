import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../../services/api"

function VerifyProduct() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.get(`/stages/verify/${id}`)
      .then((res) => {
        // Handle both { data: ... } and direct response shapes
        const data = res.data ?? res
        setProduct(data)
      })
      .catch((err) => {
        console.error("VerifyProduct error:", err)
        setError("Could not load product details.")
      })
  }, [id])

  const gradientBg = "linear-gradient(135deg, #3a8be8 0%, #6a3de0 30%, #9b3dd8 55%, #c060d0 75%, #e090d8 100%)"

  // Loading
  if (!product && !error) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: gradientBg,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44, height: 44,
              borderRadius: "50%",
              border: "4px solid rgba(255,255,255,0.3)",
              borderTopColor: "#fff",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>
            Verifying product…
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    )
  }

  // Error
  if (error) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: gradientBg,
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: 20,
            padding: "2rem 1.5rem",
            textAlign: "center",
            maxWidth: 320,
            width: "100%",
          }}
        >
          <p style={{ color: "#fff", fontSize: 15, fontFamily: "'DM Sans', sans-serif" }}>{error}</p>
        </div>
      </div>
    )
  }

  // Safe fallback for stages
  const stages = Array.isArray(product?.stages) ? product.stages : []

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        padding: "clamp(1.5rem, 5vw, 3rem) clamp(1rem, 4vw, 1.25rem)",
        background: gradientBg,
        boxSizing: "border-box",
      }}
    >
      {/* Ambient blobs */}
      {[
        { top:"4%", left:"4%", width:"38%", height:"38%", color:"rgba(255,255,255,0.22)" },
        { top:"8%", right:"6%", width:"28%", height:"28%", color:"rgba(220,160,255,0.28)" },
        { bottom:"12%", left:"8%", width:"32%", height:"32%", color:"rgba(100,160,255,0.22)" },
        { bottom:"10%", right:"4%", width:"30%", height:"30%", color:"rgba(230,130,255,0.25)" },
      ].map((b, i) => (
        <div key={i} style={{
          pointerEvents: "none",
          position: "absolute",
          ...b,
          background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
          borderRadius: "50%",
          filter: "blur(18px)",
        }} />
      ))}

      {/* Outer glass card */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: 420,
          borderRadius: 24,
          padding: "clamp(1.25rem, 5vw, 2.5rem) clamp(1rem, 5vw, 2rem)",
          background: "rgba(180,170,230,0.22)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          border: "1px solid rgba(255,255,255,0.25)",
          boxShadow: "0 8px 48px rgba(60,20,180,0.18), inset 0 1px 0 rgba(255,255,255,0.2)",
          boxSizing: "border-box",
        }}
      >
        {/* Product name */}
        <h1
          style={{
            fontSize: "clamp(18px, 5vw, 26px)",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 4,
            color: "#2d3561",
            fontFamily: "'Sora', sans-serif",
          }}
        >
          {product.productName ?? "Unknown Product"}
        </h1>

        {/* Manufacturer */}
        <p
          style={{
            textAlign: "center",
            fontSize: "clamp(12px, 3.5vw, 14px)",
            marginBottom: 24,
            color: "#6b728e",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Manufactured by{" "}
          <span style={{ fontWeight: 700, color: "#2d3561" }}>
            {product.company ?? "Unknown"}
          </span>
        </p>

        {/* Timeline */}
        {stages.length === 0 ? (
          <p style={{
            textAlign: "center",
            color: "#9a9fc0",
            fontSize: 13,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            No production stages recorded.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {stages.map((stage, index) => (
              <div key={stage.id ?? index} style={{ display: "flex", alignItems: "stretch", gap: 0 }}>

                {/* Icon + line */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 0 }}>
                  <div
                    style={{
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      zIndex: 10,
                      width: 34,
                      height: 34,
                      background: "linear-gradient(135deg, #2ecc8f, #1aaa6a)",
                      boxShadow: "0 2px 10px rgba(30,180,100,0.35)",
                      marginTop: 12,
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                      <polyline points="3,8 6.5,12 13,4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {index < stages.length - 1 && (
                    <div style={{
                      width: 2,
                      flex: 1,
                      minHeight: 14,
                      background: "rgba(46,204,143,0.35)",
                      marginTop: 2,
                      marginBottom: -2,
                    }} />
                  )}
                </div>

                {/* Stage card */}
                <div
                  style={{
                    flex: 1,
                    marginLeft: 12,
                    borderRadius: 16,
                    padding: "clamp(0.6rem, 3vw, 0.875rem) clamp(0.75rem, 3.5vw, 1.25rem)",
                    background: "rgba(255,255,255,0.38)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.55)",
                    boxShadow: "0 2px 12px rgba(60,20,160,0.07)",
                    boxSizing: "border-box",
                  }}
                >
                  <h2
                    style={{
                      fontWeight: 700,
                      fontSize: "clamp(12px, 3.5vw, 14px)",
                      lineHeight: 1.3,
                      color: "#2d3561",
                      fontFamily: "'Sora', sans-serif",
                      margin: 0,
                    }}
                  >
                    {stage.stageName ?? "Unnamed Stage"}
                  </h2>
                  <p
                    style={{
                      fontSize: "clamp(10px, 3vw, 12px)",
                      marginTop: 3,
                      color: "#7a82a0",
                      fontFamily: "'DM Sans', sans-serif",
                      margin: "3px 0 0",
                    }}
                  >
                    {stage.timestamp ?? ""}
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default VerifyProduct