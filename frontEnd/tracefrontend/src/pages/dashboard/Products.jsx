import { useEffect, useState } from "react"
import api from "../../services/api"
import ProductCard from "../../components/ProductCard"

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={S.page}>

      {/* Ambient blobs */}
      <div style={S.blob1} /><div style={S.blob2} />
      <div style={S.blob3} /><div style={S.blob4} />

      {/* Top bar */}
      <div style={S.topbar}>
        <svg width="18" height="16" viewBox="0 0 20 18" fill="none">
          <rect width="20" height="3" rx="1.5" fill="rgba(255,200,200,0.85)"/>
          <rect y="7" width="15" height="3" rx="1.5" fill="rgba(255,200,200,0.85)"/>
          <rect y="14" width="10" height="3" rx="1.5" fill="rgba(255,200,200,0.85)"/>
        </svg>
        <span style={S.topbarText}>
          Products count:&nbsp;
          <span style={S.topbarCount}>{products.length}</span>
        </span>
      </div>

      {/* Main panel */}
      <div style={S.panel}>
        <div style={S.panelHeader}>
          <div style={S.panelTitleRow}>
            <div style={S.titleIcon}>
              <BoxIcon />
            </div>
            <h1 style={S.title}>Products</h1>
          </div>
          {!loading && products.length > 0 && (
            <span style={S.countBadge}>{products.length} items</span>
          )}
        </div>

        {/* Skeleton */}
        {loading && (
          <div style={S.grid}>
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Cards */}
        {!loading && products.length > 0 && (
          <div style={S.grid}>
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && products.length === 0 && (
          <div style={S.empty}>
            <div style={S.emptyIcon}><EmptyIcon /></div>
            <p style={S.emptyText}>No products found.</p>
            <p style={S.emptyHint}>Create a product from the dashboard to get started.</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes skpulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .sk { animation: skpulse 1.5s ease-in-out infinite; }
      `}</style>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div style={S.skCard}>
      <div style={S.skImg} className="sk" />
      <div style={S.skLines}>
        <div style={{ ...S.skLine, width: "62%" }} className="sk" />
        <div style={{ ...S.skLine, width: "40%" }} className="sk" />
      </div>
      <div style={S.skBtn} className="sk" />
    </div>
  )
}

function BoxIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="rgba(255,200,200,0.85)" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  )
}

function EmptyIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
      stroke="rgba(255,180,180,0.4)" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  )
}

const S = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(155deg, #1a0a0a 0%, #3b0d0d 35%, #7f1d1d 65%, #991b1b 100%)",
    padding: "clamp(1.25rem, 4vw, 2rem) clamp(1rem, 3vw, 1.5rem)",
    fontFamily: "Georgia, 'Times New Roman', serif",
    position: "relative",
    boxSizing: "border-box",
    overflow: "hidden",
  },

  blob1: { pointerEvents:"none", position:"absolute", top:"4%", left:"4%", width:"38%", height:"38%", background:"radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(20px)" },
  blob2: { pointerEvents:"none", position:"absolute", top:"8%", right:"6%", width:"28%", height:"28%", background:"radial-gradient(circle, rgba(239,68,68,0.22) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(22px)" },
  blob3: { pointerEvents:"none", position:"absolute", bottom:"12%", left:"8%", width:"32%", height:"32%", background:"radial-gradient(circle, rgba(180,30,30,0.18) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(22px)" },
  blob4: { pointerEvents:"none", position:"absolute", bottom:"10%", right:"4%", width:"30%", height:"30%", background:"radial-gradient(circle, rgba(255,180,180,0.12) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(20px)" },

  topbar: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "clamp(1rem, 3vw, 1.5rem)",
    position: "relative",
    zIndex: 1,
  },

  topbarText: {
    fontSize: "clamp(13px, 2vw, 15px)",
    fontWeight: "500",
    color: "rgba(255,210,210,0.75)",
    fontFamily: "Georgia, serif",
    letterSpacing: "0.01em",
  },

  topbarCount: {
    color: "#fff",
    fontWeight: "700",
  },

  panel: {
    background: "rgba(120,20,20,0.28)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: "20px",
    padding: "clamp(1.25rem, 3vw, 2rem)",
    position: "relative",
    zIndex: 1,
    boxShadow: "0 8px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.10)",
  },

  panelHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "clamp(1rem, 3vw, 1.5rem)",
    paddingBottom: "1rem",
    borderBottom: "1px solid rgba(255,255,255,0.10)",
  },

  panelTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  titleIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    background: "rgba(185,28,28,0.45)",
    border: "1px solid rgba(255,200,200,0.18)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  title: {
    fontSize: "clamp(1.3rem, 3.5vw, 1.75rem)",
    fontWeight: "700",
    color: "#fff",
    margin: 0,
    fontFamily: "Georgia, serif",
    letterSpacing: "0.01em",
  },

  countBadge: {
    display: "inline-flex",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    background: "rgba(185,28,28,0.40)",
    border: "1px solid rgba(255,180,180,0.2)",
    color: "rgba(255,210,210,0.9)",
    fontFamily: "Georgia, serif",
    letterSpacing: "0.02em",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
    gap: "clamp(0.75rem, 2vw, 1.25rem)",
  },

  // Skeleton
  skCard: {
    borderRadius: "14px",
    padding: "1.1rem",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.10)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  skImg: {
    width: "56px",
    height: "56px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.14)",
  },

  skLines: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1,
  },

  skLine: {
    height: "10px",
    borderRadius: "5px",
    background: "rgba(255,255,255,0.10)",
  },

  skBtn: {
    height: "34px",
    borderRadius: "10px",
    background: "rgba(185,28,28,0.25)",
  },

  // Empty state
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "3.5rem 1rem",
    gap: "10px",
  },

  emptyIcon: {
    marginBottom: "4px",
    opacity: 0.6,
  },

  emptyText: {
    fontSize: "16px",
    fontWeight: "600",
    color: "rgba(255,210,210,0.7)",
    margin: 0,
    fontFamily: "Georgia, serif",
  },

  emptyHint: {
    fontSize: "13px",
    color: "rgba(255,180,180,0.45)",
    margin: 0,
    fontFamily: "Georgia, serif",
    textAlign: "center",
  },
}

export default Products