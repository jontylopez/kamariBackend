const express = require('express');
const router = express.Router();
const StockMovementController = require('../controllers/stockMovementsController');

router.post('/', StockMovementController.createMovement);
router.get('/', StockMovementController.getAllMovement);
router.get('/:id', StockMovementController.getMovementById);
router.put('/:id', StockMovementController.updateMovementById);
router.put('/update-quantity/:id', StockMovementController.updateQuantity);
router.delete('/:id', StockMovementController.deleteMovementById);

module.exports = router;
