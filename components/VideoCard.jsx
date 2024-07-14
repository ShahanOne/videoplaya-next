import { useState } from 'react';
// import YouTubePlayer from './YoutubePlayer';
import YouTube from 'react-youtube';

const VideoCard = ({ videoUrl, videoTitle, onLike, onView }) => {
  const [heart, setHeart] = useState('♡');

  let videoCode;
  videoUrl
    ? (videoCode = videoUrl.split('v=')[1].split('&')[0])
    : console.log();

  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };
  function handleHeart() {
    if (heart === '♡') {
      setHeart('❤️');
    } else if (heart === '❤️') {
      setHeart('♡');
    }
  }
  return (
    <div className="shadow-[0_10px_30px_rgba(140, 82, 255, 0.9)] bg-[rgb(14,19,19)] sm:w-[23rem] mx-2 sm:mx-4 my-8 text-center rounded-lg px-1 py-2 sm:hover:-translate-y-1 hover:transition-transform duration-1000">
      <div className="youtube-container">
        <YouTube
          className="embed embed-youtube"
          videoId={videoCode}
          // containerClassName="embed embed-youtube"
          opts={opts}
        />
      </div>
      <p className="text-md sm:text-xl sm:mb-2 text-gray-300"> {videoTitle}</p>
      <a
        href={videoUrl}
        className="text-sm md:text-lg font-sans font-semibold text-slate-300 hover:text-slate-400"
      >
        Watch on Youtube▶️
      </a>
      <div className="p-2 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onLike() && handleHeart()}
          className="bg-[#242929] shadow-md hover:bg-[#2C3333] text-slate-200 active:translate-y-1 text-xs sm:text-base py-3 rounded-2xl border-none"
        >
          Like {heart}
        </button>
        <button
          type="button"
          onClick={() => onView()}
          className="bg-[#242929] shadow-md hover:bg-[#2C3333] text-slate-200 active:translate-y-1 text-xs sm:text-base py-3 rounded-2xl border-none"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
