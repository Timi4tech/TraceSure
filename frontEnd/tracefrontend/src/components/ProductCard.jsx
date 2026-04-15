import { useRef } from "react"
import { QRCodeSVG } from "qrcode.react"

function ProductCard({ product }) {
  const qrRef = useRef(null)

  const downloadQR = () => {
    const svg = qrRef.current?.querySelector("svg")
    if (!svg) return

    // Clone and add white background for clean download
    const clone = svg.cloneNode(true)
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg")

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    rect.setAttribute("width", "100%")
    rect.setAttribute("height", "100%")
    rect.setAttribute("fill", "white")
    clone.insertBefore(rect, clone.firstChild)

    const blob = new Blob([clone.outerHTML], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `${product.name}-qr.svg`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div
      style={S.card}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(255,200,200,0.28)"
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)"
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.13)"
        e.currentTarget.style.boxShadow = S.card.boxShadow
      }}
    >
      {/* Accent bar */}
      <div style={S.accentBar} />

      {/* QR code */}
      <div style={S.qrWrap} ref={qrRef}>
        <div style={S.qrInner}>
          <QRCodeSVG
            value={`${import.meta.env.VITE_APP_URL}/stages/verify/${product._id}`}
            size={120}
            bgColor="transparent"
            fgColor="#7f1d1d"
          />
        </div>
      </div>

      {/* Product name */}
      <h2 style={S.name}>{product.name}</h2>

      {/* Batch badge */}
      <span style={S.badge}>Batch: {product.batchNumber}</span>

      {/* Download button */}
      <button
        onClick={downloadQR}
        style={S.downloadBtn}
        onMouseEnter={e => {
          e.currentTarget.style.background = "linear-gradient(135deg, #b91c1c, #7f1d1d)"
          e.currentTarget.style.color = "#fff"
          e.currentTarget.style.borderColor = "transparent"
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "rgba(185,28,28,0.18)"
          e.currentTarget.style.color = "rgba(255,210,210,0.85)"
          e.currentTarget.style.borderColor = "rgba(255,180,180,0.2)"
        }}
      >
        <DownloadIcon />
        Download QR
      </button>

    </div>
  )
}

function DownloadIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}

const S = {
  card: {
    background: "rgba(120,20,20,0.28)",
    backdropFilter: "blur(22px)",
    WebkitBackdropFilter: "blur(22px)",
    border: "1px solid rgba(255,255,255,0.13)",
    borderRadius: "18px",
    padding: "1.5rem 1.25rem 1.25rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "12px",
    width: "100%",
    maxWidth: "220px",
    margin: "0 auto",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 4px 24px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.08)",
    transition: "border-color 0.18s, box-shadow 0.18s",
    cursor: "default",
    fontFamily: "Georgia, 'Times New Roman', serif",
    boxSizing: "border-box",
  },

  accentBar: {
    position: "absolute",
    left: 0, top: 0,
    width: "3px", height: "100%",
    background: "linear-gradient(180deg, #b91c1c, #7f1d1d)",
    borderRadius: "3px 0 0 3px",
  },

  qrWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: "4px",
  },

  qrInner: {
    background: "rgba(255,255,255,0.92)",
    borderRadius: "14px",
    padding: "14px",
    border: "1px solid rgba(255,200,200,0.22)",
    boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },

  name: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#fff",
    lineHeight: "1.35",
    margin: 0,
    fontFamily: "Georgia, serif",
    letterSpacing: "0.01em",
  },

  badge: {
    display: "inline-block",
    background: "rgba(185,28,28,0.40)",
    border: "1px solid rgba(255,180,180,0.2)",
    color: "rgba(255,210,210,0.92)",
    fontSize: "11px",
    fontWeight: "600",
    padding: "4px 12px",
    borderRadius: "100px",
    fontFamily: "Georgia, serif",
    letterSpacing: "0.03em",
  },

  downloadBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    width: "100%",
    padding: "8px 12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,180,180,0.2)",
    background: "rgba(185,28,28,0.18)",
    color: "rgba(255,210,210,0.85)",
    fontSize: "12px",
    fontWeight: "600",
    fontFamily: "Georgia, serif",
    letterSpacing: "0.02em",
    cursor: "pointer",
    transition: "background 0.15s, color 0.15s, border-color 0.15s",
  },
}

export default ProductCard