const userModel=require('../model/auth.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const cookie=require('cookie-parser');

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

async function loginUser(req, res){
    const {username,email,password}= req.body;
    const user=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(!user){{
        return res.status(401).json({
            message:"Invalid email and password"
        })
    }}
// const hash=bcrypt.hash(password)
    const pass_valid=bcrypt.compare(password,user.password)

 if(!pass_valid){
    res.status(401).json({
        message:"Invalid email and password"
    })
 }

 const token = await jwt.sign({
    id:user._id,
    role:user.role
 },process.env.JWT_SECRETKEY);
 res.cookie('token',token);


 res.status(200).json({
    message:'Logged in successfully',
    
    user:{id:user._id,
    username:user.username,
    email:user.email,
    role:user.role}
 });
}

async function logoutUser(req,res){
    res.clearCookie('token');
    res.status(200).json({
        message:"Logged Out Successfully"
    })
}
module.exports={registerUser, loginUser,logoutUser}