import { useState, useContext } from "react";
import { ProductContext } from "../Context/ProductContext"; 

export const CreateAndUpdateProduct = () => {
  const [isDescClicked, setIsDescClicked] = useState(false);
  const { setProductData, productData } = useContext(ProductContext);

  const createFormData = () => {
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }
    return formData;
  };
  
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      const imageURL = file ? URL.createObjectURL(file) : null;

      setProductData((prevDetails) => ({
        ...prevDetails,
        [name]: file,
        [`${name}Preview`]: imageURL,
      }));
    } else {
        setProductData((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  // Öppna och stäng beskrivningsfältet för produkt beskrivning
  const open = () => {
    setIsDescClicked(true);
 
  };

  const close = () => {
    setIsDescClicked(false);
  };

  return {
    createFormData,
    handleChange,
    open,
    close,
    isDescClicked,
  };
};
