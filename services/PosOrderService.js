const POS_ORDER = require('../models/pos_order');

//Create
const createPosOrder = async(data)=>{
    try{
        const posOrder = await POS_ORDER.create(data);
        return posOrder;
    }catch(error){
        throw new Error(`Error Creating Pos Order: ${error.message}`);
    }
};
//Get All
const getAllPosOrder = async()=>{
    try{
        const posOrder = await POS_ORDER.findAll({
            order:[['id','DESC']]
        });
        return posOrder;
    }catch(error){
        throw new Error(`Error Fetching All POS Order: ${error.message}`);
    }
};
//Get By ID
const getPosOrderByID = async(id)=>{
    try{
        const posOrder = await POS_ORDER.findByPk(id);
        if(!posOrder){
            throw new Error('No POS Order Found');
        }
        return posOrder;
    }catch(error){
        throw new Error(`Error Fetching POS Order: ${error.message}`);
    }
};
//Update By ID
const updatePosOrderById = async(id, data)=>{
    try{
        const posOrder = await POS_ORDER.findByPk(id);
        if(!posOrder){
            throw new Error('No Pos Order Found');
        }
        await posOrder.update(data);
        return posOrder
    }catch(error){
        throw new Error(`Error Updating POS Order: ${error.message}`);
    }
};
//Delete By ID
const deletePosOrderById = async(id)=>{
    try{
        const posOrder = await POS_ORDER.findByPk(id);
        if(!posOrder){
            throw new Error('No POS ORDER Found');
        }
        await posOrder.destroy();
        return {message:'POS Order Deleted'};
    }catch(error){
        throw new Error(`Error Deleting POS Order: ${error.message}`);
    }
};

module.exports = {
    createPosOrder,
    getAllPosOrder,
    getPosOrderByID,
    updatePosOrderById,
    deletePosOrderById
};