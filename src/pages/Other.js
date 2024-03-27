import { useEffect, useState } from "react";
import { getMedicine } from "../api/medicineApi";
import styled from "styled-components";
import TotalReportComp from "../Components/TotalReportComp";
import AllMedRep from "../Components/AllMedRep";

const ParentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

function Other() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMedicine();
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ParentContainer>
      <TotalReportComp products={products} />
      <AllMedRep products={products} />
    </ParentContainer>
  );
}

export default Other;
