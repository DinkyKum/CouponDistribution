const express= require('express');
const couponRouter= express.Router();
const Coupon= require('../models/coupon');


couponRouter.get("/view/coupons", async (req, res) => {
    try {
      const coupons = await Coupon.find({}, "couponCode name"); // Fetch only code and name
      res.status(200).json(coupons);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  });

couponRouter.post("/add/coupons", async (req, res) => {
    try {
      const {couponCode, name, index} = req.body;
 
      if (!couponCode || !name || index === undefined) {
        return res.status(400).json({ message: "Code, name, and index are required" });
      }
  
      const newCoupon = new Coupon({
        couponCode,
        name,
        index,
        lastAssignedAt: new Date() 
      });
  
      await newCoupon.save();
      res.status(201).json({ message: "Coupon added successfully!", coupon: newCoupon });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  });
  
  
module.exports= couponRouter;