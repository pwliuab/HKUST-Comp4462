import React from "react";
import * as d3 from "d3";
import {event} from 'd3';
import { Slider } from 'material-ui-slider';
import d3Tip from 'd3-tip'
import BubbleChart from './BubbleChart';
const axios = require('axios').default;

class ParallelGraph extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      data: [],
      current: 1984,
      previous: 0,
    }
  }
  renderGraph(selectedYear){

    const height = 600;
    const width = 400;
    // remove svg before drawing svg , prevent repeating drawing.
    d3.selectAll('svg').remove();
    d3.selectAll('.line').remove();
    d3.selectAll('.tooltip').remove();
    const svg = d3.select(this.refs.testing)
                  .append('svg')
                  .attr('width', 1000)
                  .attr('hegith', height);
    const margin = { left: 40, top: 30, right: 40, bottom: 20 }
    const dimensions = [ 'GDP_Growth',  'Medal','Athelets','Population','GDP','GDP_Per_Capita']
    const dimension2 = [ 'GDP_Growth',  'Medal','Athelets','Population','GDP','GDP_Per_Capita','Continent']
    const data = this.state.data.filter(d => d.Year===selectedYear)
                                //& d.Medal!==0 & d.Population<400000000 &d.GDP_Growth>-6)

    // Use scalePoint because x-axis domain is discrete
    const xScale = d3.scalePoint()
      .range([margin.left, 1000 - margin.right])
      .domain(dimensions)
    //
    // // // Plot x-axis at the top, remove the line stroke
    svg.append('g')
      .call(d3.axisTop(xScale))
      .attr('transform', `translate(0,${margin.top})`)
      .selectAll('path')
        .attr('stroke', 'none');

    // Make one y-scale for each dimension
    const yScales = dimensions.map(dimension =>
      d3.scaleLinear()
        .range([height - margin.bottom, margin.top])
        .domain(d3.extent(data.map(d => d[dimension])))
    )

    var myColor = d3.scaleOrdinal()
      .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
      .range(d3.schemeSet2 );

    // Plot axes for each dimension
    dimensions.forEach((dimension, i) => {
      svg.append('g')
        .call(d3.axisLeft(yScales[i]).tickFormat(d3.format('.2s')))
        .attr('transform', `translate(${xScale(dimension)},0)`)
    })
    // Line generator, carefully handle each dimension

    var highlight=function(a,d){
      d3.selectAll(".line")
        .transition().duration(200)
        .style("stroke", "lightgrey")
        .style("opacity", "0.2")
      // Second the hovered takes its color
        d3.selectAll(".line").filter("."+d.Continent)
          .transition().duration(100)
          .style("stroke", myColor(d.Continent))
          .style("opacity", "1")

      }

    function path(d) {
        return d3.line()(dimensions.map(function(p,i) { return [xScale(p), yScales[i](d[p])] }))
    }


    const tooltip = d3Tip()
      //.style('border', 'solid 3px black')
      .style('background-color', '#5F9EA0')
      .style('border-radius', '2px')
      .attr('class','tooltip')
      //.style('float', 'left')
      .style('color','white')
      .style('position','left')
      //.style('font-family', 'monospace')
      .html((event, d) => `
        <div style='float: right'>
          ${d.Country} <br/>
          Continent: ${d.Continent} <br/>
        </div>`)

    svg.call(tooltip)

    var doNotHighlight = function(i,d){
        d3.selectAll(".line")
          .transition().duration(200).delay(500)
          .style("stroke", function(d){ return( myColor(d.Continent))} )
          .style("opacity", "1")

    }

    var clickevent=function(event,d){
      d3.selectAll(".line")
        .transition().duration(200)
        .style("stroke", "lightgrey")
        .style("opacity", "0.1")
      d3.select(this)
          .transition().duration(100)
          .style("stroke", myColor(d.Continent))
          .style("opacity", "1")
    }

    // Just like a line chart!
    svg.append('g')
      .selectAll('path')
      .data(data)
      .enter()
      .append('path')
        .attr("class", function (d) {
          return "line " + d.Continent } )
        .attr('d', path)
        .attr('fill', 'none')
        .attr('stroke', d=>myColor(d.Continent))
        .attr('stroke-width','3px')
        .attr('stroke-opacity','0.8')
      .on("mouseover.text", tooltip.show)
      .on("mouseover.line", highlight)
      .on('click',clickevent)
      .on("mouseleave.text", tooltip.hide)
      .on("mouseleave.line", doNotHighlight)
  }
  renderParallelGraph(resData){
      if(!resData) return (<div/>);

      const height = 600;
      const width = 400;


      const svg = d3.select(this.myRef.current);
      const margin = { left: 40, top: 30, right: 40, bottom: 20 }
      const dimensions = [ 'GDP_Growth',  'Medal','Athelets','Population','GDP','GDP_Per_Capita']
      const dimension2 = [ 'GDP_Growth',  'Medal','Athelets','Population','GDP','GDP_Per_Capita','Continent']
      const data = resData.filter(d => d.Year===this.state.current)
                                  //& d.Medal!==0 & d.Population<400000000 &d.GDP_Growth>-6)
      // Use scalePoint because x-axis domain is discrete
      const xScale = d3.scalePoint()
        .range([margin.left, 1000 - margin.right])
        .domain(dimensions)
      //
      // // // Plot x-axis at the top, remove the line stroke
      svg.append('g')
        .call(d3.axisTop(xScale))
        .attr('transform', `translate(0,${margin.top})`)
        .selectAll('path')
          .attr('stroke', 'none');

      // Make one y-scale for each dimension
      const yScales = dimensions.map(dimension =>
        d3.scaleLinear()
          .range([height - margin.bottom, margin.top])
          .domain(d3.extent(data.map(d => d[dimension])))
      )

      var myColor = d3.scaleOrdinal()
        .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
        .range(d3.schemeSet2 );

      // Plot axes for each dimension
      dimensions.forEach((dimension, i) => {
        svg.append('g')
          .call(d3.axisLeft(yScales[i]).tickFormat(d3.format('.2s')))
          .attr('transform', `translate(${xScale(dimension)},0)`)
      })
      // Line generator, carefully handle each dimension

      var highlight=function(a,d){
        d3.selectAll(".line")
          .transition().duration(200)
          .style("stroke", "lightgrey")
          .style("opacity", "0.2")
        // Second the hovered takes its color
          d3.selectAll(".line").filter("."+d.Continent)
            .transition().duration(100)
            .style("stroke", myColor(d.Continent))
            .style("opacity", "1")

        }

      function path(d) {
          return d3.line()(dimensions.map(function(p,i) { return [xScale(p), yScales[i](d[p])] }))
      }


      const tooltip = d3Tip()
        //.style('border', 'solid 3px black')
        .style('background-color', '#5F9EA0')
        .style('border-radius', '2px')
        //.style('float', 'left')
        .style('color','white')
        .style('position','left')
        //.style('font-family', 'monospace')
        .html((event, d) => `
          <div style='float: right'>
            ${d.Country} <br/>
            Continent: ${d.Continent} <br/>
          </div>`)

      svg.call(tooltip)

      var doNotHighlight = function(i,d){
          d3.selectAll(".line")
            .transition().duration(200).delay(500)
            .style("stroke", function(d){ return( myColor(d.Continent))} )
            .style("opacity", "1")

      }

      var clickevent=function(event,d){
        d3.selectAll(".line")
          .transition().duration(200)
          .style("stroke", "lightgrey")
          .style("opacity", "0.1")
        d3.select(this)
            .transition().duration(100)
            .style("stroke", myColor(d.Continent))
            .style("opacity", "1")
      }

      // Just like a line chart!
      svg.append('g')
        .selectAll('path')
        .data(data)
        .enter()
        .append('path')
          .attr("class", function (d) {
            return "line " + d.Continent } )
          .attr('d', path)
          .attr('fill', 'none')
          .attr('stroke', d=>myColor(d.Continent))
          .attr('stroke-width','3px')
          .attr('stroke-opacity','0.8')
        .on("mouseover.text", tooltip.show)
        .on("mouseover.line", highlight)
        .on('click',clickevent)
        .on("mouseleave.text", tooltip.hide)
        .on("mouseleave.line", doNotHighlight)

        return(
          <svg ref={this.myRef} style={{height:500, width:1000}} />
        );
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
        <div style={{position:"relative", top:-100}} ref="testing"/>
      <div style={{position:"relative", top:500}}>
        <Slider
          aria-label="Temperature"
          defaultValue={1984}
          valueLabelDisplay="auto"
          onChange ={this.handleChange}
          min={1984}
          max={1993}
        />
        Parallel Graph selected year: <span style={{color:'green', fontWeight:'bold'}}>{this.state.current}</span>
       </div>

       <BubbleChart/>
      </div>
    );
  }
}

export default ParallelGraph ;
