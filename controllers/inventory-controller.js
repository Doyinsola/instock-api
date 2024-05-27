const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
  try {
    const data = await knex("inventories");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error retrieving Inventories");
  }
};

const newInventoryItem = async (req, res) => {
  const { warehouse_id, item_name, description,category, status, quantity } = req.body;

  try {
    const warehouseExists = await knex('warehouses').where({warehouse_id}).first();

    if (!warehouseExists) {
      return res.status(400).json({ error: "Warehouse Does Not Exist" });
    } 

    const [newInventory] = await knex('inventories').insert({
      warehouse_id, 
      item_name,
      description,
      category,
      status,
      quantity
    }).returning('*');

    res.status(201).json(newInventory);
  } catch (error) {
    console.log(error);
    res.status(404).json({error: error.message})
  }
};

module.exports = {
  index,
  newInventoryItem,
};
