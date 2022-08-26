const mongoose = require('mongoose');

const ArraySchema = new mongoose.Schema({ name: String });

const sauceSchema = new mongoose.Schema({
  userId: {type:String, required:true},
  name: {type:String, required: true},
  manufacturer: {type:String, required: true},
  description: {type:String, required: true},
  mainPepper: {type:String, required: true},
  imageUrl: {type:String, required: true},
  heat: { type: Number, min: 1, max: 10 },
  likes: {type:Number, default:0},
  dislikes: {type:Number, default:0},
  usersLiked: {type:[Array]},
  usersDisliked: {type:[Array]},
});


module.exports = mongoose.model('Sauce', sauceSchema);
