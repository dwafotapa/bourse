import React, { Component } from 'react';
import StockContainer from './components/Stock/StockContainer';
import LineChartContainer from './components/LineChart/LineChartContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <LineChartContainer/>
        <StockContainer/>
      </div>
    );
  }
}

export default App;
