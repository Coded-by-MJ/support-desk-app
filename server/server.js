const express = require("express");
const dotenv = require("dotenv").config();
const color = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

//Connect to database
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Support Desk API" });
});
// app.get("/api/users", (req, res) => {
//   res.status(200).json({ message: "user" });
// });

//Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
