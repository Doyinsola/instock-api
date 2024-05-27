const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");

router
    .route("/")
    .get(warehouseController.index)
    .post(warehouseController.addWarehouse);





module.exports = router;


