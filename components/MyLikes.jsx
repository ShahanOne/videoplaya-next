import VideoCard from './VideoCard';

const MyLikes = ({ likes, onLike, onComment }) => {
  return (
    <div className="myLikesDiv px-2 md:px-12 py-12 md:py-24">
      <p className="text-2xl">My Likes :-</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {likes?.length ? (
          likes.map((video, index) => (
            <VideoCard
              key={index}
              videoTitle={video.title}
              videoUrl={video.videoUrl}
              onLike={() => onLike(video)}
              onComment={() => onComment(video)}
            />
          ))
        ) : (
          <p
            className="noDataText 
          m-[5%_2%]"
          >
            No Liked Videos!
          </p>
        )}
      </div>
    </div>
  );
};

export default MyLikes;
