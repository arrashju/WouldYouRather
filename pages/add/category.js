import styled from "styled-components";
import { useContext } from "react";
import { PollContext } from "hooks/PollContext";
import Navigator from "./navigator";
import { useRouter } from "next/router";

const options = {
  Sports:
    "Create a poll about your favorite sport. Whether soccer, American football, tennis, basketball, gynmansts, mma, etc",
  Business:
    "Create a poll about business. Whether stocks, marketing, finance, etc.",
};

const Category = () => {
  const router = useRouter();
  const { category, setCategory, setPage } = useContext(PollContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage("complete");
    router.push("trending", undefined, { shallow: true });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Center>
          <Selection
            onClick={() => {
              setCategory("Sports");
            }}
            selected={category == "Sports"}
          >
            <H3>Sports</H3>
            <P>{options.Sports}</P>
          </Selection>
          <Selection
            onClick={() => {
              setCategory("Business");
            }}
            selected={category == "Business"}
          >
            <H3>Business</H3>
            <P>{options.Business}</P>
          </Selection>
        </Center>
        <Navigator />
      </Form>
    </>
  );
};

const theme = require("lib/styled");

const Selection = styled.div`
  text-align: left;
  width: min(447px, 80%);
  min-height: 145px;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #aaa;
  margin: 0 auto;

  :hover {
    border: 1px solid #222;
    cursor: pointer;
  }

  :not(:last-child) {
    margin-bottom: 13px;
  }

  ${(props) => props.selected && "border: 1px solid #222;"}
`;

const H3 = styled.h3`
  font-size: 20px;
  font-weight: 500;
  margin: 0 0 11px;
`;

const Form = styled.form``;

const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  text-align: center;
`;

const P = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #777;
  margin-bottom: 0;
  max-width: 317px;
  line-height: 150%;
`;

export default Category;
