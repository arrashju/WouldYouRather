const checker = (store) => (next) => (action) => {
  return next(action);
};

export default checker;
