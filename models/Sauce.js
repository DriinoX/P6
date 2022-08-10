const mongoose = require('mongoose');

const ArraySchema = new mongoose.Schema({ name: String });

const sauceSchema = new mongoose.Schema({
  userId: {type:Number, required:true},
  name: {type:String, required: true},
  manufacturer: {type:String, required: true},
  description: {type:String, required: true},
  mainPepper: {type:String, required: true},
  imageUrl: {type:String, required: true},
  heat: { type: Number, min: 1, max: 10 },
  likes: {type:Number, default:0},
  dislikes: {type:Number, default:0},
  usersLiked: {type:[ArraySchema], default: []},
  usersDisliked: {type:[ArraySchema], default: []},
});


module.exports = mongoose.model('Sauce', sauceSchema);
