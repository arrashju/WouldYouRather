import { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { connect } from "react-redux";
import { handleUpdatePoll } from "../../actions/poll";
import { handleUpdateVote } from "../../actions/votes";
import { handleAddVote } from "../../actions/votes";
import { handleUpdateEmployee } from "../../actions/employee";
import Image from "next/image";

const Question = ({
  dispatch,
  pollMap,
  votesMap,
  employee,
  employeeMap,
  setModal,
  type,
  id,
}) => {
  //get all of my votes
  const voteId = Object.keys(votesMap).filter((key) => {
    return votesMap[key].voter == employee.name && votesMap[key].pollId == id;
  })[0];
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    //if vote already exists, prepopulate with choice
    const selected =
      votesMap[voteId] &&
      votesMap[voteId].hasOwnProperty("option") &&
      votesMap[voteId].option;
    setSelected(selected);
  }, [votesMap[voteId]]);

  useEffect(() => {}, [selected]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //on form submission, return if neither option is selected
    //(omit zero because means option 0 is selected)
    if (selected === null || selected === undefined) return;

    let myVote;
    let poll = pollMap[id];

    //if vote already exists
    if (voteId) {
      //get vote
      myVote = votesMap[voteId];

      //update vote
      dispatch(handleUpdateVote(voteId, { ...myVote, option: selected }));

      //reset tally
      poll.options[myVote.option].count -= 1;
    } else {
      //if vote doesn't already exist

      //format vote
      myVote = {
        pollId: id,
        voter: employee.name,
        option: selected,
      };

      //add vote
      dispatch(handleAddVote([Object.keys(votesMap).length], myVote));
      dispatch(
        handleUpdateEmployee(employee.name, {
          ...employeeMap[employee.name],
          answered: employeeMap[employee.name].answered + 1,
        })
      );
    }

    //update new tally for O(1) runtime on future visitation
    poll.options[selected].count += 1;

    //null: tie
    //0: option 0 took the lead
    //1: option 1 took the lead
    const newPoll = {
      ...poll,
      leader:
        poll.options[0].count == poll.options[1].count
          ? null
          : poll.options[0].count > poll.options[1].count
          ? 0
          : 1,
      count: poll.options[0].count + poll.options[1].count,
    };

    dispatch(handleUpdatePoll(id, newPoll, employee.name));
    setModal(false);
  };

  useEffect(() => {}, [selected]);

  if (!id) return <></>;

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <ImgWrapper>
          <Avatar src={`/avatars/${pollMap[id].creator}.webp`} />
          {type == "full" ? (
            <Icon
              onClick={() => {
                setModal(false);
              }}
            >
              <Image src="/close.svg" width={20} height={20} />
            </Icon>
          ) : (
            <Icon>
              <Link href={`/questions/${id}`} passHref>
                <a>
                  <Image src="/expand.svg" width={20} height={20} />
                </a>
              </Link>
            </Icon>
          )}
          {pollMap[id].image && (
            <Image
              src={`${pollMap[id].image}`}
              width={367}
              height={367}
              objectFit="cover"
            />
          )}
        </ImgWrapper>
        <FlexBox>
          <Rather>Would You Rather</Rather>
          <Vote>{pollMap[id].question}</Vote>
          <RadioGroup>
            <RadioButton
              type="radio"
              id="0"
              onClick={(e) => {
                e.preventDefault();
                setSelected(0);
              }}
              value={selected == 0}
              required
            />
            <Label htmlFor="1">{pollMap[id].options[0].text}</Label>
          </RadioGroup>
          <RadioGroup>
            <RadioButton
              type="radio"
              name="0"
              onClick={(e) => {
                e.preventDefault();
                setSelected(1);
              }}
              value={selected == 1}
              required
            />
            <Label htmlFor="1">{pollMap[id].options[1].text}</Label>
          </RadioGroup>
          {voteId && type == "full" && (
            <>
              <Hr />
              <H4>Results</H4>
              <Results>
                {[0, 1].map((choice) => {
                  const poll = pollMap[id];
                  const option = poll.options[choice];
                  const { text, count } = option;
                  const score = ((option.count / poll.count) * 100).toFixed(0);

                  return (
                    <Result>
                      <div>{`${score}% ${text}`}</div>
                      <div>{`(${count} votes)`}</div>
                    </Result>
                  );
                })}
              </Results>
            </>
          )}

          <SubmitButton type="submit" data-testid="submit-button">
            {voteId ? "Update" : "Submit"}
          </SubmitButton>
        </FlexBox>
      </Form>
    </>
  );
};

const theme = require("../../lib/styled");

const Hr = styled.hr`
  border: 0.5px solid #ccc;
  width: 100%;
  margin: 11px auto;
`;

const H4 = styled.div`
  font-size: 13px;
  color: #666;
  font-weight: 500;
  margin-bottom: 17px;
  margin-top: 13px;
  text-align: center;
`;

const Result = styled.div`
  :not(last-child) {
    margin-bottom: 10px;
  }

  > * {
    display: inline-block;
    text-align: left;
    line-height 150%;
    :first-child {
      color:#333;
      font-size: 14px;
    }
    :last-child {
      margin-left: 4px;
      color: #666;
      font-size: 13px;
    }
  }
`;

const Results = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: left;
  width: 240px;
  margin: 0 auto;
`;

const Path = styled.path``;

const Avatar = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  z-index: 2;
  filter: drop-shadow(0px 7px 20px rgba(0, 0, 0, 1));
`;

const Rather = styled.div`
  margin-bottom: 25px;
  font-size: 13px;
  color: #444;
  text-align: center;
`;

const Icon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  :hover {
    cursor: pointer;

    ${Path} {
      fill: black;
    }
  }
  z-index: 1;
`;

const Vote = styled.div`
  font-size: 16px;
  color: #333;
  line-height: 150%;
  margin-bottom: 23px;
  text-align: center;
`;

const ImgWrapper = styled.div`
  position: relative;
  top: 0px;
  background: #888;
  margin-bottom: 10px;
  height: 83px;
  overflow: hidden;
`;

const Form = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 1px 7px 1px rgba(0, 0, 0, 0.15);
  width: min(367px, 100%);
  background: white;
  overflow: hidden;

  @media (min-width: 367px) {
    border-radius: 11px;
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

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 36px;
`;

const RadioGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: left;
  align-items: top;
  flex-direction: row;
  :not(last-child) {
    margin-bottom: 15px;
  }
`;

const RadioButton = styled.button`
  -webkit-appearance: none;
  appearance: none;
  height: 15px;
  width: 15px;
  display: block;
  background-color: white;
  border-radius: 50%;
  border: 2px solid #333;
  background-color: ${(props) => (props.value ? theme.color.blue : "none")};

  :hover {
    background-color: ${theme.color.blue};
    cursor: pointer;
  }

  transition: background-color 0.1s ease;
  margin-top: 4.5px;
`;

const Label = styled.label`
  font-size: 15px;
  color: #333;
  margin-left: 15px;
  line-height: 150%;
`;

const SubmitButton = styled.button`
  background: #333;
  padding: 8px 19px;
  border-radius: 8px;
  color: white;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid #333;
  width: fit-content;
  margin: 21px auto 25px auto;
  :hover {
    cursor: pointer;
    color: #333;
    border: 1px solid #333;
    border-radius: 8px;
    background: white;
  }
`;

export default connect((state) => {
  return {
    pollMap: state["pollMap"],
    employee: state["employee"],
    employeeMap: state["employeeMap"],
    votesMap: state["votesMap"],
  };
})(Question);
