import app from '../server';
import request from 'supertest';

describe("GET / - a simple api endpoint", () => {
  it("Hello API Request", async () => {
    const result = await request(app).get("/_status");
    expect(result.text).toEqual("Healthy!!!");
    expect(result.statusCode).toEqual(200);
  });
});