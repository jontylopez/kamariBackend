const express = require('express');
const router = express.Router();
const BrandController = require('../controllers/brandController');

// POST /api/brands — Create a new brand
router.post('/', BrandController.createBrand);

// GET /api/brands — Get all brands
router.get('/', BrandController.getAllBrands);

// GET /api/brands/:id — Get brand by ID
router.get('/:id', BrandController.getBrandById);

// PUT /api/brands/:id — Update brand by ID
router.put('/:id', BrandController.updateBrand);

// DELETE /api/brands/:id — Delete brand by ID
router.delete('/:id', BrandController.deleteBrand);

module.exports = router;
