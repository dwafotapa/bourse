import config from '../../config';
import { handleErrors } from '../../utils/fetch';

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

export const fetchStocks = () => {
  return (dispatch) => {
    dispatch(fetchStocksRequest());
    const url = config.getUrl('API_STOCKS_URL');
    return fetch(url)
      .then(handleErrors)
      .then(json => dispatch(fetchStocksSuccess(json)))
      .catch(ex => dispatch(fetchStocksFailure(ex)));
  };
};