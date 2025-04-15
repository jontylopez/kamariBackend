const POS_ORDER_ITEM = require('../models/pos_order_item');

//Create
const createPosOrderItem = async(data, transaction = null)=>{
    try{
        // Use the transaction if provided
        const options = transaction ? { transaction } : {};
        const posOrderItem = await POS_ORDER_ITEM.create(data, options);
        return posOrderItem;
    }catch(error){
        throw new Error(`Error Creating Order Item: ${error.message}`);
    }
};
//Get All
const getAllPosOrderItem = async()=>{
    try{
        const posOrderItem = await POS_ORDER_ITEM.findAll();
        return posOrderItem;
    }catch(error){
        throw new Error(`Error Fetching All Order Items: ${error.message}`);
    }
};
//Get By ID
const getPosOrderItemById = async(id)=>{
    try{
        const posOrderItem = await POS_ORDER_ITEM.findByPk(id);
        if(!posOrderItem){
            throw new Error('No Item Found');
        }
        return posOrderItem;
    }catch(error){
        throw new Error(`Error Fetching Order Item: ${error.message}`);
    }
};
//get By OrderId
const getPosOrderItemByOrderId = async(order_id)=>{
    try{
        const posOrderItem = await POS_ORDER_ITEM.findAll({ where: { order_id } });
        if(!posOrderItem){
            throw new Error('No Order Items Found');
        }
        return posOrderItem;
    }catch(error){
        throw new Error(`Error getting order Detailes: ${error.message}`);
    }
};
//Update By ID
const updatePosOrderItemById = async(id, data)=>{
    try{
        const posOrderItem = await POS_ORDER_ITEM.findByPk(id);
        if(!posOrderItem){
            throw new Error('No Item Found');
        }
        await posOrderItem.update(data);
        return posOrderItem;
    }catch(error){
        throw new Error(`Error Updating Order Item: ${error.message}`);
    }
};
//Delete By ID
const deletePosOrderItemById = async(id)=>{
    try{
        const posOrderItem = await POS_ORDER_ITEM.findByPk(id);
        if(!posOrderItem){
            throw new Error('No Order Item Found');
        }
        await posOrderItem.destroy();
        return {message:'Order Item Deleted'};
    }catch(error){
        throw new Error(`Error deleting Order Item: ${error.message}`);
    }
};

module.exports={
    createPosOrderItem,
    getAllPosOrderItem,
    getPosOrderItemById,
    getPosOrderItemByOrderId,
    updatePosOrderItemById,
    deletePosOrderItemById
};