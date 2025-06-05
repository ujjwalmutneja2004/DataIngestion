

const { batchQueue, ingestionStore } = require("../store/memory");

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
let processing = false;

const updateStatus = (ingestion_id) => {
  const ingestion = ingestionStore[ingestion_id];
  const all = ingestion.batches.map(b => b.status);

  ingestion.status = all.every(s => s === "completed") ? "completed"
                    : all.every(s => s === "yet_to_start") ? "yet_to_start"
                    : "triggered";
};

exports.initBatchProcessor = () => {
  setInterval(async () => {
    if (processing || batchQueue.length === 0) return;
    processing = true;

    const batch = batchQueue.shift();
    if (batch) {
      batch.status = "triggered";
      updateStatus(batch.ingestion_id);

      await sleep(1000); // simulate external API
      batch.status = "completed";
      updateStatus(batch.ingestion_id);
    }

    processing = false;
  }, 5000);
};
