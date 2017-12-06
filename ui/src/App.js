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
        />
        <StockTableContainer/>
      </div>
    );
  }
}

export default App;
