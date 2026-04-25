
const express=require('express')
const musicController=require('../controllers/music.controller')
const authMiddleware=require('../middleware/auth.middleware')
const multer=require('multer');
const router=express.Router()

const upload=multer({storage:multer.memoryStorage()});
router.post('/create-music',authMiddleware.authArtist,upload.single('music'),musicController.createMusic)

router.post('/create-album',authMiddleware.authArtist,musicController.createAlbum)
router.get('/',authMiddleware.authUser,musicController.getAllMusic)
router.get('/getAlbum',authMiddleware.authUser,musicController.getAllAlbum)
router.get('/getAlbum/:albumId',authMiddleware.authUser,musicController.getAlbumById)
module.exports=router