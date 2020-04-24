const updateCurrPage = page => {
  return {
    type: "updatecurrpage",
    currentPage: page
  };
};

export default updateCurrPage;
