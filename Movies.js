require('dotenv').config(); 

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB); // No need for useNewUrlParser & useUnifiedTopology
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

// Movie schema
var MovieSchema = new Schema({
  title: { type: String, required: true, index: true },
  releaseDate: { type: Number, min: [1900, 'Must be greater than 1899'], max: [2100, 'Must be less than 2100'] },
  genre: {
    type: String,
    enum: [
      'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 
      'Mystery', 'Thriller', 'Western', 'Science Fiction'
    ],
  },
  actors: [{
    actorName: String,
    characterName: String,
  }],
});

module.exports = mongoose.model('Movie', MovieSchema);