import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDb from './config/db.js'

import productsRoute from './routes/productRoutes.js'
import userRoute from './routes/userRoutes.js'

dotenv.config()

connectDb()

const app = express()

app.use(express.json())

app.get('/', (req, res) => res.send('API Running'))
app.use('/api/products', productsRoute)
app.use('/api/users', userRoute)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 500

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
)
