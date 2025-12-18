const express = require('express');
const router = express.Router();
const billingController = require('../controller/billingController');

router.post('/addbilling', billingController.addBillingInfo);
router.get('/details', billingController.getBillingInfo);
router.delete('/clearbilling', billingController.clearBillingInfo);

module.exports = router;