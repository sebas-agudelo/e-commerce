import { useContext, useEffect, useState } from "react";
import ShowAddNewProduct from "../../components/ShowProducts/ShowAddNewProduct";
import { ValidateProductData } from "./ValidateProductData";
import { ProductContext } from "../../Context/ProductContext";
import { CreateAndUpdateProduct } from "../../hooks/CreateAndUpdateProduct";

export default function AddProduct() {
  const { productData, setOkMessage, setErrorMessage } = useContext(ProductContext) 
  const { createFormData } = CreateAndUpdateProduct();

  const createProduct = async () => {

    const validation = ValidateProductData(productData);
    
    if (!validation.isValid) {
      setErrorMessage(validation.message);
      return;
    }
    
    const formData = createFormData();
    
    try{
      const response = await fetch(`http://localhost:3030/api/product/create`, {
        method: "POST",
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
    await createProduct();
    
  };

  
  return (
    <main className="new-product-container">
      <section className="new-product-wrapper">
        <ShowAddNewProduct 
        handleSubmit={handleSubmit}
        />      
      </section>
    </main>
  );
}
