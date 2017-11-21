export const FETCH_STOCKS_REQUEST = 'FETCH_STOCKS_REQUEST';
export const FETCH_STOCKS_FAILURE = 'FETCH_STOCKS_FAILURE';

export const fetchStocksRequest = () => ({
  type: FETCH_STOCKS_REQUEST
});

export const fetchStocksFailure = (ex) => ({
  type: FETCH_STOCKS_FAILURE,
  ex
});