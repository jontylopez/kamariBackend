const Customer = require('../models/customer');

//Create
const createCustomer = async(data)=>{
    try{
        const customer = await Customer.create(data);
        return customer;
    }catch(error){
        throw new Error(`Error createing Customer: ${error.message}`);
    }
};
//Get All
const getAllCustomers = async()=>{
    try{
        const customer = await Customer.findAll({
            order:[['id','DESC']]
        });
        return customer;
    }catch(error){
        throw new Error(`Error Fetching All Customers: ${error.message}`);
    }
}
//Get By ID
const getCustomerById = async(id)=>{
    try{
        const customer = await Customer.findByPk(id);
        if(!customer){
            throw new Error('No Customer Found');
        }
        return customer;
    }catch(error){
        throw new Error(`Error in Fetching Customer: ${error.message}`);
    }
};
//Get By Phone
const getCustomerByPhone = async(phone)=>{
    try{
        const customer = await Customer.findOne({ where: { phone } }); 
        if(!customer){
            throw new Error('No Customer Found');
        }
        return customer;
    }catch(error){
        throw new Error(`Error in Fetching Customer: ${error.message}`);
    }
}
//Update By ID
const updateCustomerById = async(id,data)=>{
    try{
        const customer = await Customer.findByPk(id);
        if(!customer){
            throw new Error('Customer Not Found');
        }
        await customer.update(data);
        return customer;
    }catch(error){
        throw new Error(`Error Updating Customer: ${error.message}`);
    }
};
//Delete By ID
const deleteCustomerById = async(id)=>{
    try{
        const customer = await Customer.findByPk(id);
        if(!customer){
            throw new Error('Customer Not Found');
        }
        await customer.destroy();
        return {message:'Customer Deleted Successfully'};
    }catch(error){
        throw new Error(`Error Deleting Customer: ${error.message}`);
    }
};
module.exports={
    createCustomer,
    getAllCustomers,
    getCustomerById,
    getCustomerByPhone,
    updateCustomerById,
    deleteCustomerById
};