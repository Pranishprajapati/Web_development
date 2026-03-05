import request from "supertest"
import { describe, it, expect } from "vitest"
import app from "../index.js"

describe("Four extra backend tests", () => {

  it("accepts HEAD request on root", async () => {
    const res = await request(app).head("/")
    expect(res.status).toBe(200)
  })

  it("root response includes CORS header", async () => {
    const res = await request(app).get("/")
    expect(res.headers).toHaveProperty("access-control-allow-origin")
  })

  it("app has an env string", () => {
    const env = app.get && app.get("env")
    expect(typeof env).toBe("string")
    expect(env.length).toBeGreaterThan(0)
  })

})