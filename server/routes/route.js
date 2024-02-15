import express from 'express';
import { signupUser , loginUser } from "../controller/user_controller.js";
import { uploadImage, getImage } from '../controller/image-controller.js';
import { createPost , getAllPosts , getPost } from '../controller/post-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';

import  upload from "../utils/upload.js"

const router = express.Router();

router.post('/signup' , signupUser);
router.post('/login' , loginUser);

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename' , getImage);

router.post('/create',authenticateToken, createPost);

router.get('/posts' , authenticateToken , getAllPosts);
router.get('/post/:id' , authenticateToken , getPost);

export default router;





//Router take three argument :- 1)routing  2)Middleware 3)API call name

//For middleware :- npm i multer-gridfs-storage
//Gridfs storage engine for multer to store uploaded files direfctly to MongoDb.

// For Image upload we make a midleware to convert the image (binary) to image and upload to mongo db and check type of image
// and check the image able to upload and for changing the name of image file.