import express from 'express';
import mongoose from 'mongoose';
import locationsRouter from './routes/locations.js';
import 'dotenv/config';
import cors from 'cors';

const app = express();
app.use(cors());

async function connect() {
  try {
    // console.log('xxx', process.env.DATABASE_URL);
    // eslint-disable-next-line max-len
    await mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log('Connected to mongoDB');
  } catch (error) {
    console.log('error', error);
  }
}

connect();

app.use(express.json());

app.use('/locations', locationsRouter);

app.listen(8000, () => {
  console.log('Server started on port 8000');
});
