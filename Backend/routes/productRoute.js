const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

router.post('/add', productController.addProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;