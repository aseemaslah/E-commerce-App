const express = require('express');
const router = express.Router();
const billingController = require('../controller/billingController');

router.post('/addbilling', billingController.addBillingInfo);
router.get('/details', billingController.getBillingInfo);

module.exports = router;