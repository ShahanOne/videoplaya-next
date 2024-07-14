import YouTube from 'react-youtube';
import Modal from 'react-modal';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const YouTubePlayer = ({ videoUrl }) => {
  // const [modalIsOpen, setModalIsOpen] = React.useState(false);

  let videoCode;
  videoUrl
    ? (videoCode = videoUrl.split('v=')[1].split('&')[0])
    : console.log();
  // const checkElapsedTime = (e) => {
  //   console.log(e.target.playerInfo.playerState);
  //   const duration = e.target.getDuration();
  //   const currentTime = e.target.getCurrentTime();
  //   if (currentTime / duration > 0.95) {
  //     setModalIsOpen(true);
  //   }
  // };

  const opts = {
    height: '220',
    width: '250',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <div>
      <YouTube
        className=""
        videoId={videoCode}
        containerClassName="embed embed-youtube"
        // onStateChange={(e) => checkElapsedTime(e)}
        opts={opts}
      />
    </div>
  );
};

export default YouTubePlayer;
{
  /* <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Exercise Completed"
        style={modalStyles}
      >
        <div>
          <h3>Completed the exercise?</h3>
          <button onClick={handleExerciseComplete}>Complete exercise</button>
        </div>
      </Modal> */
}
