import jwt from "jsonwebtoken";
import redis from "./redisClient.js"

// Middleware: protect routes + refresh access token if expired
export const protect = (req, res, next) => {
  // Access token from Authorization header

  // Refresh token from HTTP-only cookie
  const refreshToken = req.cookies?.refreshToken;
  const accessToken =  req.cookies?.accessToken

  if (!accessToken && !refreshToken) {
    return res.status(401).json({ message: "Not authorized" });
  }

  if (accessToken) {
    try {
      // Verify access token
      const decoded = jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET);
      req.user = decoded;
      req.userId = decoded.id
      return next(); // token valid → continue
    } catch (err) {
      // If token expired or invalid, try refresh
      if (err.name === "TokenExpiredError" && refreshToken) {
        try {
          const decodedRefresh = jwt.verify(
            refreshToken,
            process.env.REFRESH_JWT_SECRET
          );

          // Issue new access token
          const newAccessToken = jwt.sign(
            { id: decodedRefresh.id },
            process.env.ACCESS_JWT_SECRET,
            { expiresIn: "1h" }
          );

          // Send new access token as cookie
          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 60 * 1000, // 1 hour
          });

          // Attach user to request
          req.user = decodedRefresh;
          req.userId = decodedRefresh.id
          return next();
        } catch (refreshErr) {
          return res
            .status(401)
            .json({ message: "Refresh token invalid or expired" });
        }
      }

      return res.status(401).json({ message: "Access token invalid" });
    }
  } else {
    return res.status(401).json({ message: "No access token provided" });
  }
};



const LIMIT = 10
const REFILL_RATE = 1 // per second

export const rateLimiter = async (req, res, next) => {
  const userId = req.userId || req.ip
  const key = `rate:${userId}`
  const now = Date.now()

  let data = await redis.get(key)

if (data) {
  data = JSON.parse(data)
} else {
  data = {
    tokens: LIMIT,
    lastRefill: now
  }
}

  // refill logic
  const timePassed = (now - data.lastRefill) / 1000
  const refill = Math.floor(timePassed * REFILL_RATE)
  
  data.tokens = Math.min(LIMIT, data.tokens + refill)
  data.lastRefill = now
  
  if (data.tokens <= 0) {
    return res.status(429).json({
      message: "Too many requests"
    })
  }

  data.tokens--

  await redis.set(key, JSON.stringify(data), {
    ex: 300 // 5 minutes expiry
  })

  next()
}