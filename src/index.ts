import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { prisma } from './prisma.js'

const app = new Hono()


const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
