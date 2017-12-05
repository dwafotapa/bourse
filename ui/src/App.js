import React, { Component } from 'react';
import StockTableContainer from './components/StockTable/StockTableContainer';
import LineChartContainer from './components/LineChart/LineChartContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <LineChartContainer/>
        <StockTableContainer/>
      </div>
    );
  }
}

export default App;
