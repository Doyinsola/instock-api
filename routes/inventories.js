const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controller");

router
    .route("/")
    .get(inventoryController.index);


router
    .route("/:id")
    .delete(inventoryController.deleteInventory);

module.exports = router;
