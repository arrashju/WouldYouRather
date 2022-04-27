import Error from "next/error";
import Layout from "../components/layouts/layout";

const Custom404 = () => {
  return <Error statusCode={404} />;
};

Custom404.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Custom404;
