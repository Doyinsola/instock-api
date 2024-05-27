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

module.exports = {
  index,
  getItemById,
};
