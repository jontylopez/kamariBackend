const express = require('express');
const router = express.Router();
const StockMovementController = require('../controllers/stockMovementsController');

router.post('/', StockMovementController.createMovement);
router.get('/', StockMovementController.getAllMovement);
router.get('/find-by-details', StockMovementController.getStockByDetails);
router.get('/by-inventory/:inventoryId', StockMovementController.getByInventoryId);
router.get('/:id', StockMovementController.getMovementById);
router.put('/:id', StockMovementController.updateMovementById);
router.put('/update-quantity/:id', StockMovementController.updateQuantity);
router.put("/decrement/:id", StockMovementController.decrementStock); 
router.post("/restock", StockMovementController.restockInventory);  
router.delete('/:id', StockMovementController.deleteMovementById);

module.exports = router;
