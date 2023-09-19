import request from "supertest";
import { app } from "../src/app"; // Assume you have your Express app exported from 'app.ts'

describe("GET /logs", () => {
  it("should respond with a 200 status and success message", async () => {
    const response = await request(app).get("/logs");

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(10);
    expect(response.body.message).toBe("Success");
  });

  it("should respond with a 400 status With invalid filename", async () => {
    const response = await request(app).get("/logs?file=wrong");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("File does't exist");
  });

  it("should respond with a 400 status With invalid limit", async () => {
    const response = await request(app).get("/logs?limit=0");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Enter valid number of lines");
  });

  it("should default to 10 if NaN is passed in limit", async () => {
    const response = await request(app).get("/logs?limit=STRING");
    
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(10);
    expect(response.body.message).toBe("Success");
  });

  it("should expect search keywords in the response", async () => {
    const response = await request(app).get("/logs?keyword=Sep");
    
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(10);
    expect(response.body.data[0]).toMatch(/Sep/);
  });
});
