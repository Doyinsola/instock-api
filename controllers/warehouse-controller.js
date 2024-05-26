const knex = require('knex')(require('../knexfile'));


const index = async (_req, res) => {
    try {
      const data = await knex("warehouses");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(400).send("Error retrieving Warehouses");
    }
};

function isValidPhoneNumber(contact_phone) {
  const phonePattern = /^\+1 \(\d{3}\) \d{3}-\d{4}$/;
  return phonePattern.test(contact_phone);
}


const add = async (req, res) => {
    
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
        
        // if (!isValidEmail(contact_email)) {
        //  return res.status(400).json({ error: "Please input a valid email." });
        // }
        
        // const existingWarehouse = await knex('warehouse').where({warehouse_name} && {city}).first();
         // if (existingWarehouse) {
        // return res.status(400).json({error:'Warehouse already exists.'})
        // }
        
        try {
            const result = await knex("warehouses").insert(req.body);

            const newWarehouseId = result[0];

            const newWarehouse = await knex("warehouses")
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
    add,

  };