
const express=require('express')
const musicController=require('../controllers/music.controller')

const multer=require('multer');
const router=express.Router()

const upload=multer({storage:multer.memoryStorage()});
router.post('/create-music',upload.single('music'),musicController.createMusic)

router.post('/create-album',musicController.createAlbum)

module.exports=router