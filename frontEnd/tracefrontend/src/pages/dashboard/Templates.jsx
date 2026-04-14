import { useEffect, useState } from "react"
import api from "../../services/api"

function Templates() {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/templates")
      .then((res) => setTemplates(res.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={S.page}>

      {/* Ambient blobs */}
      <div style={S.blob1} /><div style={S.blob2} />
      <div style={S.blob3} /><div style={S.blob4} />

      <div style={S.inner}>

        {/* Header */}
        <div style={S.headerRow}>
          <div style={S.titleIcon}><GridIcon /></div>
          <h1 style={S.title}>Manufacturing Templates</h1>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div style={S.cardList}>
            {[1, 2].map((n) => (
              <div key={n} style={S.card}>
                <div style={S.skTitle} className="sk" />
                {[55, 40, 48, 38].map((w, i) => (
                  <div key={i} style={{ ...S.skRow, width: `${w}%` }} className="sk" />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Template cards */}
        {!loading && templates.length > 0 && (
          <div style={S.cardList}>
            {templates.map((template) => (
              <TemplateCard key={template._id} template={template} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && templates.length === 0 && (
          <div style={{ ...S.card, ...S.emptyCard }}>
            <div style={S.emptyIcon}><EmptyIcon /></div>
            <p style={S.emptyTitle}>No templates found.</p>
            <p style={S.emptySub}>Create your first manufacturing template to get started.</p>
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

function TemplateCard({ template }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        ...S.card,
        ...(hovered ? S.cardHover : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card accent bar */}
      <div style={S.cardAccent} />

      {/* Card header */}
      <div style={S.cardHeader}>
        <div style={S.cardIconWrap}><TemplateIcon /></div>
        <div>
          <h2 style={S.cardTitle}>{template.name}</h2>
          <span style={S.cardMeta}>
            {template.stages?.length ?? 0} stage{template.stages?.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div style={S.cardDivider} />

      {/* Stages */}
      <ul style={S.stageList}>
        {template.stages?.map((stage, i) => (
          <li key={i} style={S.stageItem}>
            <span style={S.stageBadge}>{i + 1}</span>
            <span style={S.stageLabel}>{stage}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="rgba(255,200,200,0.85)" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  )
}

function TemplateIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="rgba(255,200,200,0.75)" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="8" y1="13" x2="16" y2="13"/>
      <line x1="8" y1="17" x2="13" y2="17"/>
    </svg>
  )
}

function EmptyIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
      stroke="rgba(255,180,180,0.4)" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  )
}

const S = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background: "linear-gradient(155deg, #1a0a0a 0%, #3b0d0d 35%, #7f1d1d 65%, #991b1b 100%)",
    padding: "clamp(2rem, 5vw, 3.5rem) clamp(1.25rem, 5vw, 2.5rem)",
    boxSizing: "border-box",
    fontFamily: "Georgia, 'Times New Roman', serif",
    position: "relative",
    overflow: "hidden",
  },

  blob1: { pointerEvents:"none", position:"absolute", top:"4%", left:"4%", width:"38%", height:"38%", background:"radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(20px)" },
  blob2: { pointerEvents:"none", position:"absolute", top:"8%", right:"6%", width:"28%", height:"28%", background:"radial-gradient(circle, rgba(239,68,68,0.22) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(22px)" },
  blob3: { pointerEvents:"none", position:"absolute", bottom:"12%", left:"8%", width:"32%", height:"32%", background:"radial-gradient(circle, rgba(180,30,30,0.18) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(22px)" },
  blob4: { pointerEvents:"none", position:"absolute", bottom:"10%", right:"4%", width:"30%", height:"30%", background:"radial-gradient(circle, rgba(255,180,180,0.12) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(20px)" },

  inner: {
    position: "relative",
    zIndex: 1,
    maxWidth: "680px",
  },

  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "clamp(1.5rem, 4vw, 2.5rem)",
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
    fontSize: "clamp(1.4rem, 4vw, 1.9rem)",
    fontWeight: "700",
    color: "#fff",
    margin: 0,
    fontFamily: "Georgia, serif",
    letterSpacing: "0.01em",
  },

  cardList: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(1rem, 3vw, 1.4rem)",
  },

  card: {
    background: "rgba(120,20,20,0.28)",
    backdropFilter: "blur(22px)",
    WebkitBackdropFilter: "blur(22px)",
    border: "1px solid rgba(255,255,255,0.13)",
    borderRadius: "18px",
    padding: "clamp(1.25rem, 4vw, 1.75rem) clamp(1.25rem, 4vw, 2rem)",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 4px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.08)",
    transition: "border-color 0.18s, box-shadow 0.18s",
  },

  cardHover: {
    borderColor: "rgba(255,200,200,0.22)",
    boxShadow: "0 6px 32px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.10)",
  },

  cardAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "3px",
    height: "100%",
    background: "linear-gradient(180deg, #b91c1c, #7f1d1d)",
    borderRadius: "3px 0 0 3px",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "1rem",
  },

  cardIconWrap: {
    width: "38px",
    height: "38px",
    borderRadius: "10px",
    background: "rgba(185,28,28,0.40)",
    border: "1px solid rgba(255,200,200,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  cardTitle: {
    fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
    fontWeight: "700",
    color: "#fff",
    margin: "0 0 3px",
    fontFamily: "Georgia, serif",
    letterSpacing: "0.01em",
  },

  cardMeta: {
    fontSize: "12px",
    color: "rgba(255,200,200,0.55)",
    fontFamily: "Georgia, serif",
  },

  cardDivider: {
    height: "1px",
    background: "rgba(255,255,255,0.09)",
    marginBottom: "1rem",
  },

  stageList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  },

  stageItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  stageBadge: {
    flexShrink: 0,
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    background: "rgba(185,28,28,0.50)",
    border: "1px solid rgba(255,180,180,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: "600",
    color: "rgba(255,210,210,0.9)",
    fontFamily: "Georgia, serif",
  },

  stageLabel: {
    fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
    color: "rgba(255,220,220,0.82)",
    fontFamily: "Georgia, serif",
    lineHeight: "1.5",
  },

  // Skeleton
  skTitle: {
    height: "13px",
    background: "rgba(255,255,255,0.12)",
    borderRadius: "6px",
    width: "38%",
    marginBottom: "1.1rem",
  },

  skRow: {
    height: "10px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "6px",
    marginBottom: "0.65rem",
  },

  // Empty state
  emptyCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "3rem 1.5rem",
    gap: "8px",
  },

  emptyIcon: {
    marginBottom: "8px",
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

export default Templates