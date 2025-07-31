const fs = require('fs')
const csv = require('csv-parser')
const mongoose = require('mongoose')

const Product = require('../models/Product')

mongoose.connect('mongodb+srv://admin-shivam:psych0boyy@event-management.jdroe.mongodb.net/CSTech')
.then(() => {
  const results = [];
  fs.createReadStream('products.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', async () => {
    console.log('results: ', results)
    await Product.insertMany(results)
    console.log('CSV file successfully processed and products inserted')
    mongoose.disconnect();
  })
})
