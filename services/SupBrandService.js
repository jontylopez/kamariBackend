const SupBrand = require('../models/SupBrand');

//Create SupBrand
const createSupBrand = async(data)=>{
    try{
        const supbrand = await SupBrand.create(data);
        return supbrand;
    }catch(error){
        throw new Error(`Error Creating SupBrand:${error.message}`);
    }
};
//Get All SupBrand
const getAllSupBrand = async()=>{
    try{
        const supbrand = await SupBrand.findAll({
            order:[['id','DESC']]
        });
        return supbrand;
    }catch(error){
        throw new Error(`Error Fetching SupBrand:${error.message}`);
    }
};
//GetSupBrand by ID
const getSupBrandById = async(id)=>{
    try{
        const supbrand = await SupBrand.findByPk(id);
        if(!supbrand){
            throw new Error('No SupBrand Found');
        }
        return supbrand;
    }catch(error){
        throw new Error(`Error Fetching SupBrand:${error.message}`);
    }
};
//Get ID of SupBrand Where supId and brandId
const getSupBrandId = async(supId,brandId)=>{
    try{
        const supbrand = await SupBrand.findOne({
            where: {
                supId: supId,
                brandId: brandId
            }
        });
        if(!supbrand){
            throw new Error('No SupBrand Found');
        }
        return supbrand.id;
    }catch(error){
        throw new Error(`Error Fetching SupBrand ID:${error.message}`);
    }
};
//Update SupBrand By ID
const updateSupBrandById = async(id,data)=>{
    try{
        const supbrand = await SupBrand.findByPk(id);
        if(!supbrand){
            throw new Error('No SupBrand Found');
        }
        await supbrand.update(data);
        return supbrand;
    }catch(error){
        throw new Error(`Error Updating SupBrand:${error.message}`);
    }
};
//Delete SupBrand By ID
const deleteSupBrandById = async(id)=>{
    try{
        const supbrand = await SupBrand.findByPk(id);
        if(!supbrand){
            throw new Error('No SupBrand Found');
        }
        await supbrand.destroy();
        return {message:'SupBrand Deleted Successfully'}
    }catch(error){
        throw new Error(`Error Deleting SupBrand:${error.message}`);
    }
}

module.exports = {
    createSupBrand,
    getAllSupBrand,
    getSupBrandById,
    getSupBrandId,
    updateSupBrandById,
    deleteSupBrandById
}