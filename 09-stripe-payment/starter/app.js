import { config } from 'dotenv';
import 'express-async-errors';

import express, { json, static as static_ } from 'express';
const app = express();
config();
// controller
import stripeController from './controllers/stripeController.js';
// error handler
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

app.use(json());
app.use(static_('./public'));

// stripe
app.post('/stripe', stripeController);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
