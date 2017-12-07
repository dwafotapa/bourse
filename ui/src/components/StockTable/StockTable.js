import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StockCell from './StockCell/StockCell';
import config from '../../config';
import styles from './StockTable.css';

class StockTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: [],
      byId: {},
      byFrozenId: {}
    };
  }

  componentDidMount() {
    this.fetchStocksInterval = setInterval(() => this.props.fetchStocks(), 1000);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ids: [ ...nextProps.ids ],
      byId: { ...nextProps.byId },
      byFrozenId: { ...nextProps.byFrozenId }
    });
  }
  
  componentWillUnmount() {
    clearInterval(this.fetchStocksInterval);
  }

  handleInputFocus = () => {
    clearInterval(this.fetchStocksInterval);
  }

  handleInputChange = (id, market, e) => {
    const { value } = e.target;
    if (isNaN(value)) {
      return;
    }

    this.setState((prevState) => ({
      byFrozenId: {
        ...prevState.byFrozenId,
        [id]: {
          ...prevState.byFrozenId[id],
          id,
          [market]: value,
          timestamp: Date.now()
        }
      }
    }));
  }

  handleInputKeyUp = (e) => {
    if (e.which === 13) {
      e.target.blur();
    }
  }
  
  handleInputBlur = (id, market) => {
    this.props.setStock(this.state.byFrozenId);
    this.fetchStocksInterval = setInterval(() => this.props.fetchStocks(), 1000);
  }

  render() {
    const { ids, byId, byFrozenId } = this.state;
    const { isFetching, hasFetchFailed } = this.props;
    if (hasFetchFailed) {
      return <div>Failed to fetch data. Please reload the page.</div>;
    }
    
    if (ids.length === 0) {
      if (isFetching) {
        return <div>Loading...</div>;
      }

      return <div>No stocks found.</div>;
    }

    const { CAC40, NASDAQ } = config;
    return (
      <div className={styles.StockTable}>
        <table>
          <tbody>
            <tr>
              <th>{CAC40}</th>
              {
                ids.map((id) => (
                  <StockCell
                    key={id}
                    id={id}
                    marketProp={CAC40}
                    value={(byFrozenId[id] && byFrozenId[id].CAC40) || byId[id].CAC40}
                    handleInputFocus={this.handleInputFocus}
                    handleInputChange={this.handleInputChange}
                    handleInputKeyUp={this.handleInputKeyUp}
                    handleInputBlur={this.handleInputBlur}
                  />
                ))
              }
            </tr>
            <tr>
              <th>{NASDAQ}</th>
              {
                ids.map((id) => (
                  <StockCell
                    key={id}
                    id={id}
                    marketProp={NASDAQ}
                    value={(byFrozenId[id] && byFrozenId[id].NASDAQ) || byId[id].NASDAQ}
                    handleInputFocus={this.handleInputFocus}
                    handleInputChange={this.handleInputChange}
                    handleInputKeyUp={this.handleInputKeyUp}
                    handleInputBlur={this.handleInputBlur}
                  />
                ))
              }
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

StockTable.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  hasFetchFailed: PropTypes.bool.isRequired,
  ids: PropTypes.array.isRequired,
  byId: PropTypes.object.isRequired,
  byFrozenId: PropTypes.object.isRequired,
  fetchStocks: PropTypes.func.isRequired
};

export default StockTable;