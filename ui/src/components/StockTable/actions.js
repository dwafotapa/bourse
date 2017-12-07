import { normalize } from 'normalizr';
import * as schema from './schema';
import config from '../../config';
import { handleErrors } from '../../utils/fetch';

export const FETCH_STOCKS_REQUEST = 'FETCH_STOCKS_REQUEST';
export const FETCH_STOCKS_FAILURE = 'FETCH_STOCKS_FAILURE';
export const FETCH_STOCKS_SUCCESS = 'FETCH_STOCKS_SUCCESS';
export const SET_STOCK = 'SET_STOCK';

export const fetchStocksRequest = () => ({
  type: FETCH_STOCKS_REQUEST
});

export const fetchStocksFailure = (ex) => ({
  type: FETCH_STOCKS_FAILURE,
  ex
});

export const fetchStocksSuccess = (ids, byId) => ({
  type: FETCH_STOCKS_SUCCESS,
  ids,
  byId
});

export const fetchStocks = () => {
  return async (dispatch) => {
    dispatch(fetchStocksRequest());
    const url = `${config.get('API_STOCKS_URL')}?count=${config.NUMBER_OF_VALUES}`;
    try {
      const response = await fetch(url);
      const json = await handleErrors(response);
      const normalized = normalize(json, schema.arrayOfStocks);
      dispatch(fetchStocksSuccess(normalized.result, normalized.entities.stocks));
    } catch (ex) {
      dispatch(fetchStocksFailure(ex));
    }
  };
};

export const setStock = (byFrozenId) => ({
  type: SET_STOCK,
  byFrozenId
});