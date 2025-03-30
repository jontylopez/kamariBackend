const POSOrderItemService = require('../services/PosOrderItemsService');
const logger = require('../utils/logger');

//Create
const createOrderItem = async(req, res)=>{
    try{
        const orderItem = await POSOrderItemService.createPosOrderItem(req.body);
        res.status(201).json(orderItem);
    }catch(error){
        logger.error(`Error in createOrderItem: ${error.message}`);
        res.status(500).json({error:error.message});
    }
};
//Get All
const getAllOrderItem = async(req, res)=>{
    try{
        const orderItems = await POSOrderItemService.getAllPosOrderItem();
        res.status(200).json(orderItems);
    }catch(error){
        logger.error(`Error in getAllOrderItem: ${error.message}`);
        res.status(500).json({error: error.message});
    }
};
//Get By ID
const getOrderItemById = async(req, res)=>{
    try{
        const orderItem = await POSOrderItemService.getPosOrderItemById(req.params.id);
        res.status(200).json(orderItem);
    }catch(error){
        logger.error(`Error in getOrderItemById: ${error.message}`);
        res.status(404).json({error: error.message});
    }
};
//Get By Order ID
const getItemsByOrderId = async(req, res)=>{
    try{
        const orderItems = await POSOrderItemService.getPosOrderItemByOrderId(req.params.order_id);
        res.status(200).json(orderItems);
    }catch(error){
        logger.error(`Error in getItemsByOrderId: ${error.message}`);
        res.status(404).json({error: error.message});
    }
};
//Update By ID
const updateOrderItem = async(req, res)=>{
    try{
        const updateOrderItem = await POSOrderItemService.updatePosOrderItemById(req.params.id, req.body);
        res.status(200).json(updateOrderItem);
    }catch(error){
        logger.error(`Error in updateOrderItem: ${error.message}`);
        res.status(400).json({error: error.message});
    }
};
//Delete By ID
const deleteOrderItem = async(req, res)=>{
    try{
        const result = await POSOrderItemService.deletePosOrderItemById(req.params.id);
        res.status(200).json(result);
    }catch(error){
        logger.error(`Error in deleteOrderItem: ${error.message}`);
        res.status(400).json({error: error.message});
    }
};

module.exports= {
    createOrderItem,
    getAllOrderItem,
    getOrderItemById,
    getItemsByOrderId,
    updateOrderItem,
    deleteOrderItem
};