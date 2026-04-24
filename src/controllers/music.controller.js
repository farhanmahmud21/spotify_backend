const musicModel=require('../model/music.model')

const jwt=require('jsonwebtoken');
const {uploadFile}=require('../service/storage.service');
const userModel = require('../model/auth.model');
const albumModel = require('../model/album.model');

async function createMusic(req,res){
    
    const {title}=req.body;
    const uri=req.file.buffer;

    const file=await uploadFile(uri.toString('base64'))

    const music=await musicModel.create({
        uri:file.url,
        title:title,
        artist:req.user.id
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

async function createAlbum(req,res){
    

const role=req.user.role;
const id=req.user.id;
const artistDetails=await userModel.findById(
    id
)

if(role!='artist'){
    res.status(403).json({
message:"You are not allowed"
    })
    }
  

const {title}=req.body
const {musics}=req.body
const musicDocs= await musicModel.find({_id:{$in :musics}})


const musicUrl=musicDocs.map(music=>music.uri)

const album=await albumModel.create({
    title:title,
    musics:musics,
    artist:id
})

res.status(201).json({
    message:"Album Created Successfully",
    album:{
        title:album.title,
        id:album._id,
        
    },
    musics:{
        ids:album.musics,
        musicUrls:musicUrl

    },
    artist:{
        id:album.artist,
        username:artistDetails.username
    }
})
}
module.exports={createMusic,createAlbum}