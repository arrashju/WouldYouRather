import Navbar from "./header";
import Footer from "./footer";
import styled from "styled-components";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

const Main = styled.main`
  padding-top: 4.5rem;
  min-height: 100vh;
  width: 100%;
`;

export default Layout;
