import { config } from 'dotenv';
import 'express-async-errors';
import express, { json } from 'express';

const app = express();
config();
// error handler
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

app.use(json());

// routes
app.get('/', (req, res) => {
  res.send('<h1>Email Project</h1>');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
