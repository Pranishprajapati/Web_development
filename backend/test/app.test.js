import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../index.js'

describe('Backend root route', () => {
  it('responds with running message', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.text).toMatch(/Backend running/i)
  })
})
