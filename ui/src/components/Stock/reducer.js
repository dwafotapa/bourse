const initialState = {
  isFetching: false,
  hasFetchFailed: false,
  items: []
};

const stocks = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_STOCKS_REQUEST':
      return {
        ...state,
        isFetching: true,
        hasFetchFailed: false
      };
    case 'FETCH_STOCKS_FAILURE':
      return {
        ...state,
        isFetching: false,
        hasFetchFailed: true
      };
    case 'FETCH_STOCKS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        hasFetchFailed: false,
        items: action.stocks
      };
    default:
      return state;
  }
};

export default stocks;