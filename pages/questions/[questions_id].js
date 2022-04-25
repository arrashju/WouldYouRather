import styled from "styled-components";
import { useState, useEffect } from "react";
import Vote from "../../components/question/index";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import Error from "next/error";

const Question = ({ pollMap }) => {
  const router = useRouter();
  const { questions_id } = router.query;
  const [modal, setModal] = useState(null);

  useEffect(() => {
    if (!pollMap[questions_id]) {
      return <Error statusCode={404} />;
    }
  }, []);

  useEffect(() => {
    if (modal != null) {
      router.push("/trending", undefined, { shallow: true });
    }
  }, [modal]);

  return (
    <>
      <Display>
        <Vote setModal={setModal} type={"full"} id={questions_id} />
      </Display>
    </>
  );
};

const Display = styled.div`
  position: absolute;
  z-index: 3;
  width: 100%;
  height: 100%;
  background: rgba(0%, 0%, 0%, 0.85);
`;

export default connect((state) => {
  return {
    pollMap: state["pollMap"],
  };
})(Question);
