import { fromJS, List, Map } from 'immutable';
import * as actions from './actions';

const initialState = {
  isFetching: true,
  hasFetchFailed: false,
  ids: List(),
  byId: Map(),
  byFrozenId: Map()
};

const stocks = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_STOCKS_REQUEST:
      return {
        ...state,
        isFetching: true,
        hasFetchFailed: false
      };
    case actions.FETCH_STOCKS_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasFetchFailed: true
      };
    case actions.FETCH_STOCKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasFetchFailed: false,
        ids: List(action.ids),
        byId: fromJS(action.byId)
      };
    case actions.SET_STOCK:
      return {
        ...state,
        byFrozenId: fromJS(action.byFrozenId)
      };
    default:
      return state;
  }
};

export default stocks;