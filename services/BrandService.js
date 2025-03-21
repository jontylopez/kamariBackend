const Brand = require('../models/Brand'); // Import the Brand model

// ✅ Create a new brand
const createBrand = async (data) => {
    try {
        const brand = await Brand.create(data);
        return brand;
    } catch (error) {
        throw new Error(`Error creating brand: ${error.message}`);
    }
};

// ✅ Get all brands
const getAllBrands = async () => {
    try {
        const brands = await Brand.findAll({
            order: [['id', 'DESC']] // Optional: Sort by latest first
        });
        return brands;
    } catch (error) {
        throw new Error(`Error fetching brands: ${error.message}`);
    }
};

// ✅ Get a single brand by ID
const getBrandById = async (id) => {
    try {
        const brand = await Brand.findByPk(id);
        if (!brand) {
            throw new Error('Brand not found');
        }
        return brand;
    } catch (error) {
        throw new Error(`Error fetching brand: ${error.message}`);
    }
};

// ✅ Update a brand by ID
const updateBrand = async (id, data) => {
    try {
        const brand = await Brand.findByPk(id);
        if (!brand) {
            throw new Error('Brand not found');
        }
        await brand.update(data);
        return brand;
    } catch (error) {
        throw new Error(`Error updating brand: ${error.message}`);
    }
};

// ✅ Delete a brand by ID
const deleteBrand = async (id) => {
    try {
        const brand = await Brand.findByPk(id);
        if (!brand) {
            throw new Error('Brand not found');
        }
        await brand.destroy();
        return { message: 'Brand deleted successfully' };
    } catch (error) {
        throw new Error(`Error deleting brand: ${error.message}`);
    }
};

module.exports = {
    createBrand,
    getAllBrands,
    getBrandById,
    updateBrand,
    deleteBrand
};
