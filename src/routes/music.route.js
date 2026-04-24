
const express=require('express')
const musicController=require('../controllers/music.controller')
const authMiddleware=require('../middleware/auth.middleware')
const multer=require('multer');
const router=express.Router()

const upload=multer({storage:multer.memoryStorage()});
router.post('/create-music',authMiddleware,upload.single('music'),musicController.createMusic)

router.post('/create-album',authMiddleware,musicController.createAlbum)

module.exports=router