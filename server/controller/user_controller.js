import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import  jwt  from 'jsonwebtoken';

import User from "../models/user.js";
import Token from '../models/token.js';

dotenv.config();

export const signupUser = async(request , response)=>{
    try {
        // const salt = await bcrypt.genSalt();
        // const hashedPassword = await bcrypt.hash(request.body.password, salt);
        const hashedPassword =await bcrypt.hash(request.body.password  , 10)
        const user = { name: request.body.name, username: request.body.username, password: hashedPassword }

        // it will Validate the user 
        const newUser = new User(user);
        await newUser.save();      

        return response.status(200).json({msg: 'SignUp successfully' });
    } catch (error) {
        // console.log(error);
        return response.status(500).json({msg: 'Error while sign Up the user' , error});
    }
}

//Fetch details from data base to check the user exists or not.
export const loginUser = async(request  ,  response) =>{

    // let user = contains all values of that particular user we want. 
    let user = await User.findOne({ username: request.body.username});
    if(!user){
        // Username not found it return the response.
        return response.status(400).json({msg: 'Username not matched'});
    }
    // If username found then check the password.
    try {
        let match = await bcrypt.compare(request.body.password , user.password);
        if(match){
            // Here we use Jwt authentication and its tokens.
            // accessToken is not permanent and it will expired by given time. To generate again the access token we use refresh Token if it exists.
            // jwt.sign take two argument (Body in JSON format , secret key); 
            const accessToken = jwt.sign(user.toJSON() , process.env.ACCESS_TOKEN_SECRET_KEY , { expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON() , process.env.REFRESH_TOKEN_SECRET_KEY);

            const newToken = new Token({ token: refreshToken});
            await newToken.save();
            // Now if refresh token not exist then we do no generate access token and user not access our application.
            // and if refresh token exists then we generate access token and give access to our applicaton;
            
            return response.status(200).json({ accessToken: accessToken , refreshToken: refreshToken , name:user.name , username: user.username});
        }else{
            return response.status(400).json({ msg: 'Password not matched'});
        }
    } catch (error) {
        return response.status(500).json({msg: 'Error while login in user'});
    }
};
