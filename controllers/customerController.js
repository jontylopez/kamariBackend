const CustomerService = require('../services/CustomerService');
const logger = require('../utils/logger');

//Create
const createCustomer = async(req, res)=>{
    try{
        const customer = await CustomerService.createCustomer(req.body);
        res.status(201).json(customer);
    }catch(error){
        logger.error(`Error in createCustomer: ${error.message}`);
        res.status(500).json({error: error.message});
    }
};
//Get All
const getAllCustomers = async(req, res)=>{
    try{
        const customers = await CustomerService.getAllCustomers();
        res.status(200).json(customers);
    }catch(error){
        logger.error(`Error in getAllCustomers: ${error.message}`);
        res.status(500).json({error: error.message});
    }
};
//Get By ID
const getCustomerById = async(req, res)=>{
    try{
        const customer = await CustomerService.getCustomerById(req.params.id);
        res.status(200).json(customer);
    }catch(error){
        logger.error(`Error in getCustomerById: ${error.message}`);
        res.status(404).json({error: error.message});
    }
};
// ✅ Corrected name and param usage
const getCustomerByPhone = async (req, res) => {
    try {
      const customer = await CustomerService.getCustomerByPhone(req.params.phone);
  
      if (!customer) {
        // Return success response with `found: false`
        return res.status(200).json({ found: false });
      }
  
      // Return customer data with `found: true`
      res.status(200).json({ found: true, ...customer.toJSON() });
    } catch (error) {
      logger.error(`Error in getCustomerByPhone: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  };
  
//Update By ID
const updateCustomerById = async(req, res)=>{
    try{
        const updateCustomer = await CustomerService.updateCustomerById(req.params.id, req.body);
        res.status(200).json(updateCustomer);
    }catch(error){
        logger.error(`Error in updateCustomerById: ${error.message}`);
        res.status(400).json({error: error.message});
    }
};
//Delete By ID
const deleteCustomerByID = async(req,res)=>{
    try{
        const result = await CustomerService.deleteCustomerById(req.params.id);
        res.status(200).json(result)
    }catch(error){
        logger.error(`Error in deleteCustomerById: ${error.message}`);
        res.status(400).json({error: error.message});
    }
};
module.exports={
    createCustomer,
    getAllCustomers,
    getCustomerById,
    getCustomerByPhone,
    updateCustomerById,
    deleteCustomerByID
};