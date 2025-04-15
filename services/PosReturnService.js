const POS_Return = require('../models/pos_return');
const POS_Return_Item = require('../models/pos_return_item');
const StockMovement = require('../models/stock_movements');
const sequelize = require('../config/db');


const createReturnWithoutRestock = async ({ session_id, date, time, items = [], processed_by }) => {
  return await sequelize.transaction(async (t) => {
    const total_price = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const posReturn = await POS_Return.create(
      { session_id, date, time, total_price, status: 'unused' },
      { transaction: t }
    );

    for (const item of items) {
      await POS_Return_Item.create({
        return_id: posReturn.id,
        inventory_id: item.inventory_id,
        quantity: item.quantity,
        price: item.price,
        date,
        time,
        restock: false,
        processed_by
      }, { transaction: t });
    }

    return posReturn;
  });
};


const createReturnWithRestock = async ({ session_id, date, time, items = [], processed_by }) => {
  return await sequelize.transaction(async (t) => {
    const total_price = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const posReturn = await POS_Return.create(
      { session_id, date, time, total_price, status: 'unused' },
      { transaction: t }
    );

    for (const item of items) {
      await POS_Return_Item.create({
        return_id: posReturn.id,
        inventory_id: item.inventory_id,
        quantity: item.quantity,
        price: item.price,
        date,
        time,
        restock: true,
        processed_by
      }, { transaction: t });

      // ✅ Match on buy + sell price
      const existingMovement = await StockMovement.findOne({
        where: {
          inventory_id: item.inventory_id,
          sell_price: item.sell_price,
          buy_price: item.buy_price
        },
        order: [['date', 'DESC']],
        transaction: t
      });

      if (existingMovement) {
        await existingMovement.increment({ quantity: item.quantity }, { transaction: t });
      } else {
        await StockMovement.create({
          inventory_id: item.inventory_id,
          quantity: item.quantity,
          sell_price: item.sell_price,
          buy_price: item.buy_price,
          date: new Date()
        }, { transaction: t });
      }
    }

    return posReturn;
  });
};




// Create a new return session
const createReturnSession = async ({ session_id, date, time, total_price = 0, status = 'unused' }) => {
  try {
    const posReturn = await POS_Return.create({ session_id, date, time, total_price, status });
    return posReturn;
  } catch (error) {
    throw new Error(`Error creating return session: ${error.message}`);
  }
};

// Get all return sessions
const getAllReturns = async () => {
  try {
    return await POS_Return.findAll({ order: [['id', 'DESC']] });
  } catch (error) {
    throw new Error(`Error fetching returns: ${error.message}`);
  }
};

const getReturnStatusById = async (id) => {
  try {
    const returnSession = await POS_Return.findByPk(id);
    if (!returnSession) {
      return { found: false, status: null, total_price: null };
    }

    return {
      found: true,
      status: returnSession.status,
      total_price: returnSession.total_price,
    };
  } catch (error) {
    throw new Error(`Error fetching return session: ${error.message}`);
  }
};
// Get return session by ID
const getReturnById = async (id) => {
  try {
    const posReturn = await POS_Return.findByPk(id);
    if (!posReturn) throw new Error('Return session not found');
    return posReturn;
  } catch (error) {
    throw new Error(`Error fetching return session: ${error.message}`);
  }
};

// Get return sessions by session ID
const getReturnsBySessionId = async (session_id) => {
  try {
    return await POS_Return.findAll({
      where: { session_id },
      order: [['id', 'DESC']],
    });
  } catch (error) {
    throw new Error(`Error fetching return sessions: ${error.message}`);
  }
};

// Update a return session
const updateReturnSession = async (id, data, transaction = null) => {
  try {
    const options = transaction ? { transaction } : {};
    const posReturn = await POS_Return.findByPk(id, options);
    if (!posReturn) throw new Error('Return session not found');

    await posReturn.update(data, options);
    return posReturn;
  } catch (error) {
    throw new Error(`Error updating return session: ${error.message}`);
  }
};

// Delete a return session
const deleteReturnSession = async (id) => {
  try {
    const posReturn = await POS_Return.findByPk(id);
    if (!posReturn) throw new Error('Return session not found');

    await posReturn.destroy();
    return { message: 'Return session deleted' };
  } catch (error) {
    throw new Error(`Error deleting return session: ${error.message}`);
  }
};

module.exports = {
  createReturnSession,
  getAllReturns,
  getReturnById,
  getReturnStatusById,
  getReturnsBySessionId,
  updateReturnSession,
  deleteReturnSession,
  createReturnWithoutRestock,
  createReturnWithRestock
};
