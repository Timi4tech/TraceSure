import { useEffect, useState } from "react"
import api from "../../services/api"
import StageCard from "../../components/StageCard"

function ProductStages() {
  const [stages, setStages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/stages")
      .then(res => setStages(res.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={S.page}>

      {/* Ambient blobs */}
      <div style={S.blob1} /><div style={S.blob2} />
      <div style={S.blob3} /><div style={S.blob4} />

      {/* Page title */}
      <div style={S.titleRow}>
        <div style={S.titleIcon}><GearStackIcon /></div>
        <h1 style={S.title}>Production Stages</h1>
      </div>

      {/* Main panel */}
      <div style={S.panel}>

        {/* Top bar */}
        <div style={S.topbar}>
          <div style={S.topbarIconWrap}>
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="2"   width="16" height="3" rx="1.5" fill="rgba(255,200,200,0.8)"/>
              <rect x="1" y="7.5" width="12" height="3" rx="1.5" fill="rgba(255,200,200,0.8)"/>
              <rect x="1" y="13"  width="8"  height="3" rx="1.5" fill="rgba(255,200,200,0.8)"/>
            </svg>
          </div>
          <span style={S.topbarText}>
            Stages count:&nbsp;
            <span style={S.topbarCount}>{stages.length}</span>
          </span>
          {!loading && stages.length > 0 && (
            <span style={S.countBadge}>{stages.length} items</span>
          )}
        </div>

        {/* Skeleton */}
        {loading && (
          <div style={S.grid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Stage cards */}
        {!loading && stages.length > 0 && (
          <div style={S.grid}>
            {stages.map(stage => (
             <StageCard
  key={stage._id}
  stage={stage}
  onDeleted={(id) => setStages(prev => prev.filter(s => s._id !== id))}
/>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && stages.length === 0 && (
          <div style={S.empty}>
            <div style={S.emptyIcon}><EmptyIcon /></div>
            <p style={S.emptyTitle}>No stages found.</p>
            <p style={S.emptySub}>Add a production stage from the dashboard to get started.</p>
          </div>
        )}

      </div>

      <style>{`
        @keyframes sk { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .sk { animation: sk 1.5s ease-in-out infinite; }
      `}</style>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div style={S.skCard}>
      <div style={{ display:"flex", gap:"14px", marginBottom:"12px" }}>
        <div style={S.skImg} className="sk" />
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:"8px" }}>
          <div style={{ ...S.skLine, width:"60%" }} className="sk" />
          <div style={{ ...S.skLine, width:"45%" }} className="sk" />
        </div>
      </div>
      <div style={S.skBtn} className="sk" />
    </div>
  )
}

function GearStackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="rgba(255,200,200,0.85)" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  )
}

function EmptyIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
      stroke="rgba(255,180,180,0.4)" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  )
}

const S = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(155deg, #1a0a0a 0%, #3b0d0d 35%, #7f1d1d 65%, #991b1b 100%)",
    padding: "clamp(1.5rem, 4vw, 2.5rem) clamp(1rem, 3vw, 1.5rem)",
    fontFamily: "Georgia, 'Times New Roman', serif",
    position: "relative",
    overflow: "hidden",
    boxSizing: "border-box",
  },

  blob1: { pointerEvents:"none", position:"absolute", top:"4%", left:"4%", width:"38%", height:"38%", background:"radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(20px)" },
  blob2: { pointerEvents:"none", position:"absolute", top:"8%", right:"6%", width:"28%", height:"28%", background:"radial-gradient(circle, rgba(239,68,68,0.22) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(22px)" },
  blob3: { pointerEvents:"none", position:"absolute", bottom:"12%", left:"8%", width:"32%", height:"32%", background:"radial-gradient(circle, rgba(180,30,30,0.18) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(22px)" },
  blob4: { pointerEvents:"none", position:"absolute", bottom:"10%", right:"4%", width:"30%", height:"30%", background:"radial-gradient(circle, rgba(255,180,180,0.12) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(20px)" },

  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "clamp(1.25rem, 3vw, 2rem)",
    position: "relative",
    zIndex: 1,
  },

  titleIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "11px",
    background: "rgba(185,28,28,0.45)",
    border: "1px solid rgba(255,200,200,0.18)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  title: {
    textAlign: "center",
    fontSize: "clamp(1.5rem, 4vw, 2.1rem)",
    fontWeight: "700",
    color: "#fff",
    margin: 0,
    fontFamily: "Georgia, serif",
    letterSpacing: "0.01em",
  },

  panel: {
    background: "rgba(120,20,20,0.28)",
    backdropFilter: "blur(22px)",
    WebkitBackdropFilter: "blur(22px)",
    border: "1px solid rgba(255,255,255,0.13)",
    borderRadius: "22px",
    padding: "clamp(1.25rem, 3vw, 1.75rem)",
    position: "relative",
    zIndex: 1,
    boxShadow: "0 8px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.09)",
  },

  topbar: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "clamp(1rem, 2.5vw, 1.5rem)",
    paddingBottom: "clamp(0.75rem, 2vw, 1rem)",
    borderBottom: "1px solid rgba(255,255,255,0.09)",
  },

  topbarIconWrap: {
    width: "34px",
    height: "34px",
    borderRadius: "8px",
    background: "rgba(185,28,28,0.40)",
    border: "1px solid rgba(255,200,200,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  topbarText: {
    fontSize: "clamp(13px, 2vw, 15px)",
    fontWeight: "600",
    color: "rgba(255,210,210,0.75)",
    fontFamily: "Georgia, serif",
    flex: 1,
  },

  topbarCount: {
    color: "#fff",
    fontWeight: "700",
  },

  countBadge: {
    display: "inline-flex",
    padding: "3px 12px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "600",
    background: "rgba(185,28,28,0.40)",
    border: "1px solid rgba(255,180,180,0.2)",
    color: "rgba(255,210,210,0.9)",
    fontFamily: "Georgia, serif",
    letterSpacing: "0.02em",
    flexShrink: 0,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
    gap: "clamp(0.75rem, 2vw, 1.1rem)",
  },

  // Skeleton
  skCard: {
    borderRadius: "14px",
    padding: "1.1rem",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.09)",
  },

  skImg: {
    width: "76px",
    height: "76px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.12)",
    flexShrink: 0,
  },

  skLine: {
    height: "11px",
    borderRadius: "5px",
    background: "rgba(255,255,255,0.09)",
  },

  skBtn: {
    height: "34px",
    width: "110px",
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
    gap: "8px",
    textAlign: "center",
  },

  emptyIcon: {
    marginBottom: "6px",
    opacity: 0.7,
  },

  emptyTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "rgba(255,210,210,0.75)",
    margin: 0,
    fontFamily: "Georgia, serif",
  },

  emptySub: {
    fontSize: "13px",
    color: "rgba(255,180,180,0.45)",
    margin: 0,
    fontFamily: "Georgia, serif",
  },
}

export default ProductStages