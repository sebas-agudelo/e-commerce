import { supabase_config } from "../../supabase_config/supabase_conlig.js";
const supabase = supabase_config();

export const addToCart = async (req, res) => {
  const { product_id, quantity } = req.body;

  const userID = req.user.id;

  if (!userID) {
    return res
      .status(400)
      .json({ error: "Ogiltig användare. Försök att logga in." });
  }

  // if (quantity === undefined || quantity === null || !product_id) {
  //   return res
  //   .status(400)
  //   .json({ error: "Ogiltig produkt eller kvantitet." });
  // }
  
  try {
    //Hämtar id, title, price och img från produkt tabellen som ska läggas till i varukorgen
    let { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, title, price, img")
      .eq("id", product_id)
      .single();

    if (!products || productsError) {
      console.log(productsError);
      
      return res
      .status(404)
      .json({ error: "Produkten finns inte." });
    }

    const totalPrice = products.price * quantity;

    //Jag kollar om produkten redan finns i varukorgen om det gör det så uppdaterars varukorgen.
    let { data: existingItem, error: existingItemError } = await supabase
      .from("shopping_cart")
      .select("id, quantity, total_price")
      .eq("user_id", userID)
      .eq("product_id", product_id)
      .single();

    if (existingItem) {

      if (!existingItem || existingItemError) {

        return res
        .status(500)
        .json({ error: "Varukorgen kunde inte uppdateras. Försök igen senare."});
      }

      let updateQty = existingItem.quantity + quantity;
      let updateTotalPrice = updateQty * products.price;

      const { data: updateCartItem, error: updateError } = await supabase
        .from("shopping_cart")
        .update({
          quantity: updateQty,
          total_price: updateTotalPrice,
        })
        .eq("user_id", userID)
        .eq("id", existingItem.id)
        .select();

      if (!updateCartItem || updateError) {
  
        return res
        .status(500)
        .json({error: "Varukorgen kunde inte uppdateras. Försök igen senare."
        });
      }

        return res
        .status(200)
        .json({ success: "Produkten i varukorgen uppdaterasdes" });
    } else {

      //Här lägger jag till produkten i varukorgen om den inte finns.
      const { data: insertProduct, error: insertError } = await supabase
        .from("shopping_cart")
        .insert([
          {
            user_id: userID,
            product_id,
            product_title: products.title,
            unit_price: products.price,
            total_price: totalPrice,
            quantity,
            product_img: products.img,
          },
        ])
        .select();

      if (!insertProduct || insertError) {
        return res
        .status(500)
        .json({ error: "Produkten kunde inte läggas till i varukorgen. Försök igen senare."});
      }

      return res
        .status(201)
        .json({ success: "Produkten är tilllagt i varukorgen" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Ett oväntat fel inträffade. Försök senare igen." });
  }
};
