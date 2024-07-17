import User from '@/lib/models/user.js';
import bcrypt from 'bcrypt';

//login
const login = async (username, password) => {
  try {
    const foundUser = await User.findOne({ username: username }).exec();

    if (!foundUser) {
      return { status: 401, message: 'User not found' };
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );

    if (!isPasswordCorrect) {
      return { status: 401, message: 'Incorrect password' };
    }

    return { status: 200, user: foundUser };
  } catch (error) {
    console.log(err);
  }
};

// Retrieve all videos
async function register(username, password, saltRounds = 10) {
  try {
    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username: username,
      password: hash,
    });

    const savedUser = await newUser.save();
    return {
      status: 200,
      message: 'User created successfully',
      user: savedUser,
    };
  } catch (error) {
    console.error(error);
    return { status: 500, message: 'Error creating user', error: error };
  }
}

export { login, register };
