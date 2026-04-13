import { useEffect, useState } from "react"
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

  labelRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  },

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

  iconTopLeft: {
    position: "absolute",
    left: "12px",
    top: "14px",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
  },

  select: {
    width: "100%",
    paddingLeft: "36px",
    paddingRight: "36px",
    paddingTop: "10px",
    paddingBottom: "10px",
    borderRadius: "10px",
    fontSize: "14px",
    outline: "none",
    appearance: "none",
    cursor: "pointer",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,200,200,0.22)",
    color: "#fff",
    fontFamily: "Georgia, serif",
    boxSizing: "border-box",
  },

  selectEmpty: {
    color: "rgba(255,200,200,0.45)",
  },

  chevron: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
  },

  textarea: {
    width: "100%",
    paddingLeft: "36px",
    paddingRight: "14px",
    paddingTop: "12px",
    paddingBottom: "12px",
    borderRadius: "10px",
    fontSize: "14px",
    outline: "none",
    resize: "vertical",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,200,200,0.22)",
    color: "#fff",
    fontFamily: "Georgia, serif",
    boxSizing: "border-box",
    lineHeight: "1.6",
    minHeight: "120px",
  },

  divider: {
    height: "1px",
    background: "rgba(255,255,255,0.10)",
    margin: "1.25rem 0",
  },

  submitBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #b91c1c, #7f1d1d)",
    boxShadow: "0 4px 20px rgba(185,28,28,0.45)",
    color: "#fff",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
    fontFamily: "Georgia, serif",
    letterSpacing: "0.02em",
    transition: "opacity 0.15s, transform 0.1s",
  },

  submitDisabled: {
    opacity: 0.55,
    cursor: "not-allowed",
    transform: "none",
  },

  // Stage pills shown when templates loaded
  stageHint: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginTop: "8px",
  },

  stagePill: {
    display: "inline-flex",
    alignItems: "center",
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "500",
    background: "rgba(185,28,28,0.30)",
    border: "1px solid rgba(255,180,180,0.18)",
    color: "rgba(255,210,210,0.9)",
    fontFamily: "Georgia, serif",
  },
}

const ICON = "rgba(255,200,200,0.7)"
const ICON_SM = "rgba(255,200,200,0.45)"

function BoxIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ICON} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  )
}

function GearIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ICON} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  )
}

function NotesIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ICON} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/>
    </svg>
  )
}

function SelectIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ICON_SM} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ICON_SM} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

function TextareaIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ICON_SM} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

          {/* Product select */}
          <Field label="Select Product" icon={<BoxIcon />}>
            <div style={S.inputWrap}>
              <span style={S.iconLeft}><SelectIcon /></span>
              <select
                onChange={handleProductChange}
                style={{
                  ...S.select,
                  ...(productId ? {} : S.selectEmpty),
                }}
              >
                <option value="" style={{ color: "#333" }}>Select product</option>
                {products.map((p) => (
                  <option key={p._id} value={p._id} style={{ color: "#1a0a0a", background: "#fff" }}>
                    {p.name}
                  </option>
                ))}
              </select>
              <span style={S.chevron}><ChevronIcon /></span>
            </div>
          </Field>

          {/* Stage select */}
          <Field label="Production Stage" icon={<GearIcon />}>
            <div style={S.inputWrap}>
              <span style={S.iconLeft}><SelectIcon /></span>
              <select
                value={stageName}
                onChange={(e) => setStageName(e.target.value)}
                style={{
                  ...S.select,
                  ...(stageName ? {} : S.selectEmpty),
                }}
              >
                <option value="" style={{ color: "#333" }}>
                  {templates.length === 0 ? "Select a product first" : "Select stage"}
                </option>
                {templates.map((stage) => (
                  <option key={stage} value={stage} style={{ color: "#1a0a0a", background: "#fff" }}>
                    {stage}
                  </option>
                ))}
              </select>
              <span style={S.chevron}><ChevronIcon /></span>
            </div>

            {/* Stage pills preview */}
            {templates.length > 0 && (
              <div style={S.stageHint}>
                {templates.map((stage) => (
                  <span
                    key={stage}
                    style={{
                      ...S.stagePill,
                      ...(stageName === stage ? {
                        background: "rgba(185,28,28,0.55)",
                        border: "1px solid rgba(255,180,180,0.35)",
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

          {/* Stage notes */}
          <Field label="Stage Details" icon={<NotesIcon />}>
            <div style={S.inputWrap}>
              <span style={S.iconTopLeft}><TextareaIcon /></span>
              <textarea
                placeholder="Quality notes, temperature, operator details..."
                value={data}
                onChange={(e) => setData(e.target.value)}
                rows={5}
                style={S.textarea}
              />
            </div>
          </Field>

          <div style={S.divider} />

          {/* Submit */}
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