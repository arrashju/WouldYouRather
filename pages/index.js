import styled from "styled-components";
import Layout from "../components/layouts/layout";
import Link from "next/link";
import theme from "../lib/styled";

const Home = () => {
  return (
    <>
      <Section>
        <Hero>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "110px",
            }}
          >
            <H2>
              Would you rather forfeit an Oscar or have a lifetime ban from the
              Academy?
            </H2>
            <Link href="./trending">
              <HeroButton>Answer</HeroButton>
            </Link>
          </div>
        </Hero>
      </Section>
      <Section>
        <H1>Learn Opinions</H1>
        <Posts>
          <Post
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("/warriors.webp")`,
              backgroundSize: "cover",
            }}
          >
            Sports fanatic?
            <Link href="./trending">
              <PostButton>View Opinions</PostButton>
            </Link>
          </Post>
          <Post
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("/netflix.webp")`,
              backgroundSize: "cover",
            }}
          >
            Business enthusiast?
            <Link href="./trending">
              <PostButton>View Opinions</PostButton>
            </Link>
          </Post>
        </Posts>
      </Section>
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

const Section = styled.div`
  margin-top: 75px;
  margin-bottom: 100px;
  padding: 0 5%;
`;

const HeroButton = styled.button`
  background: none;
  padding: 12px 15px;
  border: 1px solid white;
  border-radius: 8px;
  font-size: 14px;
  color: white;

  :hover {
    background: white;
    color: ${theme.color.blue};
    cursor: pointer;
  }
`;

const Hero = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.color.blue};
  border-radius: 10px;
  height: 300px;
  width: 90%;
  padding: 5%;
`;

const Posts = styled.div`
  display: grid;
  flex: 1;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 25px;
`;

const Post = styled.div`
  border-radius: 10px;
  aspect-ratio: 1/1;
  font-size: 1em;
  overflow: hidden;
  padding: 10%;
  line-height: 125%;
  font-size: max(24px, 3vw);
  color: white;
  font-weight: 500;
  filter: contrast(105%);
  overflow: hidden;
`;

const PostButton = styled.button`
  display: block;
  background: white;
  padding: 15px 20px;
  border: 1px solid white;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  color: #222;
  margin-top: 25px;

  :hover {
    background: #ddd;
    cursor: pointer;
  }
`;

const H1 = styled.div`
  font-size: max(24px, 2.3vw);
  margin-bottom: 55px;
  font-weight: 500;
  color: Black;
`;

const H2 = styled.div`
  font-size: max(24px, 2.5vw);
  :not(:last-child) {
    margin-bottom: 30px;
  }
  text-align: center;
  line-height: 150%;
  font-weight: 500;
  color: white;
  text-wrap: balance;
`;

export default Home;
