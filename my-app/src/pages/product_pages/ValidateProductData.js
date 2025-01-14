export const ValidateProductData = (productData) => {
    // Kontrollera om några obligatoriska fält är tomma
    if (!productData.title || !productData.price || !productData.category_id || !productData.garanti || !productData.description) {
      return { isValid: false, message: "Produktens titel, pris, kategori, garanti och beskrivning får inte vara tomma" };
    }
  
    // Kontrollera titelns längd
    if (productData.title.length > 100) {
      return { isValid: false, message: "Titel får inte överstiga 100 tecken" };
    }
  
    // Kontrollera att priset endast innehåller siffror
    if (!/^\d*$/.test(productData.price)) {
      return { isValid: false, message: "Pris får endast vara en siffra" };
    }
  
    // Kontrollera beskrivningens längd
    if (productData.description.length > 1500) {
      return { isValid: false, message: "Beskrivning får inte överstiga 1500 tecken" };
    }
  
    // Kontrollera att garantin endast innehåller siffror
    if (!/^\d*$/.test(productData.garanti)) {
      return { isValid: false, message: "Garanti får endast vara en siffra" };
    }
  
    // Kontrollera att batteritid endast innehåller siffror
    if (!/^\d*$/.test(productData.battery_life)) {
      return { isValid: false, message: "Batteritid får endast vara en siffra" };
    }
  
    // Kontrollera att laddningstid endast innehåller siffror
    if (!/^\d*$/.test(productData.charging_time)) {
      return { isValid: false, message: "Laddningstiden får endast vara en siffra" };
    }

    if (productData.brand.length > 50) {
      return { isValid: false, message: "Märke får inte överstiga 50 tecken" };
    }
  
    // Om alla valideringar går igenom
    return { isValid: true, message: "" };
  };
  