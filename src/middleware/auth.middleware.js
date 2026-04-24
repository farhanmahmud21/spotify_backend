const jwt=require('jsonwebtoken')

async function authArtist(req,res,next){
const token=req.cookies.token

if(!token){
    return res.status(409).json({
        message:"Un authiorized"
    });
}

let decoded;

try{

    decoded=await jwt.verify(token,process.env.JWT_SECRETKEY);

}
catch(e){
    res.status(401).json({
        message:'Token Invalid'
    })
}
const role=decoded.role;
if(role!='artist'){
  return   res.status(403).json({
message:"You are not allowed"
    })
    }
req.user=decoded
    next();
}

module.exports=authArtist