import styled from "styled-components";

const FooterWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 4.8rem;
  background-color: rgb(1, 50, 32);
  border-top: 1px solid rgb(0, 128, 0);

  @media (max-width: 1470px) {
    padding: 1rem;
    /* flex-direction: column; */
  }
`;

const Content = styled.div`
  margin: 0 auto;
  color: white;
`;

function Footer() {
  return (
    <FooterWrapper>
      <Content>Made by</Content>
    </FooterWrapper>
  );
}

export default Footer;
