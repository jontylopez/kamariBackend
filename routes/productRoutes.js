const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

router.post('/', ProductController.createProduct);
router.get('/', ProductController.getAllProduct);
router.get('/:id', ProductController.getProductById);
router.put('/:id', ProductController.updateProductById);
router.delete('/:id', ProductController.deleteProductById);

module.exports=router;