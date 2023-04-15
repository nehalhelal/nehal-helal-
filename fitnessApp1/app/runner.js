const express = require("express");
const app = express();
const cors = require("cors")
const path = require("path");
require("../database/connection");


// to read img 
app.use(express.static(path.join(__dirname,"../public")));

// use it before any rout - to accsess to api   / frontend 
app.use(cors())


// ***** healp to read  body and form data    encrypted data / password/ files/ ) البيانات المشفر  password
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("../routes/user.route");
// to call from all after //localhost:port/api/user =>inside routes
app.use("/api/user", userRoutes);
// to handel url { this message will apear if is there any thing wrong  (not found api)

// **************
const mealRoutes = require("../routes/meal.route");
app.use("/api/meal", mealRoutes);

app.all("*", (req, res) =>
  res.status(404).send({ apistatus: false, data: null, message: "invalid url" })
);

module.exports = app;
