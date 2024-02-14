import { useContext } from "react";
import styled from "styled-components";
import SingleProductContext from "../context/SingleProductContext";
import Ratings from "./Ratings";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const PictureContainer = styled.div`
  height: 30rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  width: 24rem;
  margin: 2rem auto;
  border-radius: 1rem;
  display: flex; // Use flexbox to center the image
  justify-content: center; // Center horizontally
  align-items: center; // Center vertically
  overflow: hidden; // Hide any part of the image that exceeds the container bounds
`;

const ProductImage = styled.img`
  object-fit: cover; // Ensure the image covers the entire area of the container
  width: 85%; // Set the width to  85% of the container
  height: 85%; // Set the height to  85% of the container
  max-width: 100%; // Prevent the image from overflowing the container
  max-height: 100%; // Prevent the image from overflowing the container
`;

const RatingContainer = styled.div`
  margin: 0 auto;
  margin-bottom: 2rem;
`;

function ProductCol2() {
  const { product } = useContext(SingleProductContext);
  const productImage = product?.image;
  return (
    <Container>
      <PictureContainer>
        {productImage && (
          <ProductImage
            src={`http://localhost:8080/images/${productImage}`}
            alt="Product"
          />
        )}
      </PictureContainer>
      <RatingContainer>
        <Ratings />
      </RatingContainer>
    </Container>
  );
}

export default ProductCol2;
