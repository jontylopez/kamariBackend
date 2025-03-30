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
        const inventory = await InventoryService.getInventoryByBarcodeId(req.params.bCodeId);
        res.status(200).json(inventory);
    }catch(error){
        logger.error(`Error in getInventoryByBarcodeId: ${error.message}`);
        res.status(404).json({error: error.message});
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

module.exports = {
    createInventory,
    getAllInventory,
    getInventoryById,
    updateInventoryById,
    deleteInventoryById,
    getInventoryByBarcodeId
}