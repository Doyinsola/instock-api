const express = require("express");
const CORS = require("cors");
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 8081;

app.use(CORS());
app.use(express.json());

const warehousesRoutes = require("./routes/warehouses");
// or just warehouse
app.use("/api/warehouses", warehousesRoutes);


app.listen(PORT, () => {
  console.log(`Instock api server is running at: http://localhost:${PORT}`);
});
