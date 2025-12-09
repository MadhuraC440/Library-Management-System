import express from 'express'
import User from '../models/homeModel.js'
const router=express.Router()

router.post('/details',async(req,res)=>{
    
  
  console.log(req.body)
  
  const {userId,password}=req.body
  let user = await User.findOne({"$and":[ { userId: userId },{ password: password }]});
  if(user)
    return res.status(200).json({message: true})

  res.status(500).json({message:"Credentials does not match!"})

})

export default router