import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { AuthSessionContext } from "../../Context/SessionProvider";
import Footer from "../Footer";
import ShowProdcuts from "../../components/ProductComponents/ShowProdcuts";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { setErrorMessage, setOkMessage } =
    useContext(ProductContext);
  const { session, admin } = useContext(AuthSessionContext);

  useEffect(() => {
    const fetch = async () => {

      await fetchAllProducts();
    }

    fetch()
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch("http://localhost:3030/api/products/show", {
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

  const deleteProductByID = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3030/api/product/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      const delProduct = products.filter((item) => item.id !== id);

      if (delProduct) {
        setProducts(delProduct);
      }

      const data = await response.json();

      if (response.ok) {
        setOkMessage(data.success);
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
      deleteProductByID={deleteProductByID}
      setProducts={setProducts}
      products={products}
      />
      <Footer />
    </main>
  );
}
