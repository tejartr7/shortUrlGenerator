import mongoose from 'mongoose';
import shortId from 'shortid';

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  expireAfterSeconds: 604800
});

const ShortUrlSchema = mongoose.model('ShortUrl', shortUrlSchema);
export default ShortUrlSchema;
