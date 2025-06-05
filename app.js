// const express = require('express');
// const bodyParser = require('body-parser');
// const ingestRoute = require('./routes/ingest');
// const statusRoute = require('./routes/status');
// const { startProcessing } = require('./services/batchProcessor');

// const app = express();
// const PORT = 3000;

// app.use(bodyParser.json());
// app.use('/ingest', ingestRoute);
// app.use('/status', statusRoute);

// // Start batch processing in background
// startProcessing();

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require("express");
const bodyParser = require("body-parser");

const ingestRoutes = require("./routes/ingest");
const statusRoutes = require("./routes/status");
const { initBatchProcessor } = require("./services/batchProcessor");

const app = express();
app.use(bodyParser.json());

app.use("/ingest", ingestRoutes);
app.use("/status", statusRoutes);

initBatchProcessor(); // start interval processor

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;

