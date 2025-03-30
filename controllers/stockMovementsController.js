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
module.exports = {
    createMovement,
    getAllMovement,
    getMovementById,
    updateMovementById,
    updateQuantity,
    deleteMovementById
}