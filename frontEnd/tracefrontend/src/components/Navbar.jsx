import { useState, useEffect } from "react"
import api from "../services/api"


function Navbar() {
   const [user,setUser] = useState({})
    useEffect(() => {
  const getUserData = async () => {
  
  const res = await api.get("/auth/user")
  setUser({ name: res.data.name , email: res.data._id})
  
  }
  getUserData()
  }, [user._id])
  return (
    <header style={S.header}>

      {/* Ambient blobs */}
      <div style={S.blob1} />
      <div style={S.blob2} />

      {/* Brand left */}
      <div style={S.brand}>
        <div style={S.brandIcon}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,200,200,0.9)" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
          </svg>
        </div>
        <span style={S.brandName}>TraceSure</span>
        <span style={S.brandSub}>Manufacturing</span>
      </div>

      {/* Company pill right */}
      <div style={S.pill}>
        <div style={S.pillDot} />
        <span style={S.pillText}>{user.name}</span>
      </div>

    </header>
  )
}

const S = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 24px",
    background: "linear-gradient(135deg, #1a0a0a 0%, #3b0d0d 50%, #7f1d1d 100%)",
    position: "relative",
    overflow: "hidden",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 2px 16px rgba(0,0,0,0.35)",
    fontFamily: "Georgia, 'Times New Roman', serif",
  },

  blob1: {
    pointerEvents: "none",
    position: "absolute",
    top: "-60%", left: "-4%",
    width: "30%", height: "220%",
    background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)",
    borderRadius: "50%",
    filter: "blur(16px)",
  },

  blob2: {
    pointerEvents: "none",
    position: "absolute",
    top: "-60%", right: "8%",
    width: "22%", height: "220%",
    background: "radial-gradient(circle, rgba(239,68,68,0.18) 0%, transparent 70%)",
    borderRadius: "50%",
    filter: "blur(18px)",
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    position: "relative",
    zIndex: 1,
  },

  brandIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: "rgba(185,28,28,0.45)",
    border: "1px solid rgba(255,200,200,0.18)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  brandName: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#fff",
    fontFamily: "Georgia, serif",
    letterSpacing: "0.01em",
  },

  brandSub: {
    fontSize: "11px",
    color: "rgba(255,200,200,0.55)",
    fontFamily: "Georgia, serif",
    fontWeight: "400",
    letterSpacing: "0.04em",
  },

  pill: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,200,200,0.22)",
    borderRadius: "100px",
    padding: "5px 14px 5px 10px",
    position: "relative",
    zIndex: 1,
  },

  pillDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #f87171, #b91c1c)",
    boxShadow: "0 0 6px rgba(248,113,113,0.5)",
    flexShrink: 0,
  },

  pillText: {
    fontSize: "13px",
    fontWeight: "600",
    color: "rgba(255,230,230,0.92)",
    fontFamily: "Georgia, serif",
    letterSpacing: "0.02em",
  },
}

export default Navbar