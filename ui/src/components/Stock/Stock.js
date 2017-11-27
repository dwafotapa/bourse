import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: fromJS(props.ids),
      byId: fromJS(props.byId)
    };
  }

  componentDidMount() {
    this.props.fetchStocks();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ids: fromJS(nextProps.ids),
      byId: fromJS(nextProps.byId)
    });
  }
  
  handleInputChange = (id, market, e) => {
    const { value } = e.target;
    if (!isNaN(value)) {
      this.setState((prevState) => ({
        byId: prevState.byId.setIn([id.toString(), 'byMarket', market], Number(value))
      }));
    }
  }

  handleInputKeyUp = (e) => {
    if (e.which === 13) {
      e.target.blur();
    }
  }
  
  handleInputBlur = (id, market) => {
    if (this.state.byId.getIn([id.toString(), 'byMarket', market]) !== this.props.byId[id].byMarket[market]) {
      this.props.setStock(id, market, this.state.byId.getIn([id.toString(), 'byMarket', market]));
    }
  }

  render() {
    const { ids, byId } = this.state;
    const { isFetching, hasFetchFailed } = this.props;
    if (isFetching) {
      return <div>Loading...</div>;
    }

    if (hasFetchFailed) {
      return <div>Failed to fetch data. Please reload the page.</div>;
    }

    if (ids.length === 0) {
      return <div>No stocks found.</div>;
    }

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>CAC40</th>
              {
                ids.map((id) => (
                  <td key={id}>
                    <input
                      type="text"
                      value={byId.getIn([id.toString(), 'byMarket', 'CAC40'])}
                      onChange={(e) => this.handleInputChange(id, 'CAC40', e)}
                      onKeyUp={(e) => this.handleInputKeyUp(e)}
                      onBlur={() => this.handleInputBlur(id, 'CAC40')}
                    />
                  </td>
                ))
              }
            </tr>
            <tr>
              <th>NASDAQ</th>
              {
                ids.map((id) => (
                  <td key={id}>
                    <input
                      type="text"
                      value={byId.getIn([id.toString(), 'byMarket', 'NASDAQ'])}
                      onChange={(e) => this.handleInputChange(id, 'NASDAQ', e)}
                      onKeyUp={(e) => this.handleInputKeyUp(e)}
                      onBlur={() => this.handleInputBlur(id, 'NASDAQ')}
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