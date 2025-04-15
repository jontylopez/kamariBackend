const { error } = require('winston');
const POS_PAYMENT = require('../models/pos_payment');

// Create
const createPosPayment = async (data, transaction = null) => {
    try {
      const options = transaction ? { transaction } : {};
      const payment = await POS_PAYMENT.create(data, options);
      return payment;
    } catch (error) {
      throw new Error(`Error Creating Pos Payment: ${error.message}`);
    }
  };
  
  module.exports = {
    createPosPayment
  };
  
//Get All
const getAllPosPayment = async()=>{
    try{
        const payment = POS_PAYMENT.findAll({
            order:[['id','DESC']]
        });
        return payment;
    }catch(error){
        throw new Error(`Error Fetching All Payments: ${error.message}`);
    }
};
//Get By ID
const getPosPaymentById = async(id)=>{
    try{
        const payment = await POS_PAYMENT.findByPk(id);
        if(!payment){
            throw new Error('No Payment Found');
        }
        return payment;
    }catch(error){
        throw new Error(`Error Fetching payment: ${error.message}`);
    }
};
//Get By Order ID
const getPaymentsByOrderId = async (order_id) => {
    try {
        const payments = await POS_PAYMENT.findAll({ where: { order_id } });
        if (!payments.length) {
            throw new Error('No payments found for this order');
        }
        return payments;
    } catch (error) {
        throw new Error(`Error fetching payments: ${error.message}`);
    }
};

//Update By ID
const updatePosPaymentById = async(id, data)=>{
    try{
        const payment = await POS_PAYMENT.findByPk(id);
        if(!payment){
            throw new Error('No Payment Found');
        }
        await payment.update(data);
        return payment;
    }catch(error){
        throw new Error(`Error Updating Payment: ${error.message}`);
    }
};
//Delete By ID
const deletePosPaymentById = async(id)=>{
    try{
        const payment = await POS_PAYMENT.findByPk(id);
        if(!payment){
            throw new Error('No Payment found');
        }
        await payment.destroy();
        return {message: 'Payment Deleted'};
    }catch(error){
        throw new Error(`Error Deleting Payment: ${error.message}`);
    }
};

module.exports = {
    createPosPayment,
    getAllPosPayment,
    getPosPaymentById,
    getPaymentsByOrderId,
    updatePosPaymentById,
    deletePosPaymentById
};