const POS_SESSION = require('../models/pos_session');

// Create Stock Movement
const createPosSession = async (data) =>{
    try{
        const posSession = await POS_SESSION.create(data);
        return posSession;
    }catch(error){
        throw new Error(`Error creating PosSession: ${error.message}`);
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
module.exports = {
    createPosSession,
    getActiveSession,
    getAllPosSessions,
    getSessionById,
    updatePosSessionById,
    deletePosSeessionById
};