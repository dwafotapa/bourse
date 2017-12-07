import { connect } from 'react-redux';
import { toJS } from '../../utils/to-js';
import StockChart from './StockChart';
import * as selectors from '../StockTable/selectors';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isFetching: selectors.getIsFetching(state),
  hasFetchFailed: selectors.getHasFetchFailed(state),
  ids: selectors.getIds(state),
  byId: selectors.getById(state),
  byFrozenId: selectors.getByFrozenId(state),
});

export default connect(mapStateToProps)(toJS(StockChart));