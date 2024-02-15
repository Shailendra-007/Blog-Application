
import grid from 'gridfs-stream'
import mongoose from 'mongoose';

const url = 'http://localhost:8000';

// stream the image or file in mongodb using gridfs stream.
let gfs , gridfsBucket;
const conn= mongoose.connection;
conn.once('open' , () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'photos'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('photos');

})

// Upload the image in mongodb.
export const uploadImage = (request, response) => {
    if(!request.file) 
        return response.status(404).json("File not found");
    
    const imageUrl = `${url}/file/${request.file.filename}`;

    response.status(200).json(imageUrl);    
}


// To get iamge but image is stored in chunks so to convert the binary image we install gridfs-stream
export const getImage = async (request , response) => {
    try {   
        const file = await gfs.files.findOne({ filename: request.params.filename });
        // const readStream = gfs.createReadStream(file.filename);
        // readStream.pipe(response);
        const readStream = gridfsBucket.openDownloadStream(file._id);
        // to makeimage readavle format we use pipe method.
        readStream.pipe(response);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
}










// const url = 'http://localhost:8000';

// export const uploadImage = (request, response) => {
//     if(!request.file) 
//         return response.status(404).json("File not found");
    
//     const imageUrl = `${url}/file/${request.file.filename}`;

//     response.status(200).json(imageUrl);    
// }