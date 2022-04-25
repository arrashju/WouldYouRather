import styled from "styled-components";

const Footer = (props) => {
  return (
    <>
      <Container>
        <Foot className="footer">
          <P>Employee Poll</P>
        </Foot>
      </Container>
    </>
  );
};

const Container = styled.div`
  background: #fcfdff;
  padding: 35px 0;
`;

const Foot = styled.footer`
  margin: auto;
`;

const P = styled.p`
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 14px;
`;

export default Footer;
