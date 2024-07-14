import { useState } from 'react';
import YouTube from 'react-youtube';
import { AiFillPlayCircle } from 'react-icons/ai';

const ViewVideo = ({
  userId,
  userName,
  focusedVideo,
  setFocusedVideo,
  allVideos,
  newFocus,
}) => {
  const [newComment, setComment] = useState('');

  //comment
  function handleCommentChange(e) {
    const { value } = e.target;
    setComment(value);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch('https://videoplayaserver.cyclic.app/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            userId: userId,
            newComment: newComment,
            videoId: focusedVideo._id,
          },
        ]),
      })
        .then((res) => res.json())
        .then((data) => data !== 'poop' && setFocusedVideo(data));
    } catch (err) {
      console.log(err);
    }
    setComment('');
  }
  //Youtube Player
  let videoCode;
  // console.log(focusedVideo ? focusedVideo.videoUrl : '');
  videoCode = focusedVideo
    ? focusedVideo.videoUrl.split('v=')[1].split('&')[0]
    : '';

  const opts = {
    height: '320', //420
    width: '380', //800
    playerVars: {
      autoplay: 0,
    },
  };

  const optsForAllVideos = {
    height: '100', //420
    width: '180', //800
    playerVars: {
      autoplay: 0,
    },
  };
  console.log(allVideos);
  return (
    <div className="bg-[#131318] pb-4 md:px-20 text-slate-100">
      <p
        className="text-xl py-2 font-fredoka cursor-pointer text-purple-500"
        onClick={() => setFocusedVideo('')}
      >
        {'< back'}
      </p>
      <div className="grid grid-cols-7 gap-6">
        <div className="allVideos col-span-2 hidden md:block mr-2 h-screen overflow-scroll overflow-x-hidden">
          <p className=" bg-[#1e1e25] mb-2 rounded p-4">More Videos</p>
          {allVideos?.map((video) => (
            <div className="card bg-[#1e1e25] my-2 rounded px-2 pb-2">
              <div className="flex justify-between py-2">
                <div className="text-sm bg-[#303039] rounded-xl px-2">
                  {' '}
                  <p>{video.title}</p>
                </div>

                <p
                  onClick={() => newFocus(video)}
                  className="rounded-lg cursor-pointer text-sm text-purple-600 px-2"
                >
                  Watch{' '}
                  <AiFillPlayCircle
                    style={{
                      display: 'inline',
                      fontSize: 20,
                      paddingBottom: 2,
                    }}
                  />
                </p>
              </div>
              <div className="youtube-container pointer-events-none">
                <YouTube
                  videoId={video.videoUrl.split('v=')[1].split('&')[0]}
                  className="embed embed-youtube"
                  opts={optsForAllVideos}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="video col-span-7 md:col-span-5">
          <div className="youtube-container">
            <YouTube
              videoId={videoCode}
              className="embed embed-youtube"
              opts={opts}
            />
          </div>
          <div className="comments rounded-lg mt-4 p-4 bg-[#1b1b20]">
            <p className="text-start">Comments :</p>
            <ul className="py-2">
              {focusedVideo.comments.map((comment, index) => (
                <li key={index} className="py-2">
                  <p className="text-xs">{userName}</p>
                  <hr className="text-purple-500 w-12" />
                  <p> → {comment}</p>
                </li>
              ))}
            </ul>
            <br />
            <form onSubmit={handleSubmit}>
              <label htmlFor="newComment">Post a comment </label>
              <br />
              <input
                type="text"
                className="bg-[#2e2e34] w-[90%] h-10 text-slate-100 rounded-xl my-2 mr-2 px-1 focus:outline-none"
                id="newComment"
                onChange={handleCommentChange}
                value={newComment}
              />

              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-600 rounded-xl px-6  text-white py-2"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewVideo;
