const fs = require("fs");
const path = require("path");
const { Op, Sequelize } = require("sequelize");

const POS_ORDER = require("../models/pos_order");
const POS_ORDER_ITEM = require("../models/pos_order_item");
const POS_PAYMENT = require("../models/pos_payment");
const CASH_TRANSACTION = require("../models/cash_transactions");
const POS_RETURN = require("../models/pos_return");
const POS_RETURN_ITEM = require("../models/pos_return_item");
const STOCK_MOVEMENT = require("../models/stock_movements");
const INVENTORY = require("../models/inventory");
const PRODUCT = require("../models/product");
const SUP_BRAND = require('../models/sup_brand');
const SUPPLIER = require('../models/supplier');

// Setup associations
// POS_ORDER has many order items
POS_ORDER.hasMany(POS_ORDER_ITEM, { foreignKey: "order_id", as: "items" });

// POS_ORDER_ITEM belongs to inventory and stock movement
POS_ORDER_ITEM.belongsTo(INVENTORY, { foreignKey: 'inventory_id', as: 'inventory' });
POS_ORDER_ITEM.belongsTo(STOCK_MOVEMENT, { foreignKey: 'stock_movement_id', as: 'stock_movement' });

// INVENTORY belongs to product (define once only!)
INVENTORY.belongsTo(PRODUCT, { foreignKey: 'product_id', as: 'product' });

// POS_RETURN has many return items
POS_RETURN.hasMany(POS_RETURN_ITEM, { foreignKey: 'return_id', as: 'items' });

// POS_RETURN_ITEM belongs to return and inventory
POS_RETURN_ITEM.belongsTo(POS_RETURN, { foreignKey: 'return_id' });
POS_RETURN_ITEM.belongsTo(INVENTORY, { foreignKey: 'inventory_id', as: 'inventory' });

//Sup Brand Connections
INVENTORY.belongsTo(SUP_BRAND, { foreignKey: 'sup_br_id', as: 'supBrand' });
SUP_BRAND.belongsTo(SUPPLIER, { foreignKey: 'sup_id', as: 'supplier' });


