import { supabase_config } from "../../supabase_config/supabase_conlig.js";
const supabase = supabase_config();

export const addToCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  try {
    //Hämtar id, title, price och img från produkt tabellen som ska läggas till i varukorgen
    let { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, title, price, img")
      .eq("id", product_id)
      .single();

    if (!products || productsError) {
      console.log(`Ingen produkt med product_id ${product_id} hittades`);

      return res.status(400).json({ error: "Ingen produkt hittades" });
    }

    const totalPrice = products.price * quantity;

    if (totalPrice) {
      console.log(`Total priset är: ${totalPrice}`);
    }

    //Jag kollar om produkten redan finns i varukorgen om det gör det så uppdaterars varukorgen.
    let { data: existingItem, error: existingItemError } = await supabase
      .from("shopping_cart")
      .select("id, quantity, total_price")
      .eq("product_id", product_id)
      .single();

    if (existingItem) {
      if (!existingItem || existingItemError) {
        console.log(
          `Något gick fel när varukorgen skulle uppdatera produkten existerar inte: ${product_id}`
        );

        return res.status(400).json({
          error:
            "Något gick fel när varukorgen skulle uppdatera produkten existerar inte",
        });
      }

      let updateQty = existingItem.quantity + quantity;
      let updateTotalPrice = updateQty * products.price;

      const { data: updateCartItem, error: updateError } = await supabase
        .from("shopping_cart")
        .update({
          quantity: updateQty,
          total_price: updateTotalPrice,
        })
        .eq("id", existingItem.id)
        .select();

      if (!updateCartItem || updateError) {
        console.log(
          `Något gick fel produkten i vurokorgen med id: ${product_id} kunde inte uppdateras`
        );

        return res.status(400).json({
          error: "Något gick fel produkten i vurokorgen kunde inte uppdateras",
          updateError,
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
            product_id,
            user_id: "f15827d6-0625-46e5-bb2a-87e61df77f56",
            product_title: products.title,
            unit_price: products.price,
            total_price: totalPrice,
            quantity,
            product_img: products.img,
          },
        ])
        .select();

      if (!insertProduct || insertError) {
        console.log(
          `Något gick fel när man produkten skulle läggas till i varukorgen`
        );
        return res.status(400).json({
          error: "Något fick fel när produkten skulle läggas till i varukorgen",
          insertError,
        });
      }

      return res
        .status(200)
        .json({ succes: "Produkten är tilllagt i varukorgen" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const showCart = async (req, res) => {
    try{
        
let { data: shopping_cart, error: cartError } = await supabase
.from('shopping_cart')
.select('*')
// .eq('user_id', )
        
if(!shopping_cart || cartError){
    return res.status(400).json({error: "Varukorgen kunde inte hämtas"})
}

return res
.status(200)
.json({ success: "Varukorgen hämtades", shopping_cart});

    }catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error 500" });
      }
};

export const deleteProductFromCart = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;
  try {
    const { error: deteleError } = await supabase
      .from("shopping_cart")
      .delete()
      .eq("user_id", user_id)
      .eq("id", id);

    if (deteleError) {
      console.log(
        `Något gick fel när man produkten skulle tas bort i varukorgen`
      );
      return res.status(400).json({
        error: "Något gick fel när man produkten skulle tas bort i varukorgen",
        deteleError,
      });
    }

    return res
      .status(200)
      .json({ success: "Produkter togs bort från varukorgen" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCart = async (req, res) => {
  const { user_id } = req.body;
  try {
    const { error: deleteError } = await supabase
      .from("shopping_cart")
      .delete()
      .eq("user_id", "f15827d6-0625-46e5-bb2a-87e61df77f56");

    if (deleteError) {
      console.log(`Varukotgen gick inte att rensa`,deleteError );
      return res.status(400).json({ error: "Varukotgen gick inte att rensa" });
    }

    
    return res.status(200).json({ success: "Varukorgen rensades" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error 500" });
  }
};
