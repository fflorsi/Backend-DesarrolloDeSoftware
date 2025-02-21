import request from "supertest";
import app from "../src/app";

describe('GET /api/professionals', () => {
  test('deberia responder con un status 200', async () => {
    const response = await request(app).get('/api/professionals').send().expect(200);
})
}
)