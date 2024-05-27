const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controller");

router
    .route("/")
    .get(warehouseController.index)


// router
//     .route("/:id")
//     .delete(warehouseController.deleteWarehouse);

module.exports = router;