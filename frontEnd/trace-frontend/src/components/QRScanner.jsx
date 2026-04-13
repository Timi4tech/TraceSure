import { useEffect } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"

function QRScanner() {

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    )

    scanner.render(
      (result) => { window.location.href = result },
      (error) => { console.log(error) }
    )

    return () => { scanner.clear().catch(() => {}) }
  }, [])

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .scanner-bg {
          min-height: 100vh;
          min-height: 100dvh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          font-family: Georgia, 'Times New Roman', serif;
          background: linear-gradient(155deg, #1a0a0a 0%, #3b0d0d 35%, #7f1d1d 65%, #991b1b 100%);
          position: relative;
          overflow: hidden;
        }

        .sc-blob1 {
          pointer-events: none; position: absolute;
          top: 4%; left: 4%; width: 38%; height: 38%;
          background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
          border-radius: 50%; filter: blur(20px);
        }
        .sc-blob2 {
          pointer-events: none; position: absolute;
          top: 8%; right: 6%; width: 28%; height: 28%;
          background: radial-gradient(circle, rgba(239,68,68,0.22) 0%, transparent 70%);
          border-radius: 50%; filter: blur(22px);
        }
        .sc-blob3 {
          pointer-events: none; position: absolute;
          bottom: 12%; left: 8%; width: 32%; height: 32%;
          background: radial-gradient(circle, rgba(180,30,30,0.18) 0%, transparent 70%);
          border-radius: 50%; filter: blur(22px);
        }
        .sc-blob4 {
          pointer-events: none; position: absolute;
          bottom: 10%; right: 4%; width: 30%; height: 30%;
          background: radial-gradient(circle, rgba(255,180,180,0.12) 0%, transparent 70%);
          border-radius: 50%; filter: blur(20px);
        }

        .scanner-outer-card {
          width: 100%;
          max-width: 460px;
          background: rgba(120,20,20,0.28);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 24px;
          padding: 2.5rem 2rem;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.10),
            0 24px 64px rgba(0,0,0,0.42),
            0 4px 16px rgba(0,0,0,0.22);
          position: relative;
          z-index: 1;
        }

        .scanner-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 1.75rem;
        }

        .scanner-icon-tile {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          background: rgba(185,28,28,0.45);
          border: 1px solid rgba(255,200,200,0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .scanner-title {
          font-size: clamp(20px, 5vw, 24px);
          font-weight: 700;
          color: #fff;
          margin: 0 0 3px;
          font-family: Georgia, serif;
          letter-spacing: 0.01em;
          line-height: 1.2;
        }

        .scanner-subtitle {
          font-size: 13px;
          color: rgba(255,200,200,0.58);
          margin: 0;
          font-family: Georgia, serif;
          line-height: 1.5;
        }

        .scanner-inner-card {
          background: rgba(255,255,255,0.10);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 16px;
          padding: 1.25rem;
          box-shadow: 0 2px 12px rgba(0,0,0,0.18);
          overflow: hidden;
        }

        /* Overriding html5-qrcode default styles */
        #reader {
          width: 100% !important;
          border: none !important;
          background: transparent !important;
          font-family: Georgia, serif !important;
        }

        #reader video {
          border-radius: 10px !important;
          overflow: hidden;
        }

        #reader img {
          display: none !important;
        }

        #reader__scan_region {
          background: transparent !important;
          border: none !important;
        }

        #reader__scan_region > img {
          display: none !important;
        }

        #reader__dashboard {
          padding: 10px 0 0 !important;
          background: transparent !important;
          border-top: 1px solid rgba(255,255,255,0.10) !important;
          margin-top: 10px !important;
        }

        #reader__dashboard_section_swaplink,
        #reader__dashboard_section_csr span,
        #reader__dashboard_section_fsr span {
          color: rgba(255,210,210,0.75) !important;
          font-family: Georgia, serif !important;
          font-size: 13px !important;
        }

        #reader__dashboard_section_swaplink {
          color: rgba(255,180,180,0.7) !important;
          text-decoration: underline !important;
          cursor: pointer !important;
        }

        #html5-qrcode-button-camera-permission,
        #html5-qrcode-button-camera-start,
        #html5-qrcode-button-camera-stop,
        #html5-qrcode-button-file-selection {
          background: linear-gradient(135deg, #b91c1c, #7f1d1d) !important;
          color: #fff !important;
          border: none !important;
          border-radius: 10px !important;
          padding: 9px 20px !important;
          font-family: Georgia, serif !important;
          font-size: 13px !important;
          font-weight: 700 !important;
          cursor: pointer !important;
          box-shadow: 0 4px 16px rgba(185,28,28,0.40) !important;
          letter-spacing: 0.02em !important;
          transition: opacity 0.15s !important;
          margin: 4px !important;
        }

        #html5-qrcode-button-camera-permission:hover,
        #html5-qrcode-button-camera-start:hover,
        #html5-qrcode-button-camera-stop:hover,
        #html5-qrcode-button-file-selection:hover {
          opacity: 0.88 !important;
        }

        #reader__status_span {
          color: rgba(255,200,200,0.65) !important;
          font-family: Georgia, serif !important;
          font-size: 12px !important;
          background: transparent !important;
        }

        #reader select {
          background: rgba(255,255,255,0.12) !important;
          border: 1px solid rgba(255,200,200,0.22) !important;
          border-radius: 8px !important;
          color: #fff !important;
          font-family: Georgia, serif !important;
          font-size: 13px !important;
          padding: 6px 10px !important;
          outline: none !important;
        }

        #reader__camera_selection {
          margin: 6px 4px !important;
        }

        .scanner-hint {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 1.1rem;
          padding: 10px 14px;
          background: rgba(185,28,28,0.20);
          border: 1px solid rgba(255,180,180,0.15);
          border-radius: 10px;
        }

        .scanner-hint-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f87171, #b91c1c);
          box-shadow: 0 0 6px rgba(248,113,113,0.45);
          flex-shrink: 0;
        }

        .scanner-hint-text {
          font-size: 12px;
          color: rgba(255,200,200,0.68);
          font-family: Georgia, serif;
          line-height: 1.5;
        }

        @media (max-width: 360px) {
          .scanner-outer-card {
            padding: 1.75rem 1.1rem;
            border-radius: 18px;
          }
          .scanner-inner-card {
            padding: 1rem;
            border-radius: 14px;
          }
        }
      `}</style>

      <div className="scanner-bg">
        <div className="sc-blob1" /><div className="sc-blob2" />
        <div className="sc-blob3" /><div className="sc-blob4" />

        <div className="scanner-outer-card">

          {/* Header */}
          <div className="scanner-header">
            <div className="scanner-icon-tile">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="rgba(255,200,200,0.85)" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
            </div>
            <div>
              <h1 className="scanner-title">Scan Product</h1>
              <p className="scanner-subtitle">Point your camera at a TraceSure QR code</p>
            </div>
          </div>

          {/* Scanner inner card */}
          <div className="scanner-inner-card">
            <div id="reader" />
          </div>

          {/* Hint row */}
          <div className="scanner-hint">
            <div className="scanner-hint-dot" />
            <span className="scanner-hint-text">
              Scanning will automatically redirect to the product's verification page.
            </span>
          </div>

        </div>
      </div>
    </>
  )
}

export default QRScanner