import { supabase_config } from "../../supabase_config/supabase_conlig.js";
import validator from 'validator';
const supabase = supabase_config();

export const updateCartQty = async (req, res) => {
  const { product_id, quantity } = req.body;
  const userID = req.user.id;

  if (!userID) {
    return res
      .status(400)
      .json({ error: "Ogiltig användare. Försök att logga in." });
  }
  
  if (quantity === undefined || quantity === null || !product_id) {
    return res
    .status(400)
    .json({ error: "Ogiltig produkt eller kvantitet." });
  }
  
  try {
    let { data: shopping_cart, error: cartError } = await supabase
      .from("shopping_cart")
      .select("quantity, unit_price, total_price")
      .eq("product_id", product_id)
      .eq("user_id", userID)
      .single();

    if (cartError || !shopping_cart) {
      return res
      .status(404)
      .json({ error: "Produkten hittades inte i din varukorg." });
    }

    const totalPrice = quantity * parseFloat(shopping_cart.unit_price);

    if (quantity <= 0) {
      const { error: deleteError } = await supabase
        .from("shopping_cart")
        .delete()
        .eq("product_id", product_id)
        .eq("user_id", userID);

      if (deleteError) {
        return res
        .status(500)
        .json({ error: "Det gick inte att ta bort produkten från din varukorg. Vänligen Försök igen" });
      }

      return res
      .status(200)
      .json({ success: "Produkten har framgångsrikt tagits bort från din varukorg." });
    }

    const { data: updateCartItem, error: updateError } = await supabase
    .from("shopping_cart")
    .update({ quantity, total_price: totalPrice })
    .eq("user_id", userID)
    .eq("product_id", product_id)
    .select();

  if (updateError) {
    return res
    .status(500)
    .json({ error: "Det gick inte att uppdatera produktens kvantitet. Vänligen försök igen" });
  }

  if (!updateCartItem || updateCartItem.length === 0) {
    return res
    .status(404)
    .json({ error: "Den angivna produkten finns inte i din varukorg eller kunde inte uppdateras." });
  }
  

    return res.status(200).json({
      success: "Varukorgen har uppdaterats",
      data: updateCartItem,
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Ett oväntat fel inträffade. Försök senare igen." });
  }
};
