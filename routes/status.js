// const express = require('express');
// const { ingestionMap, batchMap } = require('../store/memory');

// const router = express.Router();

// router.get('/:ingestion_id', (req, res) => {
//   const { ingestion_id } = req.params;
//   const ingestion = ingestionMap.get(ingestion_id);

//   if (!ingestion) {
//     return res.status(404).json({ error: 'Not found' });
//   }

//   const batches = ingestion.batches.map(batch => {
//     const b = batchMap.get(batch.batch_id);
//     return {
//       batch_id: batch.batch_id,
//       ids: b.ids,
//       status: b.status,
//     };
//   });

//   let status = 'yet_to_start';
//   const allStatuses = batches.map(b => b.status);
//   if (allStatuses.every(s => s === 'completed')) status = 'completed';
//   else if (allStatuses.some(s => s === 'triggered')) status = 'triggered';

//   return res.json({
//     ingestion_id,
//     status,
//     batches,
//   });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const { getStatus } = require("../controllers/statusController");

router.get("/:id", getStatus);

module.exports = router;
