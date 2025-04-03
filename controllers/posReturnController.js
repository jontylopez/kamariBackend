const posReturnService = require('../services/PosReturnService');
const logger = require('../utils/logger');

// ✅ Create Return
const createReturn = async (req, res) => {
  try {
    const posReturn = await posReturnService.createReturn(req.body);
    res.status(201).json(posReturn);
  } catch (error) {
    logger.error(`Error in createReturn: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Returns
const getAllReturns = async (req, res) => {
  try {
    const returns = await posReturnService.getAllReturn();
    res.status(200).json(returns);
  } catch (error) {
    logger.error(`Error in getAllReturns: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Return by ID
const getReturnById = async (req, res) => {
  try {
    const posReturn = await posReturnService.getReturnById(req.params.id);
    if (!posReturn) {
      return res.status(404).json({ message: 'Return item not found' });
    }
    res.status(200).json(posReturn);
  } catch (error) {
    logger.error(`Error in getReturnById: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Returns by Session ID
const getReturnsBySessionId = async (req, res) => {
  try {
    const returns = await posReturnService.getReturnBySessionId(req.params.session_id);
    if (!returns || returns.length === 0) {
      return res.status(404).json({ message: 'No returns found for this session' });
    }
    res.status(200).json(returns);
  } catch (error) {
    logger.error(`Error in getReturnsBySessionId: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update Return by ID
const updateReturnById = async (req, res) => {
  try {
    const updated = await posReturnService.updateReturnById(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Return item not found' });
    }
    res.status(200).json(updated);
  } catch (error) {
    logger.error(`Error in updateReturnById: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

// ✅ Delete Return by ID
const deleteReturnById = async (req, res) => {
  try {
    const result = await posReturnService.deleteReturnById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    logger.error(`Error in deleteReturnById: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createReturn,
  getAllReturns,
  getReturnById,
  getReturnsBySessionId,
  updateReturnById,
  deleteReturnById,
};
