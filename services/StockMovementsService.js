const StockMovement = require('../models/StockMovements');

// ✅ Create Stock Movement
const createStMovement = async (data) => {
    try {
        const movement = await StockMovement.create(data);
        return movement;
    } catch (error) {
        throw new Error(`Error Creating Stock Movement: ${error.message}`);
    }
};

// ✅ Get All Stock Movements
const getAllStMovement = async () => {
    try {
        const movements = await StockMovement.findAll({
            order: [['id', 'DESC']]
        });
        return movements;
    } catch (error) {
        throw new Error(`Error Fetching Stock Movements: ${error.message}`);
    }
};

// ✅ Get Stock Movement By ID
const getStMovementById = async (id) => {
    try {
        const movement = await StockMovement.findByPk(id);
        if (!movement) {
            throw new Error('No Stock Movement Found');
        }
        return movement;
    } catch (error) {
        throw new Error(`Error Fetching Stock Movement: ${error.message}`);
    }
};

// ✅ Update Stock Movement By ID
const updateStMovementById = async (id, data) => {
    try {
        const movement = await StockMovement.findByPk(id);
        if (!movement) {
            throw new Error('No Stock Movement Found');
        }
        await movement.update(data); 
        return movement;
    } catch (error) {
        throw new Error(`Error Updating Stock Movement: ${error.message}`);
    }
};

// ✅ Delete Stock Movement By ID
const deleteStMovementById = async (id) => {
    try {
        const movement = await StockMovement.findByPk(id);
        if (!movement) {
            throw new Error('No Stock Movement Found');
        }
        await movement.destroy(); 
        return { message: 'Stock Movement Deleted Successfully' };
    } catch (error) {
        throw new Error(`Error Deleting Stock Movement: ${error.message}`);
    }
};

module.exports = {
    createStMovement,
    getAllStMovement,
    getStMovementById,
    updateStMovementById,
    deleteStMovementById
};
