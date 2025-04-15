const posReturnService = require('../services/PosReturnService');
const POS_Return_Item = require('../models/pos_return_item');
const Inventory = require('../models/inventory');
const Product = require('../models/product');
const POS_Return = require('../models/pos_return')

const logger = require('../utils/logger');
Inventory.belongsTo(Product, { foreignKey: 'product_id' });
// ✅ Create Return Without Restock
const createReturnWithoutRestock = async (req, res) => {
  try {
    const result = await posReturnService.createReturnWithoutRestock(req.body);
    res.status(201).json(result);
  } catch (error) {
    logger.error(`Error in createReturnWithoutRestock: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};
const getReturnItemsByReturnId = async (req, res) => {
  try {
    const items = await POS_Return_Item.findAll({
      where: { return_id: req.params.id },
      include: {
        model: Inventory,
        include: Product, // optional: for item name if needed
      },
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// ✅ Create Return With Restock
const createReturnWithRestock = async (req, res) => {
  try {
    const result = await posReturnService.createReturnWithRestock(req.body);
    res.status(201).json(result);
  } catch (error) {
    logger.error(`Error in createReturnWithRestock: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

// ✅ Create a Generic Return Session (no items)
const createReturnSession = async (req, res) => {
  try {
    const result = await posReturnService.createReturnSession(req.body);
    res.status(201).json(result);
  } catch (error) {
    logger.error(`Error in createReturnSession: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

// ✅ Get All Return Sessions
const getAllReturns = async (req, res) => {
  try {
    const results = await posReturnService.getAllReturns();
    res.status(200).json(results);
  } catch (error) {
    logger.error(`Error in getAllReturns: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

// ✅ Get Return Session by ID
const getReturnById = async (req, res) => {
  try {
    const result = await posReturnService.getReturnById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    logger.error(`Error in getReturnById: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

// ✅ Get Returns by POS Session ID
const getReturnsBySessionId = async (req, res) => {
  try {
    const result = await posReturnService.getReturnsBySessionId(req.params.session_id);
    res.status(200).json(result);
  } catch (error) {
    logger.error(`Error in getReturnsBySessionId: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};
const validateReturnId = async (req, res) => {
  try {
    const returnRecord = await POS_Return.findByPk(req.params.id);
    if (!returnRecord) {
      return res.status(404).json({ error: "Return not found" });
    }

    if (returnRecord.status === "used") {
      return res.status(400).json({ error: "Return already used" });
    }

    res.status(200).json(returnRecord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const markReturnAsUsed = async (req, res) => {
  try {
    const updated = await POS_Return.update({ status: 'used' }, { where: { id: req.params.id } });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Update a Return Session
const updateReturnSession = async (req, res) => {
  try {
    const result = await posReturnService.updateReturnSession(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    logger.error(`Error in updateReturnSession: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

const validateExchangeId = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await posReturnService.getReturnStatusById(id);

    if (!result.found) {
      return res.status(404).json({ valid: false, message: "Exchange ID not found." });
    }

    if (result.status !== 'unused') {
      return res.status(200).json({ valid: false, message: "Return has already been used." });
    }

    res.status(200).json({
      valid: true,
      total_price: result.total_price,
    });
  } catch (error) {
    res.status(500).json({ valid: false, message: error.message });
  }
};

// ✅ Delete a Return Session
const deleteReturnSession = async (req, res) => {
  try {
    const result = await posReturnService.deleteReturnSession(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    logger.error(`Error in deleteReturnSession: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createReturnWithoutRestock,
  createReturnWithRestock,
  createReturnSession,
  getReturnItemsByReturnId,
  getAllReturns,
  validateReturnId,
  markReturnAsUsed,
  getReturnById,
  getReturnsBySessionId,
  updateReturnSession,
  validateExchangeId,
  deleteReturnSession
};