import express, { json } from "express";
import { connectDB } from "./db/connect.js";

const app = express();

app.use(json());

const port = process.env.PORT || 5001;

const start = async () => {
    try {
        // await connectDB()
        app.listen(port, () =>
            console.log(`Server Listening on http://localhost:${port}`)
        );
    } catch (error) {
        console.log(error);
    }
}

start();