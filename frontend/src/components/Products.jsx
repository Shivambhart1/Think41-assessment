import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "../styles/Product.css"

const Products = () => {
  const [products, setProducts] = useState([])
  const [productId, setProductId] = useState(null)
  const [specificProduct, setSpecificProduct] = useState(null)

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products')
    setProducts(res?.data)
  }

  const fetchProductById = async (id) => {
    if (!id) return
    const res = await axios.post(`http://localhost:5000/api/products/${id}`)
    setSpecificProduct(res?.data)
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
        {specificProduct && (
          <p>{JSON.stringify(specificProduct)}</p>
        )}
      </div>
      <div className='products'>
        {products?.map((product) => (
          <div key={product.id} className='product'>
            <p>{'Id: ' + product.id}</p>
            <p>{'Name: ' + product.name}</p>
            <p>{'Brand: ' + product.brand}</p>
            <p>{'Cost: ' + product.cost}</p>
            <p>{'Category: ' + product.category}</p>
            <p>{'SKU:' + product.sku}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Products