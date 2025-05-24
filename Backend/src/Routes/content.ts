import { Router } from "express";
import { userAuthMiddleware } from "../Middleware/middleware";
import ContentModel from "../Database/ContentModel";

const contentRouter = Router();

contentRouter.post("/content", userAuthMiddleware, async (req, res) => {
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


contentRouter.get('/content', userAuthMiddleware, async (req, res) => {
   const userId = req.userId;

   try {
      const content = await ContentModel.find({
         userId: userId
      })

      res.status(200).json({
         content: content
      });
   } catch (error) {
      res.status(500).json({ message: "Internal server error.", error });
   }
});

contentRouter.delete('/content', userAuthMiddleware, async (req, res) => {
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

export default contentRouter;