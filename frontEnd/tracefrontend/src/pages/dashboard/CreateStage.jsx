import { useEffect, useState } from "react"
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

  blob1: { pointerEvents:"none", position:"absolute", top:"4%", left:"4%", width:"38%", height:"38%", background:"radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(20px)" },
  blob2: { pointerEvents:"none", position:"absolute", top:"8%", right:"6%", width:"28%", height:"28%", background:"radial-gradient(circle, rgba(239,68,68,0.18) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(22px)" },
  blob3: { pointerEvents:"none", position:"absolute", bottom:"12%", left:"8%", width:"32%", height:"32%", background:"radial-gradient(circle, rgba(180,30,30,0.15) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(22px)" },
  blob4: { pointerEvents:"none", position:"absolute", bottom:"10%", right:"4%", width:"30%", height:"30%", background:"radial-gradient(circle, rgba(255,180,180,0.08) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(20px)" },

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

  fieldGroup: { marginBottom: "1rem" },

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

  iconTopLeft: {
    position: "absolute",
    left: "10px",
    top: "12px",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    zIndex: 1,
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

  selectEmpty: {
    color: "rgba(255,180,180,0.50)",
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

  textarea: {
    width: "100%",
    paddingLeft: "30px",
    paddingRight: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
    borderRadius: "9px",
    fontSize: "13px",
    outline: "none",
    resize: "vertical",
    background: "rgba(60, 8, 8, 0.70)",
    border: "1px solid rgba(200,80,80,0.30)",
    color: "#fff",
    fontFamily: "Georgia, serif",
    boxSizing: "border-box",
    lineHeight: "1.6",
    minHeight: "90px",
    display: "block",
  },

  divider: {
    height: "1px",
    background: "rgba(255,255,255,0.08)",
    margin: "1rem 0",
  },

  submitBtn: {
    width: "100%",
    padding: "11px",
    borderRadius: "9px",
    border: "none",
    background: "linear-gradient(135deg, #b91c1c, #7f1d1d)",
    boxShadow: "0 4px 20px rgba(185,28,28,0.45)",
    color: "#fff",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "Georgia, serif",
    letterSpacing: "0.02em",
    transition: "opacity 0.15s, transform 0.1s",
    display: "block",
    boxSizing: "border-box",
  },

  submitDisabled: {
    opacity: 0.55,
    cursor: "not-allowed",
    transform: "none",
  },

  stageHint: {
    display: "flex",
    flexWrap: "wrap",
    gap: "5px",
    marginTop: "7px",
  },

  stagePill: {
    display: "inline-flex",
    alignItems: "center",
    padding: "2px 9px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "500",
    background: "rgba(140, 20, 20, 0.50)",
    border: "1px solid rgba(200,100,100,0.25)",
    color: "rgba(255,210,210,0.9)",
    fontFamily: "Georgia, serif",
  },
}

const ICON = "rgba(255,180,180,0.75)"
const ICON_SM = "rgba(255,160,160,0.50)"

function BoxIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ICON} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  )
}

function GearIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ICON} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  )
}

function NotesIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ICON} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/>
    </svg>
  )
}

function SelectIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={ICON_SM} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={ICON_SM} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

function TextareaIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={ICON_SM} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="10" x2="14" y2="10"/><line x1="4" y1="14" x2="10" y2="14"/>
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

function CreateStage() {
  const [products, setProducts] = useState([])
  const [productId, setProductId] = useState("")
  const [stageName, setStageName] = useState("")
  const [data, setData] = useState("")
  const [loading, setLoading] = useState(false)
  const [templates, setTemplates] = useState([])
  const [submitHover, setSubmitHover] = useState(false)

  useEffect(() => { fetchProducts() }, [])

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products")
      if (res.data) setProducts(res.data)
    } catch (err) { console.log(err) }
  }

  const handleProductChange = async (e) => {
    const selectedProduct = products.find(p => p._id === e.target.value)
    const templateId = selectedProduct.templateId
    setProductId(e.target.value)
    setStageName("")
    const res = await api.post("/products/template", { templateId })
    const selectStages = res.data[0].templateId.stages
    setTemplates(selectStages)
  }

  const submitStage = async () => {
    if (!productId || !stageName) { alert("Fill all required fields"); return }
    setLoading(true)
    try {
      await api.post("/stages", { productId, stageName, data })
      alert("Stage added successfully")
      setStageName("")
      setData("")
    } catch (err) {
      console.log(err)
      alert("Error adding stage")
    } finally { setLoading(false) }
  }

  return (
    <div style={S.page}>
      <div style={S.blob1} /><div style={S.blob2} />
      <div style={S.blob3} /><div style={S.blob4} />

      <div style={S.outerCard}>
        <h1 style={S.title}>Create Production Stage</h1>

        <div style={S.innerCard}>

          <Field label="Select Product" icon={<BoxIcon />}>
            <div style={S.inputWrap}>
              <span style={S.iconLeft}><SelectIcon /></span>
              <select
                onChange={handleProductChange}
                style={{ ...S.select, ...(productId ? {} : S.selectEmpty) }}
              >
                <option value="" style={{ color: "#ccc", background: "#3b0d0d" }}>Select product</option>
                {products.map((p) => (
                  <option key={p._id} value={p._id} style={{ color: "#fff", background: "#3b0d0d" }}>
                    {p.name}
                  </option>
                ))}
              </select>
              <span style={S.chevron}><ChevronIcon /></span>
            </div>
          </Field>

          <Field label="Production Stage" icon={<GearIcon />}>
            <div style={S.inputWrap}>
              <span style={S.iconLeft}><SelectIcon /></span>
              <select
                value={stageName}
                onChange={(e) => setStageName(e.target.value)}
                style={{ ...S.select, ...(stageName ? {} : S.selectEmpty) }}
              >
                <option value="" style={{ color: "#ccc", background: "#3b0d0d" }}>
                  {templates.length === 0 ? "Select a product first" : "Select stage"}
                </option>
                {templates.map((stage) => (
                  <option key={stage} value={stage} style={{ color: "#fff", background: "#3b0d0d" }}>
                    {stage}
                  </option>
                ))}
              </select>
              <span style={S.chevron}><ChevronIcon /></span>
            </div>

            {templates.length > 0 && (
              <div style={S.stageHint}>
                {templates.map((stage) => (
                  <span
                    key={stage}
                    style={{
                      ...S.stagePill,
                      ...(stageName === stage ? {
                        background: "rgba(185,28,28,0.65)",
                        border: "1px solid rgba(255,160,160,0.40)",
                        color: "#fff",
                      } : {}),
                    }}
                  >
                    {stage}
                  </span>
                ))}
              </div>
            )}
          </Field>

          <Field label="Stage Details" icon={<NotesIcon />}>
            <div style={S.inputWrap}>
              <span style={S.iconTopLeft}><TextareaIcon /></span>
              <textarea
                placeholder="Quality notes, temperature, operator details..."
                value={data}
                onChange={(e) => setData(e.target.value)}
                rows={4}
                style={S.textarea}
              />
            </div>
          </Field>

          <div style={S.divider} />

          <button
            onClick={submitStage}
            disabled={loading}
            onMouseEnter={() => !loading && setSubmitHover(true)}
            onMouseLeave={() => setSubmitHover(false)}
            style={{
              ...S.submitBtn,
              ...(loading ? S.submitDisabled : {}),
              ...(submitHover && !loading ? { opacity: 0.88, transform: "scale(0.99)" } : {}),
            }}
          >
            {loading ? "Saving…" : "Add Stage"}
          </button>

        </div>
      </div>
    </div>
  )
}

export default CreateStage