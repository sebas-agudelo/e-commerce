import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../Footer";
import ShowProdcuts from "../../components/ProductComponents/ShowProdcuts";

export default function ProductsByCategory() {
  const [products, setProducts] = useState([]);
    const [price, setPrice] = useState(0);
  const { categoryId, category } = useParams();
  const[categoryID, setCategoryID] = useState();

  useEffect(() => {
    fetchProductByCategory();
  }, [categoryId, price]);

  const fetchProductByCategory = async () => {
    try {
      // `https://examensarbeten.vercel.app/api/product/categori/${categoryID}`
      // `http://localhost:3030/api/product/categori/${categoryId}`

      let url = `https://examensarbeten.vercel.app/api/product/categori/${categoryID}`

      if(price && categoryID){
        url += `?price=${price}&categoryID=${categoryID}`;
      }

      else if(price){
        url += `?price=${price}`;
      }

      else if(categoryID){
        url += `?categoryID=${categoryID}`;
      }

      const response = await fetch(
        url,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setProducts(data); 
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error fetching products: ", error);
      alert("Något gick fel när produkterna hämtades.");
    }
  };

  return (
    <main className="Products-main">

      <div className='search-word'>
          <h1>{category}</h1>
      </div>

      <ShowProdcuts 
        products={products}
        setProducts={setProducts}
        price={price}
        setPrice={setPrice}
        categoryID={categoryID}
        setCategoryID={setCategoryID}
        categoryId={categoryId}
        category={category}
      />
      <Footer />
    </main>
  );
}
