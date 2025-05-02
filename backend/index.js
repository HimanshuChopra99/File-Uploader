const express = require("express");
const connectDB = require("./config/db");
const cloudinaryConnect = require("./config/cloudinary");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const fileUpload = require('express-fileupload')

//mongodb & cloudinary connection
connectDB();
cloudinaryConnect();

//global
app.use(express.json())
app.use(fileUpload())

app.use('/api/v1/upload', upload)

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
