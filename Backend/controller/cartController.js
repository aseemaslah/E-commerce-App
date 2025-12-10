const Cart = require('../models/cartModel');

const addToCart = async (req, res) => {
    try {
        const { productId, name, price, image, userId , discount} = req.body;

        let item = await Cart.findOne({ productId, userId: "user123" });

        if (item) {
            item.quantity += 1;
            await item.save();
            return res.status(200).json({ message: 'Quantity updated', item });
        }

        const newItem = new Cart({
            productId,
            name,
            price,
            image,
            quantity: 0,
            userId: "user123",
            discount
        });

        await newItem.save();

        res.status(201).json({ message: 'Item added', newItem });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCart = async (req, res) => {

    try {
        const userId = req.params.userId;
        const cartItems = await Cart.find({ userId: "user123" });
        res.status(200).json({ message: 'Cart fetched successfully', cartItems });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteCart = async (req, res) => {
       
    try {
        const userId = req.params.userId;
        const productId = req.params.productId;

        const deletedItem = await Cart.findOneAndDelete({ userId: "user123", productId });

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
        res.status(200).json({ message: 'Item deleted successfully', deletedItem });

    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).json({ message: 'Quantity must be at least 1' });
        }

        const cartItem = await Cart.findOne({ userId: "user123", productId });

        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json({ message: 'Cart updated successfully', cartItem });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { addToCart, getCart , deleteCart , updateCart };
