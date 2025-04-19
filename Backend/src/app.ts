import cors from 'cors';
import express from 'express';
import authRouter from './Routes/auth';
import contentRouter from './Routes/content';
import shareRouter from './Routes/share';
import userRouter from './Routes/user';

const app = express();

// Middleware
app.use(express.json());
const allowedOrigins = [
   "http://localhost:5173",
   "https://second-brain-app-project.vercel.app"
];

app.use(cors({
   origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
         callback(null, true);
      } else {
         callback(new Error("Not allowed by CORS"));
      }
   },
   credentials: true
}));

// Routes
app.use("/api/v1/", authRouter);
app.use("/api/v1/", contentRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/brain", shareRouter);

export default app;