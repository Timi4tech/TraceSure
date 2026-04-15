import { useState, useEffect } from "react"
import api from "../../services/api"

const S = {
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    width: "100%",
    minHeight: "100%",
    padding: "0",
    fontFamily: "Georgia, 'Times New Roman', serif",
    background: "linear-gradient(155deg, #1a0a0a 0%, #3b0d0d 35%, #7f1d1d 65%, #991b1b 100%)",
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",
  },

  blob1: {
    pointerEvents: "none", position: "absolute",
    top: "4%", left: "4%", width: "38%", height: "38%",
    background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
    borderRadius: "50%", filter: "blur(20px)",
  },
  blob2: {
    pointerEvents: "none", position: "absolute",
    top: "8%", right: "6%", width: "28%", height: "28%",
    background: "radial-gradient(circle, rgba(239,68,68,0.18) 0%, transparent 70%)",
    borderRadius: "50%", filter: "blur(22px)",
  },
  blob3: {
    pointerEvents: "none", position: "absolute",
    bottom: "12%", left: "8%", width: "32%", height: "32%",
    background: "radial-gradient(circle, rgba(180,30,30,0.15) 0%, transparent 70%)",
    borderRadius: "50%", filter: "blur(22px)",
  },
  blob4: {
    pointerEvents: "none", position: "absolute",
    bottom: "10%", right: "4%", width: "30%", height: "30%",
    background: "radial-gradient(circle, rgba(255,180,180,0.08) 0%, transparent 70%)",
    borderRadius: "50%", filter: "blur(20px)",
  },

  outerCard: {
    position: "relative",
    zIndex: 10,
    width: "100%",
    flex: 1,
    padding: "clamp(1rem, 4vw, 1.5rem) clamp(0.875rem, 4vw, 1.25rem)",
    boxSizing: "border-box",
    background: "transparent",
  },

  title: {
    fontSize: "clamp(17px, 5vw, 22px)",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "1.25rem",
    color: "#fff",
    letterSpacing: "0.01em",
    fontFamily: "Georgia, serif",
  },

  innerCard: {
    borderRadius: "14px",
    padding: "clamp(0.875rem, 4vw, 1.25rem)",
    background: "rgba(80, 10, 10, 0.55)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.10)",
    boxShadow: "0 2px 16px rgba(0,0,0,0.30)",
    width: "100%",
    boxSizing: "border-box",
  },

  fieldGroup: {
    marginBottom: "1rem",
  },

  labelRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "6px",
  },

  label: {
    fontSize: "12px",
    fontWeight: "600",
    color: "rgba(255,220,220,0.90)",
    fontFamily: "Georgia, serif",
    letterSpacing: "0.02em",
  },

  inputWrap: {
    position: "relative",
    width: "100%",
    boxSizing: "border-box",
  },

  iconLeft: {
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    zIndex: 1,
  },

  input: {
    width: "100%",
    paddingLeft: "30px",
    paddingRight: "10px",
    paddingTop: "9px",
    paddingBottom: "9px",
    borderRadius: "9px",
    fontSize: "13px",
    outline: "none",
    background: "rgba(60, 8, 8, 0.70)",
    border: "1px solid rgba(200,80,80,0.30)",
    color: "#fff",
    fontFamily: "Georgia, serif",
    boxSizing: "border-box",
    display: "block",
    transition: "border-color 0.15s, background 0.15s",
  },

  select: {
    width: "100%",
    paddingLeft: "30px",
    paddingRight: "28px",
    paddingTop: "9px",
    paddingBottom: "9px",
    borderRadius: "9px",
    fontSize: "13px",
    outline: "none",
    appearance: "none",
    WebkitAppearance: "none",
    cursor: "pointer",
    background: "rgba(60, 8, 8, 0.70)",
    border: "1px solid rgba(200,80,80,0.30)",
    color: "#fff",
    fontFamily: "Georgia, serif",
    boxSizing: "border-box",
    display: "block",
  },

  chevron: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
  },

  submitBtn: {
    width: "100%",
    padding: "11px",
    borderRadius: "9px",
    border: "none",
    color: "#fff",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    marginTop: "0.375rem",
    fontFamily: "Georgia, serif",
    letterSpacing: "0.02em",
    background: "linear-gradient(135deg, #b91c1c, #7f1d1d)",
    boxShadow: "0 4px 20px rgba(185,28,28,0.45)",
    transition: "opacity 0.15s, transform 0.1s",
    display: "block",
    boxSizing: "border-box",
  },
}

