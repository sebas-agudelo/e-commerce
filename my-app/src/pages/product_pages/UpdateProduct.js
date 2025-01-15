import React, { useCallback, useState, useContext, useEffect } from 'react'
import { ProductContext } from '../../Context/ProductContext'
import { useParams } from 'react-router-dom';
import ShowUpdateProduct from '../../components/ShowProducts/ShowUpdateProduct';
import { CreateAndUpdateProduct } from '../../hooks/CreateAndUpdateProduct';
import { ValidateProductData } from './ValidateProductData';

export default function UpdateProduct() {
    const { fetchProductById, productData, setOkMessage, setErrorMessage } = useContext(ProductContext);
    const { createFormData } = CreateAndUpdateProduct();
  

  const {id} = useParams();

 useEffect(() => {
  console.log("ID från URL:", id);
    fetchProductById(id);
  }, [id]);

  const UpdateProduct = async () => {
  
      const validation = ValidateProductData(productData);
      
      if (!validation.isValid) {
        setErrorMessage(validation.message);
        return;
      }
      
      const formData = createFormData();
      
      try{
        const response = await fetch(`http://localhost:3030/api/product/update/${id}`, {
          method: "PUT",
          credentials: "include",
          body: formData,
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setOkMessage(data.success);
          setErrorMessage("");
        }
        
        if (!response.ok) {
          setErrorMessage(data.error);
          setOkMessage("");
        }
        
      }catch(error){
        console.error(error);
        
      }
    }
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      await UpdateProduct();
    };

  return (
    <main className="new-product-container">
          <section className="new-product-wrapper">
            <ShowUpdateProduct
            handleSubmit={handleSubmit}
            />      
          </section>
    </main>
  )
}
