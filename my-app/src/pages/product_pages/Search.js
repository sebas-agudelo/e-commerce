import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ProductContext } from '../../Context/ProductContext';
import ShowProdcuts from '../../components/ProductComponents/ShowProdcuts';
import Footer from '../Footer';
import { ProductsApiContext } from '../../Context/ProductsContext';

const ProductSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const queryFromURL = searchParams.get('query') || '';
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const {fetchProducts, price, currenPage, categoryID} = useContext(ProductsApiContext)
  const {id} = useParams()

  useEffect(() => {
    if (queryFromURL) {
      fetchSearchProducts(queryFromURL);
      setSearchQuery(queryFromURL)
    }
    // fetchProductById(id)
  }, [queryFromURL, price, categoryID]);

  const fetchSearchProducts = async (query) => {
    // `https://examensarbeten.vercel.app/search?query=${query}`
    // `http://localhost:3030/search?query=${query}`
    try {
      let url = `https://examensarbeten.vercel.app/search?query=${query}&page=${currenPage}`;

      if (price && categoryID) {
        url += `&price=${price}&categoryID=${categoryID}`;
      } else if (price) {
        url += `&price=${price}`;
      } else if (categoryID) {
        url += `&categoryID=${categoryID}`;
      }

      fetchProducts(url);


      setError(null);
    } catch (err) {
      setError(err.message);

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

        {/* <div className='search-word'>
          <h1>Sökord:</h1>
          <h1 className='searched'>{`"${searchQuery}"`}</h1>
        </div>
         */}
        <ShowProdcuts 
         
            />
            <Footer />
    </main>
  );
};

export default ProductSearch;