const ICON_STROKE = "rgba(255,180,180,0.75)"
const ICON_STROKE_SM = "rgba(255,160,160,0.50)"

function LabelIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ICON_STROKE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ICON_STROKE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  )
}

function InputIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={ICON_STROKE_SM} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}

function ListIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={ICON_STROKE_SM} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={ICON_STROKE_SM} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

function Field({ label, icon, children }) {
  return (
    <div style={S.fieldGroup}>
      <div style={S.labelRow}>
        {icon}
        <label style={S.label}>{label}</label>
      </div>
      {children}
    </div>
  )
}

function CreateProduct() {
  const [name, setName] = useState("")
  const [templateId, setTemplate] = useState("")
  const [templates, setTemplates] = useState([])
  const [batchNumber, setBatchNumber] = useState("")
  const [registrationNumber, setRegistrationNumber] = useState("")
  const [hover, setHover] = useState(false)

  useEffect(() => {
    api.get("/templates")
      .then((res) => setTemplates(res.data))
      .catch(() => {})
  }, [])

  const createProduct = async () => {
    await api.post("/products", { name, templateId, batchNumber, registrationNumber })
    alert("Product Created")
  }

  return (
    <div style={S.page}>
      <div style={S.blob1} />
      <div style={S.blob2} />
      <div style={S.blob3} />
      <div style={S.blob4} />

      <div style={S.outerCard}>
        <h1 style={S.title}>Create Product</h1>

        <div style={S.innerCard}>

          <Field label="Product Name" icon={<LabelIcon />}>
            <div style={S.inputWrap}>
              <span style={S.iconLeft}><InputIcon /></span>
              <input
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={S.input}
              />
            </div>
          </Field>

          <Field label="Template" icon={<GridIcon />}>
            <div style={S.inputWrap}>
              <span style={S.iconLeft}><ListIcon /></span>
              <select
                value={templateId}
                onChange={(e) => setTemplate(e.target.value)}
                style={{
                  ...S.select,
                  color: templateId ? "#fff" : "rgba(255,180,180,0.50)",
                }}
              >
                <option value="" disabled style={{ color: "#ccc", background: "#3b0d0d" }}>Select template</option>
                {templates.map((t) => (
                  <option key={t._id} value={t._id} style={{ color: "#fff", background: "#3b0d0d" }}>
                    {t.name}
                  </option>
                ))}
              </select>
              <span style={S.chevron}><ChevronIcon /></span>
            </div>
          </Field>

          <Field label="Batch Number" icon={<LabelIcon />}>
            <div style={S.inputWrap}>
              <span style={S.iconLeft}><InputIcon /></span>
              <input
                type="text"
                placeholder="Enter batch number"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                style={S.input}
              />
            </div>
          </Field>

          <Field label="Registration Number" icon={<LabelIcon />}>
            <div style={S.inputWrap}>
              <span style={S.iconLeft}><InputIcon /></span>
              <input
                type="text"
                placeholder="Enter registration number"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                style={S.input}
              />
            </div>
          </Field>

          <button
            onClick={createProduct}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              ...S.submitBtn,
              opacity: hover ? 0.88 : 1,
              transform: hover ? "scale(0.99)" : "scale(1)",
            }}
          >
            Create Product
          </button>

        </div>
      </div>
    </div>
  )
}

export default CreateProduct