const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  quantity: { type: Number, default: 1 },
  userId: { type: String , required: true }
});

module.exports = mongoose.model('Cart', cartSchema);
