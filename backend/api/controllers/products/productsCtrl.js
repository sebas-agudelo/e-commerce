import { supabase_config } from "../../supabase_config/supabase_conlig.js";
const supabase = supabase_config();

export const filtredProducts = async (price = null, categoryID = null, page, pageSize) => {
  let query = supabase.from("products").select("id, title, price, img");
  if (categoryID !== null) {
    query = query.eq("category_id", categoryID);
  }
  const { data, error } = await query;
  if (error || !data) {
    return {
      products: [],
    };
  }
  let filtredProducts = data;
  if (price !== null) {
    const minPrice = parseInt(price);
    const maxPrice = minPrice + 100;
    filtredProducts = filtredProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  }

  const count = filtredProducts.length;
  const totalPages = Math.ceil(count / pageSize);

  const offset = (page - 1) * pageSize;
  const paginatedProducts = filtredProducts.slice(offset, offset + pageSize)
  
  return {
    currenPage: page,
    totalPages: totalPages,
    count: count,
    products: paginatedProducts,
    error: error,
  };
};

export const pagination = async (page, pageSize, offset, categoryID) => {
  let query = supabase
    .from("products")
    .select("id, title, price, img", { count: "exact" })
    .range(offset, offset + pageSize - 1);
  if (categoryID) {
    query = query.eq("category_id", categoryID);
  }
  const { data, count, error } = await query;
  if (error || !data) {
    return {
      products: [],
    };
  }
  let products = data;
  const totalPages = Math.ceil(count / pageSize);
  return {
    currenPage: page,
    totalPages: totalPages,
    products: products,
    count: count,
    error: error,
  };
};

//HÄMTAR ALLA PRODUKTER
export const getProducts = async (req, res) => {
  const { price, categoryID, page = 1, pageSize = 6 } = req.query;
  const offset = (page - 1) * parseInt(pageSize);

  try {
    let products;

    if (price || categoryID) {
      products = await filtredProducts(price, categoryID, +page, +pageSize);
    } else {
      products = await pagination(page, pageSize, offset);
    }
    return res.status(200).json(products);
  } catch (error) {
    return res
    .status(500)
    .json({ error: "Ett okänt fel uppstod. Försök igen senare."});
  }
};

//HÄMTAR PRODUKTER BASERAD PÅ KATEGORY
export const productByCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { price, categoryID, page = 1, pageSize = 6 } = req.query;
  const offset = (page - 1) * parseInt(pageSize);
  try {
    let products;
    if(categoryId === undefined || categoryId === null || typeof categoryId === "number"){
      return res.status(404).json({error: "Kategorin hittades inte."})
    }
    if (price || categoryID) {
      products = await filtredProducts(price, categoryID, +page, +pageSize);
    } else {
      products = await pagination(page, pageSize, offset, categoryId);
    }
    return res.status(200).json(products);
  } catch (error) {
    return res
    .status(500)
    .json({ error: "Ett okänt fel uppstod. Försök igen senare."});
  }
};

//SÖK FUNKTIONALITET
export const searchProduct = async (req, res) => {
  const { query, price, categoryID } = req.query;
  try {
    let products;
    if (!query) {
      return res.status(400).json({ error: "Sökterm saknas." });
    }
    if (price || categoryID) {      
      products = await filtredProducts(price, categoryID);
    } else {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .ilike("title", `%${query}%`);
      products = data;
    }    
    return res.status(200).json({products});
  } catch (error) {
    return res
    .status(500)
    .json({ error: "Ett okänt fel uppstod. Försök igen senare."});
  }
};

//HÄMTAR EN PRODUKT BASERAD PÅ KATEGORI ID
export const getProductByID = async (req, res) => {
  const { id } = req.params;
  if (!id || typeof id === "number") {
    return res
      .status(400)
      .json({ error: `Produkten är inte giltig. Försök igen` });
  }
  try {
    let { data: product, error: productError } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (productError) {
      return res
      .status(404)
      .json({error: "Produkten som du försöker se är ogiltig eller har tagits bort."});
    }
    return res.status(200).json({ product });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Ett okänt fel uppstod. Försök igen senare."});
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
    .json({ error: "Ett okänt fel uppstod. Försök igen senare."});
  }
};
