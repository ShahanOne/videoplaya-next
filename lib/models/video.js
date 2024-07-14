import mongoose from 'mongoose';
export const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  videoUrl: String,
  comments: [String],
});
export default mongoose.models.Video || mongoose.model('Video', videoSchema);
