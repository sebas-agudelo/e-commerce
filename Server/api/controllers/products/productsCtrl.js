import { supabase_config } from "../../supabase_config/supabase_conlig.js";
const supabase = supabase_config();

//Hämtar alla produkter från databasen
export const getProducts = async (req, res) => {
  try {
    let { data: products, error: productsError } = await supabase
      .from("products")
      .select("*");

      if (productsError) {
        return res
        .status(500)
        .json({ error: "Ett fel uppstod och produkterna är inte tillgängliga just nu."});
      } 

    if (!products) {
      return res.status(200).json([]);
    }

    return res.status(200).json({products});

  } catch (error) {
    return res
      .status(500)
      .json({ error: "Ett okänt fel uppstod. Försök igen senare." });
  }
};

//Hämtar en produkt baserad på ID
export const getProductByID = async (req, res) => {
  const { id } = req.params;
    
  if (!id) {
    return res
      .status(400)
      .json({ error: `Det saknas en giltig produkt. Försök igen.` });
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
        .json({ error: "Produkten som du försöker se är ogiltig eller har tagits bort." });
    }

    return res
    .status(200)
    .json({product});
    
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Ett okänt fel uppstod. Försök igen senare." });
  }
};

//Tar bort en produkt från databasen baserad ID
export const deleteProductByID = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ error: `Det saknas en giltig produkt. Försök igen.` });
  }

  try {
    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Supabase delete error:", deleteError);
      return res.status(400).json({
        error: "Produkten kunde inte tas bort. Försök igen.",
      });
    }

    return res.status(200).json({
      success: `Produkten med ID: ${id} har tagits bort från databasen`,
    });
  } catch (error) {
    console.error("(Delete product by ID) Server error:", error);
    return res
      .status(500)
      .json({ error: "Ett okänt fel uppstod. Försök senare igen" });
  }
};

export const getThreeProducts = async (req, res) => {
  try {
    let { data: products, error: productsError } = await supabase
      .from("products")
      .select("*")
      .limit(4);

      if (productsError) {
        return res
        .status(500)
        .json({ error: "Ett fel uppstod och produkterna är inte tillgängliga just nu."});
      } 

    if (!products) {
      return res.status(200).json([]);
    }

    return res.status(200).json({products});

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
