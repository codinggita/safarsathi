const express = require("express");
const router = express.Router();
const { getPublicTrip } = require("../controllers/publicController");

router.get("/:tripId", getPublicTrip);

module.exports = router;
