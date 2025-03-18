import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import adminModel from "../models/admin.js";
import dotenv from "dotenv";
import couponModel from "../models/coupon.js";
import claimModel from "../models/claim.js";

dotenv.config();

const router = express.Router();

router.post("/login", async (req, res) => {
    const { email , password } = req.body;
    const admin = await adminModel.findOne({ email });

    if( !admin || !(await bcrypt.compare( password , admin.password ))){
      return res.status(400).json({ message: "Invalid credentials"});
    }

    const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET , { expiresIn: "1h" });

    res.cookie("token",token, { httpOnly: true , secure: process.env.NODE_ENV === "production", sameSite: "None",}).json({message: "Login successful"});  //ask why secure false
});

router.post('/logout', (req,res) => {
  res.clearCookie("token").json({message:"Logged out"});
})

//middleware for protecting route
const authenticate = (req , res , next) => {
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({message:"not authorized", access:false});
  }

  jwt.verify(token, process.env.JWT_SECRET , (err,decoded)=>{
    if(err) {
      return res.status(403).json({message:"Invallid token" , access:false});
    }
    req.admin = decoded;
    next();
    
  })
  
}

router.get('/authorize' , authenticate ,  (req,res) => {
  res.json({ message: "Welcome Admin", access: true });
} )






router.get('/',(req,res)=>{
  res.send("you are on admin route")
})

router.post("/addcoupon", authenticate, async (req, res) => {
  const userIp = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  try {
    const newCoupon = new couponModel({
      code: req.body.code,
      ip: userIp
    });
    await newCoupon.save();
    res.status(201).json({ message: "coupon added successfully" });
  } catch (err) {
    res.json({ message: "Something went wrong while saving data", error: err });
  }
});

router.get("/getcoupons",authenticate, async (req, res) => {
  try {
    const coupons = await couponModel.find();
    res.json({coupons:coupons , message:"coupons loaded successfully"});
  } catch (err) {
    res.status(404).json({ message: "coupons not found", error: err });
  }
});

router.get("/getclaims",authenticate, async (req, res) => {
  try {
    const claims = await claimModel.find();
    res.json({claims:claims , message:"claims loaded successfully"});
  } catch (error) {
    res.status(404).json({ message: "claims not found", error: err });
  }
});

router.delete('/deleteCoupon/:id' , async (req, res) => {
  try{
    const deleteItem = await couponModel.findByIdAndDelete(req.params.id);
    if(!deleteItem){
      return res.json({message:"Item not found"});
    }
    return res.json({message:"Item deleted successfully"})

  }
  catch(err){
    return res.json({message:"Something went wrong" , error: err});

  }
});

router.put('/change/:id' , async(req,res) => {
  const id = req.params.id;
  try{
    const updateItem = await couponModel.findByIdAndUpdate(
      id , 
      { isClaimed: req.body.isClaimed} , 
      {new: true}
    )
    if(!updateItem){
      return res.json({message:"item not found"});
    }
    return res.json({message:"Coupon updated"});
  }
  catch(err){
    return res.json({message:"something went wrong" , error:err});
  }
  
})

export default router;
