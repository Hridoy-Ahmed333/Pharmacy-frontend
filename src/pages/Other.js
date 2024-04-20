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
const CustomH1 = styled.span`
  font-size: 2.5rem; // Typical font size for h1
  font-weight: bold; // Typical font weight for h1
  color: #28a745; // Green color
  margin-top: 1rem; // To mimic h1's default margin
  margin-bottom: 0.5rem; // To mimic h1's default margin
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
      <CustomH1>Dashboard</CustomH1>
      <TotalReportComp products={products} />
      <AllMedRep products={products} />
    </ParentContainer>
  );
}

export default Other;
