const express=require('express');
const router=express.Router();
const User=require('../models/users')
const { body, validationResult } = require('express-validator');// to validate the data enterd

router.post('/createuser', 

[body('email').isEmail()
],

async (req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

try{
  await User.create(
    {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        location:req.body.location
    }
  )
  res.json({success:true});
}
catch(e){
console.log(e)
res.json({success:false});
}
})

router.post('/loginuser', async(req,res)=>{
  let email= req.body.email
  try{
    let userdata= await User.findOne({email}) 
    if(!userdata)
    {
      return res.status(400).json({error:"Try logging with another credientials"})
    }
    if(req.body.password !==userdata.password)
    {
      return res.status(400).json({error:"Try logging with another credientials"})
    }
return res.json({success:true});
  }catch(error){
        console.log(error)
        res.json({success:false});
  }
})

module.exports=router;