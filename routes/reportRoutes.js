const express = require("express");
const router = express.Router();
const posReportController = require("../controllers/posReportController");

router.get("/download/:sessionId", posReportController.downloadSessionReport);
router.get(
  "/report/date/:startDate/:endDate",
  posReportController.downloadDatePeriodReport
);

module.exports = router;
