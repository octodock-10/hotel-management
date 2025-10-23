import mongoose from 'mongoose';

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/octodock';

export const connect = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

export default mongoose;
