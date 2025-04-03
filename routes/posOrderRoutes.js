const express = require('express');
const router = express.Router();
const POSOrderController = require('../controllers/posOrderController');

router.post('/', POSOrderController.createPosOrder);
router.get('/', POSOrderController.getAllPosOrders);
router.get('/:id', POSOrderController.getPosOrderById);
router.get('/session/:session_id', POSOrderController.getOrderBySession);
router.put('/:id', POSOrderController.updatePosOrderById);
router.delete('/:id', POSOrderController.deletePosOrderById);

module.exports = router;