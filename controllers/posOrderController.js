const POSOrderService = require('../services/PosOrderService');
const logger = require('../utils/logger');

const createPosOrder = async (req, res) => {
  try {
    const { order, items, payments } = req.body;

    if (!order || !items || !Array.isArray(items)) {
      return res.status(400).json({ error: "Invalid request payload" });
    }

    console.log("Controller received order data:", { order, itemCount: items.length, paymentCount: payments?.length || 0 });

    // Pass payments to service
    const posOrder = await POSOrderService.createPosOrder(order, items, payments || []);

    res.status(201).json(posOrder);

  } catch (error) {
    logger.error(`Error in createPosOrder: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const getNextOrderId = async (req, res) => {
  try {
    const nextId = await POSOrderService.getNextOrderId();
    res.status(200).json({ nextId });
  } catch (error) {
    console.error("Error in getNextOrderId:", error);
    res.status(500).json({ error: error.message });
  }
};


//Get All
const getAllPosOrders = async(req, res)=>{
    try{
        const posOrders = await POSOrderService.getAllPosOrder();
        res.status(200).json(posOrders);
    }catch(error){
        logger.error(`Error in getAllPosOrder: ${error.message}`);
        res.status(500).json({error: error.message});
    }
};
//Get By ID
const getPosOrderById = async(req,res)=>{
    try{
        const posOrder = await POSOrderService.getPosOrderByID(req.params.id);
        res.status(200).json(posOrder);
    }catch(error){
        logger.error(`Error in getPosOrderById: ${error.message}`);
        res.status(404).json({error: error.message});
    }
};
// get By Session Id
const getOrderBySession = async (req, res) => {
    try {
      // Fetch orders and their items for the given session_id
      const posOrders = await POSOrderService.getPosOrderBySession(req.params.session_id);
  
      // Check if orders exist
      if (!posOrders || posOrders.length === 0) {
        return res.status(404).json({ error: 'No Orders Found' });
      }
  
      // Respond with the orders and their items
      res.status(200).json(posOrders);
    } catch (error) {
      // Log the error and send a response
      logger.error(`Error in getOrderBySession: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  };
  
//Update By ID
const updatePosOrderById = async(req, res)=>{
    try{
        const updatePosOrder = await POSOrderService.updatePosOrderById(req.params.id, req.body);
        res.status(200).json(updatePosOrder);
    }catch(error){
        logger.error(`Error in updatePosOrderById: ${error.message}`);
        res.status(400).json({error: error.message});
    }
};
//Delete By ID
const deletePosOrderById = async (req, res)=>{
    try{
        const result = await POSOrderService.deletePosOrderById(req.params.id);
        res.status(200).json(result);
    }catch(error){
        logger.error(`Error in deletePosOrderById: ${error.message}`);
        res.status(400).json({error: error.message});
    }
};

module.exports = {
    createPosOrder,
    getAllPosOrders,
    getNextOrderId,
    getPosOrderById,
    getOrderBySession,
    updatePosOrderById,
    deletePosOrderById
}