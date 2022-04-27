import styled, { css } from "styled-components";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { handleSignIn } from "../actions/employee";
import { connect } from "react-redux";

const SignIn = ({ dispatch, employeeMap }) => {
  const [status, setStatus] = useState(null);
  const [selected, setSelected] = useState(null);
  const router = useRouter();

  const handleClick = () => {
    if (selected) {
      setStatus("success");
      dispatch(handleSignIn(selected));
      console.log(router.asPath);
      if (router.pathname.toLowerCase().includes("signin")) {
        router.push("/trending", undefined, { shallow: true });
      } else {
        router.push(router.asPath, undefined, { shallow: true });
      }
    } else {
      console.log("test");
      setStatus("error");
    }
  };

  return (
    <>
      <Container>
        <Box>
          <div style={{ marginBottom: "30px", textAlign: "center" }}>
            <Image src="/logo.svg" width={62} height={54} />
          </div>
          <H2>Welcome</H2>
          <Grid>
            {Object.keys(employeeMap).map((persona, key) => {
              return (
                <Persona
                  selected={selected == persona}
                  onClick={() => {
                    setSelected(persona);
                    setStatus(null);
                  }}
                  key={key}
                  data-testid={persona}
                >
                  <Avatar src={`/avatars/${persona}.webp`} />
                  <Name>{persona}</Name>
                </Persona>
              );
            })}
          </Grid>
          <Spinner hidden={Object.keys(employeeMap).length > 0}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </Spinner>
          <Status>
            {status == "error" && (
              <Error data-testid="error-header">
                You must select an employee
              </Error>
            )}
            {status == "success" && (
              <Success data-testid="success-header">Success!</Success>
            )}
          </Status>
          <Button
            type="submit"
            onClick={handleClick}
            data-testid="submit-button"
            selected={selected}
          >
            {selected === null
              ? "Select an Employee"
              : `Continue with ${selected}`}
          </Button>
        </Box>
      </Container>
    </>
  );
};

const theme = require("../lib/styled");

const Spinner = styled.div`
  display: ${(props) => (props.hidden ? "none" : "inline-block")};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  opacity: 50%;
  > * {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 32px;
    height: 32px;
    margin: 5px;
    border: 3px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${theme.color.blue} transparent transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Status = styled.div`
  font-size: 13px;
  text-align: center;
  margin-bottom: 8px;
  min-height: 15.5px;
`;

const Error = styled.div`
  color: #ff5454;
`;

const Success = styled.div`
  color: #00c213;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 59px);
  grid-gap: 46px;
  justify-items: center;
  justify-content: center;
  text-align: center;
  margin: 24px 27px 24px 27px;
  min-height: 200px;
`;

const Name = styled.div`
  font-size: 15px;
  font-weight: 400;
  color: #333;
  text-align: center;
  margin-top: 4px;
`;

const Persona = styled.div`
  cursor: pointer;
  padding-bottom: 5px;

  border-bottom: ${(props) =>
    props.selected ? `3px solid ${theme.color.blue}` : `3px solid white`};

  :hover {
    ${Avatar} {
      filter: drop-shadow(0px 7px 20px rgba(0, 0, 0, 0.35));
    }
  }

  ${(props) =>
    props.selected &&
    css`
      ${Avatar} {
        filter: drop-shadow(0px 7px 20px rgba(0, 0, 0, 0.35));
      }
    `}
`;

const Button = styled.button`
  height: 49px;
  background: ${theme.color.blue};
  width: 100%;
  border: none;
  font-size: 15px;
  ${(props) => (props.selected ? "color: white" : "color: #eee")};
  border-radius: 3px;
  :hover {
    pointer: cursor;
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background: #fff;
`;

const Box = styled.div`
  position: relative
  text-align: center;
  flex-direction: column;
  align-items: center;
  padding: 50px 28px;
  width: min(375px, 100%);
  min-height: 375px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 3px 18px 11px rgba(0, 0, 0, 0.1);
  border-radius: 7px;

  @media (max-width: 450px) {
    height: 100%;
    border: none;
    box-shadow: none;

  padding: 15px 20px;
  }
`;

const H2 = styled.div`
  font-size: 21px;
  margin-bottom: 25px;
  text-align: center;
`;

export default connect((state) => {
  return { employeeMap: state["employeeMap"] };
})(SignIn);
