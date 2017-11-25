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
        isFetching: true
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
        ids: action.ids,
        byId: action.stocks
      };
    default:
      return state;
  }
};

export default stocks;