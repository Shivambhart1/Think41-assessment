const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const products = require('./routes/products')

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/')
  .then(() => {
    console.log('Mongoose is connected')
  }).catch((err) => {
    console.log(err)
  })

app.use('/api/products', products)

app.listen(5000, () => {
  console.log('Server is running on port 5000')
})
