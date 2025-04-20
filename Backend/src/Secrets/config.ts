import dotenv from 'dotenv';
dotenv.config();

import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

if (!process.env.MONGO_URI) throw new Error("MONGO_URI missing");
if (!process.env.JWT_PASSWORD) throw new Error("JWT_PASSWORD missing");
if (!process.env.FRONTEND_URL) throw new Error("FRONTEND_URL missing");

// all the secrets are stored in the .env file
export const MONGO_URI = process.env.MONGO_URI;
export const PORT = process.env.PORT;
export const JWT_PASSWORD = process.env.JWT_PASSWORD;
export const FRONTEND_URL = process.env.FRONTEND_URL;