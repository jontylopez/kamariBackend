const POSPaymentService = require('../services/PosPaymentService');
const logger = require('../utils/logger');

//Create
const createPayment = async(req, res)=>{
    try{
        const payment = await POSPaymentService.createPosPayment(req.body);
        res.status(201).json(payment);
    }catch(error){
        logger.error(`Error in createPayment: ${error.message}`);
        res.status(500).json({error: error.message});
    }
};
//Get All
const getAllPayments = async(req, res)=>{
    try{
        const payments = await POSPaymentService.getAllPosPayment();
        res.status(200).json(payments);
    }catch(error){
        logger.error(`Error in getAllPayments: ${error.message}`);
        res.status(500).json({error: error.message});
    }
};
//Get By ID
const getPaymentById = async(req, res)=>{
    try{
        const payment = await POSPaymentService.getPosPaymentById(req.params.id);
        res.status(200).json(payment);
    }catch(error){
        logger.error(`Error in getPaymentById: ${error.message}`);
        res.status(404).json({error: error.message});
    }
};
// ✅ Corrected name and param usage
const getPaymentsByOrderId = async (req, res) => {
    try {
        const payments = await POSPaymentService.getPaymentsByOrderId(req.params.order_id);
        res.status(200).json(payments);
    } catch (error) {
        logger.error(`Error in getPaymentsByOrderId: ${error.message}`);
        res.status(404).json({ error: error.message });
    }
};

  
//Update By ID
const updatePaymentById = async(req, res)=>{
    try{
        const updatePayment = await POSPaymentService.updatePosPaymentById(req.params.id, req.body);
        res.status(200).json(updatePayment);
    }catch(error){
        logger.error(`Error in updatePaymentById: ${error.message}`);
        res.status(400).json({error: error.message});
    }
};
//Delete By ID
const deletePaymentById = async(req,res)=>{
    try{
        const result = await POSPaymentService.deletePosPaymentById(req.params.id);
        res.status(200).json(result)
    }catch(error){
        logger.error(`Error in deletePaymentById: ${error.message}`);
        res.status(400).json({error: error.message});
    }
};
module.exports={
createPayment,
getAllPayments,
getPaymentById,
getPaymentsByOrderId,
updatePaymentById,
deletePaymentById
};