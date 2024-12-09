const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleWare')
const connectDb = require('./config/db')
const PORT = process.env.PORT || 8000
// Connect to database:

const app = express()
connectDb()

app.use(express.json())
app.use(
  express.urlencoded({
    extended: false, //
  })
)

app.get('/', (req, res) => {
  //   res.send('Hello');
  res.status(201)
  res.json({ msg: 'welcome to the Support Desk API' })
})

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

app.listen(PORT, () => console.log('hello', PORT))
app.use(errorHandler)
