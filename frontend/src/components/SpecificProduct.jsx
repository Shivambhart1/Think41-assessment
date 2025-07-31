import React from 'react'
import "../styles/Product.css"

const SpecificProduct = ({ onClose ,children }) => {
  return (
    <div className='popup-overlay'>
      <div className='popup-content'>
        <button className='close-btn' onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  )
}

export default SpecificProduct