const musicModel=require('../model/music.model')

const jwt=require('jsonwebtoken');
const {uploadFile}=require('../service/storage.service')

async function createMusic(req,res){
    
    const token=req.cookies.token;

    if(!token){
        res.status(401).json({
            message:"Un-authorized"
        })
    }
let decode;
    try{
     decode=  jwt.verify(token,process.env.JWT_SECRETKEY)
    }
    catch(e){
        res.status(401).json({
            message:'Token Invalid'
        })
    }

    const role=decode.role

    if(role!="artist"){
        return res.status(403).json({
            message:"Forbidden"
        })
    }
    const {title}=req.body;
    const uri=req.file.buffer;

    const file=await uploadFile(uri.toString('base64'))

    const music=await musicModel.create({
        uri:file.url,
        title:title,
        artist:decode.id
    });

    res.status(201).json({
        message:"Music Created Succesfully",
        music:{
            id:music._id,
            uri:music.uri,
            title:music.title,
            artist:music.artist
        }
    })
}

module.exports={createMusic}