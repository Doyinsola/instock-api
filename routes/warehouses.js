const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");

router
    .route("/")
    .get(warehouseController.index)
    .post(warehouseController.add);





module.exports = router;


