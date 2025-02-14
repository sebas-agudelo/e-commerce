import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ProductContext } from '../../Context/ProductContext';

const ProductSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const queryFromURL = searchParams.get('query') || '';
  const [searchQuery, setSearchQuery] = useState(queryFromURL);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const {fetchProductById} = useContext(ProductContext);
  const {id} = useParams()

  useEffect(() => {
    if (queryFromURL) {
      fetchProducts(queryFromURL);
    }
    fetchProductById(id)
  }, [queryFromURL]);

  const fetchProducts = async (query) => {
    try {
      const response = await fetch(`http://localhost:3030/search?query=${query}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fel vid sökning');
      }

      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setProducts([]);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setError('Skriv något för att söka.');
      return;
    }

    // Uppdatera URL:en med sökfrågan
    setSearchParams({ query: searchQuery });

    // Navigera användaren till sökresultat (URL uppdateras)
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Produktsökning</h1>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {products.map((product) => (
            <>
          <li key={product.id}>
            {product.title} - {product.price} kr
          </li>
          <li>
            <Link to={`/product/${product.id}`}>Kolla produkten</Link>
          </li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default ProductSearch;
