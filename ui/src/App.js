import React from 'react';
import StockChartContainer from './components/StockChart/StockChartContainer';
import StockTableContainer from './components/StockTable/StockTableContainer';
import './App.css';

const App = () => (
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

export default App;
