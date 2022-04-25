import styled from "styled-components";
import { useContext } from "react";
import { PollContext } from "hooks/PollContext";
import Navigator from "./navigator";

const Options = () => {
  const { options, setOptions, setPage } = useContext(PollContext);

  const handleChange = (e) => {
    switch (e.target.id) {
      case "0":
        setOptions((option) => [
          { ...option[0], text: e.target.value },
          option[1],
        ]);
        break;
      case "1":
        setOptions((option) => [
          option[0],
          { ...option[1], text: e.target.value },
        ]);
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage("category");
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Center>
          <Task>Enter two options</Task>
          <InputGroup>
            <Label>Option 1</Label>
            <Input
              type="text"
              value={options[0].text}
              onChange={handleChange}
              id="0"
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>Option 2</Label>
            <Input
              type="text"
              value={options[1].text}
              onChange={handleChange}
              id="1"
              required
            />
          </InputGroup>
        </Center>
        <Navigator />
      </Form>
    </>
  );
};

const theme = require("lib/styled");

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0 auto;
  :not(:last-child) {
    margin-bottom: 80px;
  }
  max-width: 650px;
`;

const Label = styled.label``;

const Form = styled.form``;

const Logo = styled.div`
  position: absolute;
  top: 30px;
  left: 5%;
  cursor: pointer;
`;

const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
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

export default Options;
