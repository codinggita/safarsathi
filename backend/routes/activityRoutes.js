const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createActivity,
  getActivitiesByTrip,
  updateActivity,
  deleteActivity,
} = require("../controllers/activityController");

router.use(protect);

router.post("/", createActivity);
router.get("/:tripId", getActivitiesByTrip);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);

module.exports = router;
