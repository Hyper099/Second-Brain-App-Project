declare namespace NodeJS {
   interface ProcessEnv {
      PORT?: string;
      MONGO_URI: string;
      JWT_PASSWORD: string;
      FRONTEND_URL: string;
   }
}
