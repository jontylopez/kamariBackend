const POS_SESSION = require('../models/pos_session');

// Create Pos Session
const createPosSession = async (data) => {
    try {
      const existingSession = await POS_SESSION.findOne({ where: { status: 'open' } });
      if (existingSession) {
        throw new Error('A POS session is already active. Please close it before starting a new one.');
      }
      const posSession = await POS_SESSION.create(data);
      return posSession;
    } catch (error) {
      throw new Error(`Error creating POS session: ${error.message}`);
    }
  };

const getActiveSession = async () => {
    try {
      const session = await POS_SESSION.findOne({ where: { status: 'open' } });
      return session;
    } catch (error) {
      throw new Error(`Error fetching active session: ${error.message}`);
    }
  };
  

// Get All Sessions
const getAllPosSessions = async()=>{
    try{
        const posSession = await POS_SESSION.findAll({
            order:[['id','DESC']]
        });
        return posSession;
    }catch(error){
        throw new Error(`Error Fetching All Sessions: ${error.message}`);
    }
    
};
//Get Session By ID
const getSessionById = async(id)=>{
    try{
        const posSession = await POS_SESSION.findByPk(id);
        if(!posSession){
            throw new Error('Session Not Found');
        }
        return posSession;
    }catch(error){
        throw new Error(`Error in Fetching Session: ${error.message}`);
    }
};

// Update Session By ID
const updatePosSessionById = async(id,data)=>{
    try{
        const posSession = await POS_SESSION.findByPk(id);
        if(!posSession){
            throw new Error('No Pos Session Found');
        }
        await posSession.update(data);
        return posSession;
    }catch(error){
        throw new Error(`Error Updating Pos Session: ${error.message}`);
    }
};
// Delete POS Session By ID
const deletePosSeessionById = async(id)=>{
    try{
        const posSession = await POS_SESSION.findByPk(id);
        if(!posSession){
            throw new Error('No Session Found');
        }
        await posSession.destroy();
        return {message: 'Session Deleted Successfully'};
    }catch(error){
        throw new Error(`Error Deleting Poss Session: ${error.message}`);
    }
};

const closePosSessionById = async (id, { end_time, cash_in_drawer, closed_by }) => {
    try {
      const posSession = await POS_SESSION.findByPk(id);
  
      if (!posSession) {
        throw new Error('Session not found');
      }
  
      if (posSession.status === 'closed') {
        throw new Error('Session is already closed');
      }
  
      // Only update allowed fields
      posSession.status = 'closed';
      posSession.end_time = end_time;
      posSession.cash_in_drawer = cash_in_drawer;
      posSession.closed_by = closed_by;
  
      await posSession.save();
      return posSession;
    } catch (error) {
      throw new Error(`Error closing session: ${error.message}`);
    }
  };
  
module.exports = {
    createPosSession,
    getActiveSession,
    getAllPosSessions,
    getSessionById,
    updatePosSessionById,
    closePosSessionById,
    deletePosSeessionById
};