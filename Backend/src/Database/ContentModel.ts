import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
   link: { type: String },
   type: { type: String },
   title: { type: String },
   tag: [{
      type: mongoose.Types.ObjectId,
      ref: 'Tags'
   }],
   userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
   }
}, {
   timestamps: { createdAt: 'addedAt', updatedAt: 'updatedAt' }
});

const ContentModel = mongoose.model("Contents", contentSchema);
export default ContentModel;
