import { useState } from "react"
import api from "../../services/api"

const S = {
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    width: "100%",
    padding: "3rem 1.25rem",
    fontFamily: "Georgia, 'Times New Roman', serif",
    background: "linear-gradient(155deg, #1a0a0a 0%, #3b0d0d 35%, #7f1d1d 65%, #991b1b 100%)",
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",
  },
  blob1: { pointerEvents:"none", position:"absolute", top:"4%", left:"4%", width:"38%", height:"38%", background:"radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(20px)" },
  blob2: { pointerEvents:"none", position:"absolute", top:"8%", right:"6%", width:"28%", height:"28%", background:"radial-gradient(circle, rgba(239,68,68,0.22) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(22px)" },
  blob3: { pointerEvents:"none", position:"absolute", bottom:"12%", left:"8%", width:"32%", height:"32%", background:"radial-gradient(circle, rgba(180,30,30,0.18) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(22px)" },
  blob4: { pointerEvents:"none", position:"absolute", bottom:"10%", right:"4%", width:"30%", height:"30%", background:"radial-gradient(circle, rgba(255,180,180,0.12) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(20px)" },

  outerCard: {
    position: "relative",
    zIndex: 10,
    width: "100%",
    maxWidth: "460px",
    borderRadius: "24px",
    padding: "2.5rem 2rem",
    background: "rgba(120,20,20,0.28)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(255,255,255,0.14)",
    boxShadow: "0 8px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
  },

  title: {
    fontSize: "26px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "1.75rem",
    color: "#fff",
    letterSpacing: "0.01em",
    fontFamily: "Georgia, serif",
  },

  innerCard: {
    borderRadius: "16px",
    padding: "1.5rem",
    background: "rgba(255,255,255,0.10)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.18)",
    boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
  },

  fieldGroup: { marginBottom: "1.25rem" },

  labelRow: { display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px" },

  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "rgba(255,235,235,0.92)",
    fontFamily: "Georgia, serif",
    letterSpacing: "0.02em",
  },

  inputWrap: { position: "relative" },

  iconLeft: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
  },

  input: {
    width: "100%",
    paddingLeft: "36px",
    paddingRight: "14px",
    paddingTop: "10px",
    paddingBottom: "10px",
    borderRadius: "10px",
    fontSize: "14px",
    outline: "none",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,200,200,0.22)",
    color: "#fff",
    fontFamily: "Georgia, serif",
    boxSizing: "border-box",
  },

  stageList: { display:"flex", flexDirection:"column", gap:"10px", marginBottom:"1rem" },

  stageRow: { display:"flex", alignItems:"center", gap:"10px" },

  stageBadge: {
    flexShrink: 0,
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "rgba(185,28,28,0.55)",
    border: "1px solid rgba(255,200,200,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "600",
    color: "rgba(255,220,220,0.95)",
    fontFamily: "Georgia, serif",
  },

  removeBtn: {
    flexShrink: 0,
    width: "28px",
    height: "28px",
    borderRadius: "8px",
    border: "1px solid rgba(255,150,150,0.2)",
    background: "rgba(255,80,80,0.12)",
    color: "rgba(255,180,180,0.8)",
    fontSize: "15px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
  },

  divider: {
    height: "1px",
    background: "rgba(255,255,255,0.1)",
    margin: "1.25rem 0",
  },

  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "0.25rem",
  },

  addBtn: {
    flex: 1,
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid rgba(255,200,200,0.25)",
    background: "rgba(255,255,255,0.10)",
    color: "rgba(255,230,230,0.9)",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "Georgia, serif",
    letterSpacing: "0.01em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
  },

  saveBtn: {
    flex: 2,
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #b91c1c, #7f1d1d)",
    boxShadow: "0 4px 20px rgba(185,28,28,0.45)",
    color: "#fff",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "Georgia, serif",
    letterSpacing: "0.02em",
  },
}

const ICON = "rgba(255,200,200,0.7)"
const ICON_SM = "rgba(255,200,200,0.45)"

function TemplateIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ICON} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  )
}

function StageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ICON} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  )
}

function InputIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ICON_SM} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="10" y2="18"/>
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  )
}

function CreateTemplate() {
  const [name, setName] = useState("")
  const [stages, setStages] = useState([""])
  const [addHover, setAddHover] = useState(false)
  const [saveHover, setSaveHover] = useState(false)

  const addStage = () => setStages([...stages, ""])

  const removeStage = (i) => {
    if (stages.length === 1) return
    setStages(stages.filter((_, idx) => idx !== i))
  }

  const handleSubmit = async () => {
    await api.post("/templates", { name, stages })
    alert("Template created")
  }

  return (
    <div style={S.page}>
      <div style={S.blob1} /><div style={S.blob2} />
      <div style={S.blob3} /><div style={S.blob4} />

      <div style={S.outerCard}>
        <h1 style={S.title}>Create Manufacturing Template</h1>

        <div style={S.innerCard}>

          {/* Template name */}
          <div style={S.fieldGroup}>
            <div style={S.labelRow}>
              <TemplateIcon />
              <label style={S.label}>Template Name</label>
            </div>
            <div style={S.inputWrap}>
              <span style={S.iconLeft}><InputIcon /></span>
              <input
                type="text"
                placeholder="Enter template name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={S.input}
              />
            </div>
          </div>

          {/* Stages */}
          <div style={S.fieldGroup}>
            <div style={S.labelRow}>
              <StageIcon />
              <label style={S.label}>Production Stages</label>
            </div>

            <div style={S.stageList}>
              {stages.map((stage, i) => (
                <div key={i} style={S.stageRow}>
                  <div style={S.stageBadge}>{i + 1}</div>
                  <div style={{ ...S.inputWrap, flex: 1 }}>
                    <span style={S.iconLeft}><InputIcon /></span>
                    <input
                      type="text"
                      placeholder={`Stage ${i + 1} name`}
                      value={stage}
                      onChange={(e) => {
                        const updated = [...stages]
                        updated[i] = e.target.value
                        setStages(updated)
                      }}
                      style={S.input}
                    />
                  </div>
                  <button
                    onClick={() => removeStage(i)}
                    style={S.removeBtn}
                    title="Remove stage"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={S.divider} />

          {/* Buttons */}
          <div style={S.buttonRow}>
            <button
              onClick={addStage}
              onMouseEnter={() => setAddHover(true)}
              onMouseLeave={() => setAddHover(false)}
              style={{
                ...S.addBtn,
                background: addHover ? "rgba(255,255,255,0.16)" : S.addBtn.background,
              }}
            >
              <PlusIcon /> Add Stage
            </button>

            <button
              onClick={handleSubmit}
              onMouseEnter={() => setSaveHover(true)}
              onMouseLeave={() => setSaveHover(false)}
              style={{
                ...S.saveBtn,
                opacity: saveHover ? 0.88 : 1,
                transform: saveHover ? "scale(0.99)" : "scale(1)",
              }}
            >
              Save Template
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CreateTemplate