import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { normalize } from 'normalizr';
import * as schema from './schema';
import * as actions from './actions';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  describe('fetchStocksRequest()', () => {
    it('should return a FETCH_STOCKS_REQUEST action', () => {
      const expectedAction = { type: actions.FETCH_STOCKS_REQUEST };

      const action = actions.fetchStocksRequest();

      expect(action).toEqual(expectedAction);
    });
  });

  describe('fetchStocksFailure()', () => {
    it('should return a FETCH_STOCKS_FAILURE action', () => {
      const ex = {};
      const expectedAction = {
        type: actions.FETCH_STOCKS_FAILURE,
        ex
      };
      
      const action = actions.fetchStocksFailure(ex);

      expect(action).toEqual(expectedAction);
    });
  });

  describe('fetchStocksSuccess()', () => {
    it('should return a FETCH_STOCKS_SUCCESS action', () => {
      const ids = [];
      const byId = {};
      const expectedAction = {
        type: actions.FETCH_STOCKS_SUCCESS,
        ids,
        byId
      };
      
      const action = actions.fetchStocksSuccess(ids, byId);

      expect(action).toEqual(expectedAction);
    });
  });

  describe('fetchStocks()', () => {
    it('should dispatch a FETCH_STOCKS_REQUEST action then a FETCH_STOCKS_FAILURE action if the request fails', () => {
      global.fetch = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          reject({ ok: false });
        });
      });
      const store = mockStore();
      const expectedActions = [
        { type: actions.FETCH_STOCKS_REQUEST },
        { type: actions.FETCH_STOCKS_FAILURE, ex: { ok: false } }
      ];
      
      return store.dispatch(actions.fetchStocks()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should dispatch a FETCH_STOCKS_REQUEST action then a FETCH_STOCKS_SUCCESS action if the request succeeds', () => {
      const stocks = [
        {
          "timestamp": 1511342109035,
          "index": 1,
          "stocks": {
            "NASDAQ": 17.016772978820796,
            "CAC40": 142.87102558704638
          }
        },
        {
          "timestamp": 1511342110039,
          "index": 2,
          "stocks": {
            "NASDAQ": 17.025985349921516,
            "CAC40": 145.49123235462636
          }
        }
      ];
      global.fetch = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve({
            ok: true,
            json: () => stocks
          });
        });
      });
      const store = mockStore();
      const normalized = normalize(stocks, schema.arrayOfStocks);
      const expectedActions = [
        { type: actions.FETCH_STOCKS_REQUEST },
        { type: actions.FETCH_STOCKS_SUCCESS, ids: normalized.result, byId: normalized.entities.stocks }
      ];
      
      return store.dispatch(actions.fetchStocks()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('setStock()', () => {
    it('should return a SET_STOCK action', () => {
      const byFrozenId = {
        1: {
          id: 1,
          CAC40: 123.456789,
          timestamp: 1234567890
        }
      }
      const expectedAction = {
        type: actions.SET_STOCK,
        byFrozenId
      };
      
      const action = actions.setStock(byFrozenId);

      expect(action).toEqual(expectedAction);
    });
  });
});