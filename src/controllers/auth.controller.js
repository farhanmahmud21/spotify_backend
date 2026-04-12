const userModel=require('../model/auth.model')
const bcrypt=require('bcrypt')

async function registerUser(req,res){
    const {username,email,password,role='user'}=req.body

const isUserAlreadyExist=await userModel.findOne({
    $or:[
        {username},
        {email}
    ]
});

if(isUserAlreadyExist){
return res.status(409).json({
   message:'User Already Exist' 
})

}
const hash=await bcrypt.hash(password,10)

const user=await userModel.create({
    username,
    email,
    password:hash,
    role
})

res.status(201).json({
    message:'User created Successfully',

    user:{
    id:user._id,
    username:user.username,
    email:user.email,

    role:user.role}
})




}


module.exports={registerUser}