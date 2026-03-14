const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
} = require("../controllers/tripController");

router.use(protect);

router.post("/", createTrip);
router.get("/", getTrips);
router.get("/:id", getTripById);
router.put("/:id", updateTrip);
router.delete("/:id", deleteTrip);

module.exports = router;
