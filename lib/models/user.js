import mongoose from 'mongoose';
import { videoSchema } from './video';
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  uploadedVideos: [videoSchema],
  likedVideos: [videoSchema],
});

export default mongoose.models.User || mongoose.model('User', userSchema);
