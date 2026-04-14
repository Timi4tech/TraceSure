import { Navigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import useAuth from "../hooks/useAuth"

function DashboardLayout({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={S.loadingPage}>
        <div style={S.blob1} /><div style={S.blob2} />
        <div style={S.blob3} /><div style={S.blob4} />
        <div style={S.loadingCard}>
          <div style={S.loadingIconTile}><GridIcon /></div>
          <div style={S.loadingSpinnerWrap}>
            <div style={S.loadingSpinner} className="dl-spin" />
          </div>
          <p style={S.loadingText}>Loading...</p>
        </div>
        <style>{`
          @keyframes dl-spin {
            0%   { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .dl-spin { animation: dl-spin 0.9s linear infinite; }
        `}</style>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        html, body, #root {
          margin: 0;
          padding: 0;
          min-height: 100vh;
          background: linear-gradient(155deg, #1a0a0a 0%, #3b0d0d 35%, #7f1d1d 65%, #991b1b 100%);
        }

        .dl-root {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(155deg, #1a0a0a 0%, #3b0d0d 35%, #7f1d1d 65%, #991b1b 100%);
          font-family: Georgia, 'Times New Roman', serif;
          position: relative;
        }

        .dl-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          min-width: 0;
          background: linear-gradient(155deg, #1a0a0a 0%, #3b0d0d 35%, #7f1d1d 65%, #991b1b 100%);
        }

        .dl-content {
          flex: 1;
          padding: clamp(1rem, 3vw, 1.5rem);
        }

        /* Desktop: offset main by sidebar width */
        @media (min-width: 768px) {
          .dl-main {
            margin-left: 220px;
          }
        }
      `}</style>

      <div className="dl-root">
        <Sidebar />
        <div className="dl-main">
          <Navbar />
          <div className="dl-content">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

function GridIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="rgba(255,200,200,0.85)" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  )
}

const S = {
  loadingPage: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(155deg, #1a0a0a 0%, #3b0d0d 35%, #7f1d1d 65%, #991b1b 100%)",
    fontFamily: "Georgia, serif",
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
    background: "radial-gradient(circle, rgba(239,68,68,0.22) 0%, transparent 70%)",
    borderRadius: "50%", filter: "blur(22px)",
  },
  blob3: {
    pointerEvents: "none", position: "absolute",
    bottom: "12%", left: "8%", width: "32%", height: "32%",
    background: "radial-gradient(circle, rgba(180,30,30,0.18) 0%, transparent 70%)",
    borderRadius: "50%", filter: "blur(22px)",
  },
  blob4: {
    pointerEvents: "none", position: "absolute",
    bottom: "10%", right: "4%", width: "30%", height: "30%",
    background: "radial-gradient(circle, rgba(255,180,180,0.12) 0%, transparent 70%)",
    borderRadius: "50%", filter: "blur(20px)",
  },

  loadingCard: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    background: "rgba(120,20,20,0.28)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: "20px",
    padding: "2.5rem 3rem",
    boxShadow: "0 8px 48px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.10)",
  },

  loadingIconTile: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "rgba(185,28,28,0.45)",
    border: "1px solid rgba(255,200,200,0.18)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingSpinnerWrap: {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingSpinner: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    border: "2.5px solid rgba(255,200,200,0.15)",
    borderTopColor: "#b91c1c",
    boxSizing: "border-box",
  },

  loadingText: {
    fontSize: "14px",
    color: "rgba(255,200,200,0.65)",
    fontFamily: "Georgia, serif",
    letterSpacing: "0.04em",
    margin: 0,
  },
}

export default DashboardLayout