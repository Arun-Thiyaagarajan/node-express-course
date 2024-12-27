import 'express-async-errors';
import express, { json } from 'express';
import { config } from 'dotenv';
// error handler
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/authentication.js';
//routers
import authRouter from './routes/auth.js'
import jobsRouter from './routes/jobs.js'
//connectDB
import connectDB from './db/connect.js'
// extra packages
import helmet from 'helmet';
import xss from 'xss-clean';

const app = express();
config();

app.use(json());
app.use(helmet());
app.use(xss());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('Database connected successfully');
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
};

start();
