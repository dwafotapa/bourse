import deepFreeze from 'deep-freeze';
import reducer from './reducer';
import * as actions from './actions';

describe('Stock/reducers', () => {
  const initialState = {
    isFetching: false,
    hasFetchFailed: false,
    ids: [ 1, 2 ],
    byId: {
      1: {
        "timestamp": 1511342109035,
        "index": 1,
        "byMarket": {
          "NASDAQ": 17.016772978820796,
          "CAC40": 142.87102558704638
        }
      },
      2: {
        "timestamp": 1511342110039,
        "index": 2,
        "byMarket": {
          "NASDAQ": 17.025985349921516,
          "CAC40": 145.49123235462636
        }
      }
    }
  };
  deepFreeze(initialState);

  describe('stocks()', () => {
    it('should return the initial state by default', () => {
      const expectedState = { ...initialState };

      const state = reducer(initialState, { type: 'DEFAULT' });

      expect(state).toEqual(expectedState);
    });

    it('should handle FETCH_STOCKS_REQUEST', () => {
      const expectedState = {
        ...initialState,
        isFetching: true
      };

      const state = reducer(initialState, { type: actions.FETCH_STOCKS_REQUEST });

      expect(state).toEqual(expectedState);
    });

    it('should handle FETCH_STOCKS_FAILURE', () => {
      const expectedState = {
        ...initialState,
        hasFetchFailed: true
      };

      const state = reducer(initialState, { type: actions.FETCH_STOCKS_FAILURE });

      expect(state).toEqual(expectedState);
    });

    it('should handle FETCH_STOCKS_SUCCESS', () => {
      const ids = [ 3 ];
      const byId = {
        3: {
          "timestamp": 1511649230628,
          "index": 3,
          "byMarket": {
            "NASDAQ": 6.371151559189485,
            "CAC40": 6.3779880261746105
          }
        },
      }
      const expectedState = {
        ...initialState,
        ids: [ ...ids ],
        byId: { ...byId }
      };

      const state = reducer(initialState, { type: actions.FETCH_STOCKS_SUCCESS, ids, byId });

      expect(state).toEqual(expectedState);
    });

    it('should handle SET_STOCK', () => {
      const expectedState = {
        ...initialState,
        byId: {
          1: {
            "timestamp": 1511342109035,
            "index": 1,
            "byMarket": {
              "NASDAQ": 17.016772978820796,
              "CAC40": 6.266084563112287
            }
          },
          2: {
            "timestamp": 1511342110039,
            "index": 2,
            "byMarket": {
              "NASDAQ": 17.025985349921516,
              "CAC40": 145.49123235462636
            }
          }
        }
      };

      const state = reducer(initialState, { type: actions.SET_STOCK, id: 1, market: 'CAC40', stock: 6.266084563112287 });

      expect(state).toEqual(expectedState);
    });
  });
});  