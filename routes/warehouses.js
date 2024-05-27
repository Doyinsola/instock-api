const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");

router
    .route("/")
    .get(warehouseController.index)
    .post(warehouseController.addWarehouse);

router
    .route("/:id")
    .put(warehouseController.updateWarehouse)
    .delete(warehouseController.deleteWarehouse);


router.route("/:id").get(warehouseController.getWarehouseById);

router.route("/:id/inventories").get(warehouseController.inventories);

module.exports = router;


