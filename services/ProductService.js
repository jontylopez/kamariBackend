const Product = require('../models/product');


//Create Product
const createProduct = async (data)=>{
    try{
        const product = await Product.create(data);
        return product;
    }catch(error){
        throw new Error(`Error Create Product: ${error.message}`);
    }
};
//Get All Product
const getAllProduct = async ()=>{
    try{
        const product = await Product.findAll({
            order:[['id','DESC']]
        });
        return product;
    }catch(error){
        throw new Error(`Error Fetch Product: ${error.message}`);
}
};
//Get Product By ID
const getProductById = async (id)=>{
    try{
        const product = await Product.findByPk(id);
        if(!product){
            throw new Error('No Product found');
        }
        return product;
    }catch(error){
        throw new Error(`Error Fetch Product:${error.message}`);
    }
};
//Update Product By ID
const updateProductById = async (id, data)=>{
    try{
        const product = await Product.findByPk(id);
        if(!product){
            throw new Error('No Product found');
        }
        await product.update(data);
        return product;
    }catch(error){
        throw new Error(`Error Updating Product: ${error.message}`);
    }
};
//Delete Product By ID
const deleteProductById = async(id)=>{
    try{
        const product = await Product.findByPk(id);
        if(!product){
            throw new Error('No product found');
        }
        await product.destroy()
        return { message: 'Product Deleted Successfully' };

    }catch(error){
        throw new Error(`Error Deleting Product: ${error.message}`); 
    }
};
module.exports = {
    createProduct,
    getAllProduct,
    getProductById,
    updateProductById,
    deleteProductById
}