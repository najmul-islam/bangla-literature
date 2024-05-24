const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("./configs/cors");
const database = require("./configs/database");
const fileupload = require("./configs/fileupload");
const app = express();

// set template engin
app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());

// route
app.use("/user", require("./routes/userRoute"));
app.use("/api/author", require("./routes/authorRoute"));

app.get("/", (req, res) => {
  res.render("index");
});

// middleware
app.use(require("./middlewares/notFoundMiddleware"));
app.use(require("./middlewares/errorMiddleware"));

const start = async () => {
  try {
    await database(process.env.MONGO_URI);
    app.listen(
      process.env.PORT,
      console.log(`app is listening port ${process.env.PORT}...`.blue.underline)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
