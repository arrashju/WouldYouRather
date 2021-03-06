import styled from "styled-components";
import { useContext } from "react";
import { PollContext } from "hooks/PollContext";

const Navigator = ({ hide }) => {
  const { handleBack, remaining, page } = useContext(PollContext);
  return (
    <>
      <Nav hide={hide}>
        <BackButton onClick={handleBack} type="button">
          Back
        </BackButton>
        <Remaining>{remaining[page]}</Remaining>
        <ContinueButton type="submit">Continue</ContinueButton>
      </Nav>
    </>
  );
};

const Remaining = styled.div`
  font-size: 14px;
  color: #555;
`;

const Nav = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: min(90%, 750px);
  padding: 0 5%;

  @media (max-height: 750px) {
    ${(props) => props.hide && "display: none;"}
  }
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

  transition: background 0.2s ease;
  transition: border 0.2s ease;
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

  transition: background 0.2s ease;
  transition: border 0.2s ease;
`;

export default Navigator;
