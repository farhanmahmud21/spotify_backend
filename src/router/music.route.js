
const express=require('express')
const muiscController=require('../controllers/music.controller')
const multer=require('multer');
const router=express.Router()

const upload=multer({storage:multer.memoryStorage()});
router.post('/create-music',upload.single('music'),muiscController.createMusic)



module.exports=router