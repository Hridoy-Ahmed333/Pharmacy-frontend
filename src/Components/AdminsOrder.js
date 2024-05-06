import { useEffect, useState } from "react";
import styled from "styled-components";
import FetchCustomerNameForAdminOrder from "./FetchCustomerNameForAdminOrder";
import { updateOneOrder } from "../api/orderApi";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  width: 100%;
  margin-top: 3rem;
`;

const ProductImage = styled.img`
  object-fit: cover;
  width: 85%;
  height: 85%;
  max-width: 100%;
  max-height: 100%;
`;

const StyledDiv = styled.div`
  display: flex;
  height: 8rem;
  width: 70%;
  justify-content: space-between;
  width: 100%;
  border-bottom: 2px solid black;
  border-top: 2px solid black;
`;

const NameDiv = styled.div`
  display: flex;
  font-weight: 700;
  justify-content: start;
  align-items: center;
  margin: 0 auto;
  overflow: hidden;
`;
const PicDiv = styled.div`
  display: flex;
  width: 20rem;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

function AdminsOrder({ order }) {
  return (
    <Container>
      {order
        ?.slice()
        .reverse()
        .map((el, index) => (
          <StyledDiv key={el?._id} data-index={index}>
            <Item el={el} />
          </StyledDiv>
        ))}
    </Container>
  );
}

function Item({ el }) {
  const [stat, setStat] = useState(el?.status);
  const property = Name(el?.property);
  const buyer = FetchCustomerNameForAdminOrder(el?.userId);
  const address = el?.address;
  const date = Date(el?.date);
  async function handleClick(id) {
    await updateOneOrder(id);

    setStat((stat) => !stat);
  }
  return (
    <>
      <PicDiv>
        <ProductImage
          src={`http://localhost:8080/images/${el?.image}`}
          alt={el?.name}
        />
      </PicDiv>
      <NameDiv>{`${property} in ${address} was brought by ${buyer} at ${date}`}</NameDiv>
    </>
  );
}

function Name(property) {
  console.log(property);
  const prop = property?.map((el) => {
    return `${el?.name}`;
  });

  return prop;
}

function Date(dateString) {
  const [ampm, setAmpm] = useState("am");
  const [hours, setHour] = useState("");
  const [date, setDate] = useState("");
  const [min, setMin] = useState("");

  useEffect(() => {
    const indexOfT = dateString.indexOf("T");
    const result = dateString.substring(0, indexOfT); // Date
    setDate(result);
    const time = dateString.substring(indexOfT + 1);
    const indexOfDot = time.indexOf(".");
    const result2 = time.substring(0, indexOfDot); // The whole hour, min and sec
    const lastHourIndex = result2.indexOf(":");
    const result3 = result2.substring(0, lastHourIndex); // Hour in String
    const result4 = result2.substring(lastHourIndex + 1);
    setMin(result4);
    let hour = Number(result3);
    // Adjust for Bangladesh time (UTC+6)
    hour += 6;
    if (hour >= 24) {
      hour -= 24; // Adjust for overflow
    }
    if (hour >= 12) {
      setAmpm("pm");
      setHour(String(hour % 12 || 12)); // Correctly handle 12 PM
    } else {
      setHour(String(hour));
    }
  }, [dateString]);
  const orderDate = ` ${date} `;
  const orderTime = ` ${hours}:${min} ${ampm}`;

  return `${orderDate} at ${orderTime}`;
}

export default AdminsOrder;
