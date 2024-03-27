import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BaseCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.6);
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.2);
    box-shadow: 0 10px 12px rgba(0, 0, 0, 0.4);
  }
`;

const SellMoneyCard = styled(BaseCard)`
  flex: 1;
  background-color: rgba(255, 0, 0, 0.6);

  &:hover {
    background-color: rgba(255, 0, 0, 0.7);
  }
`;

const BuyMoneyCard = styled(BaseCard)`
  flex: 1;
  background-color: rgba(0, 128, 0, 0.6);

  &:hover {
    background-color: rgba(0, 128, 0, 0.7);
  }
`;

const BuyMedCard = styled(BaseCard)`
  flex: 1;
  background-color: rgba(0, 0, 255, 0.6);

  &:hover {
    background-color: rgba(0, 0, 255, 0.7);
  }
`;

const SoldMedCard = styled(BaseCard)`
  flex: 1;
  background-color: rgba(255, 165, 0, 0.6);

  &:hover {
    background-color: rgba(255, 165, 0, 0.7);
  }
`;

const SoldMedicineCostCard = styled(BaseCard)`
  flex: 1;
  background-color: rgba(255, 0, 255, 0.6);

  &:hover {
    background-color: rgba(255, 0, 255, 0.7);
  }
`;

const DangerText = styled.span`
  font-size: 1.3rem;
  font-weight: 750;
  color: red;
`;
const Text = styled.span`
  font-size: 1.3rem;
  font-weight: 750;
  color: green;
`;

// The rest of your component code remains unchanged.

function TotalReportComp({ products }) {
  const [sell, setSell] = useState(0);
  const [buy, setBuy] = useState(0);

  return (
    <OuterContainer>
      <Container>
        <TotalProductSellMoney products={products} setSell={setSell} />
        <SoldMedicineCost products={products} setBuy={setBuy} />
        <TotalProductBuyMoney products={products} />
        <BuyMed products={products} />
        <SoldMed products={products} />
      </Container>
      {sell > buy ? (
        <Text>Your Total Income is: {(sell - buy).toFixed(2)} Taka</Text>
      ) : (
        <DangerText>
          Your Total loss is: {(buy - sell).toFixed(2)} Taka
        </DangerText>
      )}
      <DangerText></DangerText>
    </OuterContainer>
  );
}

function TotalProductSellMoney({ products, setSell }) {
  useEffect(() => {
    const sellMoney = products?.map((el) => el?.totalSellMoney);
    const total = sellMoney.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    setSell(total);
  }, [products, setSell]); // Dependencies array ensures this effect runs when `products` or `setSell` changes

  const total = products?.reduce((accumulator, currentValue) => {
    return accumulator + (currentValue?.totalSellMoney || 0);
  }, 0);

  return (
    <SellMoneyCard>
      <h3>Total Sell Money</h3>
      <div>{total.toFixed(2)} Taka</div>
    </SellMoneyCard>
  );
}

function TotalProductBuyMoney({ products }) {
  const buyMoney = products?.map((el) => el?.totalBuyMone);
  const total = buyMoney.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  return (
    <BuyMoneyCard>
      <h3>Total Buy Money</h3>
      <div>{total.toFixed(2)} Taka</div>
    </BuyMoneyCard>
  );
}

function BuyMed({ products }) {
  const med = products?.map((el) => el?.totalItemBuy);
  const total = med.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  return (
    <BuyMedCard>
      <h3>Total Medicine Bought</h3>
      <div>{total} Items</div>
    </BuyMedCard>
  );
}

function SoldMed({ products }) {
  const med = products?.map((el) => el?.totalItemSold);
  const total = med.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  return (
    <SoldMedCard>
      <h3>Total Medicine Sold</h3>
      <div>{total} Items</div>
    </SoldMedCard>
  );
}

function SoldMedicineCost({ products, setBuy }) {
  useEffect(() => {
    const totalSoldMedCost = products?.map(
      (el) => el?.totalItemSold * el?.buyingPrice
    );
    const total = totalSoldMedCost.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    setBuy(total);
  }, [products, setBuy]); // Dependencies array ensures this effect runs when `products` or `setBuy` changes

  const total = products?.reduce((accumulator, currentValue) => {
    return (
      accumulator + currentValue?.totalItemSold * currentValue?.buyingPrice
    );
  }, 0);

  return (
    <SoldMedicineCostCard>
      <h3>Total Sold Medicine Cost</h3>
      <div>{total.toFixed(2)} Taka</div>
    </SoldMedicineCostCard>
  );
}

export default TotalReportComp;
