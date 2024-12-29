import express, { json } from "express";
import { config } from "dotenv";
import { connectDB } from "./db/connect.js";

// .env Configuration
config();
// express.js Configuration
const app = express();

// Middleware
app.use(json());

const port = process.env.PORT || 5001;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('Database connection established!')
        app.listen(port, () =>
            console.log(`Server Listening on http://localhost:${port}`)
        );
    } catch (error) {
        console.log(error);
    }
}

start();