import pkg from 'mongoose';
const { connect } = pkg;

const connectDB = (url) => {
  return connect(url);
}

// , {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }

export default connectDB;