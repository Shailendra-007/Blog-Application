import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import Connection from './database/db.js';
import Router from './routes/route.js';


dotenv.config();
const app = express();

// To handle cors security issue(request goes to Two diffrent port) we use Cors.
app.use(cors());

//To handle POST API we install body-parser and use as function.Express doesn't know to handle POST Api.
// It will handle POST API & Not need for GET API. 
app.use(bodyParser.json({ extended: true}));
app.use(bodyParser.urlencoded({ extended:true }));
app.use('/' , Router)

const PORT = 8000;

// Fetch username and password from dotenv.
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
Connection(USERNAME, PASSWORD);

app.listen(PORT , ()=> console.log(`Server is running successfully on ${PORT}`));