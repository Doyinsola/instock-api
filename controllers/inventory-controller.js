const knex = require("knex")(require("../knexfile"));



function isValidPhoneNumber(contact_phone) {
  const phonePattern = /^\+1 \(\d{3}\) \d{3}-\d{4}$/;
  return phonePattern.test(contact_phone);
}

function isValidEmail(contact_email) {
  if (!contact_email.includes('@') || !contact_email.includes('.')) {
    return false;
  }

  if (contact_email.lastIndexOf('.') <= contact_email.indexOf('@')) {
    return false;
  }

  const atIndex = contact_email.indexOf('@');
  if (contact_email[atIndex - 1] === ' ' || contact_email[atIndex + 1] === ' ') {
    return false;
  }

  if (atIndex === 0 || contact_email.lastIndexOf('.') === contact_email.length - 1) {
    return false;
  }
  return true;
}


const index = async (_req, res) => {
  try {
    const data = await knex("inventories");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error retrieving Inventories");
  }
};

const getItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await knex("inventories").where({ id }).first();

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error retrieving item");
  }
};


const newInventoryItem = async (req, res) => {
  const { 
    warehouse_id, 
    item_name, 
    description, 
    category, 
    status, 
    quantity 
  } = req.body;

    console.log('Request Body:', req.body);

  if (
    !warehouse_id || 
    !item_name || 
    !description || 
    !category || 
    !status || 
    quantity === undefined
    ) { return res.status(400).json({ error: "All fields are required."});
  }

  if (isNaN(quantity)) {
    return res.status(400).json({ error: "Quantity must be a numeric value."});
  }

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
    res.status(404).json({error: `Unable to create new item: ${error}`})
  };
};

const deleteInventory = async (req, res) => {
  try {
    const deletedInventory = await knex("inventories")
      .where({ id: req.params.id })
      .delete();
    if (deletedInventory === 0) {
      return res
        .status(404)
        .json({ message: `Inventory with ID ${req.params.id} not found.` });
    }
    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting inventory with ID ${req.params.id}:`, error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  index,
  getItemById,
  deleteInventory,
  newInventoryItem
};

