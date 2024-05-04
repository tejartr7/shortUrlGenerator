import mongoose from 'mongoose';


const connectDb = (url) => {
  mongoose.set('strictQuery', true);
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB');
    console.error(err);
  });
};

export default connectDb;