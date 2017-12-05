import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class LineChart extends Component {
  componentDidMount() {
    this.renderLineChart();
  }

  componentDidUpdate() {
    this.renderLineChart();
  }

  renderLineChart = () => {
    const { ids, byId } = this.props;
    if (ids.length === 0) {
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
      .domain([ 0, d3.max(ids, (id) => byId[id].CAC40) ]);

    // Define the line
    const line = d3.line()
      .x((id, index) => xScale(index))
      .y((id) => yScale(byId[id].CAC40));
    
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
      .data([ids])
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", "2px")
      .attr("d", line);
  }

  render() {
    return (
      <div>
        <svg width="960" height="500"></svg>
      </div>
    );
  }
}

LineChart.propTypes = {
  ids: PropTypes.array.isRequired,
  byId: PropTypes.object.isRequired
};

export default LineChart;