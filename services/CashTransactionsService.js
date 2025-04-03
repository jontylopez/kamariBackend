const CASH_TR = require('../models/cash_transactions');
//Create
const createCashTr = async(data)=>{
    try{
        const cash = await CASH_TR.create(data);
        return cash;
    }catch(error){
        throw new Error(`Error Creating Cash Entry: ${error.message}`);
    }
};
//Get All
const getAllCashTr = async()=>{
    try{
        const cash = await CASH_TR.findAll({
            order: [['id','DESC']]
        });
        return cash;
    }catch(error){
        throw new Error(`Error Fetching Cash Entries: ${ErrorEvent.message}`);
    }
};
//Get By ID
const getCashTrById = async(id)=>{
    try{
        const cash = await CASH_TR.findByPk(id);
        if(!cash){
            throw new Error('No Entry Found');
        }
        return cash;
    }catch(error){
        throw new Error(`Error Fetching Entry: ${error.message}`);
    }
};
//Get By Session ID
const getCashTrBySession = async(session_id)=>{
    try{
        const cash = await CASH_TR.findAll({ where: { session_id } });
        if(!cash){
            throw new Error('No Entries for this session');
        }
        return cash;
    }catch(error){
        throw new Error(`Error Fetching Entries By Session: ${error.message}`);
    }
};
const getCashTrBySesIdAndType = async (session_id, type) => {
    try {
      const cash = await CASH_TR.findAll({ where: { session_id, type } });
      if (!cash || cash.length === 0) {
        throw new Error('No Entries Found');
      }
      return cash;
    } catch (error) {
      throw new Error(`Error Finding entries: ${error.message}`);
    }
  };
  
//Update By ID
const updateCashTrById = async(id,data)=>{
    try{
        const cash = await CASH_TR.findByPk(id);
        if(!cash){
            throw new Error('No Cash Entry Found');
        }
        await cash.update(data);
        return cash;
    }catch(error){
        throw new Error(`Error updating Entry: ${error.message}`);
    }
};
//Delete By ID
const deleteCashTrById = async(id)=>{
    try{
        const cash = CASH_TR.findByPk(id);
        if(!cash){
            throw new Error('No Entry Found');
        }
        await cash.destroy();
        return{message:' Entry Deleted'};
    }catch(error){
        throw new Error(`Error Deleting Cash Entry: ${error.message}`);
    }
};
module.exports={
    createCashTr,
    getAllCashTr,
    getCashTrById,
    getCashTrBySession,
    getCashTrBySesIdAndType,
    updateCashTrById,
    deleteCashTrById
};