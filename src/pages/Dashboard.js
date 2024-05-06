import React, { useEffect, useState, useRef } from "react";
import { getProperty } from "../api/propertyApi";
import styled from "styled-components";
import TotalReportComp from "../Components/TotalReportComp";
import AllMedRep from "../Components/AllMedRep";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { getAllOrders } from "../api/orderApi";
import AdminsOrder from "../Components/AdminsOrder";
import Footer from "../Components/Footer/Footer";

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2rem;
`;
const ParentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; // Center children horizontally
  gap: 3rem;
  padding: 2rem; // Add some padding around the container
`;

const Button = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  height: 3rem;
  width: 13rem;
  font-weight: 700;
  font-size: 1rem;
  background-color: #007bff; // Updated to a modern blue color
  color: #ffffff; // Changed text color to white for contrast
  border: none; // Removed border
  border-radius: 5px; // Added rounded corners
  padding: 0.5rem 1rem; // Adjusted padding for better spacing
  cursor: pointer; // Changed cursor to pointer on hover
  transition: background-color 0.3s ease; // Added transition for hover effect

  &:hover {
    background-color: #0056b3; // Darker shade on hover
  }
`;

const CustomH1 = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #666666;
  margin-top: 1rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const TotalSellAmount = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
`;
function Dashboard() {
  const [orders, setOrders] = useState([]);
  const parentContainerRef = useRef(null); // Reference to the ParentContainer

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllOrders();
        setOrders(response);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
  }, []);

  const totalSellMoney = orders.reduce(
    (acc, order) => acc + order.sellMoney,
    0
  );

  const handleDownloadPDF = () => {
    html2canvas(parentContainerRef.current, {
      scale: 2, // Increase the scale to improve the quality of the canvas
      windowWidth: parentContainerRef.current.offsetWidth, // Set the canvas width to match the component's width
      windowHeight: parentContainerRef.current.offsetHeight, // Set the canvas height to match the component's height
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "pt", [canvas.width, canvas.height]); // Use the canvas dimensions for the PDF
      const totalPages = Math.ceil(
        canvas.height / pdf.internal.pageSize.getHeight()
      ); // Calculate total pages based on the canvas height

      // Set text color to black (RGB: 0, 0, 0) before adding text
      pdf.setTextColor(0, 0, 0);

      pdf.setFontSize(12);

      for (let i = 0; i < totalPages; i++) {
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const heightLeft = canvas.height - i * pdfHeight;
        const position = heightLeft - imgProps.height;

        pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgProps.height);

        if (i < totalPages - 1) {
          pdf.addPage();
        }
      }

      pdf.save("downloaded-file.pdf");
    });
  };

  return (
    <ParentContainer ref={parentContainerRef}>
      <HeaderContainer>
        <CustomH1>Dashboard</CustomH1>
        <Button onClick={handleDownloadPDF}>Download Report</Button>
      </HeaderContainer>
      <TotalSellAmount>Total Sell: {totalSellMoney}</TotalSellAmount>
      <TotalReportComp orders={orders} />
      <AdminsOrder order={orders} setOrder={setOrders} />
    </ParentContainer>
  );
}

export default Dashboard;
