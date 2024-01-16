import dotenv from "dotenv";

dotenv.config({path:'./.env'});

export const port = 3333;

export const DB_URL = `mongodb+srv://pnaruka:${process.env.DB_PASS}@blogdb.fbbeqro.mongodb.net/?retryWrites=true&w=majority`