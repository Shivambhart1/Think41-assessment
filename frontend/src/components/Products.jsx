import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "../styles/Product.css"
import SpecificProduct from './SpecificProduct'

const Products = () => {
  const [products, setProducts] = useState([])
  const [productId, setProductId] = useState(null)
  const [fetchedProduct, setFetchedProduct] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  const handleSelectProduct = (product) => {
    setSelectedProduct(product)
    setShowPopup(true)
  }

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products')
    setProducts(res?.data)
  }

  const fetchProductById = async (id) => {
    if (!id) return
    const res = await axios.post(`http://localhost:5000/api/products/${id}`)
    setFetchedProduct(res?.data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])
  return (
    <>
      Products
      <div className='fetch-by-id'>
        <h1>Fetch Product by id: </h1>
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder='Enter product id'
          className='product-input'
        />
        <button onClick={() => fetchProductById(productId)}>Fetch</button>
        {fetchedProduct && (
          <p>{JSON.stringify(fetchedProduct)}</p>
        )}
      </div>
      <div className='products'>
        {products?.map((product) => (
          <div 
            key={product.id} 
            className='product' 
            onClick={() => handleSelectProduct(product)}
          >
            <p>{'Id: ' + product.id}</p>
            <p>{'Name: ' + product.name}</p>
          </div>
        ))}
      </div>
      <div>
        {selectedProduct && (
          <SpecificProduct onClose={() => setShowPopup(false)}>
            <p>ID: {selectedProduct.id}</p>
            <p>Name: {selectedProduct.name}</p>
            <p>Price: {selectedProduct.cost}</p>
            <p>Category: {selectedProduct.category}</p>
          </SpecificProduct>
        )}
      </div>
    </>
  )
}

export default Products