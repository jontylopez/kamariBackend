const express = require('express');
const router = express.Router();
const PosSessionController = require('../controllers/posSessionController');

router.post('/', PosSessionController.createPosSession);
router.get('/active', PosSessionController.getActiveSession); 
router.get('/', PosSessionController.getAllPosSessions);
router.get('/:id', PosSessionController.getPosSessionById);
router.put('/close/:id', PosSessionController.closePosSessionById);
router.put('/:id', PosSessionController.updatePosSessionById);
router.delete('/:id', PosSessionController.deletePosSeessionById);

module.exports = router;
