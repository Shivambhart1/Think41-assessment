const Product = require('../models/Product')
const Dept = require('../models/Department')
const mongoose = require('mongoose')

async function extract() {
  mongoose.connect('mongodb+srv://admin-shivam:psych0boyy@event-management.jdroe.mongodb.net/CSTech')
  const departments = await Product.distinct('department')

  for (const name of departments) {
    await Dept.updateOne({ name }, { name }, { upsert: true })
  }

  console.log('Done')
  mongoose.disconnect();
}

extract()