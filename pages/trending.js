import styled, { css } from "styled-components";
import { useState, useRef, useEffect } from "react";
import Layout from "../components/layouts/layout";
import Vote from "../components/question/index";
import { connect } from "react-redux";

const Trending = ({ pollMap, votesMap, employee }) => {
  const myVotes = Object.values(votesMap).filter(
    (value) => value.voter == employee.name
  );
  const [topic, setTopic] = useState("Unanswered");
  const [id, setId] = useState(null);
  const [modal, setModal] = useState(false);
  const [result, setResult] = useState(null);
  const node = useRef();
  const scrollNode = useRef();
  const wheelOpt = { passive: false };
  const [wheelEvent, setWheelEvent] = useState("wheel");

  useEffect(() => {
    const result = Object.keys(pollMap).filter((key) => {
      switch (topic) {
        case "All":
          return true;
        case "Answered":
          return myVotes.filter((vote) => vote.pollId == key).length > 0;
        case "Unanswered":
          return myVotes.filter((vote) => vote.pollId == key).length < 1;
        default:
          return pollMap[key].category == topic;
      }
    });

    setResult(result);
  }, [topic, pollMap]);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick, false);
  }, []);

  useEffect(() => {
    if (scrollNode && scrollNode.current) {
      if (modal) {
        scrollTo(0, 0);
        disableScroll();
      } else enableScroll();
    }
  }, [modal]);

  const handleOutsideClick = (e) => {
    //@ts-ignore
    if (
      node.current &&
      typeof node.current.contains === "function" &&
      node &&
      !node.current.contains(e.target)
    ) {
      setModal(false);
    }
  };

  const disableScroll = () => {
    scrollNode.current.addEventListener(
      "DOMMouseScroll",
      preventDefault,
      false
    ); // older FF
    scrollNode.current.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    scrollNode.current.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
    scrollNode.current.addEventListener(
      "keydown",
      preventDefaultForScrollKeys,
      false
    );
  };

  const enableScroll = () => {
    scrollNode.current.removeEventListener(
      "DOMMouseScroll",
      preventDefault,
      false
    );
    scrollNode.current.removeEventListener(
      wheelEvent,
      preventDefault,
      wheelOpt
    );
    scrollNode.current.removeEventListener(
      "touchmove",
      preventDefault,
      wheelOpt
    );
    scrollNode.current.removeEventListener(
      "keydown",
      preventDefaultForScrollKeys,
      false
    );
  };

  const preventDefault = (e) => {
    e.preventDefault();
  };

  const preventDefaultForScrollKeys = (e) => {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  };

  return (
    <>
      <Modal ref={scrollNode} hidden={!modal}>
        <VoteWrapper ref={node}>
          <Vote setModal={setModal} id={id} />
        </VoteWrapper>
      </Modal>
      <Section>
        <Topics>
          <Topic selected={topic == "All"} onClick={() => setTopic("All")}>
            All
          </Topic>
          <Topic
            selected={topic == "Sports"}
            onClick={() => setTopic("Sports")}
          >
            Sports
          </Topic>
          <Topic
            selected={topic == "Business"}
            onClick={() => setTopic("Business")}
          >
            Business
          </Topic>
          <Topic
            selected={topic == "Answered"}
            onClick={() => setTopic("Answered")}
          >
            Answered
          </Topic>
          <Topic
            selected={topic == "Unanswered"}
            onClick={() => setTopic("Unanswered")}
          >
            Unanswered
          </Topic>
        </Topics>
        <Small>{Object.keys(pollMap).length} Polls</Small>
        <H1>Trending Polls</H1>
        <H2>{topic}</H2>
        <Cards>
          {result &&
            result.length > 0 &&
            result
              .sort((a, b) => {
                if (pollMap[b].count > pollMap[a].count) return 1;
                else if (pollMap[a].count > pollMap[b].count) return -1;

                return 0;
              })
              .map((key) => {
                const poll = pollMap[key];

                return (
                  <Card
                    onClick={() => {
                      setId(key);
                      setModal((modal) => !modal);
                    }}
                    key={key}
                  >
                    <CardImage
                      style={{
                        background: `${
                          poll.image
                            ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${poll.image})`
                            : "gray"
                        }`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                      }}
                    ></CardImage>
                    <CardCaption>{poll.question}</CardCaption>
                    {poll.leader == null ? (
                      <Shorten>
                        <Small style={{ fontSize: "13px" }}>
                          {poll.count ? "Tie" : "No votes yet"}
                        </Small>
                      </Shorten>
                    ) : (
                      <Shorten>
                        {Math.round(
                          (poll.options[poll.leader].count / poll.count) * 100
                        )}
                        % {poll.options[poll.leader].text}
                      </Shorten>
                    )}
                    <Shorten>
                      <Small style={{ color: "#666" }}>
                        {poll.count ? `(${poll.count})` : ""}
                      </Small>
                    </Shorten>
                    <SatisfactionGroup>
                      {poll.leader == null ? (
                        <Line
                          background={false}
                          rating={poll.count ? 0.5 : 0}
                        />
                      ) : (
                        <Line
                          background={false}
                          rating={poll.options[poll.leader].count / poll.count}
                        />
                      )}
                      <Line background={true} rating={1} />
                    </SatisfactionGroup>
                  </Card>
                );
              })}
          {result && result.length == 0 && "No results found"}
        </Cards>
      </Section>
    </>
  );
};

Trending.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

const VoteWrapper = styled.div``;

const Shorten = styled.div`
  display: inline-block;
  max-width: 90px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-right: 2px;
  font-size: 13px;
  color: #333;
  word-break: keep-all;
`;

const Modal = styled.div`
  position: absolute;
  z-index: 3;
  width: 100%;
  height: 100%;
  background: rgba(0%, 0%, 0%, 0.85);
  margin: 0;
  overflow: auto;
`;

const Small = styled.small`
  display: inline-block;
  font-size: 12px;
  color: #333;
  :hover {
    color: #000;
  }

  transition: color 0.2s ease;
`;

const Section = styled.div`
  padding: 100px 0;
  position: relative;
  > * {
    padding: 0 5%;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    ::-webkit-scrollbar,
    scrollbar {
      display: none;
    }
  }
`;

const Topics = styled.div`
  position: fixed;
  top: 4.5em;
  left: 0;
  width: 90%;
  padding: 15px 5% 20px 5%;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: white;
  overflow-y: hidden;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar ;
  z-index: 4;
`;

const Topic = styled.button`
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 8px 22px;
  background: white;
  margin-right: 15px;

  @media (max-width: 500px) {
    margin-right: 8px;
  }

  :hover {
    border: 1px solid #333;
    cursor: pointer;
  }

  transition: border 0.2s ease;

  ${(props) => {
    if (props.selected) {
      return css`
        border: 1px solid #333;
        background: #333;
        color: white;
        order: -1;
      `;
    }
  }}
`;

const H1 = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 50px;
`;

const H2 = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const CardImage = styled.div`
  height: 325px;
  border-radius: 10px;
  margin-bottom: 12px;
  :hover {
    filter: brightness(0.66);
  }

  transition: filter 0.2s ease;
`;

const Card = styled.div`
  width: 275px;
  :not(:last-child) {
    margin-right: min(13%, 37px);
  }
  flex-shrink: 0;
  :hover {
    cursor: pointer;
  }

  animation-name: fade-in;
  animation-duration: 0.4s;
  animation-timing-function: ease;

  @keyframes fade-in {
    from {
      opacity: 0%;
    }
    to {
      opacity: 100%;
    }
  }
`;

const CardCaption = styled.div`
  font-size: 15px;
  line-height: 125%;
  font-weight: regular;
  margin-bottom: 12px;
  :hover {
    text-decoration: underline;
  }

  transition: text-decoration 0.2s ease;
`;

const Cards = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const SatisfactionGroup = styled.div`
  position: relative;
  width: 87px;
  height: 3px;
  margin-bottom: 2px;
`;

const Line = styled.div`
  position: absolute;
  width: 115px;
  height: 3px;
  background-color: #c4c4c4;
  margin-top: 2px;
  :hover {
    filter: brightness(0.9);
  }

  transition: filter 0.2s ease;

  ${(props) => {
    if (!props.background) {
      return css`
        z-index: 2;
        width: ${(isNaN(props.rating) ? 0 : props.rating) * 115}px;
        background-color: #819abd;
      `;
    }
  }}
`;

export default connect((state) => {
  return {
    pollMap: state["pollMap"],
    votesMap: state["votesMap"],
    employee: state["employee"],
  };
})(Trending);
