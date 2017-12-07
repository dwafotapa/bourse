import { connect } from 'react-redux';
import { toJS } from '../../utils/to-js';
import StockTable from './StockTable';
import { fetchStocks, setStock } from './actions';
import * as selectors from './selectors';

const mapStateToProps = (state) => ({
  isFetching: selectors.getIsFetching(state),
  hasFetchFailed: selectors.getHasFetchFailed(state),
  ids: selectors.getIds(state),
  byId: selectors.getById(state),
  byFrozenId: selectors.getByFrozenId(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchStocks: () => {
    dispatch(fetchStocks());
  },
  setStock: (id, market, stock) => {
    dispatch(setStock(id, market, stock));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(StockTable));