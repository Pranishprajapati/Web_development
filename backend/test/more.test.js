import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../index.js'

describe('Additional backend tests', () => {
  it('returns 404 for unknown route', async () => {
    const res = await request(app).get('/this-route-does-not-exist')
    expect(res.status).toBe(404)
  })

  it('root route content-type is text/html', async () => {
    const res = await request(app).get('/')
    expect(res.headers['content-type']).toMatch(/text\/html/)
  })

  it('app exposes middleware methods', () => {
    expect(typeof app.use).toBe('function')
    expect(typeof app.get).toBe('function')
  })
})
