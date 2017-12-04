import { connect } from 'react-redux';
import LineChart from './LineChart';
import * as selectors from '../Stock/selectors';

const mapStateToProps = (state) => ({
  isFetching: selectors.getIsFetching(state),
  hasFetchFailed: selectors.getHasFetchFailed(state),
  ids: selectors.getIds(state),
  byId: selectors.getById(state)
});

export default connect(mapStateToProps)(LineChart);
