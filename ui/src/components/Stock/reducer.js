import { fromJS, List } from 'immutable';
import * as actions from './actions';

const initialState = {
  isFetching: false,
  hasFetchFailed: false,
  ids: List([]),
  byId: fromJS({})
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
        byId: state.byId.setIn([ action.id.toString(), 'byMarket', action.market ], action.stock)
      };
    default:
      return state;
  }
};

export default stocks;