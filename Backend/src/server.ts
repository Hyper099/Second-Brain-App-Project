import mongoose from "mongoose";
import app from "./app";
import { MONGO_URI, PORT } from "./Secrets/config";

//!Server Start and DB connection.
async function main() {
   try {
      const connection = await mongoose.connect(MONGO_URI);
      console.log(`✅ MongoDB connected:`, connection.connection.name);
      app.listen(PORT, () => {
         console.log(`🚀 Server is running on port ${PORT}`);
      });
   } catch (error) {
      console.error('❌ Failed to connect to MongoDB', error);
   }
}

main();