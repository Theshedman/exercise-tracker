import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import 'dotenv/config';

import exercisesRouter from './routes/exercises';
import usersRouter from './routes/users';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const { connection } = mongoose;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: https://localhost:${port}`);
});
