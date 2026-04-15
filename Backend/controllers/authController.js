import Company from "../models/company.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


export const register = async(req,res)=>{

const {name,email,password} = req.body

const hashed = await bcrypt.hash(password,10)

const company = await Company.create({
name,
email,
password:hashed
})
const refreshToken = jwt.sign(
{id:company._id},
process.env.REFRESH_JWT_SECRET,
{expiresIn:"7d"}
)

const accessToken = jwt.sign(
{id:company._id},
process.env.ACCESS_JWT_SECRET,
{expiresIn:"1h"}
)

res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60* 1000,
    })
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
   
res.json(company)

}

export const login = async(req,res)=>{

const {email,password} = req.body

const company = await Company.findOne({email})

if(!company){
return res.status(400).json({message:"Invalid Email", success:false})
}

const match = await bcrypt.compare(password,company.password)

if(!match){
return res.status(400).json({message:"Invalid Password", success:false})
}
 
const refreshToken = jwt.sign(
{id:company._id},
process.env.REFRESH_JWT_SECRET,
{expiresIn:"7d"}
)

const accessToken = jwt.sign(
{id:company._id},
process.env.ACCESS_JWT_SECRET,
{expiresIn:"1h"}
)

res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60* 1000,
    })
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

  
 
res.status(200).json({ success: true });
}

export const getUser = async(req,res)=>{

try{
 
const company = await Company.findById(req.userId).select("-password")

if(!company){
return res.status(404).json({message:"Company not found"})
}

res.json(company)

}catch(err){

res.status(500).json({message:"Server error"})

}

}

export const logout = async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none", // or "lax" depending on your setup
  });
res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none", 
  });
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });

}

