import { useState } from "react"
import api from "../../services/api"
import { useNavigate, Link } from "react-router-dom"

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState('')



  const login = async () => {
    setLoading('Logging in...')
    try {
      const res = await api.post("/auth/login", { email, password })
      if (res.data.success) {
        navigate("/dashboard")
      } else {
        alert(res.data.message)
      }
    } catch (err) {
      console.log(err)
      setLoading('Login failed')
      alert("Login failed")
    }finally{setLoading('Login')}
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .login-bg {
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

        .login-blob1 {
          pointer-events: none;
          position: absolute;
          top: 4%; left: 4%;
          width: 38%; height: 38%;
          background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(20px);
        }
        .login-blob2 {
          pointer-events: none;
          position: absolute;
          top: 8%; right: 6%;
          width: 28%; height: 28%;
          background: radial-gradient(circle, rgba(239,68,68,0.22) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(22px);
        }
        .login-blob3 {
          pointer-events: none;
          position: absolute;
          bottom: 12%; left: 8%;
          width: 32%; height: 32%;
          background: radial-gradient(circle, rgba(180,30,30,0.18) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(22px);
        }
        .login-blob4 {
          pointer-events: none;
          position: absolute;
          bottom: 10%; right: 4%;
          width: 30%; height: 30%;
          background: radial-gradient(circle, rgba(255,180,180,0.12) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(20px);
        }

        .outer-card {
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

        .login-title {
          font-size: clamp(24px, 7vw, 32px);
          font-weight: 700;
          color: #fff;
          text-align: center;
          margin-bottom: 8px;
          letter-spacing: 0.01em;
          line-height: 1.2;
          font-family: Georgia, serif;
        }

        .login-subtitle {
          font-size: clamp(12px, 3.5vw, 14px);
          color: rgba(255,200,200,0.62);
          text-align: center;
          margin-bottom: 24px;
          font-weight: 400;
          line-height: 1.65;
          font-family: Georgia, serif;
        }

        .inner-card {
          background: rgba(255,255,255,0.10);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 18px;
          padding: 22px 18px 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.18);
        }

        .field-group {
          margin-bottom: 18px;
        }

        .field-label-row {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 8px;
        }

        .field-label {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,235,235,0.92);
          font-family: Georgia, serif;
          letter-spacing: 0.02em;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 13px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          pointer-events: none;
        }

        .login-input {
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

        .login-input::placeholder {
          color: rgba(255,180,180,0.45);
          font-family: Georgia, serif;
        }

        .login-input:focus {
          border-color: rgba(248,113,113,0.55);
          box-shadow: 0 0 0 3px rgba(185,28,28,0.18);
          background: rgba(255,255,255,0.16);
        }

        .login-btn {
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
          transition: opacity 0.15s, transform 0.1s;
        }

        .login-btn:hover {
          opacity: 0.88;
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(185,28,28,0.55);
        }

        .login-btn:active {
          transform: scale(0.98);
          opacity: 0.92;
        }

        .register-row {
          text-align: center;
          margin-top: 20px;
          font-size: clamp(12px, 3.5vw, 13px);
          color: rgba(255,200,200,0.55);
          font-weight: 400;
          font-family: Georgia, serif;
        }

        .register-link {
          color: rgba(255,210,210,0.88);
          font-weight: 700;
          text-decoration: none;
          margin-left: 5px;
          font-family: Georgia, serif;
          border-bottom: 1px solid rgba(255,180,180,0.3);
          padding-bottom: 1px;
          transition: border-color 0.15s, color 0.15s;
        }

        .register-link:hover {
          color: #fff;
          border-color: rgba(255,200,200,0.65);
        }

        @media (max-width: 360px) {
          .outer-card {
            padding: 24px 14px 22px;
            border-radius: 18px;
          }
          .inner-card {
            padding: 16px 12px 16px;
            border-radius: 14px;
          }
        }
      `}</style>

      <div className="login-bg">
        <div className="login-blob1" />
        <div className="login-blob2" />
        <div className="login-blob3" />
        <div className="login-blob4" />

        <div className="outer-card">

          <h1 className="login-title">Login</h1>
          <p className="login-subtitle">Enter your credentials to access your account.</p>

          <div className="inner-card">

            {/* Email */}
            <div className="field-group">
              <div className="field-label-row">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="rgba(255,200,200,0.7)" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <label className="field-label">Email</label>
              </div>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(255,200,200,0.45)" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <input
                  type="email"
                  className="login-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="field-group" style={{ marginBottom: 0 }}>
              <div className="field-label-row">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="rgba(255,200,200,0.7)" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <label className="field-label">Password</label>
              </div>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(255,200,200,0.45)" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  type="password"
                  className="login-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button className="login-btn" onClick={login}>
              {loading || 'Login'}
            </button>

          </div>

          <p className="register-row">
            Don't have an account?
            <Link to="/register" className="register-link">Register ›</Link>
          </p>

        </div>
      </div>
    </>
  )
}

export default Login