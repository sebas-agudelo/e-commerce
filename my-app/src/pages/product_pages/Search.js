import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ProductContext } from '../../Context/ProductContext';
import ShowProdcuts from '../../components/ProductComponents/ShowProdcuts';
import Footer from '../Footer';

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
      const response = await fetch(`https://examensarbeten.vercel.app/search?query=${query}`);
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
    <main className="Products-main">

        <div className='search-word'>
          <h1>Sökresultat:</h1>
          <h1 className='searched'>{`"${searchQuery}"`}</h1>
        </div>
        
        <ShowProdcuts 
            setProducts={setProducts}
            products={products}
            />
            <Footer />
    </main>
  );
};

export default ProductSearch;
