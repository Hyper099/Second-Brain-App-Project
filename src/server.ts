import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { JWT_PASSWORD, MONGO_URI, PORT } from './config';
import { userAuthMiddleware } from './middleware';
import ContentModel from './Schemas/contentSchema';
import UserModel from './Schemas/userSchema';

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

app.post("/api/v1/signin", async (req, res) => {
   const { email, password } = req.body;
   try {
      const existingUser = await UserModel.findOne({ email, password });
      if (existingUser) {
         const token = jwt.sign({ id: existingUser._id }, JWT_PASSWORD)

         res.status(200).json({ "message": "SignedIn Successfully", token });
      } else {
         res.status(403).json({
            message: "Incorrect credentials"
         })
      }
   } catch (error) {
      res.status(500).json({
         message: "Internal server error",
         error
      })
   }

})


//*content routes
app.post("/api/v1/content", userAuthMiddleware, async (req, res) => {
   try {
      const { link, title, type } = req.body;
      //@ts-ignore
      const userId = req.userId;

      const newContent = await ContentModel.create({
         link,
         title,
         type,
         userId,
         tags: []
      });


      res.status(200).json({ message: "Content Added Successfully.", content: newContent });
   } catch (error) {
      console.error("❌ Error inserting content:", error);
      res.status(500).json({ message: "Error while adding content.", error });
   }
});


app.get('/api/v1/content', userAuthMiddleware, async (req, res) => {
   //@ts-ignore
   const userId = req.userId;

   try {
      const content = await ContentModel.findOne({
         userId: userId
      }).populate("userId", "email");

      res.status(200).json({
         content: content
      });
   } catch (error) {
      res.status(500).json({ message: "Internal server error.", error });
   }


});

app.delete('/api/v1/content', userAuthMiddleware, async (req, res) => {
   // @ts-ignore
   const userId = req.userId;
   const { contentId } = req.body;

   try {
      await ContentModel.deleteMany({
         _id: contentId,
         userId: userId
      });

      res.status(200).json({ message: "Deleted Successfully." });
   } catch (error) {
      res.status(500).json({ message: "Error while deleting content.", error });
   }
});

app.post('/api/v1/brain/share', (req, res) => { });

app.get('/api/v1/brain/:shareLink', (req, res) => { });




//!Server Start and DB connection.
async function main() {
   try {
      const connection = await mongoose.connect(MONGO_URI);
      console.log(`✅ MongoDB connected:`, connection.connection.name); // Add this
      app.listen(PORT, () => {
         console.log(`🚀 Server is running on port ${PORT}`);
      });
   } catch (error) {
      console.error('❌ Failed to connect to MongoDB', error);
   }
}

main();