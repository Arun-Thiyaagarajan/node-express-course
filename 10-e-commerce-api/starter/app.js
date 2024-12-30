import express, { json } from "express";
import { config } from "dotenv";
import { connectDB } from "./db/connect.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import 'express-async-errors';
import morgan from "morgan";
import authRouter from './routes/authRoutes.js';

// .env Configuration
config();
// express.js Configuration
const app = express();

// Other Middleware
app.use(morgan('tiny'));
app.use(json());

// Routes
app.use('/api/v1/auth', authRouter);

app.get('/', (req, res) => {
    res.send('E-Commerce API');
});



// Error Handling Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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