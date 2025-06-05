// const { jobQueue, batchMap, ingestionMap } = require('../store/memory');
// const { sortQueue } = require('../utils/priorityQueue');

// function simulateFetch(id) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve({ id, data: 'processed' });
//     }, 5000); // Simulated external API delay
//   });
// }

// async function processBatch(batch_id) {
//   const batch = batchMap.get(batch_id);
//   if (!batch || batch.status !== 'yet_to_start') return;

//   batch.status = 'triggered';
//   batchMap.set(batch_id, batch);

//   for (const id of batch.ids) {
//     await simulateFetch(id);
//   }

//   batch.status = 'completed';
//   batchMap.set(batch_id, batch);
// }

// function updateIngestionStatus(ingestion_id) {
//   const ingestion = ingestionMap.get(ingestion_id);
//   if (!ingestion) return;

//   const all = ingestion.batches.map(b => batchMap.get(b.batch_id).status);
//   if (all.every(s => s === 'completed')) ingestion.status = 'completed';
//   else if (all.some(s => s === 'triggered')) ingestion.status = 'triggered';

//   ingestionMap.set(ingestion_id, ingestion);
// }

// function startProcessing() {
//   setInterval(async () => {
//     if (jobQueue.length === 0) return;

//     const job = jobQueue.shift();
//     const batch_id = job.batch_id;

//     await processBatch(batch_id);
//     const ingestion_id = batchMap.get(batch_id).ingestion_id;
//     updateIngestionStatus(ingestion_id);

//     sortQueue(jobQueue); // Re-sort after processing
//   }, 5000); // Enforce 1 batch every 5s
// }

// module.exports = { startProcessing };

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
