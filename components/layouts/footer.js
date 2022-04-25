import styled from "styled-components";

const Footer = (props) => {
  return (
    <>
      <Container>
        <Foot className="footer">
          <P>Employee Poll</P>
          <P>
            Avatar pack vector created by pikisuperstar -{" "}
            <A href="https://www.freepik.com/vectors/avatar-pack">
              www.freepik.com
            </A>
          </P>
        </Foot>
      </Container>
    </>
  );
};

const A = styled.a`
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  transition: text-decoration 0.2s ease;
`;

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

  :not(last-child) {
    margin-bottom: 15px;
  }

  :last-child {
    color: #444;
    font-size: 13px;
  }
  text-align: center;
  font-size: 14px;
`;

export default Footer;
