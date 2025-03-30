const express = require('express');
const router = express.Router();
const InventoryController = require('../controllers/inventoryController');

router.post('/', InventoryController.createInventory);
router.get('/', InventoryController.getAllInventory);
router.get('/barcode/:bCodeId', InventoryController.getInventoryByBarcodeId);
router.get('/:id', InventoryController.getInventoryById);
router.put('/:id', InventoryController.updateInventoryById);
router.delete('/:id', InventoryController.deleteInventoryById);

module.exports = router;
