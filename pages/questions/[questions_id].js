import styled from "styled-components";
import { useState, useEffect } from "react";
import Vote from "../../components/question/index";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import Layout from "components/layouts/layout";
import CustomError from "components/error";

const Question = ({ pollMap }) => {
  const router = useRouter();
  const { questions_id } = router.query;
  const [modal, setModal] = useState(null);

  useEffect(() => {
    if (modal != null) {
      router.push("/trending", undefined, { shallow: true });
    }
  }, [modal]);

  if (!pollMap[questions_id]) {
    return <CustomError type={404} message="This page could not be found" />;
  }

  return (
    <>
      <Display>
        <Vote setModal={setModal} type={"full"} id={questions_id} />
      </Display>
    </>
  );
};

Question.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

const Display = styled.div`
  position: absolute;
  z-index: 3;
  width: 100%;
  height: 100%;
  background: rgba(0%, 0%, 0%, 1);
`;

export default connect((state) => {
  return {
    pollMap: state["pollMap"],
  };
})(Question);
