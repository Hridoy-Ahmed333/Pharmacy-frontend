import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { json, useNavigate } from "react-router-dom";
function Checkout() {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  //console.log(cart.length > 0 ? cart[0].total : 0);
  const orders = JSON.parse(localStorage.getItem("order"));
  const user = JSON.parse(localStorage.getItem("user")).token;

  const item = orders.OrderItemDetails.map((el, index) => {
    return { _id: el.id, inTotal: el.inTotal };
  });

  const checkoutCart = async () => {
    try {
      const res = await fetch("http://localhost:8080/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          items: item,
          userToken: user,
        }),
      });
      const data = await res.json();
      window.location = data.url;
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(cart[0].total);
  return (
    <div>
      <button onClick={checkoutCart}>Checkout</button>
    </div>
  );
}

export default Checkout;
