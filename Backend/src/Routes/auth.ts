import bcrypt from "bcrypt";
import { Router } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserModel from "../Database/UserModel";
import { LoginSchema, SignUpSchema } from "../Schemas/validationSchemas";
import { JWT_PASSWORD } from "../Secrets/config";

const authRouter = Router();

authRouter.post('/signup', async (req, res) => {
   const result = SignUpSchema.safeParse(req.body);
   if (!result.success) {
      res.status(400).json({ error: result.error.format() });
      return;
   }
   const { email, password, firstName, lastName } = result.data;
   const hashedPassword = await bcrypt.hash(password, 10);

   try {
      await UserModel.create({ firstName, lastName, email, password: hashedPassword });
      res.status(201).json({ message: 'User created successfully' });
   } catch (error) {
      res.status(500).json({ message: 'Failed to create user', error });
   }
});

authRouter.post("/signin", async (req, res) => {
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

authRouter.post("/verify-token", (req, res) => {
   const header = req.headers["authorization"];
   const decoded = jwt.verify(header as string, JWT_PASSWORD)
   if (decoded) {
      res.status(200).json({ valid: true, id: (decoded as JwtPayload).id });
   } else {
      res.status(403).json({
         message: "You are not logged in"
      })
   }
});

export default authRouter;