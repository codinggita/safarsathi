const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const apiRoutes = require("./routes/index");
const authRoutes = require("./routes/authRoutes");
const tripRoutes = require("./routes/tripRoutes");
const activityRoutes = require("./routes/activityRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const publicRoutes = require("./routes/publicRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/trip/public", publicRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`SafarSathi server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
