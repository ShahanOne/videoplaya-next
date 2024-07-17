import { useState } from 'react';
import { TbRefresh } from 'react-icons/tb';
import Navbar from './Navbar';
import Videos from './Videos';
import UploadNewVideo from './UploadVideo';
import MyLikes from './MyLikes';
import Footer from './Footer';
import ViewVideo from './ViewVideo';
const UserPage = ({
  userId,
  userName,
  newUserData,
  likedVideos,
  handleSignOut,
}) => {
  const [isUploadClicked, setUploadClick] = useState(false);
  const [isMyLikesClicked, setMyLikesClick] = useState(false);
  const [focusedVideo, setFocusedVideo] = useState();
  const [allVideos, setAllVideos] = useState();
  const [seed, setSeed] = useState(1);

  function handleHome() {
    setMyLikesClick(false);
    setUploadClick(false);
  }
  function handleNewVideo() {
    setUploadClick(true);
    setMyLikesClick(false);
  }
  function handleMyLikes() {
    setMyLikesClick(true);
    setUploadClick(false);
  }

  function handleRerender() {
    setSeed(Math.random());
    setUploadClick(false);
    setMyLikesClick(false);
  }

  function handleView(video) {
    // console.log(video);
    setFocusedVideo(video);
  }
  function allvideos(videos) {
    setAllVideos(videos);
  }
  function newFocus(video) {
    setFocusedVideo(video);
  }
  //Add to Likes
  async function handlelike(video) {
    try {
      const res = await fetch('/api/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            userId: userId,
            videoId: video._id,
          },
        ]),
      })
        .then((res) => res.json())
        .then((data) => data !== 'poop' && newUserData(data));
    } catch (err) {
      console.log(err);
    }
  }

  function newData(data) {
    newUserData(data);
  }

  return (
    <>
      {focusedVideo ? (
        <ViewVideo
          userName={userName}
          userId={userId}
          focusedVideo={focusedVideo}
          setFocusedVideo={setFocusedVideo}
          allVideos={allVideos}
          newFocus={newFocus}
        />
      ) : (
        <div>
          <Navbar
            Nav1={'Home'}
            onNav1={handleHome}
            Nav2={'Upload Video'}
            onNav2={handleNewVideo}
            Nav3={'My Likes (beta)'}
            onNav3={handleMyLikes}
            Nav4={'SignOut'}
            onNav4={handleSignOut}
          />
          <div className="grid grid-cols-2 bg-[#21212b] font-fredoka py-2 px-4 md:px-8 ">
            <div className="userPageText text-white text-2xl">
              <p className="py-2">Hello {userName}</p>
            </div>

            <div className="refresh text-end my-2 pr-2 md:pr-8">
              <button
                className="text-white active:translate-y-1 hover:cursor-pointer text-2xl px-2 rounded-lg active:shadow-sm  shadow-lg hover:text-[#f3eeff]"
                onClick={handleRerender}
              >
                <TbRefresh style={{ color: '#A495FC' }} />
              </button>
            </div>
          </div>
          {!isUploadClicked && !isMyLikesClicked ? (
            <Videos
              seed={seed}
              onLike={handlelike}
              onView={handleView}
              sendVideos={allvideos}
            />
          ) : isUploadClicked ? (
            <UploadNewVideo
              newUserData={newData}
              onTap={handleRerender}
              userId={userId}
            />
          ) : (
            isMyLikesClicked && <MyLikes likes={likedVideos} />
          )}
        </div>
      )}
      <Footer />
    </>
  );
};

export default UserPage;
