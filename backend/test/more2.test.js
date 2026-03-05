import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../index.js'

describe(' backend checks', () => {
  it('app has an express router', () => {
    expect(app._router).toBeDefined()
    expect(Array.isArray(app._router.stack)).toBe(true)
  })

  it('uploads static middleware is registered', () => {
    const stack = app._router && app._router.stack ? app._router.stack : []
    const hasUploads = stack.some((layer) => {
      try {
        const src = layer.regexp && layer.regexp.source
        if (src && src.includes('\\/uploads')) return true
      } catch (e) {
        // ignore
      }
      if (layer.name === 'serveStatic') return true
      return false
    })
    expect(hasUploads).toBe(true)
  })

  it('root response contains soccer emoji', async () => {
    const res = await request(app).get('/')
    expect(res.text).toContain('⚽')
  })
})
