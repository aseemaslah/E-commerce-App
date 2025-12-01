const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');

router.post('/addcart', cartController.addToCart);
router.get('/:userId', cartController.getCart);
router.put('/cart/update', cartController.updateCart);
router.delete('/:productId', cartController.deleteCart);


module.exports = router;