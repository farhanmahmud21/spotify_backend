const Imagekit=require('@imagekit/nodejs')

const imagekit=Imagekit({
    privateKey:process.env.ImageKit_PRIVATEKEY
});


async function uploadFile(file){
    const response=await imagekit.files.upload({
        file:file,
        fileName:"music_"+Date.now(),
        folder:"Spotify/music"
    })

    return response;
}


module.exports={uploadFile}