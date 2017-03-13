var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect('localhost/Post');

var Schema = mongoose.Schema({
  title: String,
  location: String,
  imagePath: String,
  text: String,
  time: Date
});

var Model = mongoose.model("Post", Schema);

module.exports = Model;