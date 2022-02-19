import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import { createMembersRouter } from './routes/members';
import { createAccountRouter } from './routes/account';
import { errors } from 'celebrate';

const app = express();
app.use(cors());

app.use('/members', createMembersRouter());
app.use('/account', createAccountRouter());

app.use(errors());

export const memspaceApi = functions.https.onRequest(app);
