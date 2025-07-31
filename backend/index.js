const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const products = require('./routes/products')

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

mongoose.connect('mongodb+srv://admin-shivam:psych0boyy@event-management.jdroe.mongodb.net/CSTech')
  .then(() => {
    console.log('Mongoose is connected')
  }).catch((err) => {
    console.log(err)
  })

app.use('/api/products', products)

app.listen(5000, () => {
  console.log('Server is running on port 5000')
})
