const getQuestions = () => {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...questions }), 250);
  });
};

const getEmployees = () => {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...employees }), 250);
  });
};

const getVotes = () => {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...votes }), 250);
  });
};

const questions = {
  [0]: {
    creator: "Afra",
    question: "Face the Warriors 2022 death lineup or 2016 godsquad?",
    options: [
      { text: "death lineup", count: 1 },
      { text: "godsquad", count: 1 },
    ],
    leader: null,
    count: 2,
    image: "/warriors.webp",
    category: "Sports",
  },
  [1]: {
    creator: "Donghai",
    question: "Keep Netflix or Subscribe to Disney+, HBO Max, and AppleTV?",
    options: [
      { text: "Keep Netflix", count: 1 },
      {
        text: "Subscribe to Disney+, HBO Max, and AppleTV",
        count: 1,
      },
    ],
    leader: null,
    count: 2,
    image: "/netflix.webp",
    category: "Business",
  },
  [2]: {
    creator: "Aliyah",
    question: "Forfeit an Oscar or be banned from the Academy for life?",
    options: [
      { text: "Forfeit an Oscar", count: 1 },
      {
        text: "Be banned from the Academy for life",
        count: 1,
      },
    ],
    leader: null,
    count: 2,
    image: "/academy.webp",
    category: "Entertainment",
  },
  [3]: {
    creator: "Isabella",
    question: "Buy twitter for 44M or keep the money",
    options: [
      { text: "Buy twitter for 44M", count: 1 },
      {
        text: "Keep the 44 million dollars",
        count: 1,
      },
    ],
    leader: null,
    count: 2,
    image: "/twitter.webp",
    category: "Business",
  },
};

const employees = {
  Viraj: { answered: 2, polls: 0 },
  Slavomir: { answered: 0, polls: 0 },
  Lindsey: { answered: 0, polls: 0 },
  Isabella: { answered: 0, polls: 0 },
  Afra: { answered: 2, polls: 1 },
  Donghai: { answered: 2, polls: 1 },
  Brian: { answered: 0, polls: 0 },
  Aliyah: { answered: 2, polls: 1 },
};

const votes = {
  [0]: {
    pollId: "0",
    voter: "Afra",
    option: 0,
  },
  [1]: {
    pollId: "1",
    voter: "Afra",
    option: 0,
  },
  [2]: {
    pollId: "0",
    voter: "Donghai",
    option: 1,
  },
  [3]: {
    pollId: "1",
    voter: "Donghai",
    option: 1,
  },
  [2]: {
    pollId: "2",
    voter: "Aliyah",
    option: 1,
  },
  [3]: {
    pollId: "1",
    voter: "Aliyah",
    option: 1,
  },
  [3]: {
    pollId: "2",
    voter: "Viraj",
    option: 0,
  },
  [3]: {
    pollId: "3",
    voter: "Isabella",
    option: 0,
  },
  [3]: {
    pollId: "3",
    voter: "Afra",
    option: 1,
  },
};

export { getQuestions, getEmployees, getVotes, questions, employees, votes };
