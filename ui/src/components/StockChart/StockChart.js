import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import LineChart from '../D3Chart/LineChart';
import config from '../../config';

const StockChart = (props) => {
  const { width, height, margin, ids, byId, byFrozenId } = props;
  const chartSeries = [
    {
      field: 'CAC40',
      name: 'CAC40',
      color: 'steelblue',
      style: {
        fill: 'none',
        stroke: 'steelblue',
        'stroke-width': '2px'
      }
    },
    {
      field: 'NASDAQ',
      name: 'NASDAQ',
      color: 'darkorange',
      style: {
        fill: 'none',
        stroke: 'darkorange',
        'stroke-width': '2px'
      }
    }
  ];
  const stocks = ids.map((id) => ({
    id,
    NASDAQ: (byFrozenId[id] && byFrozenId[id].NASDAQ) || byId[id].NASDAQ,
    CAC40: (byFrozenId[id] && byFrozenId[id].CAC40) || byId[id].CAC40,
    timestamp: (byFrozenId[id] && byFrozenId[id].timestamp) || byId[id].timestamp
  }));
  return (
    <div>
      <LineChart
        width={width}
        height={height}
        margin={margin}
        data={stocks}
        chartSeries={chartSeries}
        xDomain={[ 0, config.NUMBER_OF_VALUES - 1 ]}
        yDomain={[ 0, d3.max(stocks, (stock) => Math.max(stock.CAC40, stock.NASDAQ)) ]}
      />
    </div>
  );
}

StockChart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  hasFetchFailed: PropTypes.bool.isRequired,
  ids: PropTypes.array.isRequired,
  byId: PropTypes.object.isRequired
};

export default StockChart;