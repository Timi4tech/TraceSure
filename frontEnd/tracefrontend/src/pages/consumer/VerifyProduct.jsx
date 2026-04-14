import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../../services/api"

function VerifyProduct() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    api.get(`/verify/${id}`).then((res) => setProduct(res.data))
  }, [id])

  if (!product)
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{
          background:
            "linear-gradient(135deg, #3a8be8 0%, #6a3de0 30%, #9b3dd8 55%, #c060d0 75%, #e090d8 100%)",
        }}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Spinner */}
          <div
            className="rounded-full border-4 border-white/30 border-t-white animate-spin"
            style={{ width: 44, height: 44 }}
          />
          <p
            className="text-white/80 text-sm font-medium"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Verifying product…
          </p>
        </div>
      </div>
    )

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden px-5 py-12"
      style={{
        background:
          "linear-gradient(135deg, #3a8be8 0%, #6a3de0 30%, #9b3dd8 55%, #c060d0 75%, #e090d8 100%)",
      }}
    >
      {/* Ambient glow blobs */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "4%", left: "4%",
          width: "38%", height: "38%",
          background: "radial-gradient(circle, rgba(255,255,255,0.22) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(18px)",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          top: "8%", right: "6%",
          width: "28%", height: "28%",
          background: "radial-gradient(circle, rgba(220,160,255,0.28) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(20px)",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: "12%", left: "8%",
          width: "32%", height: "32%",
          background: "radial-gradient(circle, rgba(100,160,255,0.22) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(20px)",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: "10%", right: "4%",
          width: "30%", height: "30%",
          background: "radial-gradient(circle, rgba(230,130,255,0.25) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(18px)",
        }}
      />

      {/* Outer glass card */}
      <div
        className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md rounded-3xl px-6 py-8 sm:px-8 sm:py-10"
        style={{
          background: "rgba(180,170,230,0.22)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          border: "1px solid rgba(255,255,255,0.25)",
          boxShadow:
            "0 8px 48px rgba(60,20,180,0.18), inset 0 1px 0 rgba(255,255,255,0.2)",
        }}
      >
        {/* Product name */}
        <h1
          className="text-2xl sm:text-3xl font-bold text-center mb-1"
          style={{
            color: "#2d3561",
            fontFamily: "'Sora', sans-serif",
          }}
        >
          {product.productName}
        </h1>

        {/* Manufacturer */}
        <p
          className="text-center text-sm sm:text-base mb-7"
          style={{ color: "#6b728e", fontFamily: "'DM Sans', sans-serif" }}
        >
          Manufactured by{" "}
          <span className="font-bold" style={{ color: "#2d3561" }}>
            {product.company}
          </span>
        </p>

        {/* Timeline stages */}
        <div className="flex flex-col gap-3">
          {product.stages.map((stage, index) => (
            <div key={stage.id} className="flex items-stretch gap-0">
              {/* Left: icon + vertical line */}
              <div className="flex flex-col items-center mr-0">
                {/* Green check circle */}
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-full z-10"
                  style={{
                    width: 36,
                    height: 36,
                    background: "linear-gradient(135deg, #2ecc8f, #1aaa6a)",
                    boxShadow: "0 2px 10px rgba(30,180,100,0.35)",
                    marginTop: 14,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <polyline
                      points="3,8 6.5,12 13,4"
                      stroke="white"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {/* Vertical connector line */}
                {index < product.stages.length - 1 && (
                  <div
                    style={{
                      width: 2,
                      flex: 1,
                      minHeight: 16,
                      background: "rgba(46,204,143,0.35)",
                      marginTop: 2,
                      marginBottom: -2,
                    }}
                  />
                )}
              </div>

              {/* Stage card */}
              <div
                className="flex-1 ml-3 rounded-2xl px-4 py-3 sm:px-5 sm:py-4"
                style={{
                  background: "rgba(255,255,255,0.38)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.55)",
                  boxShadow: "0 2px 12px rgba(60,20,160,0.07)",
                }}
              >
                <h2
                  className="font-bold text-sm sm:text-base leading-snug"
                  style={{
                    color: "#2d3561",
                    fontFamily: "'Sora', sans-serif",
                  }}
                >
                  {stage.stageName}
                </h2>
                <p
                  className="text-xs sm:text-sm mt-0.5"
                  style={{
                    color: "#7a82a0",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {stage.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VerifyProduct