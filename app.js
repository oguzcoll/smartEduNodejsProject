const express = require("express");
const mongoose = require("mongoose");
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
require("dotenv").config();

const app = express();

// connect db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb Connected");
  });

//Template Engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));

//Routes
app.use("/", pageRoute);
app.use("/courses", courseRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
