const PosSessionService = require('../services/PosSessionService');
const logger = require('../utils/logger');

//Create
const createPosSession = async(req,res)=>{
    try{
        const posSession = await PosSessionService.createPosSession(req.body);
        res.status(201).json(posSession);
    }catch(error){
        logger.error(`Error in createPosSession: ${error.message}`);
        res.status(500).json({error: error.message});
    }
};
//Get All
const getAllPosSessions = async(req, res)=>{
    try{
        const posSessions = await PosSessionService.getAllPosSessions();
        res.status(200).json(posSessions);
    }catch(error){
        logger.error(`Error in getAllPosSessions: ${error.message}`);
        res.status(500).json({error: error.messaga});
    }
};
//Get By ID
const getPosSessionById = async(req, res)=>{
    try{
        const posSession = await PosSessionService.getSessionById(req.params.id);
        res.status(200).json(posSession);
    }catch(error){
        logger.error(`Error in getPosSessionById: ${error.messaga}`);
        res.status(404).json({error: error.message});
    }
};
//Update By ID
const updatePosSessionById = async(req, res)=>{
    try{
        const updateSession = await PosSessionService.updatePosSessionById(req.params.id, req.body);
        res.status(200).json(updateSession);
    }catch(error){
        logger.error(`Error in updatePosSessionById: ${error.message}`);
        res.status(400).json({error: error.messaga});
    }
};
//Delete By ID
const deletePosSeessionById = async (req, res)=>{
    try{
        const result = await PosSessionService.deletePosSeessionById(req.params.id);
        res.status(200).json(result);
    }catch(error){
        logger.error(`Error in deletePosSeessionById: ${error.message}`);
        res.status(400).json({error: error.messaga});
    }
};

const getActiveSession = async (req, res) => {
    try {
      const session = await PosSessionService.getActiveSession();
  
      if (!session) {
        // ✅ Instead of 404, return a controlled "inactive" response
        return res.status(200).json({ active: false });
      }
  
      // Return the actual session data
      res.status(200).json({ active: true, ...session.toJSON() });
    } catch (error) {
      logger.error(`Error in getActiveSession: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  };
  
module.exports = {
    createPosSession,
    getAllPosSessions,
    getPosSessionById,
    updatePosSessionById,
    deletePosSeessionById,
    getActiveSession
};