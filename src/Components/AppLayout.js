import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import Footer from "./Footer";
import { SearchProvider } from "../context/SearchContext";
import UserContext from "../context/UserContext";

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Main = styled.main`
  background-color: rgb(245, 255, 250);
  flex-grow: 1;
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  gap: 3.2rem;
`;

function AppLayout() {
  const userData = {
    name: "Md. Rubayat Hossain Ridoy",
    id: 1,
    role: "admin",
  };
  return (
    <div>
      <StyledAppLayout>
        <UserContext.Provider value={userData}>
          <SearchProvider>
            <Header />
            <Main>
              <Container>
                <Outlet />
              </Container>
            </Main>
            <Footer />
          </SearchProvider>
        </UserContext.Provider>
      </StyledAppLayout>
    </div>
  );
}

export default AppLayout;
