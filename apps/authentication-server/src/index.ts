import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import { createLoginRouter } from './routes/login';

const app = express();
app.use(cors());

app.use('/login', createLoginRouter());

export const authenticationApi = functions.https.onRequest(app);
