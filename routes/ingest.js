// const express = require('express');
// const { v4: uuidv4 } = require('uuid');
// const { ingestionMap, batchMap, jobQueue } = require('../store/memory');
// const { sortQueue } = require('../utils/priorityQueue');

// const router = express.Router();

// router.post('/', (req, res) => {
//   const { ids, priority } = req.body;

//   if (!Array.isArray(ids) || !['HIGH', 'MEDIUM', 'LOW'].includes(priority)) {
//     return res.status(400).json({ error: 'Invalid input' });
//   }

//   const ingestion_id = uuidv4();
//   const createdTime = Date.now();
//   const batches = [];

//   for (let i = 0; i < ids.length; i += 3) {
//     const chunk = ids.slice(i, i + 3);
//     const batch_id = uuidv4();
//     batches.push({ batch_id, ids: chunk, status: 'yet_to_start' });

//     batchMap.set(batch_id, {
//       ids: chunk,
//       status: 'yet_to_start',
//       ingestion_id,
//     });

//     jobQueue.push({
//       priority,
//       time: createdTime,
//       batch_id,
//     });
//   }

//   sortQueue(jobQueue);

//   ingestionMap.set(ingestion_id, {
//     status: 'yet_to_start',
//     batches,
//   });

//   return res.json({ ingestion_id });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const { handleIngest } = require("../controllers/ingestController");

router.post("/", handleIngest);

module.exports = router;

