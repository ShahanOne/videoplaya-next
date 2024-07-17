import { useState, useEffect } from 'react';
import SkeletonCard from './SkeletonCard';
import VideoCard from './VideoCard';
import { toast } from 'react-toastify';

const Videos = ({ seed, onLike, onView, sendVideos }) => {
  const [videoInfo, setVideoInfo] = useState('');

  useEffect(() => {
    async function getVideosInfo() {
      const response = await fetch('/api/all-videos');
      if (!response.ok) {
        toast.error('There was an error, fetching the videos');
      }
      const data = await response.json();
      setVideoInfo(data);
      sendVideos(data); //sending videos data to parent
    }
    getVideosInfo();
  }, [seed]);

  //   console.log(videoInfo);
  return (
    <>
      {videoInfo ? (
        <div className="bg-[#17171e] gap-8 px-2 md:px-28 lg:px-36 grid grid-cols-2 lg:grid-cols-3 pt-8">
          {videoInfo.map((video, index) => (
            <VideoCard
              key={index}
              videoTitle={video.title}
              videoUrl={video.videoUrl}
              onLike={() => onLike(video)}
              onView={() => onView(video)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#17171e] px-2 md:px-28 lg:px-40 grid grid-cols-2 lg:grid-cols-3 pt-8">
          <SkeletonCard /> <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
          <SkeletonCard /> <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
          <SkeletonCard /> <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
        </div>
      )}
    </>
  );
};

export default Videos;
