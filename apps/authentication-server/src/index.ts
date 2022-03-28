import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import { createLoginRouter } from './routes/login';
import { createServiceProvider } from './service-provider';

const app = express();
app.use(cors());

const serviceProvider = createServiceProvider();
app.use('/login', createLoginRouter(serviceProvider));

export const authenticationApi = functions.https.onRequest(app);
