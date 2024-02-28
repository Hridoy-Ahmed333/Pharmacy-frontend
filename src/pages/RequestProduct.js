import { useEffect, useState } from "react";
import { getSupplies } from "../api/supplyApi";
import styled from "styled-components";
import SupplyButtonsComponent from "../Components/SupplyButtonsComponent";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  width: 100%;
`;

const StyledDiv = styled.div`
  height: 5rem;
  width: 70%;
  display: flex;
  justify-content: space-between;
  background-color: ${(props) =>
    props.index % 2 === 0 ? "#F5F5F5" : "#FFFFFF"};
  &:hover {
    background-color: ${(props) =>
      props.index % 2 === 0 ? "#E5E5E5" : " #f0f0f0;"};
  }
`;

const PicDiv = styled.div`
  flex: 0.5;
  width: 100%; // Fixed width
  height: 100%; // Fixed height
  border: 1px solid #000; // Single border around each PicDiv
  display: flex; // Use flex to center content
  justify-content: center; // Center content horizontally
  align-items: center; // Center content vertically
  overflow: hidden; // Hide any content that exceeds the bounds
`;

// Create a styled div for each part
const ButtonDiv = styled.div`
  flex: 1;
  width: 100%; // Fixed width
  height: 100%; // Fixed height
  border: 1px solid #000; // Single border around each PicDiv
  display: flex; // Use flex to center content
  justify-content: center; // Center content horizontally
  align-items: center; // Center content vertically
  overflow: hidden; // Hide any content that exceeds the bounds
`;

const AmountDiv = styled.div`
  flex: 0.5;
  width: 100%; // Fixed width
  height: 100%; // Fixed height
  border: 1px solid #000; // Single border around each PicDiv
  display: flex; // Use flex to center content
  justify-content: center; // Center content horizontally
  align-items: center; // Center content vertically
  overflow: hidden; // Hide any content that exceeds the bounds
`;

const PriceDiv = styled.div`
  flex: 0.5;
  width: 100%; // Fixed width
  height: 100%; // Fixed height
  border: 1px solid #000; // Single border around each PicDiv
  display: flex; // Use flex to center content
  justify-content: center; // Center content horizontally
  align-items: center; // Center content vertically
  overflow: hidden; // Hide any content that exceeds the bounds
`;

const NameDiv = styled.div`
  flex: 0.5;
  width: 100%; // Fixed width
  height: 100%; // Fixed height
  border: 1px solid #000; // Single border around each PicDiv
  display: flex; // Use flex to center content
  justify-content: center; // Center content horizontally
  align-items: center; // Center content vertically
  overflow: hidden; // Hide any content that exceeds the bounds
`;

const DateDiv = styled.div`
  flex: 0.7;
  width: 100%; // Fixed width
  height: 100%; // Fixed height
  border: 1px solid #000; // Single border around each PicDiv
  display: flex; // Use flex to center content
  justify-content: center; // Center content horizontally
  align-items: center; // Center content vertically
  overflow: hidden; // Hide any content that exceeds the bounds
`;

const ProductImage = styled.img`
  object-fit: cover; // Ensure the image covers the entire area of the container
  width: 85%; // Set the width to  85% of the container
  height: 85%; // Set the height to  85% of the container
  max-width: 100%; // Prevent the image from overflowing the container
  max-height: 100%; // Prevent the image from overflowing the container
`;

function RequestProduct() {
  const [supplies, setSupplies] = useState(null);
  function formatISODate(isoDateString) {
    // Create a Date object from the ISO string
    const date = new Date(isoDateString);

    // Extract the date and time components
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-based in JavaScript
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Format the date and time
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return formattedDate;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSupplies();
        setSupplies(response);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, []);
  console.log(supplies);

  return (
    <Container>
      <StyledDiv>
        <PicDiv>Image</PicDiv>
        <NameDiv>Name</NameDiv>
        <AmountDiv>Amount</AmountDiv>
        <PriceDiv>Price</PriceDiv>
        <DateDiv>Date</DateDiv>
        <ButtonDiv>Buttons</ButtonDiv>
      </StyledDiv>
      {supplies?.map((el, index) => {
        return (
          <StyledDiv key={index} index={index}>
            <PicDiv>
              <ProductImage
                src={`http://localhost:8080/images/${el?.product?.image}`}
                alt="Product"
              />
            </PicDiv>
            <NameDiv>{el?.product?.name}</NameDiv>
            <AmountDiv>{el?.el?.amount}</AmountDiv>
            <PriceDiv>{el?.el?.totalCost}</PriceDiv>
            <DateDiv>{formatISODate(el?.el?.time)}</DateDiv>
            <ButtonDiv>
              <SupplyButtonsComponent />
            </ButtonDiv>
          </StyledDiv>
        );
      })}
    </Container>
  );
}

export default RequestProduct;
