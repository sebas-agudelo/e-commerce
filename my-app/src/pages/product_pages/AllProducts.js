import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../Context/ProductContext";
import { AuthSessionContext } from "../../Context/SessionProvider";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import ProductsMessages from "../../components/ShowProducts/ProductsMessages";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { setErrorMessage, setOkMessage } =
    useContext(ProductContext);
  const { session, admin } = useContext(AuthSessionContext);

  useEffect(() => {
    fetchAllProducts();
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
      <section className="products-container">
       {/* <ProductsMessages /> */}
        {products.map((product) => (
          <>
              <article key={product.id} className="product-wrapper">
            <Link to={`/product/${product.id}`}>
                <div className="product-img-wrapper">
                  <div className="product-img">
                    <img src={product.img} alt={product.title} />
                  </div>
                </div>

                <div className="product-details">
                  <p id="title">{product.title}</p>
                  <p id="price">{product.price}.-</p>
                </div>
            </Link>
            <article className="admin-actions-btn">
            {session && admin ? (
              <>
                <button><Link to={`/product/update/${product.id}`}>
                  <CiEdit />
                </Link>
                </button>
                <GoTrash onClick={() => deleteProductByID(product.id)} />
              </>
            ) : (
              ""
            )}
        </article>
              </article>

          </>
        ))}
      </section>
    </main>
  );
}
