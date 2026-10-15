import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRestaurants } from '../api/restaurantApi';

const bestSellers = [
  { id: 1, name: 'Pizza', price: 103.0, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200' },
  { id: 2, name: 'Burger', price: 50.0, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200' },
  { id: 3, name: 'Fries', price: 12.99, img: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=200' },
  { id: 4, name: 'Drink', price: 8.20, img: 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=200' },
];

const popularItems = [
  { id: 101, name: 'Strawberry Shake', date: '29 Nov, 01:20 pm', price: '₹20.00', items: '2 items' },
  { id: 102, name: 'Chicken Burger', date: '17 Oct, 01:20 pm', price: '₹20.00', items: '1 item' },
];

const Home = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadRestaurants = async (pageNum) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetchRestaurants(118, pageNum);
      const data = res.data.data;
      setRestaurants(data.results || []);
      setTotalPages(data.meta?.total_pages || 1);
    } catch (err) {
      setError('Failed to load restaurants. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRestaurants(page);
  }, [page]);

  const handlePrev = () => page > 1 && setPage(page - 1);
  const handleNext = () => page < totalPages && setPage(page + 1);

  const handleImgError = (e) => {
    e.target.src = 'https://via.placeholder.com/80x80.png?text=Logo';
  };

  return (
    <div className="home-screen">
      <div className="home-header">
        <div>
          <p className="location-label">Current Locations</p>
          <h2 className="location-title">Model Town, New Delhi</h2>
        </div>
      </div>

      <div className="search-row">
        <div className="search-bar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8A8A8A" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" placeholder="Karan" />
        </div>
        <button className="icon-btn phone-icon-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24a11.36 11.36 0 003.56.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1a11.36 11.36 0 00.57 3.56a1 1 0 01-.24 1.05l-2.21 2.18z"/></svg>
        </button>
        <button className="icon-btn wallet-icon-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M21 7H3a1 1 0 00-1 1v11a2 2 0 002 2h16a2 2 0 002-2V8a1 1 0 00-1-1zm-1 12H4V9h16v10zM18 3H6a1 1 0 000 2h12a1 1 0 000-2z"/></svg>
        </button>
      </div>

      <div className="section-container">
        <h3 className="section-title">Best Seller</h3>
        <div className="horizontal-scroll">
          {bestSellers.map(item => (
            <div key={item.id} className="best-seller-card" onClick={() => navigate(`/item/${item.id}`)}>
              <img src={item.img} alt={item.name} className="best-seller-img" onError={handleImgError} />
              <div className="best-seller-price">${item.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Banner Section - Exact Figma Match */}
      <div className="section-container">
        <div className="promo-banner">
          <div className="promo-left">
            <div className="promo-text">
              <p className="promo-desc">
                Experience our<br/>
                delicious new dish
              </p>
              <h2 className="promo-title">30% OFF</h2>
            </div>
          </div>
          <div className="promo-right">
            <img src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80" alt="Delicious Pizza" className="promo-img" onError={handleImgError} />
          </div>
        </div>
        
        {/* 5 Carousel Indicators */}
        <div className="carousel-dots">
          <div className="pill-indicator"></div>
          <div className="pill-indicator"></div>
          <div className="pill-indicator active"></div>
          <div className="pill-indicator"></div>
          <div className="pill-indicator"></div>
        </div>
      </div>

            {/* Popular Items Section - Exact Layout */}
      <div className="section-container">
        <h3 className="section-title">Popular Items</h3>
        {popularItems.map(item => (
          <div key={item.id} className="popular-card" onClick={() => navigate(`/item/${item.id}`)}>
            <img src="https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=100" alt={item.name} className="popular-img" onError={handleImgError} />
            
            <div className="popular-details">
              {/* Top side: Left(Name/Date) and Right(Price/Items) */}
              <div className="popular-top">
                <div className="popular-left">
                  <h4 className="popular-name">{item.name}</h4>
                  <p className="popular-date">{item.date}</p>
                </div>
                <div className="popular-right">
                  <p className="popular-price">{item.price}</p>
                  <p className="popular-items">{item.items}</p>
                </div>
              </div>
              
              {/* Bottom side: Buttons */}
              <div className="popular-actions">
                <button className="btn-cancel" onClick={(e) => e.stopPropagation()}>Cancel Order</button>
                <button className="btn-track" onClick={(e) => e.stopPropagation()}>Track Driver</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="section-container">
        <h3 className="section-title">Restaurants Near You</h3>
        
        {loading && <p className="loading-text">Loading restaurants...</p>}
        {error && <p className="error-text">{error}</p>}
        
        {!loading && !error && (
          <>
            <div className="restaurant-list">
              {restaurants.map(rest => (
                <div key={rest.restaurant_id} className="restaurant-card">
                  <img 
                    src={rest.logo || 'https://via.placeholder.com/60x60.png?text=Logo'} 
                    alt={rest.restaurant_name} 
                    className="restaurant-logo"
                    onError={handleImgError}
                  />
                  <div className="restaurant-info">
                    <h4 className="restaurant-name">{rest.restaurant_name}</h4>
                    <p className="restaurant-address">{rest.address_complete || 'Address not available'}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pagination-controls">
              <button onClick={handlePrev} disabled={page === 1} className="pagination-btn">Prev</button>
              <span className="page-info">Page {page} of {totalPages}</span>
              <button onClick={handleNext} disabled={page === totalPages} className="pagination-btn">Next</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;