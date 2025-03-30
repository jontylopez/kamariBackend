const express = require('express');
const router = express.Router();
const POSPaymentController = require('../controllers/posPaymentController');

router.post('/', POSPaymentController.createPayment);
router.get('/', POSPaymentController.getAllPayments);
router.get('/:id', POSPaymentController.getPaymentById);
router.get('/order/:order_id', POSPaymentController.getPaymentsByOrderId);
router.put('/:id', POSPaymentController.updatePaymentById);
router.delete('/:id', POSPaymentController.deletePaymentById);

module.exports = router;