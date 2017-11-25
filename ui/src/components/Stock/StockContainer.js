import { connect } from 'react-redux';
import Stock from './Stock';
import { fetchStocks } from './actions';
import {
  getIsFetching,
  getHasFetchFailed,
  getStocks
} from './selectors';

const mapStateToProps = (state) => ({
  isFetching: getIsFetching(state),
  hasFetchFailed: getHasFetchFailed(state),
  items: getStocks(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchStocks: () => {
    dispatch(fetchStocks());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Stock);