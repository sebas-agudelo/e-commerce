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
        .json([]);
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

