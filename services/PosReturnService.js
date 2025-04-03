const POS_Return = require('../models/pos_return');

// ✅ Create
const createReturn = async (data) => {
  try {
    const posReturn = await POS_Return.create(data);
    return posReturn;
  } catch (error) {
    throw new Error(`Error creating return: ${error.message}`);
  }
};

// ✅ Get All
const getAllReturn = async () => {
  try {
    const posReturns = await POS_Return.findAll({
      order: [['id', 'DESC']],
    });
    return posReturns;
  } catch (error) {
    throw new Error(`Error fetching all returns: ${error.message}`);
  }
};

// ✅ Get By ID
const getReturnById = async (id) => {
  try {
    const posReturn = await POS_Return.findByPk(id);
    if (!posReturn) {
      throw new Error('No return item found');
    }
    return posReturn;
  } catch (error) {
    throw new Error(`Error fetching return item: ${error.message}`);
  }
};

// ✅ Get By Session ID
const getReturnBySessionId = async (session_id) => {
  try {
    const posReturns = await POS_Return.findAll({ where: { session_id } });
    if (!posReturns || posReturns.length === 0) {
      throw new Error('No return items found for this session');
    }
    return posReturns;
  } catch (error) {
    throw new Error(`Error fetching return details: ${error.message}`);
  }
};

// ✅ Update By ID
const updateReturnById = async (id, data) => {
  try {
    const posReturn = await POS_Return.findByPk(id);
    if (!posReturn) {
      throw new Error('No return item found');
    }
    await posReturn.update(data);
    return posReturn;
  } catch (error) {
    throw new Error(`Error updating return item: ${error.message}`);
  }
};

// ✅ Delete By ID
const deleteReturnById = async (id) => {
  try {
    const posReturn = await POS_Return.findByPk(id);
    if (!posReturn) {
      throw new Error('No return item found');
    }
    await posReturn.destroy();
    return { message: 'Return item deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting return item: ${error.message}`);
  }
};

module.exports = {
  createReturn,
  getAllReturn,
  getReturnById,
  getReturnBySessionId,
  updateReturnById,
  deleteReturnById,
};
