import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center; /* This centers the children vertically */
  justify-content: center; /* This centers the children horizontally */
  gap: 1rem;
`;
const Span = styled.span`
  text-decoration: line-through;
  margin-right: 1rem;
  font-size: 2rem;
  font-weight: 700;
  color: red;
`;
const Span2 = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: green;
`;
const Discount = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: red;
  background-color: gold;
  border-radius: 50%;
  padding: 1rem;
`;
const Money = styled.span`
  font-size: 2rem;
  font-weight: 800;
`;

function PriceComp({ product }) {
  return product?.discountPercentage > 0 ? (
    <DiscountPrice product={product} />
  ) : (
    <NormalPrice product={product} />
  );
}

function DiscountPrice({ product }) {
  const price = (
    product?.price -
    (product?.price / 100) * product?.discountPercentage
  ).toFixed(2);
  return (
    <Container>
      <Discount>{product?.discountPercentage}% OFF</Discount>
      <div>
        <Span>
          {product?.price}.00<Money>৳</Money>
        </Span>
        <Span2>
          {price}
          <Money>৳</Money>
        </Span2>
      </div>
    </Container>
  );
}

function NormalPrice({ product }) {
  return (
    <Container>
      <Span2>
        {product?.price}.00<Money>৳</Money>
      </Span2>
    </Container>
  );
}

export default PriceComp;
