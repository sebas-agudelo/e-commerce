import { supabase_config } from "../../supabase_config/supabase_conlig.js";
import validator from "validator";

const supabase = supabase_config();

//Hämtar inloggade användarens order för att visa i Mina beställningar
export const showCostumersOrders = async (req, res) => {
  const userId = req?.user?.id || null;

  if (!userId) {
    return res
      .status(400)
      .json({ error: "Ingen användare hittades. Försök att logga in" });
  }

  try {
   const { data: orders, error } = await supabase
  .from("orders")
  .select(`
    id,
    total_amount,
    created_at,
    payment_status,
    email,
    items_order (
      order_id,
      product_id,
      quantity,
      unit_price,
      product_title
    )
  `)
  .eq("user_id", userId);

  if(error){
    return res
    .status(500)
    .json({error: "Ett oväntat fel inträffade."})
  };

  if(!orders || orders.length === 0){
    return res
    .status(404)
    .json({error: "Inga beställningar hittades"})
  }

  return res.status(200).json(orders);
  } catch (error) {
    console.error({ error: "Ett oväntat fel inträffade. Försök senare igen." });
  }
};

//Bearbeartar inloggade användarens order
export const customerAuthOrders = async (req, res) => {
  const { ItemsToSend, email } = req.body;

  const userId = req?.user?.id || null;

  if (!userId) {
    return res
      .status(400)
      .json({ error: "Ingen användare hittades. Försök att logga in" });
  }

  try {
    const { data: shopping_cart, error } = await supabase
      .from("shopping_cart")
      .select("id, user_id, total_price")
      .eq("user_id", userId);

      if(error){
        return res
        .status(500)
        .json({error: "Ett oväntat fel inträffade."})
      }

    if (!shopping_cart || shopping_cart.length === 0) {
      return res
        .status(404)
        .json({ error: "Inga produkter hittades i varukorgen" });
    }

    let totalAmount = 0;
    shopping_cart.forEach((item) => {
      totalAmount += item.total_price;
    });

    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: userId,
          email: email,
          total_amount: totalAmount,
          payment_status: "paid",
        },
      ])
      .select();

    if (ordersError) {
      return res
        .status(500)
        .json({ error: "Din beställning kunde inte skapas. Försök igen" });
    }

    const orderID = orders[0].id;

    const theItems = ItemsToSend.map((item) => ({
      order_id: orderID,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_amount: item.total_price,
      product_title: item.product_title,
    }));

    const { data: items_order, error: items_orders_Error } = await supabase
      .from("items_order")
      .insert(theItems)
      .select();

    if (items_orders_Error) {
      return res.status(500).json({ error: "" });
    }

    const { data: deleteCartm, error: errorDeleteCart } = await supabase
      .from("shopping_cart")
      .delete()
      .eq("user_id", userId);

    if (errorDeleteCart) {
      return res.status(500).json({ error: "Varukorgen kunde inte rensas." });
    }

    return res
      .status(201)
      .json({ success: "Tack för din betalning, din order är skapad" });
  } catch (error) {
    console.error(error);
    // console.error(error);
    return res
      .status(500)
      .json({ error: "Ett oväntat fel inträffade. Försök senare igen." });
  }
};

//Bearbetar utloggade användarens order
export const customerOrders = async (req, res) => {
  const { ItemsToSend, email } = req.body;

  const userId = req?.user?.id || null;

  console.log(ItemsToSend);

  try {
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Inte godkänt e-postformat" });
    }

    let totalAmount = 0;
    ItemsToSend.forEach((item) => {
      totalAmount += item.total_price;
    });

    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: userId,
          email: email,
          total_amount: totalAmount,
          payment_status: "paid",
        },
      ])
      .select();

    if (ordersError) {
      return res
        .status(500)
        .json({ error: "Din beställning kunde inte skapas. Försök igen" });
    }

    const orderID = orders[0].id;

    const theItems = ItemsToSend.map((item) => ({
      order_id: orderID,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_amount: item.total_price,
      product_title: item.product_title,
    }));

    const { data: items_order, error: items_orders_Error } = await supabase
      .from("items_order")
      .insert(theItems)
      .select();

    if (items_orders_Error) {
      return res.status(500).json({ error: "", items_orders_Error });
    }

    return res
      .status(201)
      .json({ success: "Tack för din betalning, din order är skapad" });
  } catch (error) {
    // console.error(error);
    return res
      .status(500)
      .json({ error: "Ett oväntat fel inträffade. Försök senare igen." });
  }
};
