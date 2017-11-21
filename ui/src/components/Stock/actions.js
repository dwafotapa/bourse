export const FETCH_STOCKS_REQUEST = 'FETCH_STOCKS_REQUEST';
export const FETCH_STOCKS_FAILURE = 'FETCH_STOCKS_FAILURE';
export const FETCH_STOCKS_SUCCESS = 'FETCH_STOCKS_SUCCESS';

export const fetchStocksRequest = () => ({
  type: FETCH_STOCKS_REQUEST
});

export const fetchStocksFailure = (ex) => ({
  type: FETCH_STOCKS_FAILURE,
  ex
});

export const fetchStocksSuccess = (stocks) => ({
  type: FETCH_STOCKS_SUCCESS,
  stocks
});