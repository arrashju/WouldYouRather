import { getQuestions, getVotes, getEmployees } from "./_DATA";

const initData = async () => {
  const polls = await getQuestions();
  const votes = await getVotes();
  const employees = await getEmployees();

  return {
    polls,
    votes,
    employees,
    employee: {},
  };
};

export default initData;
