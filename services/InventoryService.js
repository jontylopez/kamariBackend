const { Op, fn, col, literal, Sequelize } = require("sequelize");
const Inventory = require("../models/inventory");
const Product = require("../models/product");
const SupBrand = require("../models/sup_brand");
const Supplier = require("../models/supplier");
const Brand = require("../models/brand");
const StockMovement = require("../models/stock_movements");

//Create Inventory
const createInventory = async (data) => {
  try {
    const inventory = await Inventory.create(data);
    return inventory;
  } catch (error) {
    throw new Error(`Error Creating Inventory: ${error.message}`);
  }
};
//Get All Inventory
const getAllInventory = async () => {
  try {
    const inventory = await Inventory.findAll({
      order: [["id", "DESC"]],
    });
    return inventory;
  } catch (error) {
    throw new Error(`Error Fetching Inventory: ${error.message}`);
  }
};
//Get Inventory By ID
const getInventoryById = async (id) => {
  try {
    const inventory = await Inventory.findByPk(id);
    if (!inventory) {
      throw new Error("Inventory Not found");
    }
    return inventory;
  } catch (error) {
    throw new Error(`Error Fetching Inventory: ${error.message}`);
  }
};
//Get Inventory data by BarcodeID
const getInventoryByBarcodeId = async (b_code_id) => {
  try {
    const inventory = await Inventory.findOne({ where: { b_code_id } });
    if (!inventory) {
      throw new Error("No Item Found for this Barcode");
    }
    return inventory;
  } catch (error) {
    throw new Error(`Error Fetching Inventory: ${error.message}`);
  }
};
// get inventory relevent details by barcode for pos functions
const getInventoryByBarcode = async (barcode) => {
  try {
    const inventory = await Inventory.findOne({
      where: { b_code_id: barcode },
      include: [
        {
          model: Product,
          attributes: ["id", "name", "gender", "type"],
        },
      ],
    });

    if (!inventory) throw new Error("Inventory not found");

    // Get only available stock (quantity > 0)
    const stockMovements = await StockMovement.findAll({
      where: {
        inventory_id: inventory.id,
        quantity: { [require("sequelize").Op.gt]: 0 },
      },
      order: [["date", "DESC"]],
    });

    return { inventory, stockMovements };
  } catch (err) {
    throw new Error(`Error fetching by barcode: ${err.message}`);
  }
};

//Update Inventory By ID
const updateInventoryById = async (id, data) => {
  try {
    const inventory = await Inventory.findByPk(id);
    if (!inventory) {
      throw new Error("Inventory Not Found");
    }
    await inventory.update(data);
    return inventory;
  } catch (error) {
    throw new Error(`Error Updating Inventory: ${error.message}`);
  }
};
//Delete Inventory By ID
const deleteInventoryById = async (id) => {
  try {
    const inventory = await Inventory.findByPk(id);
    if (!inventory) {
      throw new Error("Inventory Not found");
    }
    await inventory.destroy();
    return { message: "Inventory Deleted Successfully" };
  } catch (error) {
    throw new Error(`Error Delete Inventory: ${error.message}`);
  }
};
const generateBarcodePrefix = async (product_id) => {
  const product = await Product.findByPk(product_id);
  if (!product) throw new Error("Product not found");

  const genderCode =
    product.gender === "female" ? "W" : product.gender === "male" ? "M" : "U";
  const typeMap = {
    UpperBody: "UP",
    LowerBody: "LO",
    FullBody: "FU",
    UnderGarment: "UN",
    Article: "AR",
  };
  const typeCode = typeMap[product.type] || "XX";

  return `${genderCode}${typeCode}`;
};
const generateNextBarcode = async (prefix) => {
  const count = await Inventory.count({
    where: {
      b_code_id: { [Op.like]: `${prefix}%` },
    },
  });
  return `${prefix}${String(count + 1).padStart(5, "0")}`;
};

