const { ingestionStore } = require("../store/memory");

exports.getStatus = (req, res) => {
  const ingestion = ingestionStore[req.params.id];

  if (!ingestion) {
    return res.status(404).json({ error: "Ingestion ID not found" });
  }

  res.json(ingestion);
};
