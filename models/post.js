var mongoose = require("mongoose");
mongoose.connect('localhost/Post');

var Schema = mongoose.Schema({
  title: String,
  location: String,
  imagePath: String,
  text: String
});

var Model = mongoose.model("Post", Schema);

module.exports = Model;