const isDuplicateInventory = async ({
  name,
  product_id,
  sup_br_id,
  size,
  color,
  description,
}) => {
  const existing = await Inventory.findOne({
    where: {
      name,
      product_id,
      sup_br_id,
      size,
      color,
      description,
    },
  });
  return !!existing;
};
const createInventoryWithBarcode = async (data) => {
  try {
    const { name, product_id, sup_br_id, size, color, description } = data;

    const isDuplicate = await isDuplicateInventory({
      name,
      product_id,
      sup_br_id,
      size,
      color,
      description,
    });
    if (isDuplicate) throw new Error("Inventory item already exists");

    const prefix = await generateBarcodePrefix(product_id);
    const b_code_id = await generateNextBarcode(prefix);

    const inventory = await Inventory.create({
      name,
      product_id,
      sup_br_id,
      size,
      color,
      description,
      b_code_id,
    });

    return inventory;
  } catch (err) {
    console.error("🔥 Error in createInventoryWithBarcode:", err.message);
    throw err;
  }
};

const getLatestInventory = async (limit = 20) => {
  try {
    const inventory = await Inventory.findAll({
      include: [
        {
          model: Product,
          attributes: ["name"],
        },
        {
          model: SupBrand,
          include: [
            { model: Supplier, attributes: ["name"] },
            { model: Brand, attributes: ["name"] },
          ],
        },
      ],
      attributes: {
        include: [
          // Latest sell price
          [
            Sequelize.literal(`(
              SELECT sm.sell_price FROM stock_movements sm 
              WHERE sm.inventory_id = Inventory.id 
              ORDER BY sm.date DESC LIMIT 1
            )`),
            "latestSellPrice",
          ],

          // Total quantity
          [
            Sequelize.literal(`(
              SELECT SUM(sm.quantity) FROM stock_movements sm 
              WHERE sm.inventory_id = Inventory.id
            )`),
            "totalQuantity",
          ],
        ],
      },
      order: [["id", "DESC"]],
      limit,
    });

    return inventory;
  } catch (error) {
    throw new Error(`Error fetching latest inventory: ${error.message}`);
  }
};

const searchInventory = async (query) => {
  try {
    const inventory = await Inventory.findAll({
      include: [
        {
          model: Product,
          attributes: ["name"],
        },
        {
          model: SupBrand,
          include: [
            {
              model: Supplier,
              attributes: ["name"],
            },
            {
              model: Brand,
              attributes: ["name"],
            },
          ],
        },
      ],
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } },
          { color: { [Op.like]: `%${query}%` } },
          { size: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } },
          { b_code_id: { [Op.like]: `%${query}%` } },
          Sequelize.literal(`EXISTS (
              SELECT 1 FROM product p 
              WHERE p.id = Inventory.product_id AND p.name LIKE '%${query}%'
            )`),
          Sequelize.literal(`EXISTS (
              SELECT 1 FROM sup_brand sb 
              JOIN supplier s ON s.id = sb.sup_id
              WHERE sb.id = Inventory.sup_br_id AND s.name LIKE '%${query}%'
            )`),
          Sequelize.literal(`EXISTS (
              SELECT 1 FROM sup_brand sb 
              JOIN brand b ON b.id = sb.brand_id
              WHERE sb.id = Inventory.sup_br_id AND b.name LIKE '%${query}%'
            )`),
        ],
      },
      attributes: {
        include: [
          [
            Sequelize.literal(`(
              SELECT sm.sell_price FROM stock_movements sm 
              WHERE sm.inventory_id = Inventory.id 
              ORDER BY sm.date DESC LIMIT 1
            )`),
            "latestSellPrice",
          ],
          [
            Sequelize.literal(`(
              SELECT SUM(sm.quantity) FROM stock_movements sm 
              WHERE sm.inventory_id = Inventory.id
            )`),
            "totalQuantity",
          ],
        ],
      },
      order: [["id", "DESC"]],
    });

    return inventory;
  } catch (error) {
    throw new Error(`Error searching inventory: ${error.message}`);
  }
};

module.exports = {
  createInventory,
  getAllInventory,
  getInventoryById,
  updateInventoryById,
  deleteInventoryById,
  getInventoryByBarcodeId,
  generateBarcodePrefix,
  getInventoryByBarcode,
  generateNextBarcode,
  isDuplicateInventory,
  createInventoryWithBarcode,
  getLatestInventory,
  searchInventory,
};
