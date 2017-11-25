import deepFreeze from 'deep-freeze';
import reducer from './reducer';
import {
  FETCH_STOCKS_REQUEST,
  FETCH_STOCKS_FAILURE,
  FETCH_STOCKS_SUCCESS
} from './actions';

describe('Stock/reducers', () => {
  const initialState = {
    isFetching: false,
    hasFetchFailed: false,
    items: [
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
    ]
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

      const state = reducer(initialState, { type: 'FETCH_STOCKS_REQUEST' });

      expect(state).toEqual(expectedState);
    });
  });
});  