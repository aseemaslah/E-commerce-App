const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

router.post('/ordercreate', orderController.createOrder);
router.get('/getorders', orderController.getOrders);
router.get('/:id', orderController.getOrderById);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;