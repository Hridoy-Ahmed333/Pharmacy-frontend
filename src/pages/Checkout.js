import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { json, useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledLabel = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const StyledArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 5rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center; /* Optional: Center items vertically */
  gap: 10px; /* Optional: Adds space between items */
`;

const MedicineItem = styled.div`
  background-color: #d4edda; /* Light green */
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #155724; /* Dark green text */
  font-weight: bold;
  text-align: center;
`;

const TotalItems = styled.div`
  background-color: #fff3cd; /* Light orange */
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #856404; /* Dark orange text */
  font-weight: bold;
  text-align: center;
`;

const TotalCosts = styled.div`
  background-color: #ffdab9; /* Light orange */
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #856404; /* Dark orange text */
  font-weight: bold;
  text-align: center;
`;
const GreenText = styled.h2`
  color: green;
`;

const RedText = styled.h2`
  color: red;
`;

const Box = styled.div`
  width: 0.7rem;
  height: 0.7rem;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Tick = styled.span`
  font-size: 24px;
  color: green;
`;
const Text = styled.div`
  font-size: 1rem;
  font-weight: 700;
  justify-content: center;
  align-items: center;
`;

const BoxContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const MethodContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div``;
const Button = styled.button`
  height: 2.5rem;
  width: 8rem;
  font-size: 1rem;
  font-weight: 700;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, height 0.3s ease, width 0.3s ease,
    font-size 0.3s ease, font-width 0.3s ease;

  &:hover {
    background-color: #45a049;
    height: 3rem;
    width: 11rem;
    font-size: 1.2rem;
    font-weight: 800;
  }
`;

function Checkout() {
  const navigate = useNavigate();
  const [orderMed, setOrderMed] = useState(null);
  const [isTickVisible, setTickVisible] = useState(false);
  const [isTickVisible2, setTickVisible2] = useState(false);
  const [address, setAddress] = useState("");
  const { cart, setCart, setCartAmount } = useContext(CartContext);
  //console.log(cart.length > 0 ? cart[0].total : 0);
  const orders = JSON.parse(localStorage.getItem("order"));
  const user = JSON.parse(localStorage.getItem("user")).token;
  const medId = orders?.OrderItemDetails?.map((el) => {
    return { id: el.id, total: el.inTotal };
  });
  //console.log(medId);
  //console.log(user);
  const item = orders?.OrderItemDetails?.map((el, index) => {
    return { _id: el.id, inTotal: el.inTotal };
  });

  const updateUser = async () => {
    console.log("Requesting");
    try {
      const res = await fetch("http://localhost:8080/payment/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify({
          medicineId: medId,
          userToken: user,
        }),
      });
      const data = await res.json();
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateMedicine = async () => {
    console.log("updateMedicine");
    try {
      const res = await fetch("http://localhost:8080/payment/medicine", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify({
          medicine: medId,
        }),
      });
      const data = await res.json();
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const order = async () => {
    try {
      const res = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify({
          order: orders,
          user: user,
          address: address,
        }),
      });
      const data = await res.json();
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkoutCart = async () => {
    try {
      const res = await fetch("http://localhost:8080/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        mode: "cors",
        body: JSON.stringify({
          items: item,
          userToken: user,
        }),
      });
      const data = await res.json();
      if (data.message === "ok") {
        console.log("Everything is OKDOKI");
        window.location = data.url;
        await updateUser();
        await updateMedicine();
        await order();
        localStorage.removeItem("cart");
        localStorage.removeItem("cartAmount");
        localStorage.removeItem("order");
        setCartAmount(0);
        setCart({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function handeleOrder() {
    await updateUser();
    await updateMedicine();
    await order();
    localStorage.removeItem("cart");
    localStorage.removeItem("cartAmount");
    localStorage.removeItem("order");
    setCartAmount(0);
    setCart({});
    navigate("/success");
  }

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = JSON.parse(localStorage.getItem("order"));
      const orderIds = orders?.OrderItemDetails?.map((el) => el.id);
      try {
        const response = await fetch("http://localhost:8080/orders/getOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
          },
          body: JSON.stringify({ orderIds }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOrderMed(data);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };

    fetchOrders();
  }, [user]); // Depend on orderIds to refetch when it changes

  if (orders?.length === 0) {
    return <div>Loading...</div>;
  }

  const ordersName = orders?.OrderItemDetails?.map((el) => {
    return `${el?.name}  x${el.inTotal}`;
  });

  const joinedName = ordersName?.join(", ");
  const handleClick1 = () => {
    setTickVisible(!isTickVisible);
    if (isTickVisible2 === true) {
      setTickVisible2(false);
    }
  };
  const handleClick2 = () => {
    setTickVisible2(!isTickVisible2);
    if (isTickVisible === true) {
      setTickVisible(false);
    }
  };

  return (
    <div>
      <h1>Give Your Address</h1>
      <StyledForm>
        <StyledLabel htmlFor="address">Address</StyledLabel>
        <StyledArea
          id="address"
          name="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </StyledForm>
      <FlexContainer>
        <h2>Order Details</h2>
        <MedicineItem>Medicines: {joinedName}</MedicineItem>
        <TotalItems>Total Items: {orders?.totalItem}</TotalItems>
        <TotalCosts>Total Costs: {orders?.totalValue} Taka</TotalCosts>
        {address ? (
          <GreenText>Choose Payment Method</GreenText>
        ) : (
          <RedText>To Order First Give Receiver's Address</RedText>
        )}
        {address ? (
          <MethodContainer>
            <BoxContainer>
              <Box onClick={handleClick1}>
                <Tick>{isTickVisible ? "✔" : ""}</Tick>
              </Box>
              <Text>Cash on Delivery</Text>
            </BoxContainer>
            <BoxContainer>
              <Box onClick={handleClick2}>
                <Tick>{isTickVisible2 ? "✔" : ""}</Tick>
              </Box>
              <Text>Pay With Your Card</Text>
            </BoxContainer>
          </MethodContainer>
        ) : (
          ""
        )}
      </FlexContainer>
      {address ? (
        <ButtonContainer>
          {isTickVisible2 && <Button onClick={checkoutCart}>Checkout</Button>}
          {isTickVisible && <Button onClick={handeleOrder}>Order</Button>}
        </ButtonContainer>
      ) : (
        ""
      )}
    </div>
  );
}

export default Checkout;
