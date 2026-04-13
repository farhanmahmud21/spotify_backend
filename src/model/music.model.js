const mongoose=require("mongoose");


const musicSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    uri:{
        type:String,
        require:true
    },
    artist:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})

const musicModel=mongoose.model('music',musicSchema);


module.exports=musicModel