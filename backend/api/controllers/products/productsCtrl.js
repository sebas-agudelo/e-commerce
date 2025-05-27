import { supabase_config } from "../../supabase_config/supabase_conlig.js";
const supabase = supabase_config();

//Funktionen för att filtrera produkterna efter pris och kategori samt pagination.
export const filtredProducts = async (
  price = null,
  categoryID = null,
  page,
  pageSize,
  searchQuery = null
) => {
  const offset = (page - 1) * pageSize;
  let query = supabase
    .from("products")
    .select("id, title, price, img", { count: "exact" })
    .range(offset, offset + pageSize - 1);

  if (price !== null && price !== undefined && price !== "" && price !== 0) {
    const minPrice = parseInt(price);
    const maxPrice = minPrice + 100;
    query = query.gte("price", minPrice).lte("price", maxPrice);
  };
  if (categoryID !== null && categoryID !== undefined && categoryID !== "") {
    query = query.eq("category_id", categoryID);
  };
  if (searchQuery !== undefined && searchQuery !== null && searchQuery !== "") {
    query = query.ilike("title", `%${searchQuery}%`);
  };
  const { data, count, error } = await query;
  if (error || !data) {
    return {
      products: [],
      currentPage: page,
      totalPages: 0,
      count: 0,
      error: error,
    };
  }
  const totalPages = Math.ceil(count / pageSize);
  return {
    currenPage: page,
    totalPages: totalPages,
    count: count,
    products: data,
    error: error,
  };
};

//HÄMTAR ALLA PRODUKTER
export const getProducts = async (req, res) => {
  const { price, categoryID, page } = req.query;  
  console.log("Category ID",categoryID);
  try {
    let products;

    if (price && isNaN(parseInt(price))) {
      return res.status(400).json({ error: "Ogiltig förfrågan" });
    };

    if (
      categoryID !== null &&
      categoryID !== undefined &&
      categoryID !== "" &&
      typeof categoryID !== "string"
    ) {
      return res.status(400).json({ error: "Ogiltig förfrågan" });
    };

    if (isNaN(page) || parseInt(page) < 1) {
      return res.status(400).json({ error: "Ogiltig förfrågan" });
    };

    const pageSize = 4;
    let parsedPageSize = pageSize;
  
    products = await filtredProducts(price, categoryID, parseInt(page), parsedPageSize);
 
    if (!products || products.length <= 0) {
      return res.status(200).json({
        products: [],
        count: 0,
        currenPage: 0,
        totalPages: 0,
      });
    }
    
    return res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Något gick fel. Försök igen." });
  }
};

//HÄMTAR PRODUKTER BASERAD PÅ KATEGORY
export const productByCategory = async (req, res) => {
  const { selectedCatId } = req.params;
  const { price, categoryID, page } = req.query;

  const usedCategoryId = categoryID || selectedCatId;
  try {
    let products;

    if (price && isNaN(parseInt(price))) {
      return res.status(400).json({ error: "Ogiltig förfrågan" });
    };

    if (
      usedCategoryId === undefined ||
      usedCategoryId === null ||
      typeof usedCategoryId === "number"
    ) {
      return res.status(400).json({ error: "Ogiltig förfrågan" });
    };

    if (page === undefined || page === null || parseInt(page) < 1) {
      return res.status(400).json({ error: "Ogiltig förfrågan" });
    };

    const pageSize = 1;
    let parsedPageSize = pageSize;
  
    products = await filtredProducts(price, usedCategoryId, parseInt(page), parsedPageSize);

    if (!products || products.length <= 0) {
      return res.status(200).json({
        products: [],
        count: 0,
        currenPage: 0,
        totalPages: 0,
      });
    };

    return res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Något gick fel. Försök igen." });
  }
};

//SÖK FUNKTIONALITET
export const searchProduct = async (req, res) => {
  const { price, categoryID, page, query } = req.query;
  
  try {
    let products;

    if (price && isNaN(parseInt(price))) {
      return res.status(400).json({ error: "Ogiltig förfrågan" });
    };

    if (
      categoryID !== null &&
      categoryID !== undefined &&
      categoryID !== "" &&
      typeof categoryID !== "string"
    ) {
      return res.status(400).json({ error: "Ogiltig förfrågan" });
    };
  
    if (page === undefined || page === null || parseInt(page) < 1) {
      return res.status(400).json({ error: "Ogiltig förfrågan" });
    };

    const pageSize = 1;
    let parsedPageSize = pageSize;
    
    products = await filtredProducts(
      price,
      categoryID,
      parseInt(page),
      parsedPageSize,
      query
    );

    if (!products || products.length <= 0) {
      return res.status(200).json({
        products: [],
        count: 0,
        currenPage: 0,
        totalPages: 0,
      });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ error: "Något gick fel. Försök igen." });
  }
};

//HÄMTAR EN PRODUKT BASERAD PÅ KATEGORI ID
export const getProductByID = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id || typeof id === "number") {
      throw new Error("Ogiltig produkt ID.");
    }

    let { data: product, error: productError } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (productError) {
      throw new Error(`Supabase error: ${productError}`);
    };

    if(!product){
      return res
      .status(404)
      .json({ error: "Produkten kunde inte hittas." });
    };

    return res.status(200).json({ product });

  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ error: "Något gick fel. Försök igen." });
  }
};

//HÄMTAR ALLA KATEGORIER
export const categories = async (req, res) => {
  try {
    let { data, error } = await supabase.from("categories").select("*");
    if (error || !data) {
      return res.status(500).json({ error: "Fel vid hämtning av kategorier." });
    } else {
      return res.status(200).json({ data });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Ett okänt fel uppstod. Försök igen senare." });
  }
};
