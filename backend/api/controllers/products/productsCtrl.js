import { supabase_config } from "../../supabase_config/supabase_conlig.js";
const supabase = supabase_config();

export const filtredProductsByPrice = async (
  price = null,
  categoryID = null
) => {
  let query = supabase.from("products").select("id, title, price, img");

  if (categoryID !== null) {
    query = query.eq("category_id", categoryID);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  let filtredProducts = data;

  if (price !== null) {
    const minPrice = parseInt(price);
    const maxPrice = minPrice + 100;
    filtredProducts = filtredProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  }

  return filtredProducts
};

export const getProducts = async (req, res) => {
  const { price, categoryID } = req.query;
  try {
    let products;

    if (price || categoryID) {
      products = await filtredProductsByPrice(price, categoryID);
    } 
    else {
      const { data, error } = await supabase
        .from("products")
        .select("id, title, price, img");

      if (error) {
        throw error;
      }

      products = data;
    }

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({
      error: "Ett oväntat fel har inträffat",
      details: error.message,
    });
  }
};

export const productByCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { price, categoryID } = req.query;
  try {
    let products;

    if (price || categoryID) {
      products = await filtredProductsByPrice(price, categoryID);
    } else {
      let { data, error } = await supabase
        .from("products")
        .select("id, title, price, img")
        .eq("category_id", categoryId);

      if (error) {
        return res
          .status(404)
          .json(`Produkterna till kategorin kunde inte hämtas`, error);
      }

      products = data;
    }

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      error: "Ett oväntat fel har inträffat",
      details: error.message,
    });
  }
};

export const searchProduct = async (req, res) => {
  const { query, price, categoryID } = req.query;
  try {
    let products;

    if (!query) {
      return res.status(400).json({ error: "Sökterm saknas." });
    }

    if (price || categoryID) {
      products = await filtredProductsByPrice(price, categoryID);
    } else {
    }

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .ilike("title", `%${query}%`);

    if (error) {
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
};

//Hämtar en produkt baserad på ID
export const getProductByID = async (req, res) => {
  const { id } = req.params;

  if (!id) {
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
      return res.status(404).json({
        error: "Produkten som du försöker se är ogiltig eller har tagits bort.",
      });
    }

    return res.status(200).json({ product });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Ett okänt fel uppstod. Försök igen senare." });
  }
};

export const categories = async (req, res) => {
  try {
    let { data, error } = await supabase.from("categories").select("*");

    if (error) {
      return res.status(400).json({ error: "Error fetching pizza" });
    } else {
      return res.status(200).json({ data });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error 500" });
  }
};
