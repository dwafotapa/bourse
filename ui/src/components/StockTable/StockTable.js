import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StockCell from './StockCell/StockCell';
import config from '../../config';
import styles from './StockTable.css';

class StockTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSyncOn: true,
      ids: [],
      byId: {}
    };
  }

  componentDidMount() {
    this.fetchStocksInterval = setInterval(() => this.props.fetchStocks(), 1000);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ids: [ ...nextProps.ids ],
      byId: { ...nextProps.byId }
    });
  }
  
  componentWillUnmount() {
    clearInterval(this.fetchStocksInterval);
  }

  handleInputFocus = () => {
    this.setState((prevState) => {
      clearInterval(this.fetchStocksInterval);
      return { isSyncOn : false };
    });
  }

  handleInputChange = (id, market, e) => {
    const { value } = e.target;
    if (isNaN(value)) {
      return;
    }

    this.setState((prevState) => ({
      byId: {
        ...prevState.byId,
        [id]: {
          ...prevState.byId[id],
          [market]: value
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
    this.setState((prevState) => {
      this.fetchStocksInterval = setInterval(() => this.props.fetchStocks(), 1000);
      return { isSyncOn : true };
    });

    if (this.state.byId[id][market] !== this.props.byId[id][market]) {
      this.props.setStock(id, market, this.state.byId[id][market]);
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
                    prop={CAC40}
                    value={byId[id].CAC40}
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
                    prop={NASDAQ}
                    value={byId[id].NASDAQ}
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
  fetchStocks: PropTypes.func.isRequired
};

export default StockTable;