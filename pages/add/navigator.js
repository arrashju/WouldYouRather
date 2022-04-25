import styled from "styled-components";
import { useContext } from "react";
import { PollContext } from "hooks/PollContext";

const Navigator = () => {
  const { handleBack, remaining, page } = useContext(PollContext);
  return (
    <>
      <Nav>
        <BackButton
          onClick={(e) => {
            e.preventDefault();
            handleBack();
          }}
        >
          Back
        </BackButton>
        <Remaining>{remaining[page]} item to submit</Remaining>
        <ContinueButton type="submit">Continue</ContinueButton>
      </Nav>
    </>
  );
};

const Remaining = styled.div`
  font-size: 14px;
  color: #666;
`;

const Nav = styled.div`
  position: fixed;
  bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  padding: 0 5%;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  color: #333;
  border: 1px solid #333;
  border-radius: 8px;
  background: white;
  width: fit-content;

  :hover {
    cursor: pointer;
    background: #f8f8f8;
  }

  @media (max-width: 350px) {
    padding: 10px 10px;
  }
`;
const ContinueButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  color: white;
  border: 1px solid black;
  border-radius: 8px;
  background: black;
  width: fit-content;

  :hover {
    cursor: pointer;
    color: #333;
    border: 1px solid #333;
    border-radius: 8px;
    background: white;
  }

  @media (max-width: 350px) {
    padding: 8px 8px;
  }
`;

export default Navigator;
