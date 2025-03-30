const POSOrderService = require('../services/PosOrderService');
const logger = require('../utils/logger');

//Create
const createPosOrder = async(req, res)=>{
    try{
        const posOrder = await POSOrderService.createPosOrder(req.body);
        res.status(201).json(posOrder);
    }catch(error){
        logger.error(`Error in createPosOrder: ${error.message}`);
        res.status(500).json({error: error.message});
    }
};
//Get All
const getAllPosOrders = async(req, res)=>{
    try{
        const posOrders = await POSOrderService.getAllPosOrder();
        res.status(200).json(posOrders);
    }catch(error){
        logger.error(`Error in getAllPosOrder: ${error.message}`);
        res.status(500).json({error: error.message});
    }
};
//Get By ID
const getPosOrderById = async(req,res)=>{
    try{
        const posOrder = await POSOrderService.getPosOrderByID(req.params.id);
        res.status(200).json(posOrder);
    }catch(error){
        logger.error(`Error in getPosOrderById: ${error.message}`);
        res.status(404).json({error: error.message});
    }
};
//Update By ID
const updatePosOrderById = async(req, res)=>{
    try{
        const updatePosOrder = await POSOrderService.updatePosOrderById(req.params.id, req.body);
        res.status(200).json(updatePosOrder);
    }catch(error){
        logger.error(`Error in updatePosOrderById: ${error.message}`);
        res.status(400).json({error: error.message});
    }
};
//Delete By ID
const deletePosOrderById = async (req, res)=>{
    try{
        const result = await POSOrderService.deletePosOrderById(req.params.id);
        res.status(200).json(result);
    }catch(error){
        logger.error(`Error in deletePosOrderById: ${error.message}`);
        res.status(400).json({error: error.message});
    }
};

module.exports = {
    createPosOrder,
    getAllPosOrders,
    getPosOrderById,
    updatePosOrderById,
    deletePosOrderById
}