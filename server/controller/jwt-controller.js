


import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// import Token from '../model/token.js';

dotenv.config();

export const authenticateToken = (request, response, next) => {
    const authHeader = request.headers['authorization'];
    //To split from bearer we use split func.
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) {
        return response.status(401).json({ msg: 'token is missing' });
    }
    //Its a call back function.First Jwt verify the token with Acees secret key and it verify then 
    //go to next argument of router bY next() function call;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (error, user) => {
        if (error) {
            return response.status(403).json({ msg: 'invalid token' })
        }

        request.user = user;
        next();
    })
}