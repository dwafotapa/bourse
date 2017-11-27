import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: props.ids,
      byId: props.byId
    };
  }

  componentDidMount() {
    this.props.fetchStocks();
  }

  componentWillReceiveProps(nextProps) {
    const byId = nextProps.ids.reduce((acc, id) => {
      acc[id] = { ...nextProps.byId[id] };
      acc[id].byMarket = { ...nextProps.byId[id].byMarket };
      return acc;
    }, {});
    this.setState({
      ids: nextProps.ids,
      byId
    });
  }
  
  handleInputChange = (id, market, e) => {
    const { value } = e.target;
    if (value) {
      this.setState((prevState) => {
        const { byMarket } = { ...prevState.byId[id] };
        byMarket[market] = value;
        return {
          byId: {
            ...prevState.byId,
            [id]: {
              ...prevState.byId[id],
              byMarket
            }
          }
        };
      });
    }
  }
  
  handleInputBlur = (id, market) => {
    if (this.state.byId[id].byMarket[market] !== this.props.byId[id].byMarket[market]) {
      this.props.setStock(id, market, this.state.byId[id].byMarket[market]);
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
                      value={Number(byId[id].byMarket.CAC40)}
                      onChange={(e) => this.handleInputChange(id, 'CAC40', e)}
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
                      value={Number(byId[id].byMarket.NASDAQ)}
                      onChange={(e) => this.handleInputChange(id, 'NASDAQ', e)}
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