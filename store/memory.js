
module.exports = {
  ingestionStore: {}, // ingestion_id -> { status, batches }
  batchQueue: [],     // [{ batch_id, ids, status, priority, ingestion_id, created_at }]
};
