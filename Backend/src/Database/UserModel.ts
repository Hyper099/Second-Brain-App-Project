import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   firstName: { type: String },
   lastName : {type : String},
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true }
});

const UserModel = mongoose.model("Users", userSchema);

export default UserModel;