// module.exports = {
//   ingestionMap: new Map(), // ingestion_id -> { status, batches }
//   batchMap: new Map(),     // batch_id -> { ids, status, ingestion_id }
//   jobQueue: [],            // [{ priority, time, batch }]
// };
module.exports = {
  ingestionStore: {}, // ingestion_id -> { status, batches }
  batchQueue: [],     // [{ batch_id, ids, status, priority, ingestion_id, created_at }]
};