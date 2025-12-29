const Order = require('../models/orderModel');

const createOrder = async (req, res) => {
    try {
        const { userId, items, totalAmount, shippingAddress } = req.body;
        const newOrder = new Order({
            userId,
            items,
            totalAmount,
            shippingAddress
        });
        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
        } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        res.status(200).json(orders);
    }


    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    deleteOrder

};