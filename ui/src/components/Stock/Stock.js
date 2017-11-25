import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Stock extends Component {
  componentDidMount() {
    this.props.fetchStocks();
  }

  render() {
    return (
      <div>Stock</div>
    );
  }
}

Stock.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  hasFetchFailed: PropTypes.bool.isRequired,
  ids: PropTypes.array.isRequired,
  byId: PropTypes.object.isRequired,
  fetchStocks: PropTypes.func.isRequired
};

export default Stock;