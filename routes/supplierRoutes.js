const express = require('express');
const router = express.Router();
const SupplierController = require('../controllers/supplierController');

router.post('/', SupplierController.createSupplier);
router.get('/', SupplierController.getAllSupplier);
router.get('/:id', SupplierController.getSupplierById);
router.put('/:id', SupplierController.updateSupplierById);
router.delete('/:id', SupplierController.deleteSupplierById);
 module.exports=router;