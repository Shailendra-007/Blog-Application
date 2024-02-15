// //Midleware
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url: `mongodb+srv://${USERNAME}:${PASSWORD}@blog-app.rbfzwpt.mongodb.net/?retryWrites=true&w=majority`,
    options: { useNewUrlParser: true,useUnifiedTopology: true },
    file: (request, file) => {
        return {
            bucketName: 'photos', // Customize the bucket name as needed
            filename: `${Date.now()}-blog-${file.originalname}`,
        };
    },
});

const upload = multer({  storage });

export default upload;


// // Middleware
// import multer from 'multer';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import dotenv from 'dotenv';

// dotenv.config();
// const USERNAME= process.env.DB_USERNAME;
// const PASSWORD= process.env.DB_PASSWORD;

// const storage = new GridFsStorage({
    
//     url:`mongodb+srv://${USERNAME}:${PASSWORD}@blog-app.rbfzwpt.mongodb.net/?retryWrites=true&w=majority`,
//     options:{ useNewUrlParser: true },
//     file: (request, file) => {
//         const match = ["image/png", "image/jpg"];

//         if(match.indexOf(file.mimetype) === -1) 
//             return`${Date.now()}-blog-${file.originalname}`;

//         return {
//             bucketName: "photos",
//             filename: `${Date.now()}-blog-${file.originalname}`
//         }
//     }
// });

// export default multer({ storage }); 
