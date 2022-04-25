import styled from "styled-components";
import { useContext, useState } from "react";
import { PollContext } from "hooks/PollContext";
import Navigator from "./navigator";

const Question = () => {
  const { question, setQuestion, setPage } = useContext(PollContext);
  const [hide, setHide] = useState(false);

  const handleChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage("options");
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Center>
          <Task>Enter the question you’d like to ask</Task>
          <Input
            type="text"
            value={question}
            onChange={handleChange}
            onFocus={() => {
              setHide(true);
            }}
            onBlur={() => {
              setHide(false);
            }}
            required
          />
        </Center>
        <Navigator hide={hide} />
      </Form>
    </>
  );
};

const theme = require("lib/styled");

const Form = styled.form``;

const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(90%, 650px);
  text-align: center;
`;

const Task = styled.div`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 100px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid black;
  width: 100%;
  margin: 0 auto;
  background: none;
  padding: 11px 0;
  font-size: 20px;
  color: #444;

  :focus {
    outline: 0;
    // border-bottom: 1px solid ${theme.color.blue};
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

export default Question;
