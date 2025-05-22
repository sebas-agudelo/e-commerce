import React, { useEffect, useState } from 'react'

export default function MyOrders() {
  const [orders, setOrders] = useState();
  const [items, setItems] = useState();

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`http://localhost:3030/api/order/myorders`, {
        method: "GET",
        credentials: "include"
      });

      const data = await response.json();
      
      if(response.ok){        
        setOrders(data)
        console.log(data);
      }
    };
  
    fetchOrders();
  }, [])
  
  return (
    <div style={{paddingTop: "80px"}}>
      {orders && orders.length > 0 ? orders.map((order) => (
        <div key={order.id}>
          {order.items_order && order.items_order.map((item) => (
            <div key={item.id}>
              <p><span>Produkt</span>: {item.product_title}</p>
              <p><span>Antal</span>: {item.quantity}</p>
              <p><span>Pris</span>: {item.unit_price}</p>

            </div>
          ))}
        <p><span>Totalsumma</span>: {order.total_amount}</p>
        <p><span>Betalningstatus</span>: {order.payment_status}</p>
        <p><span>Ordernummer</span>: {order.id}</p>
        <p><span>Skapad</span>: {order.created_at}</p>
        </div>
      
      ))
      : 
      <div>
        <h3>
          Inga köp att visa just nu
        </h3>
        <p>När du har köpt något online hittar du det här.</p>
      </div>
    }
    </div>
  )
}
