import pkg from 'mongoose';

const { connect } = pkg;

const connectDB = (url) => {
  return connect(url);
}

export default connectDB;
