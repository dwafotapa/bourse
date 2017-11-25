import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Stock extends Component {
  componentDidMount() {
    this.props.fetchStocks();
  }

  render() {
    const { ids, byId } = this.props;
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>CAC40</th>
              {
                ids.map((id) => (
                  <td>
                    <input
                      type="text"
                      value={ byId[id].stocks.CAC40.toFixed(2) }
                      onChange={true}
                    />
                  </td>
                ))
              }
            </tr>
            <tr>
              <th>NASDAQ</th>
              {
                ids.map((id) => (
                  <td>
                    <input
                      type="text"
                      value={ byId[id].stocks.NASDAQ.toFixed(2) }
                      onChange={true}
                    />
                  </td>
                ))
              }
            </tr>
          </tbody>
        </table>
      </div>
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