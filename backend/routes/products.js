const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Product = require('../models/Product')

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().limit(200)
    res.status(200).json(products)
  } catch(error) {
    res.status(500).json({message: error.message})
  }
})

router.post('/:id', async (req, res) => {
  try {
    const { id } = req.params
    if(!id) return res.status(400).json({message: 'Product id is required'})
    console.log(id)
    const product = await Product.find({ id })
    if(!product || product.length === 0) return res.status(404).json({message: 'Product not found'})
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

module.exports = router