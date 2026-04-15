
import { Link } from "react-router-dom"

const CheckCircle = () => (
  <div style={{
    width: 22, height: 22,
    background: "linear-gradient(135deg, #b91c1c, #7f1d1d)",
    borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 2px 8px rgba(185,28,28,0.4)",
  }}>
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
)

const features = [
  {
    title: "Immutable Production Records",
    desc: "Every production stage is permanently recorded and tamper-proof, ensuring full compliance and trust across your supply chain.",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2"/>
        <line x1="9" y1="7" x2="15" y2="7"/>
        <line x1="9" y1="11" x2="15" y2="11"/>
        <line x1="9" y1="15" x2="13" y2="15"/>
      </svg>
    ),
  },
  {
    title: "Consumer QR Verification",
    desc: "Customers scan a product QR code to instantly verify its entire manufacturing journey and build lasting product trust.",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    title: "Flexible Manufacturing Stages",
    desc: "Customize your workflow stages to match your unique product journey — from raw materials all the way to distribution.",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.375 2.625a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z"/>
      </svg>
    ),
  },
]

const steps = [
  "Create your manufacturing template",
  "Register your product batch",
  "Record each production stage",
  "Consumers scan QR to verify",
]

const timelineItems = [
  "Raw Material Sourcing",
  "Quality Inspection",
  "Processing",
  "Packaging",
  "Distribution",
]

