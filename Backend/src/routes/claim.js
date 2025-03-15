const express = require("express");
const mongoose = require("mongoose");
const claimRouter = express.Router();
const Coupon = require("../models/coupon");

const getUserIP = (req) => req.headers["x-forwarded-for"] || req.socket.remoteAddress;
const COOKIE_KEY = "coupon_claimed";
const WAIT_TIME = 10 * 60 * 1000;  //(Wait-time has been kept as 10 minutes for testing purposes)

claimRouter.post("/claim", async (req, res) => {
  const session = await mongoose.startSession(); 
  session.startTransaction();

  try {
    const userIP = getUserIP(req);
    const lastClaimTime = req.cookies[COOKIE_KEY] ? parseInt(req.cookies[COOKIE_KEY]) : null;
    const currentTime = Date.now();

    if (lastClaimTime) {
      const timeElapsed = currentTime - lastClaimTime;
      const timeLeft = WAIT_TIME - timeElapsed;

      if (timeLeft > 0) {
        const minutesLeft = Math.ceil(timeLeft / 60000); 
        return res.status(429).json({
          message: `Please wait ${minutesLeft} minute(s) before claiming another coupon.`,
        });
      }
    }

 
    const lastAssignedCoupon = await Coupon.findOne().sort({ lastAssignedAt: -1 }).session(session);

    let nextCoupon;
    if (lastAssignedCoupon) {
      nextCoupon = await Coupon.findOne({ index: { $gt: lastAssignedCoupon.index } })
        .sort({ index: 1 })
        .session(session);
    }
    if (!nextCoupon) {
      nextCoupon = await Coupon.findOne().sort({ index: 1 }).session(session);
    }
    if (!nextCoupon) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "No coupons available" });
    }

   
    if (!Array.isArray(nextCoupon.assignedTo)) {
      nextCoupon.assignedTo = [];
    }

 
    nextCoupon.assignedTo.push(userIP);
    nextCoupon.lastAssignedAt = new Date();
    await nextCoupon.save({ session });

  
    await session.commitTransaction();
    session.endSession();

    res.cookie(COOKIE_KEY, currentTime.toString(), { maxAge: WAIT_TIME, httpOnly: true, secure: true,  
      sameSite: "none"});

    res.json({
      message: "Coupon claimed successfully!",
      coupon: { code: nextCoupon.couponCode, name: nextCoupon.name },
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error claiming coupon:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = claimRouter;
