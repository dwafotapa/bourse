import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class LineChart extends Component {
  componentWillUpdate(nextProps) {
    this.empty("svg > *");
    this.draw(nextProps);
  }

  empty = (selection) => {
    const children = d3.selectAll(selection);
    children.remove();
  }
  
  getDimensions = (width, height, margin) => {
    return {
      width: width - margin.left - margin.right,
      height: height - margin.top - margin.bottom
    }
  }

  draw = (nextProps) => {
    const { margin, data, chartSeries, xDomain, yDomain } = nextProps;
    if (data.length === 0) {
      return;
    }

    const svg = d3.select("svg")
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Get the dimensions of the graph
    const { width, height } = this.getDimensions(nextProps.width, nextProps.height, margin);

    // Set the ranges and domains
    const xScale = d3.scaleLinear()
      .rangeRound([ 0, width ])
      .domain(xDomain);
    
    const yScale = d3.scaleLinear()
      .rangeRound([ height, 0 ])
      .domain(yDomain);
    
    // Add the X axis
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));
    
    // Add the Y axis
    svg.append("g")
      .call(
        d3.axisLeft(yScale)
          .ticks(10)
          .tickSize(-width)
      );
    
    chartSeries.forEach((chartSerie, index) => {
      // Define the line
      const line = d3.line()
        .x((item, index) => xScale(index))
        .y((item) => yScale(item[chartSerie.field]));
        
      // Add the line path
      const path = svg.append("path")
        .data([data])
        .attr("d", line);
      for (const prop in chartSerie.style) {
        path.attr(prop, chartSerie.style[prop]);
      }
    });
  }

  render() {
    const { width, height } = this.props;
    return (
      <svg
        width={width}
        height={height}
      />
    );
  }
}

LineChart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  chartSeries: PropTypes.array.isRequired,
  xDomain: PropTypes.array.isRequired,
  yDomain: PropTypes.array.isRequired
};

export default LineChart;