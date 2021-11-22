import React from "react";
import * as d3 from "d3";
import {event} from 'd3';
import { Slider } from 'material-ui-slider';
import d3Tip from 'd3-tip';
import './bbc.css'
const axios = require('axios').default;

class BubbleChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      current: 1984,
      previous: 0,
    }
  }
  renderGraph(selectedYear){
    // clean the screen before the update of the graph
    d3.selectAll('svg').remove();
    d3.selectAll('circles').remove();
    // filter data to show specific year of data
    const data=this.state.data.filter(d=>d.Year===selectedYear)
    const margin = { left: 100, top: 100, right: 50, bottom: 20 }
    const height = 600;
    const width = 1000;
    const svg = d3.select(this.refs.bubble)
                  .append('svg')
                  .attr('height', height)
                  .attr('width', width);


    const xScale = d3.scaleLinear()
    .range([margin.left, width - margin.right])
    .domain(d3.extent(data.map(d => d.GDP_Per_Capita)))

    var z = d3.scaleLinear()
      .domain(d3.extent(data.map(d => d.Population)))
      .range([ 4, 40]);

    svg.append('g')
      .call(d3.axisBottom(xScale))
      .attr('transform', `translate(0,${height - margin.bottom})`)

    const yScale = d3.scaleLinear()
      .range([height - margin.bottom, margin.top])
      .domain(d3.extent(data.map(d => d.Athelets)))

    svg.append('g')
      .call(d3.axisLeft(yScale).tickFormat(d3.format('.2s')))
      .attr('transform', `translate(${margin.left},0)`)

  // Setup the tooltip style, these are html and css, you can always lookup for their usage
  // by searching the keywords
    var myColor = d3.scaleOrdinal()
      .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
      .range(d3.schemeSet2);

    const tooltip = d3Tip()
    //.style('border', 'solid 3px black')
    .style('background-color', 'black')
    .style('border-radius', '10px')
    .style('float', 'left')
    .style('color','white')
    //.style('font-family', 'monospace')
    .html((event, d) => `
      <div style='float: right'>
        Country: ${d.Country} <br/>
        Population: ${d.Population} <br/>
        GDP Per Capita: ${d.GDP_Per_Capita} <br/>
        Athletes: ${d.Athelets} <br/>
      </div>`)
  svg.call(tooltip)

  svg.selectAll('circles')
    .data(data)
    .enter()
    .append('circle')
      .attr("class", "bubbles")
      .attr('cx', d => xScale(d.GDP_Per_Capita))
      .attr('cy', d => yScale(d.Athelets))
      .attr('r', d=>z(d.Population))
      .attr('opacity', 0.9)
      .attr('stroke','white')
      .attr('fill', d => myColor(d.Continent))
    // When "mouseover" event triggers, show the tooltip
    .on('mouseover', tooltip.show)
    // Hide the tooltip when "mouseout"
    .on('mouseout', tooltip.hide)

  }
  componentDidMount() {
    const url = 'https://raw.githubusercontent.com/yliugt/4462/main/olympic.json';
    axios.get(url).then( res => {
      this.setState({data:res.data});
      this.renderGraph(1984);
    });
  }
  handleChange = (newValue,event) =>{
    console.log(event);
      var newV = 0;
      if(this.state.previous == 0){
        newV = this.state.current + (parseInt(newValue) - this.state.current) * 4;
        this.state.previous = parseInt(newValue);
      } else {
        newV = this.state.current + (parseInt(newValue) - this.state.previous)*4;
        this.state.previous = parseInt(newValue);
      }
      console.log("newValue" + newValue);
      console.log("current value" + this.state.current);
      console.log("newV" + newV);
      this.setState({current:newV});
      // console.log(event);
      // render agian when there is any changes
      console.log("xxcurrent value" + this.state.current);
      this.renderGraph(newV);
  }
  render() {
    // {this.renderParallelGraph(this.state.data)}

    return(
        <div style={{position:"relative", top:20}}>
        <div style={{position:"relative", top:-100}} ref="bubble"/>
      <div style={{position:"relative", top:300}}>
        <Slider
          aria-label="Temperature"
          defaultValue={1984}
          valueLabelDisplay="auto"
          onChange ={this.handleChange}
          min={1984}
          max={1993}
        />
       </div>
       <div style={{position:"relative",top:270}}>
        selected year : {this.state.current}
       </div>
      </div>
    );
  }
}

export default BubbleChart ;
