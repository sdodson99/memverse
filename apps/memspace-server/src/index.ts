import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import { createMembersRouter } from './routes/members';
import { createAccountRouter } from './routes/account';

const app = express();
app.use(cors());

app.use('/members', createMembersRouter());
app.use('/account', createAccountRouter());

export const memspaceApi = functions.https.onRequest(app);
