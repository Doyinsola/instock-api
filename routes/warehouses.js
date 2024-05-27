const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");

<<<<<<< feature-m24k-16
router
    .route("/")
    .get(warehouseController.index)
    .post(warehouseController.addWarehouse);




=======
router.route("/").get(warehouseController.index);

router.route("/:id/inventories").get(warehouseController.inventories);
>>>>>>> develop

module.exports = router;


