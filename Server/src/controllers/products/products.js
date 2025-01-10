import { supabase_config } from "../../supabase_config/supabase_conlig.js";
const supabase = supabase_config();

//Hämtar alla produkter från databasen
export const getProducts = async (req, res) => {
  try {
    let { data: products, error: productsError } = await supabase
      .from("products")
      .select("*");

    if (productsError) {
      console.log(
        "Supabase error '400' Produkt listan kunde inte hämtas.",
        productsError
      );
      return res
        .status(400)
        .json({ error: "Något gick fel. Produkt listan kunde inte hämtas." });
    }

    if (!products) {
      return res.status(200).json([]);
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error("(get products) Server error:", error);
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
      .json({ error: `Ett giltigt produkt-ID måste tillhandahållas.` });
  }

  try {
    let { data: product, error: productError } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (productError) {
      console.log(
        "Supabase error '400' Produkten kunde inte hittas.",
        productError
      );
      return res
        .status(400)
        .json({ error: "Produkten kunde inte hittas. Kontrollera ID." });
    }

    return res.status(200).json({
      // success: `Produkten med ID: ${id} hittades`, product,
      product
    });
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
      .json({ error: `Ett giltigt produkt-ID måste tillhandahållas.` });
  }

  try {
    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Supabase delete error:", deleteError);
      return res.status(400).json({
        error: "Produkten kunde inte tas bort. Kontrollera att ID är korrekt.",
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
