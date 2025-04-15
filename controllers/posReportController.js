const fs = require("fs");
const path = require("path");
const { generateCSVReportForSession } = require("../services/PosReportService");

// 🧾 API: Generate and send CSV report
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

module.exports = {
  downloadSessionReport
};
