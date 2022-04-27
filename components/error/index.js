import styled from "styled-components";
import Layout from "components/layouts/layout";
import theme from "lib/styled";

const Custom404 = ({ type, message }) => {
  return (
    <>
      <Flex>
        <ErrorType>{type}</ErrorType>
        <ErrorMessage>{message}</ErrorMessage>
      </Flex>
    </>
  );
};

Custom404.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const ErrorType = styled.div`
  font-family: ${theme.font.heading};
  font-size: 24px;
  font-weight: 600px;
  padding-right: 21px;
  margin-right: 21px;
  border-right: 1px solid #bbb;
  height: 48px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ErrorMessage = styled.div`
  font-family: ${theme.font.body};
  font-size: 14px;
  font-weight: 5450;
`;

export default Custom404;
