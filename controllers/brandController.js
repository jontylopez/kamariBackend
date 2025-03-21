const BrandService = require('../services/BrandService');
const logger = require('../utils/logger');

// Create a new brand
const createBrand = async (req, res) => {
    try {
        const brand = await BrandService.createBrand(req.body);
        res.status(201).json(brand);
    } catch (error) {
        logger.error(`Error in createBrand: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// Get all brands
const getAllBrands = async (req, res) => {
    try {
        const brands = await BrandService.getAllBrands();
        res.status(200).json(brands);
    } catch (error) {
        logger.error(`Error in getAllBrand: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// Get a brand by ID
const getBrandById = async (req, res) => {
    try {
        const brand = await BrandService.getBrandById(req.params.id);
        res.status(200).json(brand);
    } catch (error) {
        logger.error(`Error in getBrandById: ${error.message}`)
        res.status(404).json({ error: error.message });
    }
};

// Update a brand by ID
const updateBrand = async (req, res) => {
    try {
        const updatedBrand = await BrandService.updateBrand(req.params.id, req.body);
        res.status(200).json(updatedBrand);
    } catch (error) {
        logger.error(`Error in updateBrandById: ${error.message}`);
        res.status(400).json({ error: error.message });
    }
};

// Delete a brand by ID
const deleteBrand = async (req, res) => {
    try {
        const result = await BrandService.deleteBrand(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        logger.error(`Error in deleteBrandById: ${error.message}`)
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createBrand,
    getAllBrands,
    getBrandById,
    updateBrand,
    deleteBrand
};
