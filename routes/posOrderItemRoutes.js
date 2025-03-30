const express = require('express');
const router = express.Router();
const POSOrderItemController = require('../controllers/posOrderItemController');

router.post('/', POSOrderItemController.createOrderItem);
router.get('/', POSOrderItemController.getAllOrderItem);
router.get('/:id', POSOrderItemController.getOrderItemById);
router.get('/order/:order_id', POSOrderItemController.getItemsByOrderId);
router.put('/:id', POSOrderItemController.updateOrderItem);
router.delete('/:id', POSOrderItemController.deleteOrderItem);

module.exports=router;