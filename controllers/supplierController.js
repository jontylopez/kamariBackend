const SuplierService = require('../services/SupplierService');
const logger = require('../utils/logger');

//Create
const createSupplier = async(req, res)=>{
    try{
        const suppler = await SuplierService.createSupplier(req.body);
        res.status(201).json(suppler);
    }catch(error){
        logger.error(`Error in createSupplier: ${error.message}`);
        res.status(500).json({error: error.message});
    }
};
//Get All
const getAllSupplier = async(req, res)=>{
    try{
        const suppliers = await SuplierService.getAllSuppliers();
        res.status(200).json(suppliers);
    }catch(error){
        logger.error(`Error in getAllSupplier: ${error.message}`);
        res.status(500).json({error: error.message});
    }
};
//Get By ID
const getSupplierById = async(req, res)=>{
    try{
        const supplier = await SuplierService.getSupplierById(req.params.id);
        res.status(200).json(supplier);
    }catch(error){
        logger.error(`Error in getSupplierById: ${error.message}`);
        res.status(404).json({error: error.message});
    }
};
//Update by ID
const updateSupplierById = async(req, res)=>{
    try{
        const updateSupplier = await SuplierService.updateSupplierById(req.params.id, req.body);
        res.status(200).json(updateSupplier);
    }catch(error){
        logger.error(`Error in updateSupplierById: ${error.message}`);
        res.status(400).json({error: error.message});
    }
};
//Delete By ID
const deleteSupplierById = async(req, res)=>{
    try{
        const result = await SuplierService.deleteSupplierById(req.params.id);
        res.status(200).json(result);
    }catch(error){
        logger.error(`Error in deleteSupplierById: ${error.message}`);
        res.status(400).json({error: error.message});
    }
};

module.exports={
    createSupplier,
    getAllSupplier,
    getSupplierById,
    updateSupplierById,
    deleteSupplierById
}