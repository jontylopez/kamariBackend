const CashTrService = require('../services/CashTransactionsService');
const logger = require('../utils/logger');

//Create
const createCash = async(req, res)=>{
    try{
        const cash = await CashTrService.createCashTr(req.body);
        res.status(201).json(cash);
    }catch(error){
        logger.error(`Error in createCash: ${error.message}`);
        res.status(500).json({error: error.message});
    }
};
//Get All:
const getAllCash = async(req, res)=>{
    try{
        const cashTrs = await CashTrService.getAllCashTr();
        res.status(200).json(cashTrs);
    }catch(error){
        logger.error(`Error ingetAllCash: ${error.message}`);
        res.status(500).json({error: error.message});
    }
};
//Get By ID
const gettCashById = async(req, res)=>{
    try{
        const cash = await CashTrService.getCashTrById(req.params.id);
        res.status(200).json(cash);
    }catch(error){
        logger.error(`Error in gettCashById: ${error.message}`);
        res.status(404).json({message: error.message});
    }
};
//Get By Session ID
const getCashBySession = async(req, res)=>{
    try{
        const cashTrs = await CashTrService.getCashTrBySession(req.params.session_id);
        res.status(200).json(cashTrs);
    }catch(error){
        logger.error(`Error in getCashBySession: ${error.message}`);
        res.status(404).json({message: error.message});
    }
};
//Get By Seession ID AND Type
const getCashBySessIdAndType = async(req, res)=>{
    try{
        const cashTrs = await CashTrService.getCashTrBySesIdAndType(req.params.session_id, req.params.type);
        res.status(200).json(cashTrs);
    }catch(error){
        logger.error(`Error in getCashBySessIdAndType: ${error.message}`);
        res.status(404).json({error: error.message});
    }
};
//Updat By ID
const updateCashById = async(req, res)=>{
    try{
        const updateCash = await CashTrService.updateCashTrById(req.params.id, req.body);
        res.status(200).json(updateCash);
    }catch(error){
        logger.error(`Error in updateCashById: ${error.message}`);
        res.status(400).json({error: error.message});
    }
};
//Delete By ID
const deleteCashById = async(req, res)=>{
    try{
        const result = await CashTrService.deleteCashTrById(req.params.id);
        res.status(200).json(result);
    }catch(error){
        logger.error(`Error in deleteCashById: ${error.message}`);
        res.status(400).json({error: error.message});
    }
};

module.exports = {
    createCash,
    getAllCash,
    gettCashById,
    getCashBySession,
    getCashBySessIdAndType,
    updateCashById,
    deleteCashById
};
