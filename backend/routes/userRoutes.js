import express from "express";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const UserRouter = express.Router();

const createToken = (_id)=>{
    return jwt.sign({_id},process.env.SECRET_KEY,{expiresIn: '2d'});
}

UserRouter.post('/signup', async(request,response)=>{
    try{
        //console.log(request.body);
        const user = await userModel.signup(request.body);
        const token = createToken(user._id);
        return response.status(201).json({_id:user._id,email:user.email,token});
    }
    catch(error){
        console.log(error);
        response.status(500).json({
            message:error.message
        });
    }
});

UserRouter.post('/login', async (request,response)=>{
    try{
        //const {username,password} = request.body;
        //console.log("Login Route: ",request.body);
        const user = await userModel.login(request.body);
        const token = createToken(user._id)
        return response.status(201).json({_id:user._id,email:user.email,token});
    }
    catch(error){
        console.log(error);
        return response.status(404).json({message:error.message});
    }
})

export default UserRouter;