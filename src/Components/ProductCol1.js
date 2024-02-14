import styled from "styled-components";
import SingleProductContext from "../context/SingleProductContext";
import { useContext } from "react";

function ProductCol1() {
  const { product } = useContext(SingleProductContext);
  return <div>{product?.rating}</div>;
}

export default ProductCol1;
