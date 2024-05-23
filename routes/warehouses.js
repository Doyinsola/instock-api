const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");

router.route("/api/warehouses").get(warehouseController.index);

module.exports = router;
