const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    locality: { type: String, required: true },
    pincode: { type: String, required: true },
    houseNo: { type: String, required: true },
    landmark: { type: String , required: true },
    phone: { type: String, required: true }

});

module.exports = mongoose.model('Billing', billingSchema);