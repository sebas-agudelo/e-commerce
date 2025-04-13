import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../Footer";
import ShowProdcuts from "../../components/ProductComponents/ShowProdcuts";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

export default function ProductsByCategory() {
  const [products, setProducts] = useState([]);
    const [price, setPrice] = useState(0);
  const { categoryId, category } = useParams();
  const[categoryID, setCategoryID] = useState();
    const [pages, setPages] = useState();
    const [count, setCount] = useState([]);
    const [currenPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProductByCategory();
  }, [categoryId, price, currenPage]);

  const fetchProductByCategory = async () => {
    try {
      // `https://examensarbeten.vercel.app/api/product/categori/${categoryId}`
      // `http://localhost:3030/api/product/categori/${categoryId}`

      let url =  `http://localhost:3030/api/product/categori/${categoryId}?page=${currenPage}`

      if(price && categoryID){
        url += `&price=${price}&categoryID=${categoryID}`;
      }

      else if(price){
        url += `&price=${price}`;
      }

      else if(categoryID){
        url += `&categoryID=${categoryID}`;
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
      console.log(data);
      

      if (response.ok) {
        setProducts(data.products);
        setPages(data.totalPages);
        setCount(data.count);
        // setCurrentPage(data.currenPage)
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error fetching products: ", error);
      alert("Något gick fel när produkterna hämtades.");
    }
  };

  
  const nextPage = async () => {
    if (currenPage < pages) {
      setCurrentPage(currenPage + 1);
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
        currenPage={currenPage}
        setCurrentPage={setCurrentPage}
        pages={pages}
        setPages={setPages}
      />
      <Footer />
    </main>
  );
}
