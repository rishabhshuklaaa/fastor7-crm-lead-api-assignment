import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRestaurants } from '../api/restaurantApi';

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetchRestaurants(118, page);
        setRestaurants(res.data?.data?.results || []);
        setTotalPages(res.data?.data?.meta?.total_pages || 1);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }
        setError(err.response?.data?.message || 'Failed to load restaurants');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [navigate, page]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('phone');
    navigate('/login');
  };

  return (
    <div className="page">
      <header className="topbar">
        <h2>Restaurants</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      {loading && <p className="info">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && restaurants.length === 0 && (
        <p className="info">No restaurants found</p>
      )}

      <div className="grid">
        {restaurants.map((r) => (
          <div className="card" key={r.restaurant_id}>
            <img
              src={r.logo}
              alt={r.restaurant_name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://placehold.co/72x72?text=' +
                  encodeURIComponent(r.restaurant_name?.[0] || 'R');
              }}
            />
            <div className="card-body">
              <h3>{r.restaurant_name}</h3>
              {r.address_complete && <p>{r.address_complete}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
          Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage((p) => p + 1)} disabled={page >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}