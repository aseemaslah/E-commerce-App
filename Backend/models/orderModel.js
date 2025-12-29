const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   items: [
      {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            title: { type: String, required: true }

        }
    ],

    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    shippingAddress: {
        locality: { type: String, required: true },
        pincode: { type: String, required: true },
        houseno: { type: String, required: true },
        landmark: { type: String, required: true },
        phone: { type: String, required: true }
    }
}, { timestamps: true });
module.exports = mongoose.model('Order', userSchema);