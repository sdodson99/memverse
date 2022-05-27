import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createMembersRouter } from './routes/members';
import { createAccountRouter } from './routes/account';
import { errors } from 'celebrate';
import { createServiceProvider } from './service-provider';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const serviceProvider = createServiceProvider();

app.use('/members', createMembersRouter(serviceProvider));
app.use('/account', createAccountRouter(serviceProvider));

app.use(errors());

export const memspaceApi = functions.https.onRequest(app);
