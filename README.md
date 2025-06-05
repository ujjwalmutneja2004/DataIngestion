# 📊 Data Ingestion API System

This project implements a simple yet powerful asynchronous data ingestion system using **Node.js** and **Express**. It simulates fetching data from an external API, manages rate limiting, and prioritizes requests based on priority levels.

---

## 🔧 Features

- 🧵 Asynchronous batch processing (max 3 IDs per batch)
- 🕔 Rate limiting (1 batch every 5 seconds)
- 🚦 Priority-based queue (HIGH > MEDIUM > LOW)
- 📬 Status tracking for each ingestion request and batch
- 🧪 Postman/ThunderClient friendly

---

## 🚀 Getting Started

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/ujjwalmutneja2004/DataIngestion.git
cd DataIngestion
npm install

2. Start the Server
npm start

```

📫 API Endpoints
1️⃣ Submit Data Ingestion Request
🔹 Endpoint: POST /ingest
🔹 Content-Type: application/json

🧾 Payload Example:
```json
{
  "ids": [1, 2, 3, 4, 5],
  "priority": "HIGH"
}


✅ Response Example:
{
  "ingestion_id": "abc123"
}
```

2. Check Ingestion Status
Endpoint: GET /status/:ingestion_id

✅ Response Example:
{
  "ingestion_id": "abc123",
  "status": "triggered",
  "batches": [
    {
      "batch_id": "batch-uuid-1",
      "ids": [1, 2, 3],
      "status": "completed"
    },
    {
      "batch_id": "batch-uuid-2",
      "ids": [4, 5],
      "status": "triggered"
    }
  ]
}

🟢 Status Definitions
Batch Status:
yet_to_start

triggered

completed


Overall Status:
If all batches are yet_to_start → overall is yet_to_start

If at least one batch is triggered → overall is triggered

If all batches are completed → overall is completed



