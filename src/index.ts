import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import UserModel from './Schemas/userschema';

//! this config is used to get the port and mongoUri from the environment variables and validates them.
const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || (() => {
    throw new Error('MONGO_URI is not defined in environment variables');
  })()
} as const;

const app = express();
app.use(express.json());

//? Routes
//* auth routes
app.post('/api/v1/signup', async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await UserModel.create({ email, password });
      res.status(201).json({ message: 'User created successfully', user });
   } catch (error) {
      res.status(500).json({ message: 'Failed to create user', error });
   }
 });

app.post('/api/v1/signin', (req, res) => { });


//*ccontent routes
app.post('/api/v1/content', (req, res) => { });

app.get('/api/v1/content', (req, res) => { });

app.delete('/api/v1/content', (req, res) => { });

app.post('/api/v1/brain/share', (req, res) => { });

app.get('/api/v1/brain/:shareLink', (req, res) => { });


async function main() {
   try {
      await mongoose.connect(config.mongoUri);

      app.listen(config.port, () => {
         console.log(`Server is running on port ${config.port}`);
         console.log(`MongoDB connected`);
       });
      
   } catch (error) {
      console.error('Failed to connect to mongoDb',error);
   }
}

main();