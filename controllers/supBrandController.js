const SupBrandService = require('../services/SupBrandService');
const logger = require('../utils/logger');

//Create
const createSupBrand = async(req, res)=>{
    try{
        const supbrand = await SupBrandService.createSupBrand(req.body);
        res.status(201).json(supbrand);
    }catch(error){
        logger.error(`Error in createSupBrand: ${error.message}`);
        res.status(500).json({error: error.message});
    }
};
//Get All
const getAllSupBrand = async(req, res)=>{
    try{
        const supbrands = await SupBrandService.getAllSupBrand();
        res.status(200).json(supbrands);
    }catch(error){
        logger.error(`Error in getAllSupBrand: ${error.message}`);
        res.status(500).json({error: error.message});
    }
};
//Get By ID
const getSupBrandById =async(req, res)=>{
    try{
        const supbrand = await SupBrandService.getSupBrandById(req.params.id);
        res.status(200).json(supbrand);
    }catch(error){
        logger.error(`Error in getSupBrandById: ${error.message}`);
        res.status(404).json({error: error.message});
    }
};
//Update by ID
const updateSupBrandById = async(req, res)=>{
    try{
        const updateSupBrand = await SupBrandService.updateSupBrandById(req.params.id, req.body);
        res.status(200).json(updateSupBrand);
    }catch(error){
        logger.error(`Error in updateSupBrandById: ${error.message}`);
        res.status(400).json({error: error.message});
    }
};
//Get ID Where SupId = ? and BrandId = ?
const getSupBrandId = async(req, res) => {
    try {
      const { sup_id, brand_id } = req.params;
      const supBrandId = await SupBrandService.getSupBrandId(sup_id, brand_id);
      if (!supBrandId) {
        return res.status(200).json(null);
      }
      res.status(200).json(supBrandId);
    } catch (error) {
      logger.error(`Error in getSupBrandId: ${error.message}`);
      res.status(404).json({ error: error.message });
    }
  };
  
//Delete By ID
const deleteSupBrandById = async (req, res)=>{
    try{
        const result = await SupBrandService.deleteSupBrandById(req.params.id);
        res.status(200).json(result);
    }catch(error){
        logger.error(`Error in deleteSupBrandById: ${error.message}`);
        res.status(400).json({error: error.message});
    }
};

module.exports = {
    createSupBrand,
    getAllSupBrand,
    getSupBrandById,
    getSupBrandId,
    updateSupBrandById,
    deleteSupBrandById
};