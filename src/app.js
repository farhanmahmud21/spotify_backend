const express=require('express')
const authRouter=require('./routes/auth.route')
const musicRouter=require('./routes/music.route')
const cookieParser = require('cookie-parser')
const app=express()

app.use(express.json())
app.use(cookieParser());
app.use('/api/auth',authRouter)
app.use('/api/music',musicRouter)
app.use('/api/album',musicRouter)
module.exports=app