const InventoryService = require('../services/InventoryService');
const logger = require('../utils/logger');

//Create New Inventory
const createInventory = async(req, res)=>{
    try{
        const inventory = await InventoryService.createInventory(req.body);
        res.status(201).json(inventory);
    }catch(error){
        logger.error(`Error in createInventory: ${error.message}`);
        res.status(500).json({error: error.message});
    }
};
//Get All Inventory
const getAllInventory = async(req, res)=>{
    try{
        const inventories = await InventoryService.getAllInventory();
        res.status(200).json(inventories);
    }catch(error){
        logger.error(`Error in getAllInventory: ${error.message}`);
        res.status(500).json({error: error.message});
    }
};
//Get Inventory By ID
const getInventoryById = async(req, res)=>{
    try{
        const inventory = await InventoryService.getInventoryById(req.params.id);
        res.status(200).json(inventory);
    }catch(error){
        logger.error(`Error in getInventoryById: ${error.message}`);
        res.status(404).json({error: error.message});
    }
};
//Get Inventory Data By Barcode
const getInventoryByBarcodeId = async(req, res)=>{
    try{
        const inventory = await InventoryService.getInventoryByBarcodeId(req.params.b_code_id);
        res.status(200).json(inventory);
    }catch(error){
        logger.error(`Error in getInventoryByBarcodeId: ${error.message}`);
        res.status(404).json({error: error.message});
    }
};
//get Inventory by barcode for pos
const getInventoryByBarcode = async (req, res) => {
  try {
    const result = await InventoryService.getInventoryByBarcode(req.params.code);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
//Update Inventory By ID
const updateInventoryById = async(req, res)=>{
    try{
        const updateInventory = await InventoryService.updateInventoryById(req.params.id, req.body);
        res.status(200).json(updateInventory);
    }catch(error){
        logger.error(`Error in updateInventoryById: ${error.message}`);
        res.status(400).json({error: error.message});
    }
};
//Delete Inventory By ID
const deleteInventoryById = async(req, res)=>{
    try{
        const result = await InventoryService.deleteInventoryById(req.params.id);
        res.status(200).json(result);
    }catch(error){
        logger.error(`Error in deleteInventoryById: ${error.message}`);
        res.status(400).json({error: error.message});
    }
};
// Create Inventory with Auto Barcode + Duplicate Check
const createInventoryWithBarcode = async (req, res) => {
    try {
      logger.info(`Incoming data: ${JSON.stringify(req.body)}`);
  
      const inventory = await InventoryService.createInventoryWithBarcode(req.body);
      res.status(201).json(inventory);
    } catch (error) {
      logger.warn(`Inventory creation failed: ${error.message}`);
      
      if (error.message === 'Inventory item already exists') {
        return res.status(409).json({ error: 'This inventory item already exists. Please check and try again.' });
      }
  
      res.status(500).json({ error: 'Something went wrong while creating inventory. Please try again later.' });
    }
  };

  const getLatestInventoryController = async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 20;
      const latestInventory = await InventoryService.getLatestInventory(limit);
      res.status(200).json(latestInventory);
    } catch (error) {
      logger.error(`Error in getLatestInventory: ${error.message}`);
      res.status(500).json({ error: 'Failed to load latest inventory.' });
    }
  };
  
  const searchInventoryController = async (req, res) => {
    try {
      const query = req.query.query?.trim() || '';
      if (!query) {
        return res.status(400).json({ error: 'Search query is required.' });
      }
  
      const result = await InventoryService.searchInventory(query);
      res.status(200).json(result);
    } catch (error) {
      logger.error(`Error in searchInventory: ${error.message}`);
      res.status(500).json({ error: 'Failed to search inventory.' });
    }
  };
  
  

module.exports = {
    createInventory,
    getLatestInventoryController,
    searchInventoryController,
    getInventoryByBarcode,  
    getAllInventory,
    getInventoryById,
    updateInventoryById,
    deleteInventoryById,
    getInventoryByBarcodeId,
    createInventoryWithBarcode
}