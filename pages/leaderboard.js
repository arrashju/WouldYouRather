import styled, { css } from "styled-components";
import Image from "next/image";
import Layout from "components/layouts/layout";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

const Leaderboard = ({ employeeMap }) => {
  let previous = { polls: 0, answered: 0 };
  let currentRank = 0;
  const leaderboard = Object.keys(employeeMap).sort((a, b) => {
    const p = 2 / 3;
    const k = 1 / 3;

    if (
      employeeMap[b].polls * p + employeeMap[b].answered * k >
      employeeMap[a].polls * p + employeeMap[a].answered * k
    ) {
      return 1;
    } else if (
      employeeMap[a].polls * p + employeeMap[a].answered * k >
      employeeMap[b].polls * p + employeeMap[b].answered * k
    ) {
      return -1;
    } else return a.localeCompare(b);
  });

  return (
    <>
      <H1>Leaderboard</H1>
      <LeaderGroup>
        {leaderboard.map((name, key) => {
          if (
            !(
              employeeMap[name].polls == previous.polls &&
              employeeMap[name].answered == previous.answered
            )
          ) {
            currentRank += 1;
            previous = {
              polls: employeeMap[name].polls,
              answered: employeeMap[name].answered,
            };
          }
          return (
            <Leader
              name={name}
              polls={employeeMap[name].polls}
              answered={employeeMap[name].answered}
              rank={currentRank}
              key={key}
            />
          );
        })}
      </LeaderGroup>
    </>
  );
};

const Leader = ({ name, rank, polls, answered }) => {
  return (
    <LeaderFlex>
      <Rank>{`#${rank}`}</Rank>
      <Image
        src={`/avatars/${name}.webp`}
        alt={name}
        width={200}
        height={200}
      />
      <Name>{name}</Name>
      <Stat>
        {polls} Asked, {answered} Voted
      </Stat>
    </LeaderFlex>
  );
};

Leaderboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

const Rank = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  font-size: 23px;
`;

const Stat = styled.div`
  font-size: 18px;
  color: #444;
  margin-top: 12px;
  text-align
`;

const H1 = styled.h1`
  margin-top: 60px;

  text-align: center;
`;

const Name = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-top: 16px;
`;

const LeaderFlex = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const LeaderGroup = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(200px, auto));
  grid-template-columns: repeat(auto-fit, minmax(200px, auto));
  grid-gap: max(10vw, 60px);
  justify-items: center;
  justify-content: center;
  margin: 60px 5%;
`;

export default connect((state) => {
  return {
    employeeMap: state["employeeMap"],
  };
})(Leaderboard);
