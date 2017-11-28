import { fromJS, List } from 'immutable';
import reducer from './reducer';
import * as actions from './actions';

describe('Stock/reducers', () => {
  const initialState = {
    isFetching: false,
    hasFetchFailed: false,
    ids: List([ 1, 2 ]),
    byId: fromJS ({
      1: {
        "timestamp": 1511342109035,
        "index": 1,
        "byMarket": {
          "NASDAQ": 11.11,
          "CAC40": 11.11
        }
      },
      2: {
        "timestamp": 1511342110039,
        "index": 2,
        "byMarket": {
          "NASDAQ": 22.22,
          "CAC40": 22.22
        }
      }
    })
  };

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
            "NASDAQ": 33.33,
            "CAC40": 33.33
          }
        }
      };
      const expectedState = {
        ...initialState,
        ids: List(ids),
        byId: fromJS(byId)
      };

      const state = reducer(initialState, { type: actions.FETCH_STOCKS_SUCCESS, ids, byId });

      expect(state).toEqual(expectedState);
    });

    it('should handle SET_STOCK', () => {
      const expectedState = {
        ...initialState,
        byId: fromJS({
          1: {
            "timestamp": 1511342109035,
            "index": 1,
            "byMarket": {
              "NASDAQ": 11.11,
              "CAC40": 111.111
            }
          },
          2: {
            "timestamp": 1511342110039,
            "index": 2,
            "byMarket": {
              "NASDAQ": 22.22,
              "CAC40": 22.22
            }
          }
        })
      };

      const state = reducer(initialState, { type: actions.SET_STOCK, id: 1, market: 'CAC40', stock: 111.111 });

      expect(state).toEqual(expectedState);
    });
  });
});  