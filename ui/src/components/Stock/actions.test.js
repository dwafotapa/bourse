import thunk from 'redux-thunk';
// import configureMockStore from 'redux-mock-store';
// import fetchMock from 'fetch-mock';
// import config from '../../config';
import * as actions from './actions';

describe('Stock/actions', () => {
  describe('fetchStocksRequest()', () => {
    it('should create a FETCH_STOCKS_REQUEST action', () => {
      const expectedAction = { type: actions.FETCH_STOCKS_REQUEST };

      const action = actions.fetchStocksRequest();

      expect(action).toEqual(expectedAction);
    });
  });
  
  describe('fetchStocksFailure()', () => {
    it('should create a FETCH_STOCKS_FAILURE action', () => {
      const ex = {};
      const expectedAction = {
        type: actions.FETCH_STOCKS_FAILURE,
        ex
      };
      
      const action = actions.fetchStocksFailure(ex);

      expect(action).toEqual(expectedAction);
    });
  });
});