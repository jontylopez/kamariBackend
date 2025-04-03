const express = require('express');
const router = express.Router();
const CashTransactionController = require('../controllers/CashTransactionController');

router.post('/', CashTransactionController.createCash);
router.get('/', CashTransactionController.getAllCash);
router.get('/:id', CashTransactionController.gettCashById);
router.get('/session/:session_id', CashTransactionController.getCashBySession);
router.get('/sess_type/:session_id,type', CashTransactionController.getCashBySessIdAndType);
router.put('/:id', CashTransactionController.updateCashById);
router.delete('/:id', CashTransactionController.deleteCashById);

module.exports= router;