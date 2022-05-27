import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createLoginRouter } from './routes/login';
import { createServiceProvider } from './service-provider';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const serviceProvider = createServiceProvider();
app.use('/login', createLoginRouter(serviceProvider));

export const authenticationApi = functions.https.onRequest(app);
