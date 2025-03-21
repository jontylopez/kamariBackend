const Supplier = require('../models/Supplier');

//Create Supplier
const createSupplier =  async (data)=>{
    try{
        const supplier  = await Supplier.create(data);
        return supplier;
    }catch(error){
        throw new Error(`Error creating Supplier: ${error.message}`);
    }
};

// Get All Suppliers
const getAllSuppliers = async ()=>{
    try{
        const supplier = await Supplier.findAll({
            order:[['id','DESC']]
        });
        return supplier;
    }catch(error){
        throw new Error(`Error fetching Supplier: ${error.message}`);
    }
};

// Get a Supplier By ID
const getSupplierById = async (id)=>{
    try{
        const supplier = await Supplier.findByPk(id);
        if(!supplier){
            throw new Error('Supplier Not Found');
        }
        return supplier;
    }catch(error){
        throw new Error(`Error fetching Supplier :${error.message}`);
    }
};

//Update Supplier By ID
const updateSupplierById = async(id,data)=>{
    try{
        const supplier = await Supplier.findByPk(id);
        if(!supplier){
            throw new Error('Supplier Not found');
        }
        await supplier.update(data);
        return supplier;
    }catch(error){
        throw new Error(`Error Updating Supplier: ${error.message}`);
    }
};

// Delete Supplier By ID
const deleteSupplierById = async(id)=>{
    try{
        const supplier = await Supplier.findByPk(id);
        if(!supplier){
            throw new Error('Supplier Not found');
        }
        await supplier.destroy();
        return {message: 'Supplier Deleted Successfully'};
    }catch(error){
        throw new Error(`Error Deleting Supplier: ${error.message}`);
    }
};
module.exports = {
    createSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplierById,
    deleteSupplierById
};