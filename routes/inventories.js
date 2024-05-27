const router = require("express").Router();
<<<<<<< feature-m24k-16
const warehouseController = require("../controllers/inventory-controller");
=======
const inventoryController = require("../controllers/inventory-controller");

router.route("/").get(inventoryController.index);

module.exports = router;
>>>>>>> develop
