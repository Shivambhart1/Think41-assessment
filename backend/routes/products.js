const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

router.get('/', async (req, res) => {
  const products = await products.find()
  res.json(products)
})

module.exports = router