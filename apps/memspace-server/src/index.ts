import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import { createMembersRouter } from './routes/members';
import { createAccountRouter } from './routes/account';
import { errors } from 'celebrate';
import { createServiceProvider } from './service-provider';

const app = express();
app.use(cors());

const serviceProvider = createServiceProvider();

app.use('/members', createMembersRouter(serviceProvider));
app.use('/account', createAccountRouter(serviceProvider));

app.use(errors());

export const memspaceApi = functions.https.onRequest(app);
