
// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const DataSchema = new Schema(
  {
    type: String,
    author: String,
    author_id:String,
    title: String,
    reward : String,
    description : String,
    thumbnail: String,
    image : [String],
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", DataSchema);
