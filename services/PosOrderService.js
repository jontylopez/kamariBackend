const POS_ORDER = require("../models/pos_order");
const OrderItemService = require("./PosOrderItemsService");
const StockMovementService = require("./StockMovementsService");
const PosReturnService = require("./PosReturnService");
const PosPaymentService = require("./PosPaymentService");

//Create
const createPosOrder = async (orderData, items, payments = []) => {
  const transaction = await POS_ORDER.sequelize.transaction();

  try {
    console.log("Creating order with data:", orderData);
    // 1. Create Order
    const posOrder = await POS_ORDER.create(orderData, { transaction });
    console.log("Order created with ID:", posOrder.id);

    // Check if an exchange ID was provided
    if (orderData.exchange_id) {
      console.log(`Marking exchange ID ${orderData.exchange_id} as used`);
      // Update the return status to "used"
      await PosReturnService.updateReturnSession(
        orderData.exchange_id,
        { status: "used" },
        transaction
      );
    }

    // 2. Process each item
    for (const item of items) {
      console.log("Processing item:", item.inventory_id);
      // Create order item
      await OrderItemService.createPosOrderItem(
        {
          order_id: posOrder.id,
          inventory_id: item.inventory_id,
          stock_movement_id: item.stock_movement_id,
          price: item.price,
          quantity: item.quantity,
          discount: item.discount || 0,
          subtotal: item.subtotal,
        },
        transaction
      );

      if (item.stock_movement_id) {
        console.log("Decrementing stock for item:", item.inventory_id);
        await StockMovementService.decrementStock(
          item.stock_movement_id,
          item.quantity,
          transaction
        );
      }
    }

    // 3. Record all payments
    console.log(`Processing ${payments.length} payments`);
    for (const p of payments) {
      console.log(`Recording payment: ${p.method}, ${p.amount}`);
      await PosPaymentService.createPosPayment(
        {
          order_id: posOrder.id,
          method: p.method, // Use the actual payment method for each payment
          amount: p.amount,
        },
        transaction
      );
    }

    console.log("Committing transaction");
    await transaction.commit();
    console.log("Transaction committed successfully");
    return posOrder;
  } catch (error) {
    console.error("Transaction failed:", error);
    await transaction.rollback();
    throw new Error(`Error Creating POS Order: ${error.message}`);
  }
};

const getNextOrderId = async () => {
  try {
    const latestOrder = await POS_ORDER.findOne({
      order: [["id", "DESC"]],
    });

    return latestOrder ? latestOrder.id + 1 : 1;
  } catch (error) {
    throw new Error(`Error fetching next order ID: ${error.message}`);
  }
};

//Get All
const getAllPosOrder = async () => {
  try {
    const posOrder = await POS_ORDER.findAll({
      order: [["id", "DESC"]],
    });
    return posOrder;
  } catch (error) {
    throw new Error(`Error Fetching All POS Order: ${error.message}`);
  }
};
//Get By ID
const getPosOrderByID = async (id) => {
  try {
    const posOrder = await POS_ORDER.findByPk(id);
    if (!posOrder) {
      throw new Error("No POS Order Found");
    }
    return posOrder;
  } catch (error) {
    throw new Error(`Error Fetching POS Order: ${error.message}`);
  }
};
// Get Orders By Session ID
const getPosOrderBySession = async (session_id) => {
  try {
    // Fetch orders for the given session_id
    const posOrders = await POS_ORDER.findAll({
      where: { session_id },
      order: [["id", "DESC"]],
    });

    if (!posOrders || posOrders.length === 0) {
      throw new Error("No Orders Found");
    }

    // Fetch order items for each order
    const orderItems = await Promise.all(
      posOrders.map(async (order) => {
        const items = await OrderItemService.getPosOrderItemByOrderId(order.id);

        // Return the order with its associated items
        return {
          ...order.toJSON(),
          items,
        };
      })
    );

    return orderItems;
  } catch (error) {
    throw new Error(`Error Fetching Orders and Items: ${error.message}`);
  }
};

//Update By ID
const updatePosOrderById = async (id, data) => {
  try {
    const posOrder = await POS_ORDER.findByPk(id);
    if (!posOrder) {
      throw new Error("No Pos Order Found");
    }
    await posOrder.update(data);
    return posOrder;
  } catch (error) {
    throw new Error(`Error Updating POS Order: ${error.message}`);
  }
};
//Delete By ID
const deletePosOrderById = async (id) => {
  try {
    const posOrder = await POS_ORDER.findByPk(id);
    if (!posOrder) {
      throw new Error("No POS ORDER Found");
    }
    await posOrder.destroy();
    return { message: "POS Order Deleted" };
  } catch (error) {
    throw new Error(`Error Deleting POS Order: ${error.message}`);
  }
};

module.exports = {
  createPosOrder,
  getNextOrderId,
  getAllPosOrder,
  getPosOrderByID,
  getPosOrderBySession,
  updatePosOrderById,
  deletePosOrderById,
};
