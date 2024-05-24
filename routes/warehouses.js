const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");

router.route("/").get(warehouseController.index);

router.route("/:id/inventories").get(warehouseController.inventories);

module.exports = router;
