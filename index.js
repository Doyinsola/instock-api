const express = require("express");
const CORS = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8081;
const warehousesRoutes = require("./routes/warehouses");

app.use(CORS());
app.use(express.json());
app.use("/", warehousesRoutes);

app.listen(PORT, () => {
  console.log(`Instock api server is running at: http://localhost:${PORT}`);
});
