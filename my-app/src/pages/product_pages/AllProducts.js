import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { AuthSessionContext } from "../../Context/SessionProvider";
import Footer from "../Footer";
import ShowProdcuts from "../../components/ProductComponents/ShowProdcuts";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(0);
  const[categoryID, setCategoryID] = useState()

  const { setErrorMessage, setOkMessage } =
    useContext(ProductContext);
  const { session, admin } = useContext(AuthSessionContext);

  useEffect(() => {
    const fetch = async () => {

      await fetchAllProducts();
    }

    fetch()
  }, [price, categoryID]);

  const fetchAllProducts = async () => {
    // `https://examensarbeten.vercel.app/api/products/show`
    // `http://localhost:3030/api/products/show`
    try {
      let url = `https://examensarbeten.vercel.app/api/products/show`
      
      if(price && categoryID){
        url += `?price=${price}&categoryID=${categoryID}`
      }

      else if(price){
        url += `?price=${price}`
      }

      else if(categoryID){
        url += `?categoryID=${categoryID}`
      }


      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.ok) {
        setProducts(data.products);
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="Products-main">

        <div className='search-word'>
          <h1>Visa alla</h1>
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
}
