import { useState,useEffect } from "react"
import api,{initCsrf}from "../../services/api"
import { useNavigate, Link } from "react-router-dom"

function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    initCsrf()
  }, [])
 

  const register = async () => {
    try {
      await api.post("/auth/register", { name, email, password })
      navigate("/login")
    } catch (err) {
      console.log(err)
      alert("Registration failed")
    }
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .register-bg {
          min-height: 100vh;
          min-height: 100dvh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 16px;
          font-family: Georgia, 'Times New Roman', serif;
          background: linear-gradient(155deg, #1a0a0a 0%, #3b0d0d 35%, #7f1d1d 65%, #991b1b 100%);
          position: relative;
          overflow: hidden;
        }

        .reg-blob1 {
          pointer-events: none;
          position: absolute;
          top: 4%; left: 4%;
          width: 38%; height: 38%;
          background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(20px);
        }
        .reg-blob2 {
          pointer-events: none;
          position: absolute;
          top: 8%; right: 6%;
          width: 28%; height: 28%;
          background: radial-gradient(circle, rgba(239,68,68,0.22) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(22px);
        }
        .reg-blob3 {
          pointer-events: none;
          position: absolute;
          bottom: 12%; left: 8%;
          width: 32%; height: 32%;
          background: radial-gradient(circle, rgba(180,30,30,0.18) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(22px);
        }
        .reg-blob4 {
          pointer-events: none;
          position: absolute;
          bottom: 10%; right: 4%;
          width: 30%; height: 30%;
          background: radial-gradient(circle, rgba(255,180,180,0.12) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(20px);
        }

        .register-outer-card {
          width: 100%;
          max-width: 400px;
          background: rgba(120,20,20,0.28);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 24px;
          padding: 36px 28px 28px;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.10),
            0 24px 64px rgba(0,0,0,0.40),
            0 4px 16px rgba(0,0,0,0.20);
          position: relative;
          z-index: 1;
        }

        .register-title {
          font-size: clamp(22px, 6.5vw, 30px);
          font-weight: 700;
          color: #fff;
          text-align: center;
          margin-bottom: 8px;
          letter-spacing: 0.01em;
          line-height: 1.2;
          font-family: Georgia, serif;
        }

        .register-subtitle {
          font-size: clamp(12px, 3.5vw, 14px);
          color: rgba(255,200,200,0.62);
          text-align: center;
          margin-bottom: 22px;
          font-weight: 400;
          line-height: 1.65;
          font-family: Georgia, serif;
        }

        .register-inner-card {
          background: rgba(255,255,255,0.10);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 18px;
          padding: 20px 18px 18px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.18);
        }

        .reg-field-group {
          margin-bottom: 16px;
        }

        .reg-field-label-row {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 7px;
        }

        .reg-field-label {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,235,235,0.92);
          font-family: Georgia, serif;
          letter-spacing: 0.02em;
        }

        .reg-input-wrapper {
          position: relative;
        }

        .reg-input-icon {
          position: absolute;
          left: 13px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          pointer-events: none;
        }

        .register-input {
          width: 100%;
          padding: 11px 12px 11px 40px;
          border-radius: 10px;
          border: 1px solid rgba(255,200,200,0.22);
          background: rgba(255,255,255,0.12);
          font-family: Georgia, serif;
          font-size: clamp(13px, 3.5vw, 14px);
          color: #fff;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          -webkit-appearance: none;
          appearance: none;
          box-sizing: border-box;
        }

        .register-input::placeholder {
          color: rgba(255,180,180,0.45);
          font-family: Georgia, serif;
        }

        .register-input:focus {
          border-color: rgba(248,113,113,0.55);
          box-shadow: 0 0 0 3px rgba(185,28,28,0.18);
          background: rgba(255,255,255,0.16);
        }

        .register-btn {
          width: 100%;
          padding: 13px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #b91c1c, #7f1d1d);
          color: #fff;
          font-family: Georgia, serif;
          font-size: clamp(14px, 4vw, 15px);
          font-weight: 700;
          cursor: pointer;
          margin-top: 8px;
          box-shadow: 0 4px 20px rgba(185,28,28,0.45);
          letter-spacing: 0.02em;
          -webkit-tap-highlight-color: transparent;
          transition: opacity 0.15s, transform 0.1s, box-shadow 0.15s;
        }

        .register-btn:hover {
          opacity: 0.88;
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(185,28,28,0.55);
        }

        .register-btn:active {
          transform: scale(0.98);
          opacity: 0.92;
        }

        .login-row {
          text-align: center;
          margin-top: 18px;
          font-size: clamp(12px, 3.5vw, 13px);
          color: rgba(255,200,200,0.55);
          font-weight: 400;
          font-family: Georgia, serif;
        }

        .login-link {
          color: rgba(255,210,210,0.88);
          font-weight: 700;
          text-decoration: none;
          margin-left: 5px;
          font-family: Georgia, serif;
          border-bottom: 1px solid rgba(255,180,180,0.3);
          padding-bottom: 1px;
          transition: border-color 0.15s, color 0.15s;
        }

        .login-link:hover {
          color: #fff;
          border-color: rgba(255,200,200,0.65);
        }

        @media (max-width: 360px) {
          .register-outer-card {
            padding: 24px 14px 20px;
            border-radius: 18px;
          }
          .register-inner-card {
            padding: 16px 12px 14px;
            border-radius: 14px;
          }
        }
      `}</style>

      <div className="register-bg">
        <div className="reg-blob1" />
        <div className="reg-blob2" />
        <div className="reg-blob3" />
        <div className="reg-blob4" />

        <div className="register-outer-card">

          <h1 className="register-title">Register Company</h1>
          <p className="register-subtitle">Create your account to start tracking your products.</p>

          <div className="register-inner-card">

            {/* Company Name */}
            <div className="reg-field-group">
              <div className="reg-field-label-row">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="rgba(255,200,200,0.7)" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M3 9h18M9 21V9"/>
                </svg>
                <label className="reg-field-label">Company Name</label>
              </div>
              <div className="reg-input-wrapper">
                <span className="reg-input-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(255,200,200,0.45)" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <path d="M3 9h18M9 21V9"/>
                  </svg>
                </span>
                <input
                  type="text"
                  className="register-input"
                  placeholder="Enter your company name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div className="reg-field-group">
              <div className="reg-field-label-row">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="rgba(255,200,200,0.7)" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <label className="reg-field-label">Email</label>
              </div>
              <div className="reg-input-wrapper">
                <span className="reg-input-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(255,200,200,0.45)" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <input
                  type="email"
                  className="register-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="reg-field-group" style={{ marginBottom: 0 }}>
              <div className="reg-field-label-row">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="rgba(255,200,200,0.7)" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <label className="reg-field-label">Password</label>
              </div>
              <div className="reg-input-wrapper">
                <span className="reg-input-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(255,200,200,0.45)" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  type="password"
                  className="register-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button className="register-btn" onClick={register}>
              Register
            </button>

          </div>

          <p className="login-row">
            Already have an account?
            <Link to="/login" className="login-link">Login ›</Link>
          </p>

        </div>
      </div>
    </>
  )
}

export default Register