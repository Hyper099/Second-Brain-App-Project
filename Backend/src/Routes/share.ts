import { Router } from "express";
import mongoose from "mongoose";
import ContentModel from "../Database/ContentModel";
import LinkModel from "../Database/LinkModel";
import { userAuthMiddleware } from "../Middleware/middleware";
import hashedShareLink from "../Utils/util";

const shareRouter = Router();

shareRouter.post('/share', userAuthMiddleware, async (req, res) => {
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

shareRouter.get('/:shareLink', async (req, res) => {
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

export default shareRouter;