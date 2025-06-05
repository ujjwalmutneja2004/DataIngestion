const request = require('supertest');
const app = require('../app');

describe('Data Ingestion API', () => {
  it('should accept ingestion request and return ingestion_id', async () => {
    const response = await request(app)
      .post('/ingest')
      .send({ ids: [1, 2, 3, 4, 5], priority: 'HIGH' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('ingestion_id');
  });

  it('should return 400 on invalid priority', async () => {
    const res = await request(app)
      .post('/ingest')
      .send({ ids: [1, 2, 3], priority: 'URGENT' });

    expect(res.statusCode).toBe(400);
  });
});
