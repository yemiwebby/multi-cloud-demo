const request = require("supertest");
const app = require("../server");

describe("Multi-Cloud Demo App", () => {
  test("GET / returns app info", async () => {
    const response = await request(app).get("/").expect(200);

    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("cloud");
    expect(response.body).toHaveProperty("version");
  });

  test("GET /health returns health status", async () => {
    const response = await request(app).get("/health").expect(200);

    expect(response.body.status).toBe("healthy");
    expect(response.body).toHaveProperty("uptime");
  });

  test("GET /info returns environment info", async () => {
    const response = await request(app).get("/info").expect(200);

    expect(response.body).toHaveProperty("environment");
    expect(response.body).toHaveProperty("deployment");
  });

  test("GET /nonexistent returns 404", async () => {
    await request(app).get("/nonexistent").expect(404);
  });
});
