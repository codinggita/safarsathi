const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createExpense,
  getExpensesByTrip,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

router.use(protect);

router.post("/", createExpense);
router.get("/:tripId", getExpensesByTrip);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;
