import { Router } from "express";
import UserModel from "../Database/UserModel";
import { userAuthMiddleware } from "../Middleware/middleware";

const userRouter = Router();

userRouter.get("/details", userAuthMiddleware, async(req, res) => {
   const userId = req.userId;

   try {
      const result = await UserModel.findOne({
         _id: userId
      }).select("-password,-email");

      res.status(200).json(result);
   } catch (error) {
      res.status(500).json({
         message : "Error while Fetching details of user."
      })
   }
})

export default userRouter;
