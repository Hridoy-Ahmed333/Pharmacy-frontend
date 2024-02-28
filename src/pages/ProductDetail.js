import styled from "styled-components";
import ProductDetailsWhole from "../Components/ProductDetailsWhole";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getMedicineById } from "../api/medicineApi";
import SingleProductContext from "../context/SingleProductContext";
import { ProductContext } from "../context/ProductContext";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductDetailComponent = styled.div``;

const CommmentContainer = styled.div`
  border: 1px solid black;
`;

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [render, setRender] = useState(true);
  const params = useParams();
  const { setProduct: setPro, reren } = useContext(ProductContext);

  const productId = params.id;
  const value = {
    render,
    setRender,
    product,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMedicineById(productId);
        setProduct(response);
        setPro(response);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [productId, render, setPro, reren]);

  return (
    <SingleProductContext.Provider value={value}>
      <PageContainer>
        <ProductDetailComponent>
          <ProductDetailsWhole />
        </ProductDetailComponent>
        <CommmentContainer>Comments</CommmentContainer>
      </PageContainer>
    </SingleProductContext.Provider>
  );
}

export default ProductDetail;
