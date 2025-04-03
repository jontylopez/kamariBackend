const express = require('express');
const router = express.Router();
const PosReturnRoutes  = require('../controllers/posReturnController');


router.get('/session/:session_id', PosReturnRoutes.getReturnsBySessionId);
router.get('/', PosReturnRoutes.getAllReturns);
router.post('/', PosReturnRoutes.createReturn);
router.get('/:id', PosReturnRoutes.getReturnById);
router.put('/:id', PosReturnRoutes.updateReturnById);
router.delete('/:id', PosReturnRoutes.deleteReturnById);

module.exports = router;
