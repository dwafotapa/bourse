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
  items: PropTypes.array.isRequired,
  fetchStocks: PropTypes.func.isRequired
};

export default Stock;