import { useState,useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import api from "../services/api"

const links = [
  { to: "/dashboard",      label: "Dashboard",      icon: DashIcon },
  { to: "/templates",      label: "Templates",      icon: TemplateIcon },
  { to: "/products",       label: "Products",       icon: BoxIcon },
  { to: "/product-stages", label: "Product Stages", icon: GearIcon },
]


function NavLinks({ pathname, onNavigate }) {
  return (
    <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {links.map(({ to, label, icon }) => {
        const active = pathname === to || pathname.startsWith(to + "/")
        const Icon = icon

        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 14px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: active ? "600" : "400",
              color: active ? "#fff" : "rgba(255,200,200,0.58)",
              background: active ? "rgba(185,28,28,0.35)" : "transparent",
              border: active ? "1px solid rgba(255,200,200,0.18)" : "1px solid transparent",
              textDecoration: "none",
              fontFamily: "Georgia, serif",
              letterSpacing: "0.01em",
              transition: "color 0.15s, background 0.15s, border-color 0.15s",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={e => {
              if (!active) {
                e.currentTarget.style.color = "rgba(255,220,220,0.85)"
                e.currentTarget.style.background = "rgba(255,255,255,0.06)"
              }
            }}
            onMouseLeave={e => {
              if (!active) {
                e.currentTarget.style.color = "rgba(255,200,200,0.58)"
                e.currentTarget.style.background = "transparent"
              }
            }}
          >
            {active && (
              <span style={{
                position: "absolute",
                left: 0, top: "20%",
                width: "3px", height: "60%",
                background: "linear-gradient(180deg, #f87171, #b91c1c)",
                borderRadius: "0 3px 3px 0",
              }} />
            )}
            <Icon active={active} />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}

function LogoutButton({ onLogout }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onLogout}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        width: "100%",
        padding: "10px 14px",
        borderRadius: "10px",
        fontSize: "14px",
        fontWeight: "500",
        color: hover ? "rgba(255,180,180,0.95)" : "rgba(255,160,160,0.65)",
        background: hover ? "rgba(185,28,28,0.22)" : "transparent",
        border: "1px solid transparent",
        cursor: "pointer",
        fontFamily: "Georgia, serif",
        letterSpacing: "0.01em",
        transition: "color 0.15s, background 0.15s",
        textAlign: "left",
        boxSizing: "border-box",
      }}
    >
      <LogoutIcon hover={hover} />
      Log out
    </button>
  )
}

function SidebarFooter({ onLogout }) {
  const [user,setUser] = useState({})
  useEffect(() => {
const getUserData = async () => {

const res = await api.get("/auth/user")
setUser({ name: res.data.name , email: res.data._id})

}
getUserData()
}, [user._id])
  return (
    <div style={{ marginTop: "auto" }}>
      <div style={S.divider} />
      <div style={S.footerPill}>
        <div style={S.pillDot} />
        <span style={S.pillText}>{user.name}</span>
      </div>
      
      <div style={{ marginTop: "8px" }}>
        <LogoutButton onLogout={onLogout} />
      </div>
    </div>
  )
}

function Sidebar() {
  const { pathname } = useLocation()

  const navigate = useNavigate()
  const [open, setOpen] = useState(false)


  const handleLogout = async () => {
    const res = await api.get("/auth/logout")
    if (res.data.success) {
      setOpen(false)
      navigate("/login")
    }
  }

  return (
    <>
      {/* ── DESKTOP sidebar (md+) ── */}
      <div className="sidebar-desktop">
        <aside style={S.desktopAside}>
          <div style={S.blob1} /><div style={S.blob2} />

          {/* Brand */}
          <div style={S.brand}>
            <div style={S.brandIcon}><GridIcon /></div>
            <div>
              <div style={S.brandName}>TraceSure</div>
              <div style={S.brandSub}>Manufacturing</div>
            </div>
          </div>

          <div style={S.divider} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <NavLinks pathname={pathname} onNavigate={() => {}} />
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <SidebarFooter onLogout={handleLogout} />
          </div>
        </aside>
      </div>

      {/* ── MOBILE top bar + drawer ── */}
      <div className="sidebar-mobile">

        {/* Fixed top bar */}
        <div style={S.topbar}>
          <div style={S.blob1sm} /><div style={S.blob2sm} />

          <div style={{ ...S.brand, marginBottom: 0 }}>
            <div style={{ ...S.brandIcon, width: "28px", height: "28px", borderRadius: "7px" }}>
              <GridIcon small />
            </div>
            <div style={S.brandName}>TraceSure</div>
          </div>

          <button
            onClick={() => setOpen(v => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            style={S.hamburger}
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="rgba(255,210,210,0.9)" strokeWidth="2.2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="rgba(255,210,210,0.9)" strokeWidth="2.2" strokeLinecap="round">
                <line x1="3" y1="6"  x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>

        {/* Backdrop */}
        {open && (
          <div onClick={() => setOpen(false)} style={S.backdrop} />
        )}

        {/* Slide-in drawer */}
        <div style={{
          ...S.drawer,
          transform: open ? "translateX(0)" : "translateX(-100%)",
        }}>
          <div style={S.blob1} /><div style={S.blob2} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <SidebarFooter onLogout={handleLogout} />
          </div>
        </div>

        {/* Spacer */}
        <div style={{ height: "56px" }} />
      </div>

      <style>{`
        .sidebar-desktop { display: none; }
        .sidebar-mobile  { display: block; }
        @media (min-width: 768px) {
          .sidebar-desktop { display: block; }
          .sidebar-mobile  { display: none; }
        }
      `}</style>
    </>
  )
}

/* ── Icons ── */
function GridIcon({ small }) {
  const s = small ? 14 : 16
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"
      stroke="rgba(255,200,200,0.85)" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  )
}
function DashIcon({ active }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke={active ? "#fff" : "rgba(255,200,200,0.55)"}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  )
}
function TemplateIcon({ active }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke={active ? "#fff" : "rgba(255,200,200,0.55)"}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="8" y1="13" x2="16" y2="13"/>
      <line x1="8" y1="17" x2="13" y2="17"/>
    </svg>
  )
}
function BoxIcon({ active }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke={active ? "#fff" : "rgba(255,200,200,0.55)"}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  )
}
function GearIcon({ active }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke={active ? "#fff" : "rgba(255,200,200,0.55)"}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  )
}
function LogoutIcon({ hover }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke={hover ? "rgba(255,180,180,0.95)" : "rgba(255,160,160,0.55)"}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  )
}

