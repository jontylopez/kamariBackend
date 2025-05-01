const fs = require("fs");
const path = require("path");
const {
  generateCSVReportForSession,
  generateCSVReportForDatePeriod,
} = require("../services/PosReportService");

// 🧾 API: Generate and send CSV report for a session
const downloadSessionReport = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const csvContent = await generateCSVReportForSession(sessionId);

    // Create a unique filename with timestamp
    const filename = `POS_Report_Session_${sessionId}_${Date.now()}.csv`;
    const filePath = path.join(__dirname, "../reports", filename);

    // Ensure the reports folder exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Write CSV to file
    fs.writeFileSync(filePath, csvContent);

    // Stream the file for download
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error("❌ Error sending report file:", err);
        res.status(500).send("Error downloading report.");
      }

      // Optional: delete after sending (for temp file cleanup)
      fs.unlink(filePath, () => {});
    });
  } catch (err) {
    console.error("❌ Error generating report:", err);
    res.status(500).json({ error: "Failed to generate CSV report." });
  }
};

// 🧾 API: Generate and send CSV report for a date period
const downloadDatePeriodReport = async (req, res) => {
  const { startDate, endDate } = req.params;

  try {
    // Validate date format
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      return res
        .status(400)
        .json({ error: "Invalid date format. Please use YYYY-MM-DD format." });
    }

    const csvContent = await generateCSVReportForDatePeriod(startDate, endDate);

    // Create a unique filename with date range and timestamp
    const filename = `POS_Report_${startDate}_to_${endDate}_${Date.now()}.csv`;
    const filePath = path.join(__dirname, "../reports", filename);

    // Ensure the reports folder exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Write CSV to file
    fs.writeFileSync(filePath, csvContent);

    // Stream the file for download
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error("❌ Error sending report file:", err);
        res.status(500).send("Error downloading report.");
      }

      // Optional: delete after sending (for temp file cleanup)
      fs.unlink(filePath, () => {});
    });
  } catch (err) {
    console.error("❌ Error generating report:", err);
    res.status(500).json({ error: "Failed to generate CSV report." });
  }
};

// Helper function to validate date format
const isValidDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

module.exports = {
  downloadSessionReport,
  downloadDatePeriodReport,
};
