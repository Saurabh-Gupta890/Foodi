const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const path = require("path");
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Generate a random secret key
const secret = crypto.randomBytes(64).toString("hex");
console.log(secret);

// middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://saurabhworks890:saurabH123@saurabh.sob9ft2.mongodb.net/"
  )
  .then(() => console.log("Mongodb connected successfully!"))
  .catch((error) => console.log("Error connecting to MongoDB: " + error));

// jwt authentication

// jwt related api
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res.send({ token });
});

// import routes
const menuRoutes = require("./api/routes/menuRoutes");
const cartsRoutes = require("./api/routes/cartRoutes");
const usersRoutes = require("./api/routes/userRoutes");
const paymentRoutes = require("./api/routes/paymentRoutes");
const adminStats = require("./api/routes/adminStats");
const orderStats = require("./api/routes/orderStats");
const payRouter = require("./api/routes/payRouter");
const mssgRoute = require("./api/routes/mssgRouter");
app.use("/api/menu", menuRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin-stats", adminStats);
app.use("/api/order-stats", orderStats);
app.use(`/api/create`, payRouter);
app.use("/api/contact", mssgRoute);

// payment methods routes
const verifyToken = require("./api/middlewares/verifyToken");

// Serving static files for production
app.use(express.static(path.join(__dirname, "../foodi-client/dist")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../foodi-client/dist/index.html"))
);

app.get("/", (req, res) => {
  res.send("Foodi Server is Running!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
