const Billing = require("../models/billingModel");

const addBillingInfo = async (req, res) => {
    try {
        const { name, locality, pincode, houseNo, landmark, phone } = req.body;
        if ( !name || !locality || !pincode || !houseNo || !landmark || !phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const billingInfo = new Billing({
            name,
            locality,
            pincode,
            houseNo,
            landmark,
            phone
        });
        await billingInfo.save();
        res.status(201).json({ message: 'Billing information added successfully', billingInfo });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBillingInfo = async (req, res) => {
    try {
        const userId = req.params.userId;
        const billingInfo = await Billing.find({ userId });
        res.status(200).json({ message: 'Billing information fetched successfully', billingInfo });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addBillingInfo, getBillingInfo };