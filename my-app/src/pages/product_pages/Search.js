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
  const [price, setPrice] = useState(0);
  const [categoryID, setCategoryID] = useState();
  const [error, setError] = useState(null);
  const {fetchProductById} = useContext(ProductContext);
  const {id} = useParams()

  useEffect(() => {
    if (queryFromURL) {
      fetchProducts(queryFromURL);
    }
    // fetchProductById(id)
  }, [queryFromURL, price, categoryID]);

  const fetchProducts = async (query) => {
    // `https://examensarbeten.vercel.app/search?query=${query}`
    // `http://localhost:3030/search?query=${query}`
    try {
      let url = `http://localhost:3030/search?query=${query}`

      if(price){
        url += `&price=${price}`
      } else if(categoryID){
          url += `&categoryID=${categoryID}`
      }

      console.log(price);
      
      const response = await fetch(url);
      const data = await response.json();

      if(response.ok){
        setProducts(data.products);

      }

      if (!response.ok) {
        throw new Error(data.error || 'Fel vid sökning');
      }

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

    setSearchParams({ query: searchQuery });

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
            price={price}
            setPrice={setPrice}
            categoryID={categoryID}
            setCategoryID={setCategoryID}
            />
            <Footer />
    </main>
  );
};

export default ProductSearch;
