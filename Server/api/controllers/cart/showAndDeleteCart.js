import { supabase_config } from "../../supabase_config/supabase_conlig.js";
const supabase = supabase_config();

//Hämtar hela varukorgen
export const showCart = async (req, res) => {
  const userID = req.user.id;

  if(!userID){
    return res
    .status(400)
    .json({ error: "Ogiltig användare. Försök att logga in." });
  }

  try {
    let { data: shopping_cart, error: cartError } = await supabase
      .from("shopping_cart")
      .select("product_id, quantity, unit_price, total_price, product_title, product_img")
      .eq("user_id", userID);

      if(cartError){
        return res
        .status(500)
        .json({ error: "Ett fel inträffade vid hämtning av varukorgen." });
      }

      if(!shopping_cart){
        return res
        .status(200)
        .json({ error: "Varukorgen är tom." });
      }

      let totalPrice = 0;

    shopping_cart.forEach((total) => {
      totalPrice += +total.total_price;
    });

    return res
      .status(200)
      .json({ success: "Varukorgen hämtades", shopping_cart, totalPrice });

  } catch (error) {
    console.error("Unexpected error:", error);
    return res
    .status(500)
    .json({ error: "Ett oväntat fel inträffade. Försök senare igen" });
  }
};

//Rensar hela varukorgen
export const deleteCart = async (req, res) => {
  const userID = req.user.id;

  if (!userID) {
    return res
    .status(400)
    .json({ error: "Ogiltig användare. Försök att logga in." });
  }

  try {
    const { error: deleteError } = await supabase
      .from("shopping_cart")
      .delete()
      .eq("user_id", userID);

    if (deleteError) {
      return res
      .status(400)
      .json({ error: "Varukorgen gick inte att rensa" });
    }

    return res
    .status(200)
    .json({ success: "Varukorgen rensades" });
    
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ error: "Ett oväntat fel inträffade. Försök senare igen" });
  }
};
