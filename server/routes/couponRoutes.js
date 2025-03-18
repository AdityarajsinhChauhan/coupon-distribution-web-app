import express from "express";
import couponModel from "../models/coupon.js";
import claimModel from "../models/claim.js";

const router = express.Router();
const cooldown = 60 * 60 * 1000;

router.get("/", (req, res) => {
  res.send("You are on coupon route");
});

// Function to get the client IP
const getClientIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    return forwarded.split(",")[0]; // Extract first IP if behind a proxy
  }
  return req.socket.remoteAddress || req.ip;
};

router.post("/claim", async (req, res) => {
  const userIp = getClientIp(req);

  try {
    // Find an available coupon
    const coupon = await couponModel.findOne({ isClaimed: false });
    if (!coupon) return res.json({ message: "No coupons available" , available: false,
      allowed: true,});

    // 1️⃣ Check cooldown cookie first
    if (req.cookies.claimed) {
      return res.status(403).json({
        message: "Cooldown active, you already claimed a coupon recently.",
        available: true,
        allowed: false,
      });
    }

    // 2️⃣ Verify IP claim history in the database
    const lastClaim = await claimModel.findOne({ claimedBy: userIp }).sort({ claimedAt: -1 });
    if (lastClaim) {
      const lastClaimTime = new Date(lastClaim.claimedAt).getTime();
      const currentTime = Date.now();
      const timeLeft = cooldown - (currentTime - lastClaimTime);

      if (timeLeft > 0) {
        return res.status(403).json({
          message: "Cooldown active, try again later",
          available: true,
          allowed: false,
        });
      }
    }

    // Mark coupon as claimed
    coupon.isClaimed = true;
    await coupon.save({new:true});

    // Save claim in the database
    const newClaim = new claimModel({
      code: coupon.code,
      claimedBy: userIp,
    });
    await newClaim.save({new:true});

    // Set cooldown cookie
    res.cookie("claimed", "true", {
      maxAge: cooldown,
      httpOnly: true,
      sameSite: "strict",
    });

    return res.json({ message: `Coupon claimed successfully. Code: ${coupon.code}` });

  } catch (err) {
    return res.status(500).json({ message: "Coupon claim failed", error: err });
  }
});



export default router;
