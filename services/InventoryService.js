const Inventory = require('../models/Inventory');

//Create Inventory
const createInventory = async (data)=>{
    try{
        const inventory = await Inventory.create(data);
        return inventory;
    }catch(error){
        throw new Error(`Error Creating Inventory: ${error.message}`);
    }
};
//Get All Inventory
const getAllInventory = async ()=>{
    try{
        const inventory = await Inventory.findAll({
            order: [['id','DESC']]
        });
        return inventory;
    }catch(error){
        throw new Error(`Error Fetching Inventory: ${error.message}`);
    }
};
//Get Inventory By ID
const getInventoryById = async (id)=>{
    try{
        const inventory = await Inventory.findByPk(id);
        if(!inventory){
            throw new Error('Inventory Not found');
        }
        return inventory;
    }catch(error){
        throw new Error(`Error Fetching Inventory: ${error.message}`);
    }
};
//Update Inventory By ID
const updateInventoryById = async (id, data)=>{
    try{
        const inventory = await Inventory.findByPk(id);
        if(!inventory){
            throw new Error('Inventory Not Found');
        }
        await inventory.update(data);
        return inventory;
    }catch(error){
        throw new Error(`Error Updating Inventory: ${error.message}`);
    }
};
//Delete Inventory By ID
const deleteInventoryById = async (id)=>{
    try{
        const inventory = await Inventory.findByPk(id);
        if(!inventory){
            throw new Error('Inventory Not found');
        }
        await inventory.destroy();
        return {message: 'Inventory Deleted Successfully'}
    }catch(error){
        throw new Error(`Error Delete Inventory: ${error.message}`);
    }
};
module.exports = {
    createInventory,
    getAllInventory,
    getInventoryById,
    updateInventoryById,
    deleteInventoryById
}