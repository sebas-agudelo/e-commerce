import React from 'react'
import { Link } from "react-router-dom";
import ShowFilters from './ShowFilters';

export default function ShowProdcuts({products, deleteProductByID}) {
  return (
    <section className="products-container">

        <div className='products-toolbar'>

        <h2>Produkter: {products.length}</h2>
        <ShowFilters />

        </div>

         {products.map((product) => (
          <>
              <article key={product.id}  className="product-wrapper">
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
            {/* {session && admin ? (
              <>
                <button><Link to={`/product/update/${product.id}`}>
                  <CiEdit />
                </Link>
                </button>
                <GoTrash onClick={() => deleteProductByID(product.id)} />
              </>
            ) : (
              ""
            )} */}
        </article>
              </article>

          </>
        ))}        
    </section>
  )
}
