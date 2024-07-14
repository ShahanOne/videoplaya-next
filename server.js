require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('mongoose-type-url');
mongoose.set('strictQuery', false);
const bcrypt = require('bcrypt');
const saltRounds = 10;
const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // support json encoded bodies
const cors = require('cors');
const { json } = require('body-parser');
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

//Connection
mongoose.connect(
  // 'mongodb://localhost:27017/videosDB'
  `mongodb+srv://Shahan786:${process.env.MONGO_PASSWORD}@cluster0.ma0c6.mongodb.net/videosDB`
);

//Schema  i.e the structure we want for data
const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  comments: {
    type: Array,
  },
  videoUrl: {
    type: String,
  },
});

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

//Model
const Video = mongoose.model('Video', videoSchema);
const User = mongoose.model('User', userSchema);

// console.log(user1);
const video1 = new Video({
  //new document in the collection
  title: 'Table',
  comments: ['lol', 'jhhol'],
  videoUrl: 'https://www.youtube.com/watch?v=G3oB4owTOGY',
});
const video2 = new Video({
  //new document in the collection
  title: 'Table2',
  comments: ['loll', 'jhholl'],
  videoUrl: 'https://www.youtube.com/watch?v=G3oB4owTOGY',
});
// video2.save();

// console.log(video1);

// app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api', (req, res) => {
  Video.find({}, function (err, foundVideos) {
    if (foundVideos) {
      res.send(foundVideos);
      //   console.log(foundVideos);
    } else console.log(err);
  });
});

app.post('/new-video', (req, res) => {
  const data = req.body[0];
  const videoTitle = data.videoTitle;
  const videoUrl = data.videoUrl;
  const userId = data.userId;
  // console.log(userName);

  const newVideo = new Video({
    title: videoTitle,
    videoUrl: videoUrl,
  });

  newVideo.save((err) =>
    !err
      ? User.findOne({ _id: userId }, (err, foundUser) => {
          !err &&
            User.findOneAndUpdate(
              { _id: foundUser._id },
              { uploadedVideos: [...foundUser.uploadedVideos, newVideo] },
              { returnOriginal: false },
              (err, updatedUser) => {
                !err
                  ? res.send(JSON.stringify(updatedUser)) &&
                    console.log('updated')
                  : res.send('poop') && console.log(err);
              }
            );
        })
      : console.log(err)
  );
});

app.post('/like', (req, res) => {
  const data = req.body[0];
  const videoId = data.videoId;
  const userId = data.userId;
  // console.log(data);

  Video.findOne({ _id: videoId }, (err, foundVideo) => {
    User.findOne(
      { _id: userId, likedVideos: { $in: [foundVideo] } },
      (err, foundUser) => {
        foundUser
          ? User.findOneAndUpdate(
              { _id: foundUser._id },
              { $pull: { likedVideos: { _id: videoId } } },
              { returnOriginal: false },
              (err, updatedUser) => {
                !err
                  ? res.send(JSON.stringify(updatedUser)) &&
                    console.log('removed from likes')
                  : res.send('poop') && console.log(err);
              }
            )
          : User.findOne({ _id: userId }, (err, foundUser) => {
              User.findOneAndUpdate(
                { _id: foundUser._id },
                { likedVideos: [...foundUser.likedVideos, foundVideo] },
                { returnOriginal: false },
                (err, updatedUser) => {
                  !err
                    ? res.send(JSON.stringify(updatedUser)) &&
                      console.log('done')
                    : res.send('poop') && console.log(err);
                }
              );
            });
      }
    );
  });
});

app.post('/comment', (req, res) => {
  const data = req.body[0];
  const videoId = data.videoId;
  const newComment = data.newComment;
  const userId = data.userId;
  // console.log(data);

  Video.findOne({ _id: videoId }, (err, foundVideo) => {
    Video.findOneAndUpdate(
      { _id: foundVideo._id },
      { comments: [...foundVideo.comments, newComment] },
      { returnOriginal: false },
      (err, updatedVideo) => {
        !err
          ? res.send(JSON.stringify(updatedVideo)) && console.log('done')
          : res.send('poop') && console.log(err);
      }
    );
  });
});

app.post('/login', (req, res) => {
  const data = req.body[0];
  const username = data.username;
  const password = data.password;
  // console.log(data);
  User.findOne({ username: username }, (err, foundUser) => {
    !err && foundUser
      ? bcrypt.compare(password, foundUser.password, (err, result) =>
          !err && result
            ? res.send(JSON.stringify(foundUser))
            : console.log(err + 'poop')
        )
      : res.send(JSON.stringify('poop'));
  });
});
app.post('/register', (req, res) => {
  const data = req.body[0];
  const username = data.username;
  const password = data.password;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    const newUser = new User({
      username: username,
      password: hash,
    });

    newUser.save((err) => {
      //password will be encrypted now
      if (!err) {
        res.send(JSON.stringify(username));
      } else {
        console.log(err);
      }
    });
  });
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log('Server started on port 3001');
});
