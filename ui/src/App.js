import React, { Component } from 'react';
import StockTableContainer from './components/StockTable/StockTableContainer';
import StockChartContainer from './components/StockChart/StockChartContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <StockChartContainer
          width={960}
          height={500}
          margin={{
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
          }}
        />
        <StockTableContainer/>
      </div>
    );
  }
}

export default App;
