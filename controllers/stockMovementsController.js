const StockMovementService = require("../services/StockMovementsService");
const logger = require("../utils/logger");

//Create
const createMovement = async (req, res) => {
  try {
    const movement = await StockMovementService.createStMovement(req.body);
    res.status(201).json(movement);
  } catch (error) {
    logger.error(`Error in createMovement: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
//Get All
const getAllMovement = async(req, res)=>{
    try{
        const movements = await StockMovementService.getAllStMovement();
        res.status(200).json(movements);
    }catch(error){
        logger.error(`Error in getAllMovement: ${error.message}`);
        res.status(500).json({error: error.message});
    }
};
//Get By ID
const getMovementById = async (req, res)=>{
    try{
        const movement = await StockMovementService.getStMovementById(req.params.id);
        res.status(200).json(movement);
    }catch(error){
        logger.error(`Error in getMovementById: ${error.message}`);
        res.status(404).json({error:error.message});
    }
};
const getStockByDetails = async (req, res) => {
  try {
    const { inventory_id, buy_price, sell_price } = req.query;

    if (!inventory_id || !buy_price || !sell_price) {
      return res.status(400).json({ error: "Missing required query parameters." });
    }

    const movement = await StockMovementService.getStockMovementByDetails({
      inventory_id,
      buy_price,
      sell_price,
    });

    if (!movement) {
      return res.status(404).json({ error: "No matching stock entry found." });
    }

    res.status(200).json(movement);
  } catch (error) {
    logger.error(`Error in getStockByDetails: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Stock Movements by Inventory ID
const getByInventoryId = async (req, res) => {
    const { inventoryId } = req.params;
  
    try {
      const movements = await StockMovementService.getStockByInventoryId(inventoryId);
      res.status(200).json(movements);
    } catch (error) {
      logger.error(`Error in getByInventoryId: ${error.message}`);
      res.status(500).json({ error: 'Failed to fetch stock data for inventory.' });
    }
  };
//Update by ID
const updateMovementById = async(req, res)=>{
    try{
        const updateMovement = await StockMovementService.updateStMovementById(req.params.id, req.body);
        res.status(200).json(updateMovement);
    }catch(error){
        logger.error(`Error in updateMovementById: ${error.message}`);
        res.status(400).json({error: error.message});
    }
};
const updateQuantity = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
  
    console.log("🛠️ Incoming quantity update:", { id, quantity });
  
    try {
      const updated = await StockMovementService.updateStockQuantity(id, quantity);
      res.json(updated);
    } catch (error) {
      console.error("❌ Error in updateQuantity:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
//Delete By ID
const deleteMovementById = async(req,res)=>{
    try{
        const result = await StockMovementService.deleteStMovementById(req.params.id);
        res.status(200).json(result);
    }catch(error){
        logger.error(`Error in deleteMovementById: ${error.message}`);
        res.status(400).json({error: error.message});
    }
};

const decrementStock = async (req, res) => {
  const { id } = req.params; // stockMovementId
  const { quantity } = req.body;

  try {
    const result = await StockMovementService.decrementStock(id, quantity);
    res.status(200).json(result);
  } catch (error) {
    logger.error(`Error in decrementStock: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

const restockInventory = async (req, res) => {
  const { inventory_id, buy_price, sell_price, quantity, date } = req.body;

  try {
    const result = await StockMovementService.restockInventory({
      inventory_id,
      buy_price,
      sell_price,
      quantity,
      date
    });

    res.status(200).json(result);
  } catch (error) {
    logger.error(`Error in restockInventory: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createMovement,
  getAllMovement,
  getMovementById,
  getStockByDetails,
  updateMovementById,
  updateQuantity,
  getByInventoryId,
  deleteMovementById,
  decrementStock,
  restockInventory
}