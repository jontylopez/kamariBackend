const ProductService = require('../services/ProductService');
const logger = require('../utils/logger');

//Create Product
const createProduct = async(req, res)=>{
    try{
        const product = await ProductService.createProduct(req.body);
        res.status(201).json(product);
    }catch(error){
        logger.error(`Error in createProduct: ${error.message}`);
        res.status(500).json({error: error.message});
    }
};
//Get All Product
const getAllProduct = async(req, res)=>{
    try{
        const products = await ProductService.getAllProduct();
        res.status(200).json(products);
    }catch(error){
        logger.error(`Error in getAllProduct: ${error.message}`);
        res.status(500).json({error: error.message});
    }
};
//Get Product By ID
const getProductById  = async(req, res)=>{
    try{
        const product = await ProductService.getProductById(req.params.id);
        res.status(200).json(product);
    }catch(error){
        logger.error(`Error in getProductById: ${error.message}`);
        res.status(404).json({error: error.message});
    }
};
//Update Product By ID
const updateProductById = async(req, res)=>{
    try{
        const updateProduct = await ProductService.updateProductById(req.params.id, req.body);
        res.status(200).json(updateProduct);
    }catch(error){
        logger.error(`Error in updateProductById: ${error.message}`);
        res.status(400).json({error: error.message});
    }
};
//Delete Product By ID
const deleteProductById = async(req, res)=>{
    try{
        const result = await ProductService.deleteProductById(req.params.id);
        res.status(200).json(result);
    }catch(error){
        logger.error(`Error in deleteProductById: ${error.message}`);
        res.status(400).json({error:error.message});
    }
};

module.exports = {
    createProduct,
    getAllProduct,
    getProductById,
    updateProductById,
    deleteProductById
}