const S = {
  desktopAside: {
    width: "220px",
    minHeight: "100vh",
    background: "linear-gradient(155deg, #1a0a0a 0%, #3b0d0d 45%, #7f1d1d 100%)",
    borderRight: "1px solid rgba(255,255,255,0.08)",
    padding: "1.5rem 1.1rem",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
    boxSizing: "border-box",
    boxShadow: "2px 0 24px rgba(0,0,0,0.35)",
    fontFamily: "Georgia, serif",
  },

  topbar: {
    position: "fixed",
    top: 0, left: 0, right: 0,
    zIndex: 50,
    height: "56px",
    background: "linear-gradient(135deg, #1a0a0a 0%, #3b0d0d 50%, #7f1d1d 100%)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1.25rem",
    boxSizing: "border-box",
    boxShadow: "0 2px 16px rgba(0,0,0,0.35)",
    overflow: "hidden",
  },

  blob1: {
    pointerEvents: "none", position: "absolute",
    top: "4%", left: "4%", width: "60%", height: "30%",
    background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)",
    borderRadius: "50%", filter: "blur(18px)",
  },
  blob2: {
    pointerEvents: "none", position: "absolute",
    bottom: "10%", right: "4%", width: "50%", height: "25%",
    background: "radial-gradient(circle, rgba(239,68,68,0.18) 0%, transparent 70%)",
    borderRadius: "50%", filter: "blur(20px)",
  },
  blob1sm: {
    pointerEvents: "none", position: "absolute",
    top: "-60%", left: "-4%", width: "30%", height: "220%",
    background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)",
    borderRadius: "50%", filter: "blur(16px)",
  },
  blob2sm: {
    pointerEvents: "none", position: "absolute",
    top: "-60%", right: "8%", width: "22%", height: "220%",
    background: "radial-gradient(circle, rgba(239,68,68,0.18) 0%, transparent 70%)",
    borderRadius: "50%", filter: "blur(18px)",
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "1.25rem",
    position: "relative",
    zIndex: 1,
  },

  brandIcon: {
    width: "36px", height: "36px",
    borderRadius: "9px",
    background: "rgba(185,28,28,0.45)",
    border: "1px solid rgba(255,200,200,0.18)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  brandName: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#fff",
    fontFamily: "Georgia, serif",
    letterSpacing: "0.01em",
    lineHeight: 1.2,
  },

  brandSub: {
    fontSize: "11px",
    color: "rgba(255,200,200,0.5)",
    fontFamily: "Georgia, serif",
    fontWeight: "400",
    letterSpacing: "0.03em",
  },

  divider: {
    height: "1px",
    background: "rgba(255,255,255,0.08)",
    margin: "1rem 0",
  },

  footerPill: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,200,200,0.15)",
    borderRadius: "100px",
    padding: "6px 14px 6px 10px",
  },

  pillDot: {
    width: "7px", height: "7px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #f87171, #b91c1c)",
    boxShadow: "0 0 6px rgba(248,113,113,0.45)",
    flexShrink: 0,
  },

  pillText: {
    fontSize: "12px",
    fontWeight: "600",
    color: "rgba(255,220,220,0.82)",
    fontFamily: "Georgia, serif",
    letterSpacing: "0.02em",
  },

  hamburger: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "6px",
    lineHeight: 0,
    position: "relative",
    zIndex: 1,
    borderRadius: "8px",
  },

  backdrop: {
    position: "fixed", inset: 0,
    zIndex: 40,
    background: "rgba(0,0,0,0.55)",
  },

  drawer: {
    position: "fixed",
    top: "56px", left: 0, bottom: 0,
    zIndex: 45,
    width: "240px",
    background: "linear-gradient(155deg, #1a0a0a 0%, #3b0d0d 45%, #7f1d1d 100%)",
    borderRight: "1px solid rgba(255,255,255,0.08)",
    padding: "1.25rem 1rem",
    transition: "transform 0.25s ease",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    boxShadow: "4px 0 32px rgba(0,0,0,0.45)",
    overflow: "hidden",
  },
}

export default Sidebar