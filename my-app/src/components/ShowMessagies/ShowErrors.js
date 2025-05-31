import React, { useContext, useEffect, useState } from 'react'
import { MdErrorOutline } from "react-icons/md";
import { ProductsApiContext } from '../../Context/ProductsContext'
import { useSearchParams } from 'react-router-dom';

export default function ShowErrors() {
  const { setCurrentPage, message, setMessage, setPrice, setCategoryID } = useContext(ProductsApiContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const newParams = new URLSearchParams(searchParams);

  const remove = () => {
    newParams.delete("categoryID");
    setCategoryID("")
    setMessage("")
    setCurrentPage(1)
    setPrice(0)
    setSearchParams(newParams)
  }
  
  return (
    <>
      {message && (
        <div className={`show-messages-errors`}>
            <p onClick={() => remove()}>X</p>
        <div className='be-msg'> 
          <MdErrorOutline />
          <p>{message}</p>
          </div>

          <div>
          <p>Utforska gärna alla våra produkter eller välj en kategori som passar dig bäst.</p>
          <a href='/products'>Se produkter</a>
          </div>
        </div>
      )}
    </>
  );
}
