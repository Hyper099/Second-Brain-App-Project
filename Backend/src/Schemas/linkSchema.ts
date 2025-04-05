import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
   hash: { type: String },
   userId: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required : true
   }
})

const LinkModel = mongoose.model("Links", linkSchema);

export default LinkModel;