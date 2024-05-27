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
}

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


const addWarehouse = async (req, res) => {

    const {
        warehouse_name,
        address,
        city,
        country,
        contact_name,
        contact_position,
        contact_phone,
        contact_email,
        } = req.body;

    if (
        !warehouse_name ||
        !address ||
        !city ||
        !country ||
        !contact_name ||
        !contact_position ||
        !contact_phone ||
        !contact_email
        ) {
         return res.status(400).json({ error: "All fields are required." });
         }   
        
     if (!isValidPhoneNumber(contact_phone)) {
         return res
         .status(400)
         .json({ error: "Please input a valid phone number." });
        }
        
      if (!isValidEmail(contact_email)) {
        return res.status(400).json({ error: "Please input a valid email." });
      }
        
      try {
          const result = await knex("warehouses").insert(req.body);

          const newWarehouseId = result[0];

          const newWarehouse = await knex("warehouses")
          .select(
            "id",
            "warehouse_name",
            "address",
            "city",
            "country",
            "contact_name",
            "contact_position",
            "contact_phone",
            "contact_email"
          )
          .where({id:newWarehouseId})
          .first();

          res.status(201).json(newWarehouse);     
      } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({message: `Unable to create new warehouse: ${error}`});     
      };
  };



module.exports = {
  index,
  inventories,
  addWarehouse,
};
