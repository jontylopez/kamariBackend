const express = require('express');
const router = express.Router();
const posReturnController = require('../controllers/posReturnController');

router.get('/', posReturnController.getAllReturns);
router.get('/:id', posReturnController.getReturnById);
router.get('/session/:session_id', posReturnController.getReturnsBySessionId);
router.get('/item/by-return/:id', posReturnController.getReturnItemsByReturnId);

router.get('/validate/:id', posReturnController.validateExchangeId);
router.put('/mark-used/:id', posReturnController.markReturnAsUsed);
router.post('/', posReturnController.createReturnSession);
router.put('/:id', posReturnController.updateReturnSession);
router.delete('/:id', posReturnController.deleteReturnSession);

// ✅ Add these two
router.post('/with-restock', posReturnController.createReturnWithRestock);
router.post('/without-restock', posReturnController.createReturnWithoutRestock);

module.exports = router;
