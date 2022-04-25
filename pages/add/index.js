import styled from "styled-components";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Question from "./question";
import Options from "./options";
import Category from "./category";
import { PollContext } from "hooks/PollContext";
import { connect } from "react-redux";
import { handleAddPoll } from "actions/poll";
import { handleUpdateEmployee } from "actions/employee";
import { useRouter } from "next/router";

const AddPoll = ({ dispatch, employee, employeeMap }) => {
  const router = useRouter();
  const [page, setPage] = useState("question");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { text: "", count: 0 },
    { text: "", count: 0 },
  ]);
  const [category, setCategory] = useState(null);
  const [poll, setPoll] = useState({
    creator: employee.name,
    leader: null,
    count: 0,
    image: null,
  });

  useEffect(() => {
    if (page == "complete") {
      dispatch(handleAddPoll(poll));
      dispatch(
        handleUpdateEmployee(employee.name, {
          ...employeeMap[employee.name],
          polls: employeeMap[employee.name].polls + 1,
        })
      );
    }
  }, [page]);

  useEffect(() => {
    setPoll((poll) => ({
      ...poll,
      options,
      question,
      category,
    }));
  }, [question, options, category]);

  const handleBack = (e) => {
    switch (page) {
      case "question":
        // router.push("trending", undefined, { shallow: true });
        break;
      case "options":
        setPage("question");
        break;
      case "category":
        setPage("options");
        break;
    }
  };

  return (
    <PollContext.Provider
      value={{
        question,
        setQuestion,
        options,
        setOptions,
        category,
        setCategory,
        handleBack,
        remaining: {
          question: "3 items to submit",
          options: "2 items to submit",
          category: "Last item to submit",
        },
        page,
        setPage,
      }}
    >
      <Logo>
        <Link href="/">
          <Image src="/logo.svg" width={35} height={31} />
        </Link>
      </Logo>
      {page == "question" && <Question />}
      {page == "options" && <Options />}
      {page == "category" && <Category />}
    </PollContext.Provider>
  );
};

const theme = require("lib/styled");

const Logo = styled.div`
  position: absolute;
  top: 30px;
  left: 5%;
  cursor: pointer;
`;

export default connect((state) => {
  return {
    employee: state["employee"],
    employeeMap: state["employeeMap"],
  };
})(AddPoll);
