const Product = require('../models/productModel');

const addProduct = async (req, res) => {
    try {
        const { title, price } = req.body;

        if (!title || !price) {
            return res.status(400).json({ message: 'Title and price are required' });
        }

        const product = new Product({ title, price });

        await product.save();

        res.status(201).json({
            message: 'Product added successfully',
            product
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            message: 'Products fetched successfully',
            products
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            message: 'Product fetched successfully',
            product
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { title, price } = req.body;
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { title, price },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            message: 'Product updated successfully',
            product
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            message: 'Product deleted successfully',
            product
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};