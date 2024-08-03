const express = require("express");
const cors = require("cors");

const connectDatabase = require("./src/database/connection");
const { errorHandler } = require("./src/middleware");
require("dotenv").config();

//Connect to the database
connectDatabase()




/* Route files */
const {
  account,
  search
  //user,
  //etc..
} = require("./src/routes/");

const app = express();

app.use(cors());
app.use(express.json());

/* Mount routers */
app.use("/account", account);
app.use("/search", search);




/* Error middleware */
app.use(errorHandler);
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* Handle unhandled promise rejections */
process.on("unhandledRejection", (err) => {
  console.log(`${err.message}`);
  //Close server & exit process
  server.close(() => process.exit(1));
});
