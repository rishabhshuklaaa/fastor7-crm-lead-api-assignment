import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const portions = [
  { id: 'personal', name: 'Personal', size: '4 Slides', price: '$0.00' },
  { id: 'medium', name: 'Medium', size: '8 Slides', price: '$3.00' },
  { id: 'familiar', name: 'Familiar', size: '10 Slides', price: '$6.00' },
  { id: 'jumbo', name: 'Jumbo', size: '12 Slides', price: '$10.00' },
];

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [quantity, setQuantity] = useState(3);
  const [selectedPortion, setSelectedPortion] = useState('jumbo');
  const [cartCount, setCartCount] = useState(0);

  const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);
  const handleIncrease = () => setQuantity(quantity + 1);

  const handleAddToCart = () => {
    setCartCount(prev => prev + quantity);
    alert(`Added ${quantity} item(s) to cart! Total cart items: ${cartCount + quantity}`);
  };

  return (
    <div className="item-detail-screen">
      <button className="back-btn absolute-back" onClick={() => navigate(-1)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="#FF5A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Large Pizza Image */}
      <div className="item-hero-img-wrapper">
        <img 
          src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80" 
          alt="Pizza" 
          className="item-hero-img"
        />
      </div>

      <div className="item-content-body">
        {/* Price and Quantity Stepper */}
        <div className="item-header">
          <h2 className="item-price">₹14.00</h2>
          <div className="quantity-stepper">
            <button className="stepper-btn" onClick={handleDecrease}>-</button>
            <span className="stepper-count">{quantity}</span>
            <button className="stepper-btn" onClick={handleIncrease}>+</button>
          </div>
        </div>

        {/* Title and Description */}
        <h1 className="item-title">Lorem ipsum dolor sit amet</h1>
        <p className="item-desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        {/* Personal Portion Section */}
        <div className="portion-section">
          <h3 className="portion-title">Personal portion</h3>
          <div className="portion-list">
            {portions.map(portion => (
              <div 
                key={portion.id} 
                className={`portion-option ${selectedPortion === portion.id ? 'active' : ''}`}
                onClick={() => setSelectedPortion(portion.id)}
              >
                <div className="portion-info">
                  <span className="portion-name">{portion.name}</span>
                  <span className="portion-size">({portion.size})</span>
                </div>
                <div className="portion-right">
                  <span className="portion-price">{portion.price}</span>
                  <div className="radio-outer">
                    {selectedPortion === portion.id && <div className="radio-inner"></div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="primary-btn add-to-cart-btn" onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ItemDetail;