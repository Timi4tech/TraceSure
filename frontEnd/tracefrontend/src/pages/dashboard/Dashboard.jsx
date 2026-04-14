import { useState } from "react"
import CreateTemplate from "./CreateTemplate"
import CreateProducts from "./CreateProduct"
import CreateStage from "./CreateStage"

const TABS = [
  {
    id: "createTemplates",
    label: "Templates",
    heading: "Manufacturing Templates",
    description: "Create and manage production stage templates",
    component: <CreateTemplate />,
  },
  {
    id: "CreateProducts",
    label: "Products",
    heading: "Products",
    description: "Create products and generate QR codes",
    component: <CreateProducts />,
  },
  {
    id: "CreateStage",
    label: "Production Stages",
    heading: "Production Stages",
    description: "Update and monitor manufacturing stages",
    component: <CreateStage />,
  },
]

const styles = {
  page: {
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
    padding: "2rem",
    fontFamily: "Inter, system-ui, sans-serif",
    boxSizing: "border-box",
  },
  header: {
    backgroundColor: "#7f1d1d",
    color: "#fff",
    borderRadius: "12px",
    padding: "1rem 1.5rem",
    marginBottom: "1.5rem",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  headerIcon: {
    width: "36px",
    height: "36px",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
  },
  headerTitle: {
    fontSize: "20px",
    fontWeight: "500",
    margin: 0,
  },
  tabBar: {
    display: "inline-flex",
    flexWrap: "wrap",
    gap: "6px",
    backgroundColor: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "6px",
    marginBottom: "1.5rem",
  },
  tabActive: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1px solid rgba(127,29,29,0.3)",
    backgroundColor: "rgba(127,29,29,0.08)",
    color: "#7f1d1d",
    fontWeight: "500",
    fontSize: "14px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  tabInactive: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1px solid transparent",
    backgroundColor: "transparent",
    color: "#6b7280",
    fontWeight: "400",
    fontSize: "14px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  dotActive: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#7f1d1d",
    display: "inline-block",
    flexShrink: 0,
  },
  dotInactive: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#9ca3af",
    display: "inline-block",
    flexShrink: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  cardActive: {
    backgroundColor: "rgba(127,29,29,0.04)",
    border: "1.5px solid rgba(127,29,29,0.35)",
    borderRadius: "12px",
    padding: "1.25rem",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.15s",
  },
  cardInactive: {
    backgroundColor: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "1.25rem",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.15s",
  },
  accentBar: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "3px",
    height: "100%",
    backgroundColor: "#7f1d1d",
    borderRadius: "3px 0 0 3px",
  },
  cardIconActive: {
    width: "38px",
    height: "38px",
    backgroundColor: "rgba(127,29,29,0.12)",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    marginBottom: "10px",
  },
  cardIconInactive: {
    width: "38px",
    height: "38px",
    backgroundColor: "#f3f4f6",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    marginBottom: "10px",
  },
  cardHeading: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#111827",
    marginBottom: "4px",
  },
  cardDesc: {
    fontSize: "13px",
    color: "#6b7280",
    lineHeight: "1.5",
  },
  cardCta: {
    display: "inline-block",
    marginTop: "10px",
    fontSize: "12px",
    color: "#7f1d1d",
    fontWeight: "500",
  },
  panel: {
    backgroundColor: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "1.5rem",
  },
  panelHead: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid #f3f4f6",
  },
  badge: {
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: "6px",
    backgroundColor: "rgba(127,29,29,0.08)",
    color: "#7f1d1d",
    fontSize: "11px",
    fontWeight: "500",
    marginBottom: "4px",
  },
  panelTitle: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#111827",
    margin: 0,
  },
  closeBtn: {
    width: "28px",
    height: "28px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "14px",
    color: "#9ca3af",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}

const cardIcons = {
  createTemplates: "📋",
  CreateProducts: "📦",
  CreateStage: "⚙️",
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState(TABS[0].id)

  const active = TABS.find((t) => t.id === activeTab)

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerIcon}>⚙</div>
        <h1 style={styles.headerTitle}>Manufacturing Dashboard</h1>
      </div>

      {/* Tab bar */}
      <div style={styles.tabBar}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={activeTab === tab.id ? styles.tabActive : styles.tabInactive}
          >
            <span style={activeTab === tab.id ? styles.dotActive : styles.dotInactive} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div style={styles.grid}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={isActive ? styles.cardActive : styles.cardInactive}
            >
              {isActive && <div style={styles.accentBar} />}
              <div style={isActive ? styles.cardIconActive : styles.cardIconInactive}>
                {cardIcons[tab.id]}
              </div>
              <div style={styles.cardHeading}>{tab.heading}</div>
              <div style={styles.cardDesc}>{tab.description}</div>
              {isActive && <div style={styles.cardCta}>Open ›</div>}
            </div>
          )
        })}
      </div>

      {/* Panel */}
      {active && (
        <div style={styles.panel}>
          <div style={styles.panelHead}>
            <div>
              <div style={styles.badge}>{active.label}</div>
              <h2 style={styles.panelTitle}>{active.heading}</h2>
            </div>
            <button style={styles.closeBtn} onClick={() => setActiveTab(null)}>✕</button>
          </div>
          {active.component}
        </div>
      )}

    </div>
  )
}

export default Dashboard