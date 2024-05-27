const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
  try {
    const data = await knex("warehouses");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error retrieving Warehouses");
  }
};

const getWarehouseById = async (req, res) => {
  const { id } = req.params;

  try {
    const warehouse = await knex("warehouses").where({ id }).first();

    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    res.status(200).json(warehouse);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error retrieving Warehouse");
  }
};

const inventories = async (req, res) => {
  try {
    const validWarehouse = await knex("warehouses").where({
      id: req.params.id,
    });

    if (validWarehouse.length === 0) {
      res.status(404).json({ message: "Warehouse not found" });
    } else {
      const inventories = await knex("warehouses")
        .join("inventories", "inventories.warehouse_id", "warehouses.id")
        .where({ warehouse_id: req.params.id });

      res.status(200).json(inventories);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Error retrieving Warehouse's inventories");
  }
};

module.exports = {
  index,
  getWarehouseById,
  inventories,
};
