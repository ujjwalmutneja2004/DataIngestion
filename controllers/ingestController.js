const { v4: uuidv4 } = require("uuid");
const { ingestionStore, batchQueue } = require("../store/memory");

const PRIORITY_MAP = {
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3
};

exports.handleIngest = (req, res) => {
  const { ids, priority = "MEDIUM" } = req.body;

  if (!Array.isArray(ids) || !priority) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const ingestion_id = uuidv4();
  const batches = [];

  for (let i = 0; i < ids.length; i += 3) {
    const batch_ids = ids.slice(i, i + 3);
    const batch = {
      batch_id: uuidv4(),
      ids: batch_ids,
      status: "yet_to_start",
      priority: PRIORITY_MAP[priority],
      ingestion_id,
      created_at: Date.now()
    };
    batches.push(batch);
    batchQueue.push(batch);
  }

  // Sort queue by priority and time
  batchQueue.sort((a, b) => a.priority - b.priority || a.created_at - b.created_at);

  ingestionStore[ingestion_id] = {
    ingestion_id,
    status: "yet_to_start",
    batches
  };

  res.json({ ingestion_id });
};
