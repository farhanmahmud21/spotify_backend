const mongoose=require('mongoose');



async function connectDb(){

    try{
await mongoose.connect(process.env.MONGO_URL)
console.log('Database Connected')
    }
    catch(e){
        console.log('Database Error:'+e)
    }

   
}
 module.exports=connectDb