const globalStyles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .landing-root {
    font-family: Georgia, 'Times New Roman', serif;
    color: #1a0a0a;
    background: #fff;
    width: 100%;
    overflow-x: hidden;
  }

  /* NAV */
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 24px;
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(255,255,255,0.13);
    gap: 12px;
    position: relative;
    z-index: 10;
  }
  .nav-brand {
    font-family: Georgia, serif;
    font-weight: 700;
    font-size: 17px;
    color: #fff;
    white-space: nowrap;
    letter-spacing: 0.01em;
  }
  .nav-brand span {
    color: rgba(255,200,200,0.6);
    font-weight: 400;
    font-size: 12px;
    margin-left: 8px;
    font-family: Georgia, serif;
  }
  .nav-links {
    display: flex;
    gap: 18px;
    flex-shrink: 0;
  }
  .nav-links a {
    font-size: 13px;
    color: rgba(255,210,210,0.8);
    text-decoration: none;
    white-space: nowrap;
    font-family: Georgia, serif;
    transition: color 0.15s;
  }
  .nav-links a:hover { color: #fff; }
  @media (max-width: 480px) {
    .nav-brand span { display: none; }
    .nav-links a { font-size: 12px; }
    .nav-links { gap: 12px; }
  }

  /* HERO */
  .hero {
    padding: 64px 24px 80px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .hero-badge {
    display: inline-block;
    background: rgba(255,255,255,0.14);
    border: 1px solid rgba(255,255,255,0.28);
    color: rgba(255,220,220,0.95);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 5px 16px;
    border-radius: 100px;
    margin-bottom: 22px;
    font-family: Georgia, serif;
  }
  .hero h1 {
    font-family: Georgia, serif;
    font-size: clamp(26px, 6vw, 48px);
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
    margin: 0 auto 18px;
    max-width: 560px;
    letter-spacing: 0.01em;
  }
  .hero p {
    font-size: clamp(14px, 3.5vw, 16px);
    color: rgba(255,210,210,0.82);
    max-width: 420px;
    margin: 0 auto 36px;
    line-height: 1.7;
    font-family: Georgia, serif;
  }
  .hero-buttons {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 4px;
  }
  .btn-primary {
    background: #fff;
    color: #7f1d1d;
    font-family: Georgia, serif;
    font-size: 14px;
    font-weight: 700;
    padding: 13px 28px;
    border-radius: 10px;
    text-decoration: none;
    box-shadow: 0 4px 20px rgba(0,0,0,0.22);
    display: inline-block;
    white-space: nowrap;
    transition: opacity 0.15s;
  }
  .btn-primary:hover { opacity: 0.92; }
  .btn-secondary {
    background: rgba(255,255,255,0.10);
    color: rgba(255,220,220,0.95);
    font-family: Georgia, serif;
    font-size: 14px;
    font-weight: 500;
    padding: 13px 28px;
    border-radius: 10px;
    border: 1.5px solid rgba(255,200,200,0.38);
    text-decoration: none;
    display: inline-block;
    white-space: nowrap;
    transition: background 0.15s;
  }
  .btn-secondary:hover { background: rgba(255,255,255,0.16); }

  /* FEATURES */
  .section-features {
    padding: 64px 24px;
    background: #fdf6f6;
  }
  .section-label {
    text-align: center;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #b91c1c;
    margin-bottom: 8px;
    font-family: Georgia, serif;
  }
  .section-heading {
    font-family: Georgia, serif;
    font-size: clamp(20px, 5vw, 30px);
    font-weight: 700;
    text-align: center;
    color: #1a0a0a;
    margin-bottom: 40px;
    line-height: 1.25;
  }
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
    max-width: 960px;
    margin: 0 auto;
  }
  .feature-card {
    background: #fff;
    border-radius: 16px;
    padding: 26px 22px;
    border: 1px solid rgba(127,29,29,0.10);
    box-shadow: 0 2px 12px rgba(127,29,29,0.06);
    transition: box-shadow 0.18s, border-color 0.18s;
  }
  .feature-card:hover {
    border-color: rgba(185,28,28,0.22);
    box-shadow: 0 4px 20px rgba(127,29,29,0.12);
  }
  .feature-icon-wrap {
    width: 46px;
    height: 46px;
    background: linear-gradient(135deg, #fef2f2, #fecaca);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 14px;
    flex-shrink: 0;
  }
  .feature-card h3 {
    font-family: Georgia, serif;
    font-size: 15px;
    font-weight: 700;
    color: #1a0a0a;
    margin-bottom: 8px;
    letter-spacing: 0.01em;
  }
  .feature-card p {
    font-size: 13px;
    color: #6b3030;
    line-height: 1.68;
    font-family: Georgia, serif;
  }

  /* HOW IT WORKS */
  .section-how {
    padding: 64px 24px;
    background: #fff;
  }
  .steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 0;
    max-width: 800px;
    margin: 0 auto;
    background: #fdf2f2;
    border-radius: 20px;
    padding: 30px 18px;
    border: 1px solid rgba(185,28,28,0.10);
  }
  .step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 8px 10px;
    position: relative;
  }
  .step-arrow {
    position: absolute;
    right: -8px;
    top: 18px;
    color: #b91c1c;
    font-size: 16px;
    font-weight: 700;
    opacity: 0.7;
  }
  .step-num {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #b91c1c, #7f1d1d);
    color: #fff;
    font-family: Georgia, serif;
    font-size: 15px;
    font-weight: 700;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    box-shadow: 0 4px 14px rgba(185,28,28,0.35);
    flex-shrink: 0;
  }
  .step-item p {
    font-size: 12px;
    color: #3b0d0d;
    font-weight: 500;
    line-height: 1.55;
    font-family: Georgia, serif;
  }
  @media (max-width: 560px) {
    .steps-grid {
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      padding: 22px 14px;
    }
    .step-arrow { display: none; }
  }
  @media (max-width: 340px) {
    .steps-grid { grid-template-columns: 1fr; }
  }

  /* TRANSPARENCY */
  .section-transparency {
    background: linear-gradient(155deg, #1a0a0a 0%, #3b0d0d 35%, #7f1d1d 65%, #991b1b 100%);
    padding: 64px 24px;
    position: relative;
    overflow: hidden;
  }
  .transparency-grid {
    max-width: 880px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 44px;
    align-items: center;
  }
  .transparency-grid h2 {
    font-family: Georgia, serif;
    font-size: clamp(20px, 4vw, 32px);
    font-weight: 700;
    color: #fff;
    margin-bottom: 14px;
    line-height: 1.25;
    letter-spacing: 0.01em;
  }
  .transparency-grid > div:first-child p {
    font-size: 14px;
    color: rgba(255,210,210,0.72);
    line-height: 1.7;
    font-family: Georgia, serif;
  }
  .timeline-card {
    background: rgba(255,255,255,0.97);
    border-radius: 18px;
    padding: 22px 20px;
    box-shadow: 0 16px 48px rgba(0,0,0,0.35);
    border: 1px solid rgba(255,255,255,0.18);
  }
  .timeline-card h4 {
    font-family: Georgia, serif;
    font-size: 14px;
    font-weight: 700;
    color: #1a0a0a;
    margin-bottom: 4px;
    letter-spacing: 0.01em;
  }
  .timeline-divider {
    height: 1px;
    background: #f0e8e8;
    margin: 10px 0 14px;
  }
  .timeline-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 7px 0;
    font-size: 13px;
    color: #3b0d0d;
    font-weight: 500;
    font-family: Georgia, serif;
  }
  @media (max-width: 600px) {
    .transparency-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }

  /* CTA */
  .section-cta {
    padding: 72px 24px;
    background: #fdf6f6;
    text-align: center;
  }
  .section-cta h2 {
    font-family: Georgia, serif;
    font-size: clamp(20px, 5vw, 32px);
    font-weight: 700;
    color: #1a0a0a;
    margin-bottom: 12px;
    line-height: 1.25;
    letter-spacing: 0.01em;
  }
  .section-cta p {
    font-size: 14px;
    color: #6b3030;
    margin-bottom: 32px;
    font-family: Georgia, serif;
  }
  .btn-cta {
    background: linear-gradient(135deg, #b91c1c, #7f1d1d);
    color: #fff;
    font-family: Georgia, serif;
    font-size: 15px;
    font-weight: 700;
    padding: 15px 32px;
    border-radius: 10px;
    text-decoration: none;
    display: inline-block;
    box-shadow: 0 4px 22px rgba(185,28,28,0.40);
    letter-spacing: 0.01em;
    transition: opacity 0.15s;
  }
  .btn-cta:hover { opacity: 0.88; }

  /* FOOTER */
  .footer {
    background: #0f0404;
    padding: 26px 24px;
    text-align: center;
    border-top: 1px solid rgba(255,200,200,0.08);
  }
  .footer p {
    font-size: 12px;
    color: rgba(255,200,200,0.35);
    font-family: Georgia, serif;
  }
`

export default function Landing() {
  return (
    <>
      <style>{globalStyles}</style>
      <div className="landing-root">

        {/* HERO + NAV wrapper */}
        <div style={{
          background: "linear-gradient(155deg, #1a0a0a 0%, #3b0d0d 35%, #7f1d1d 65%, #991b1b 100%)",
          position: "relative",
        }}>
          {/* Ambient blobs */}
          <div style={{ pointerEvents:"none", position:"absolute", top:"4%", left:"4%", width:"38%", height:"38%", background:"radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(20px)" }} />
          <div style={{ pointerEvents:"none", position:"absolute", top:"8%", right:"6%", width:"28%", height:"28%", background:"radial-gradient(circle, rgba(239,68,68,0.22) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(22px)" }} />
          <div style={{ pointerEvents:"none", position:"absolute", bottom:"12%", left:"8%", width:"32%", height:"32%", background:"radial-gradient(circle, rgba(180,30,30,0.18) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(22px)" }} />
          <div style={{ pointerEvents:"none", position:"absolute", bottom:"10%", right:"4%", width:"30%", height:"30%", background:"radial-gradient(circle, rgba(255,180,180,0.12) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(20px)" }} />

          {/* NAV */}
          <nav className="nav">
            <div className="nav-brand">
              TraceSure{" "}
              <span>Manufacturing Transparency</span>
            </div>
            <div className="nav-links">
              {["Features", "How it works", "Pricing"].map((item) => (
                <a key={item} href="#">{item}</a>
              ))}
            </div>
          </nav>

          {/* HERO */}
          <section className="hero">
            <div className="hero-badge">QR-Powered Traceability</div>
            <h1>Transparent Manufacturing For Safer Products</h1>
            <p>Empower consumers to verify every stage of your production process using secure QR-powered traceability.</p>
            <div className="hero-buttons">
              <Link to="/register" className="btn-primary">Start For Free</Link>
              <Link to="/scan" className="btn-secondary">Scan Product</Link>
            </div>
          </section>
        </div>

        {/* FEATURES */}
        <section className="section-features">
          <p className="section-label">Why TraceSure</p>
          <h2 className="section-heading">
            Why Manufacturers Choose{" "}
            <span style={{ color: "#b91c1c" }}>TraceSure</span>
          </h2>
          <div className="features-grid">
            {features.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon-wrap">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section-how">
          <p className="section-label">Process</p>
          <h2 className="section-heading">How It Works</h2>
          <div className="steps-grid">
            {steps.map((step, i) => (
              <div key={i} className="step-item">
                {i < steps.length - 1 && <span className="step-arrow">→</span>}
                <div className="step-num">{i + 1}</div>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FULL PRODUCT TRANSPARENCY */}
        <section className="section-transparency">
          <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:"radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 55%)" }} />
          <div className="transparency-grid">
            <div>
              <h2>Full Product Transparency</h2>
              <p>A real-time timeline showing every step of your product journey — giving consumers complete visibility and confidence in what they buy.</p>
            </div>
            <div className="timeline-card">
              <h4>Product Timeline</h4>
              <div className="timeline-divider" />
              {timelineItems.map((item, i) => (
                <div key={item} className="timeline-item" style={{
                  borderBottom: i < timelineItems.length - 1 ? "1px solid #f5eaea" : "none",
                }}>
                  <CheckCircle />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-cta">
          <h2>Build Consumer Trust Today</h2>
          <p>Start tracking and verifying your manufacturing process seamlessly.</p>
          <Link to="/register" className="btn-cta">Create Manufacturer Account</Link>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <p>© {new Date().getFullYear()} TraceSure. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}