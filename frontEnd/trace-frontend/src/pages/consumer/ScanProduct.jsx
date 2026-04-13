import QRScanner from "../../components/QRScanner"

function ScanProduct() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .scan-bg {
          min-height: 100vh;
          min-height: 100dvh;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          background: linear-gradient(135deg, #4a90e2 0%, #7b4fe8 40%, #c070d8 70%, #e8a0e0 100%);
        }

        .scan-title {
          font-family: 'Sora', sans-serif;
          font-size: clamp(24px, 7vw, 36px);
          font-weight: 700;
          color: #fff;
          margin-bottom: clamp(20px, 5vw, 36px);
          letter-spacing: 0.02em;
          text-shadow: 0 2px 16px rgba(80, 40, 180, 0.25);
          text-align: center;
        }

        .scan-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 28px;
          padding: clamp(24px, 6vw, 40px) clamp(20px, 6vw, 40px) clamp(20px, 5vw, 32px);
          width: 100%;
          max-width: 340px;
          background: rgba(255, 255, 255, 0.13);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.28);
          box-shadow: 0 8px 48px rgba(80, 40, 200, 0.18);
        }

        /* Corner brackets */
        .corner {
          position: absolute;
          width: 28px;
          height: 28px;
        }
        .corner-tl {
          top: 16px; left: 16px;
          border-top: 3px solid rgba(255,255,255,0.85);
          border-left: 3px solid rgba(255,255,255,0.85);
          border-radius: 4px 0 0 0;
        }
        .corner-tr {
          top: 16px; right: 16px;
          border-top: 3px solid rgba(255,255,255,0.85);
          border-right: 3px solid rgba(255,255,255,0.85);
          border-radius: 0 4px 0 0;
        }
        .corner-bl {
          bottom: 44px; left: 16px;
          border-bottom: 3px solid rgba(255,255,255,0.85);
          border-left: 3px solid rgba(255,255,255,0.85);
          border-radius: 0 0 0 4px;
        }
        .corner-br {
          bottom: 44px; right: 16px;
          border-bottom: 3px solid rgba(255,255,255,0.85);
          border-right: 3px solid rgba(255,255,255,0.85);
          border-radius: 0 0 4px 0;
        }

        .scan-viewport {
          width: min(240px, 72vw);
          height: min(240px, 72vw);
          border-radius: 16px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 4px 32px rgba(80, 40, 200, 0.18);
        }

        .scan-caption {
          margin-top: clamp(16px, 4vw, 24px);
          font-family: 'Sora', sans-serif;
          font-size: clamp(12px, 3.5vw, 14px);
          color: rgba(255, 255, 255, 0.82);
          text-align: center;
          letter-spacing: 0.01em;
          line-height: 1.5;
        }
      `}</style>

      <div className="scan-bg">
        <h1 className="scan-title">Scan Product</h1>

        <div className="scan-card">
          <span className="corner corner-tl" />
          <span className="corner corner-tr" />
          <span className="corner corner-bl" />
          <span className="corner corner-br" />

          <div className="scan-viewport">
            <QRScanner />
          </div>

          <p className="scan-caption">Scan the product's QR code</p>
        </div>
      </div>
    </>
  )
}

export default ScanProduct