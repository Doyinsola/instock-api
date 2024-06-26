const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controller");

router
    .route("/")
    .get(inventoryController.index);


router
    .route("/:id")
    .delete(inventoryController.deleteInventory);

router.route("/:id").get(inventoryController.getItemById);

module.exports = router;
