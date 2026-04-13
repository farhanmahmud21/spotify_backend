const express=require('express')
const authRouter=require('../src/router/auth.route')
const musicRouter=require('./router/music.route')
const cookieParser = require('cookie-parser')
const app=express()

app.use(express.json())
app.use(cookieParser());
app.use('/api/auth',authRouter)
app.use('/api/music',musicRouter)
module.exports=app