import express from "express";
import claimModel from "../models/claim.js";
import couponModel from "../models/coupon.js";

const router = express.Router();
const cooldown = 60 * 60 * 1000;

router.get("/", (req, res) => {
  res.send("You are on claims route");
});

// Function to get the client IP
const getClientIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    return forwarded.split(",")[0]; // Extract first IP if behind a proxy
  }
  return req.socket.remoteAddress || req.ip;
};

router.post("/check", async (req, res) => {
  const userIp = getClientIp(req);

  try {
    // Check coupon availability
    const availableCoupon = await couponModel.findOne({ isClaimed: false });
    if (!availableCoupon) {
      return res.json({ available: false, message: "No coupons available" });
    }

    // 1️⃣ Check cooldown cookie first
    if (req.cookies.claimed) {
      return res.json({
        message: "Cooldown active! You can only claim a coupon once per hour.",
        available: true,
        allowed: false,
      });
    }

    // 2️⃣ Check last claim by IP
    const lastClaim = await claimModel.findOne({ claimedBy: userIp }).sort({ claimedAt: -1 });
    if (lastClaim) {
      const lastClaimTime = new Date(lastClaim.claimedAt).getTime();
      const currentTime = Date.now();
      const timeLeft = cooldown - (currentTime - lastClaimTime);

      if (timeLeft > 0) {
        return res.json({
          message: "Cooldown active! You can only claim a coupon once per hour.",
          available: true,
          allowed: false,
        });
      }
    }

    return res.json({
      message: "",
      available: true,
      allowed: true,
    });
  } catch (err) {
    return res.json({ message: "Something went wrong", error: err });
  }
});


export default router;
