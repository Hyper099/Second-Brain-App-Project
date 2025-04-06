import bcrypt from 'bcrypt';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { JWT_PASSWORD, MONGO_URI, PORT } from './config';
import ContentModel from './Database/ContentModel';
import LinkModel from './Database/LinkModel';
import UserModel from './Database/UserModel';
import { userAuthMiddleware } from './middleware';
import { LoginSchema, SignUpSchema } from './Schemas/validationSchemas';
import hashedShareLink from './util';

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.post('/api/v1/signup', async (req, res) => {
   const result = SignUpSchema.safeParse(req.body);
   if (!result.success) {
      res.status(400).json({ error: result.error.format() });
      return;
   }
   const { email, password, firstName, lastName } = result.data;
   const hashedPassword = await bcrypt.hash(password, 10);

   try {
      await UserModel.create({ firstName, lastName, email,password: hashedPassword });
      res.status(201).json({ message: 'User created successfully' });
   } catch (error) {
      res.status(500).json({ message: 'Failed to create user', error });
   }
});

app.post("/api/v1/signin", async (req, res) => {
   const result = LoginSchema.safeParse(req.body);
   if (!result.success) {
      res.status(400).json({ error: result.error.format() });
      return;
   }

   const { email, password } = result.data;

   try {
      const existingUser = await UserModel.findOne({ email });
      if (!existingUser) {
         res.status(400).json({ message: "No User Found with such Email Id." });
         return;
      }

      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (isMatch) {
         const token = jwt.sign({ id: existingUser._id }, JWT_PASSWORD);
         res.status(200).json({
            message: "Signed In successfully.",
            token
         })
      } else {
         res.status(400).json({ message: "Incorrect Credentials." });
         return;
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

app.post('/api/v1/brain/share', userAuthMiddleware, async (req, res) => {
   const share: boolean = req.body.share;
   const userId = req.userId;
   const hash = hashedShareLink();
   try {
      if (share) {
         await LinkModel.create({
            userId,
            hash
         });

         res.status(200).json({
            shareLink: hash
         })
      } else {
         await LinkModel.deleteMany({
            userId,
            hash
         })
         res.status(200).json({
            message: "Removed Share Link Successfully."
         })
      }
   } catch (error) {
      res.status(500).json({
         message: "Error while Creating Share link."
      })
   }
});

app.get('/api/v1/brain/:shareLink', async (req, res) => {
   const { shareLink } = req.params;

   try {
      if (!shareLink) {
         res.status(400).json({ message: "No link provided." });
         return;
      }

      const LinkInfo = await LinkModel.findOne({ hash: shareLink }).populate("userId", "_id");
      if (!LinkInfo || !LinkInfo.userId) {
         res.status(404).json({ message: "Link not found." });
         return;
      }

      // Fix TypeScript error by asserting the type
      const userId = (LinkInfo.userId as { _id: mongoose.Types.ObjectId })._id;
      const content = await ContentModel.findOne({ userId: userId })

      res.status(200).json({ content });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         message: "Error while fetching share link."
      });
   }
});

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