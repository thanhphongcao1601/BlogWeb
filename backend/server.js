//dotenv
require("dotenv").config();
//connect DB
const { connectDB } = require("./configs/db");
connectDB();

const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");

const app = express();

//CORS
app.use(cors());

//BODY PARSER
app.use(express.json());

//MOUNT THE ROUTE
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/posts", postRoute);

const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
