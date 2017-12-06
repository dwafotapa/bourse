import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class LineChart extends Component {
  componentWillUpdate(nextProps) {
    this.emptyLineChart();
    this.drawLineChart(nextProps);
  }

  emptyLineChart = () => {
    const children = d3.selectAll("svg > *");
    children.remove();
  }
    
  drawLineChart = (nextProps) => {
    const { data } = nextProps;
    if (data.length === 0) {
      return;
    }

    let svg = d3.select("svg");

    // Set the dimensions and margins of the graph
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = svg.attr("width") - margin.left - margin.right;
    const height = svg.attr("height") - margin.top - margin.bottom;

    // Set the ranges and domains
    const xScale = d3.scaleLinear()
      .rangeRound([ 0, width ])
      .domain([ 0, 19 ]);
    
    const yScale = d3.scaleLinear()
      .rangeRound([ height, 0 ])
      .domain([ 0, d3.max(data, (item) => Math.max(item.CAC40, item.NASDAQ)) ]);

    // Define the line
    const line = d3.line()
      .x((item, index) => xScale(index))
      .y((item) => yScale(item.CAC40));

    const line2 = d3.line()
      .x((item, index) => xScale(index))
      .y((item) => yScale(item.NASDAQ));
    
    svg = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
      
    // Add the X axis
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));
    
    // Add the Y axis
    svg.append("g")
      .call(d3.axisLeft(yScale));

    // Add the line path
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", "2px")
      .attr("d", line);
    
    svg.append("path")
      .data([data])
      .attr("class", "line2")
      .attr("fill", "none")
      .attr("stroke", "darkorange")
      .attr("stroke-width", "2px")
      .attr("d", line2);
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
  data: PropTypes.array.isRequired
};

export default LineChart;