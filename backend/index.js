import express from "express";
import { port } from './config.js';
import cors from 'cors';
import { DB_URL } from "./config.js";
import UserRouter from "./routes/userRoutes.js";
import BlogRouter from "./routes/blogRoutes.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use('/user',UserRouter);
app.use('/blog',BlogRouter);
app.use(cors());

app.get('/',(request,response)=>{
    //console.log(DB_URL);
    response.status(201).send('What are you sinking about!');
});


mongoose.connect(DB_URL)
.then(()=>{
    console.log('Connected to DB.');
    app.listen(port,()=>{
        console.log(`Listening on:${port}`);
    });
})
.catch((error)=>{
    console.log(error);
});

