import { connect } from 'react-redux';
import Stock from './Stock';
import { fetchStocks, setStock } from './actions';
import {
  getIsFetching,
  getHasFetchFailed,
  getIds,
  getById
} from './selectors';

const mapStateToProps = (state) => ({
  isFetching: getIsFetching(state),
  hasFetchFailed: getHasFetchFailed(state),
  ids: getIds(state),
  byId: getById(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchStocks: () => {
    dispatch(fetchStocks());
  },
  setStock: (id, market, stock) => {
    dispatch(setStock(id, market, stock));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Stock);