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


const add = async (req, res) => {
    if (!req.body.name || !req.body.email) {
      return res.status(400).json({
        message: "Please provide name and email for the user in the request",
      });
    }
  
    try {
      const result = await knex("user").insert(req.body);
  
      const newUserId = result[0];
      const createdUser = await knex("user").where({ id: newUserId });
  
      res.status(201).json(createdUser);
    } catch (error) {
      res.status(500).json({
        message: `Unable to create new user: ${error}`,
      });
    }
  };




  module.exports = {
    index,
    add,

  };