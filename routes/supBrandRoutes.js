const express = require('express');
const router = express.Router();
const SupBrandController = require('../controllers/supBrandController');

router.post('/',SupBrandController.createSupBrand);
router.get('/',SupBrandController.getAllSupBrand);
router.get('/:id',SupBrandController.getSupBrandById);
router.get('/id/:supId/:brandId', SupBrandController.getSupBrandId);
router.put('/:id',SupBrandController.updateSupBrandById);
router.delete('/:id',SupBrandController.deleteSupBrandById);
module.exports=router;