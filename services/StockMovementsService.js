const StockMovement = require('../models/stock_movements');
const { Sequelize } = require('sequelize');
const { Op } = require('sequelize');

// ✅ Create Stock Movement
const createStMovement = async (data) => {
    try {
        const movement = await StockMovement.create(data);
        return movement;
    } catch (error) {
        throw new Error(`Error Creating Stock Movement: ${error.message}`);
    }
};
const getStockMovementByDetails = async ({ inventory_id, buy_price, sell_price }) => {
    try {
      const movement = await StockMovement.findOne({
        where: {
          inventory_id,
          buy_price,
          sell_price
        }
      });
  
      return movement; // returns null if not found
    } catch (error) {
      throw new Error(`Error finding stock movement: ${error.message}`);
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

// ✅ Get Stock Movements By Inventory ID
const getStockByInventoryId = async (inventoryId) => {
    try {
        const movements = await StockMovement.findAll({
            where: { inventory_id: inventoryId },
            order: [['date', 'DESC']]
        });
        return movements;
    } catch (error) {
        throw new Error(`Error Fetching Stock for Inventory ID ${inventoryId}: ${error.message}`);
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

// ✅ Update Stock Quantity (Directly Set Value)
const updateStockQuantity = async (id, newQuantity) => {
    const movement = await StockMovement.findByPk(id);
    if (!movement) throw new Error("Stock entry not found");

    movement.quantity = newQuantity;
    await movement.save();
    return movement;
};

// ✅ Atomically Decrement Stock Quantity
const decrementStock = async(stockMovementId, quantity, transaction = null)=>{
    try {
        const options = transaction ? { transaction } : {};
        
        const updated = await StockMovement.update(
            { quantity: Sequelize.literal(`quantity - ${quantity}`) },
            {
                where: {
                    id: stockMovementId,
                    quantity: { [Op.gte]: quantity }
                },
                ...options
            }
        );

        if (updated[0] === 0) {
            throw new Error("Insufficient stock or conflict during update");
        }
        
        return { success: true, message: "Stock decremented successfully" };
    } catch(error) {
        throw new Error(`Error decrementing stock: ${error.message}`);
    }
};
// ✅ Smart Restock Logic
const restockInventory = async ({ inventory_id, buy_price, sell_price, quantity, date }) => {
    try {
        // Check for existing stock entry with same prices
        const existing = await StockMovement.findOne({
            where: {
                inventory_id,
                buy_price,
                sell_price
            }
        });

        if (existing) {
            existing.quantity += quantity;
            await existing.save();
            return existing;
        } else {
            const newEntry = await StockMovement.create({
                inventory_id,
                buy_price,
                sell_price,
                quantity,
                date
            });
            return newEntry;
        }
    } catch (error) {
        throw new Error(`Error during restock: ${error.message}`);
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
    getStockMovementByDetails,
    getStMovementById,
    updateStMovementById,
    updateStockQuantity,
    decrementStock,
    restockInventory,
    getStockByInventoryId,
    deleteStMovementById
};