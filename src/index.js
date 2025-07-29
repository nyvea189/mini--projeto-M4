import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import localRouter from './routes/local.routes.js'

dotenv.config()
const app = express()

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.CORS_ORIGIN_PROD]
  : [process.env.CORS_ORIGIN_DEV, 'http://localhost:3000']

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))
app.use(express.json())

app.use('/api',localRouter )

const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
  console.log(`🚀 o servido rodando http://localhost:${PORT}`)
})