import Video from '@/lib/models/video.js';
import User from '@/lib/models/user.js';

// Create a new video
const createVideo = async (title, url, userId) => {
  const newVideo = new Video({
    title,
    url,
    userId,
  });

  try {
    const savedVideo = await newVideo.save();
    const foundUser = await User.findOne({ _id: userId });

    if (!foundUser) {
      throw new Error('User not found');
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: foundUser._id },
      { $push: { uploadedVideos: savedVideo } },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error('Error updating user');
    }

    return updatedUser;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Retrieve all videos
async function getAllVideos() {
  try {
    const allVideos = await Video.find();
    return allVideos;
  } catch (error) {
    throw error;
  }
}

// like a video
const like = async (videoId, userId) => {
  try {
    const foundVideo = await Video.findById(videoId).exec();
    if (!foundVideo) {
      return { status: 404, message: 'Video not found' };
    }

    const foundUser = await User.findById(userId).exec();
    if (!foundUser) {
      return { status: 404, message: 'User not found' };
    }

    const isLiked = foundUser.likedVideos.includes(videoId);

    const update = isLiked
      ? { $pull: { likedVideos: videoId } }
      : { $addToSet: { likedVideos: videoId } };

    const updatedUser = await User.findByIdAndUpdate(userId, update, {
      new: true,
    }).exec();

    const message = isLiked ? 'Removed from likes' : 'Added to likes';
    return { status: 200, message, user: updatedUser };
  } catch (error) {
    console.error(error);
    return { status: 500, message: 'Internal server error', error };
  }
};
//comment
const comment = async (videoId, newComment) => {
  try {
    const foundVideo = await Video.findById(videoId).exec();
    if (!foundVideo) {
      return { status: 404, message: 'Video not found' };
    }

    foundVideo.comments.push(newComment);
    const updatedVideo = await foundVideo.save();

    return { status: 200, message: 'Comment added', video: updatedVideo };
  } catch (error) {
    console.error(error);
    return { status: 500, message: 'Internal server error', error };
  }
};

// get a Video
async function getVideoWithId(id) {
  try {
    const video = await Video.findById(id);
    return video;
  } catch (error) {
    throw error;
  }
}

// Delete a Video
// async function deleteVideo(id) {
//   try {
//     const deletedVideo = await Video.findByIdAndDelete(id);
//     return deletedVideo;
//   } catch (error) {
//     throw error;
//   }
// }

export {
  getAllVideos,
  getVideoWithId,
  createVideo,
  like,
  comment,
  // deleteVideo,
};
