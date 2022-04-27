import Layout from "components/layouts/layout";
import CustomError from "components/error";

const Custom404 = () => {
  return (
    <>
      <CustomError type="404" message="This page could not be found" />
    </>
  );
};

Custom404.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Custom404;
