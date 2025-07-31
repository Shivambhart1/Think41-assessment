const mongoose = require('mongoose')
const Product = require('../models/Product')
const Dept = require('../models/Department')

async function migrate() {
  mongoose.connect('mongodb+srv://admin-shivam:psych0boyy@event-management.jdroe.mongodb.net/CSTech')

  const allProducts = await Product.find()

  for (let product of allProducts) {
    const dept = await Dept.findOne({ name: product.department })

    if(dept) {
      product.department_id = dept._id
      product.department = undefined;

      await product.save()
    }
  }

  console.log('Done migrating with updated department_id')
  mongoose.disconnect()
}

migrate()