const generateCSVReportForSession = async (sessionId) => {
  const csvData = [];

  // === 1. Daily Sales Summary ===
  try {
    const orders = await POS_ORDER.findAll({
      where: { session_id: sessionId },
      include: [{ model: POS_ORDER_ITEM, as: "items" }],
    });

    let totalRevenue = 0;
    let totalDiscount = 0;
    let itemsSold = 0;

    orders.forEach(order => {
      totalRevenue += parseFloat(order.total);
      totalDiscount += parseFloat(order.discount || 0);
      itemsSold += order.items.reduce((sum, item) => sum + item.quantity, 0);
    });

    csvData.push("Daily Sales Summary Report");
    csvData.push("Total Orders,Items Sold,Total Revenue,Total Discount");
    csvData.push(`${orders.length},${itemsSold},${totalRevenue.toFixed(2)},${totalDiscount.toFixed(2)}`);
    csvData.push("");
  } catch (err) {
    csvData.push("Daily Sales Summary Report");
    csvData.push("Error generating section");
    csvData.push("");
  }

  // === 2. Detailed Sales Transactions ===
  try {
    const orders = await POS_ORDER.findAll({ where: { session_id: sessionId } });

    csvData.push("Detailed Sales Transactions");
    csvData.push("Order ID,Customer ID,Date,Time,Total,Discount");

    if (orders.length) {
      orders.forEach(order => {
        csvData.push(`${order.id},${order.customer_id || "Guest"},${order.order_date},${order.order_time},${order.total},${order.discount}`);
      });
    } else {
      csvData.push("No Data,No Data,No Data,No Data,No Data,No Data");
    }
    csvData.push("");
  } catch (err) {
    csvData.push("Detailed Sales Transactions");
    csvData.push("Error generating section");
    csvData.push("");
  }

// === 3. Sold Items Breakdown ===
try {
  const orderItems = await POS_ORDER_ITEM.findAll({
    include: [
      {
        model: INVENTORY,
        as: 'inventory',
        attributes: ['id', 'b_code_id'],
        include: [
          {
            model: PRODUCT,
            as: 'product',
            attributes: ['name']
          },
          {
            model: SUP_BRAND,
            as: 'supBrand',
            include: [
              {
                model: SUPPLIER,
                as: 'supplier',
                attributes: ['name']
              }
            ]
          }
        ]
      },
      {
        model: STOCK_MOVEMENT,
        as: 'stock_movement',
        attributes: ['buy_price', 'sell_price']
      }
    ],
    where: {
      order_id: {
        [Op.in]: Sequelize.literal(`(SELECT id FROM pos_order WHERE session_id = ${sessionId})`)
      }
    }
  });      
  
    const grouped = {};
  
    orderItems.forEach((item) => {
        const sellPrice = item.stock_movement?.sell_price || 0;
        const buyPrice = item.stock_movement?.buy_price || 0;
        const barcode = item.inventory?.b_code_id || "N/A";   
        const supplier = item.inventory?.supBrand?.supplier?.name || "N/A";     
      const key = `${item.inventory_id}-${sellPrice}-${buyPrice}`;
  
      if (!grouped[key]) {
        grouped[key] = {
          inventory_id: item.inventory_id,
          b_code_id: barcode,
          sell_price: sellPrice,
          buy_price: buyPrice,
          quantity: 0,
          discount: item.discount,
          supplier
        };
      }
      grouped[key].quantity += item.quantity;
    });
  
    csvData.push("Sold Items Breakdown");
    csvData.push("Inventory ID,Barcode,Sell Price,Buy Price,Quantity,Discount,Supplier");
  
    Object.values(grouped).forEach((b) => {
      csvData.push(`${b.inventory_id},${b.b_code_id},${b.sell_price},${b.buy_price},${b.quantity},${b.discount || 0},${b.supplier}`);
    });
  
    if (!Object.keys(grouped).length) {
      csvData.push("No Data,No Data,No Data,No Data,No Data,No Data");
    }
  
    csvData.push("");
  } catch (err) {
    csvData.push("Sold Items Breakdown");
    csvData.push("Error generating section");
    csvData.push("");
  }
  
  // === 4. Cash Movement Report ===
  try {
    const cashMovements = await CASH_TRANSACTION.findAll({ where: { session_id: sessionId } });

    csvData.push("Cash Movement Report");
    csvData.push("Type,Reason,Amount,Date,Time");

    if (cashMovements.length) {
      cashMovements.forEach(entry => {
        csvData.push(`${entry.type},${entry.reason || "-"},${entry.amount},${entry.date},${entry.time}`);
      });
    } else {
      csvData.push("No Data,No Data,No Data,No Data,No Data");
    }

    csvData.push("");
  } catch (err) {
    csvData.push("Cash Movement Report");
    csvData.push("Error generating section");
    csvData.push("");
  }

  // === 5. Payment Method Summary ===
  try {
    const payments = await POS_PAYMENT.findAll({
      include: [{ model: POS_ORDER, where: { session_id: sessionId } }]
    });

    const totals = {};
    payments.forEach(p => {
      totals[p.method] = (totals[p.method] || 0) + parseFloat(p.amount);
    });

    csvData.push("Payment Method Summary");
    csvData.push("Method,Amount");

    if (Object.keys(totals).length) {
      Object.entries(totals).forEach(([method, amount]) => {
        csvData.push(`${method},${amount.toFixed(2)}`);
      });
    } else {
      csvData.push("No Data,0.00");
    }

    csvData.push("");
  } catch (err) {
    csvData.push("Payment Method Summary");
    csvData.push("Error generating section");
    csvData.push("");
  }

  // === 6. Discount Report ===
  try {
    const orders = await POS_ORDER.findAll({
      where: { session_id: sessionId },
      include: [{ model: POS_ORDER_ITEM, as: "items" }]
    });

    csvData.push("Discount Report");
    csvData.push("Order ID,Order Discount,Item ID,Item Discount");

    const orderDiscounts = orders.filter(o => o.discount > 0);
    const itemDiscounts = orders.flatMap(o => o.items.filter(i => i.discount > 0));

    orderDiscounts.forEach(o => {
      csvData.push(`${o.id},${o.discount},,`);
    });

    itemDiscounts.forEach(i => {
      csvData.push(`,,${i.inventory_id},${i.discount}`);
    });

    if (!orderDiscounts.length && !itemDiscounts.length) {
      csvData.push("No Data,No Data,No Data,No Data");
    }

    csvData.push("");
  } catch (err) {
    csvData.push("Discount Report");
    csvData.push("Error generating section");
    csvData.push("");
  }

  // === 7. Returns Report ===
  try {
    const returns = await POS_RETURN.findAll({
        where: { session_id: sessionId },
        include: [{
          model: POS_RETURN_ITEM,
          as: 'items',
          include: [{
            model: INVENTORY,
            as: 'inventory',
            attributes: ['b_code_id']
          }]
        }]
      });
      

    csvData.push("Returns Report");
    csvData.push("Inventory ID,Barcode,Quantity,Price,Restock,Date,Time,Processed By");

    let hasReturns = false;
    for (const ret of returns) {
        for (const item of ret.items || []) {
          const barcode = item.inventory?.b_code_id || "N/A";
          csvData.push(`${item.inventory_id},${barcode},${item.quantity},${item.price},${item.restock ? "Yes" : "No"},${item.date},${item.time},${item.processed_by}`);
          hasReturns = true;
        }
      }
      

    if (!hasReturns) {
      csvData.push("No Data,No Data,No Data,No Data,No Data,No Data,No Data");
    }

    csvData.push("");
  } catch (err) {
    csvData.push("Returns Report");
    csvData.push("Error generating section");
    csvData.push("");
  }

  return csvData.join("\n");
};

module.exports = {
  generateCSVReportForSession
};
