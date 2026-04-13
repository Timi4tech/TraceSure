function StageCard({ stage }) {
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

      {/* Header row */}
      <div style={S.headerRow}>
        <div style={S.iconTile}>
          <GearIcon />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={S.stageName}>{stage.stageName}</h2>
          <span style={S.timestamp}>{formatDate(stage.timestamp)}</span>
        </div>
        <span style={S.badge}>Stage</span>
      </div>

      {/* Divider */}
      {stage.data && <div style={S.divider} />}

      {/* Data */}
      {stage.data && (
        <p style={S.data}>{stage.data}</p>

      )}
      
    </div>
  )
}

function formatDate(ts) {
  if (!ts) return ""
  try {
    return new Date(ts).toLocaleString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    })
  } catch {
    return ts
  }
}

function GearIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="rgba(255,200,200,0.8)" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  )
}

const S = {
  card: {
    background: "rgba(120,20,20,0.28)",
    backdropFilter: "blur(22px)",
    WebkitBackdropFilter: "blur(22px)",
    border: "1px solid rgba(255,255,255,0.13)",
    borderRadius: "16px",
    padding: "1.1rem 1.1rem 1.1rem 1.25rem",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 4px 24px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.08)",
    transition: "border-color 0.18s, box-shadow 0.18s",
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

  headerRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
  },

  iconTile: {
    width: "34px",
    height: "34px",
    borderRadius: "8px",
    background: "rgba(185,28,28,0.42)",
    border: "1px solid rgba(255,200,200,0.16)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: "1px",
  },

  stageName: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#fff",
    margin: "0 0 3px",
    fontFamily: "Georgia, serif",
    letterSpacing: "0.01em",
    lineHeight: 1.3,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  timestamp: {
    fontSize: "11px",
    color: "rgba(255,200,200,0.50)",
    fontFamily: "Georgia, serif",
    display: "block",
    letterSpacing: "0.01em",
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "3px 10px",
    borderRadius: "100px",
    fontSize: "10px",
    fontWeight: "600",
    background: "rgba(185,28,28,0.40)",
    border: "1px solid rgba(255,180,180,0.18)",
    color: "rgba(255,210,210,0.88)",
    fontFamily: "Georgia, serif",
    letterSpacing: "0.03em",
    flexShrink: 0,
    marginTop: "2px",
  },

  divider: {
    height: "1px",
    background: "rgba(255,255,255,0.08)",
    margin: "10px 0",
  },

  data: {
    fontSize: "13px",
    color: "rgba(255,210,210,0.72)",
    fontFamily: "Georgia, serif",
    lineHeight: "1.6",
    margin: 0,
  },
}

export default StageCard