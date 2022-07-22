import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createServiceProvider } from './service-provider';

admin.initializeApp();

const serviceProvider = createServiceProvider();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/login', serviceProvider.resolveLoginRouter());

export const authenticationApi = functions.https.onRequest(app);

const updateMemberClaimsJob = serviceProvider.resolveUpdateMemberClaimsJob();

export const updateMemberClaimsJobFunction = functions.pubsub
  .schedule('0 6 * * *') // Every day at 6:00 am
  .onRun(() => updateMemberClaimsJob.run());
