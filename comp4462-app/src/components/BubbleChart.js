import React from "react";
import * as d3 from "d3";
import {event} from 'd3';
import { Slider } from 'material-ui-slider';
import d3Tip from 'd3-tip';
import './bbc.css';

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
    d3.selectAll('.tooltip').remove();

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
    .attr("class",'tooltip')
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
    svg.append("text")
    .attr('transform', 'translate(100,100)')
            .attr("x", 0)
            .attr("y", -20)
            .attr("text-anchor", "left")
            .style("font-size", "15px")
            .style("fill", "grey")
            .style("font-weight", "bold")
            .style("max-width", 400)
            .text("Asia");
    svg
      .append('circle')
      .attr('transform', 'translate(77,73)')
    .attr("cx",0).attr("cy",0).attr("r",10)
      .style("fill", myColor('Asia'))
//////////////////////////////////////////////////////////
// add svg label and text
/////////////////////////////////////////////////////////
svg.append("text")
.attr('transform', 'translate(193,100)')
        .attr("x", 0)
        .attr("y", -20)
        .attr("text-anchor", "left")
        .style("font-size", "15px")
        .style("fill", "grey")
        .style("font-weight", "bold")
        .style("max-width", 400)
        .text("Europe");
svg
  .append('circle')
  .attr('transform', 'translate(170,73)')
.attr("cx",0).attr("cy",0).attr("r",10)
  .style("fill", myColor('Europe') );
//////////////////////////////////////////////////////////
// add svg label and text
/////////////////////////////////////////////////////////
svg.append("text")
.attr('transform', 'translate(293,100)')
        .attr("x", 0)
        .attr("y", -20)
        .attr("text-anchor", "left")
        .style("font-size", "15px")
        .style("fill", "grey")
        .style("font-weight", "bold")
        .style("max-width", 400)
        .text("Americas");
svg
  .append('circle')
  .attr('transform', 'translate(270,73)')
.attr("cx",0).attr("cy",0).attr("r",10)
  .style("fill", myColor('Americas'));
//////////////////////////////////////////////////////////
// add svg label and text
/////////////////////////////////////////////////////////
  svg.append("text")
  .attr('transform', 'translate(403,100)')
          .attr("x", 0)
          .attr("y", -20)
          .attr("text-anchor", "left")
          .style("font-size", "15px")
          .style("fill", "grey")
          .style("font-weight", "bold")
          .style("max-width", 400)
          .text("Africa");
  svg
    .append('circle')
    .attr('transform', 'translate(380,73)')
  .attr("cx",0).attr("cy",0).attr("r",10)
    .style("fill", myColor('Africa') );
//////////////////////////////////////////////////////////
// add svg label and text
/////////////////////////////////////////////////////////
svg.append("text")
.attr('transform', 'translate(500,100)')
        .attr("x", 0)
        .attr("y", -20)
        .attr("text-anchor", "left")
        .style("font-size", "15px")
        .style("fill", "grey")
        .style("font-weight", "bold")
        .style("max-width", 400)
        .text("Oceania");
svg
  .append('circle')
  .attr('transform', 'translate(477,73)')
.attr("cx",0).attr("cy",0).attr("r",10)
  .style("fill", myColor('Oceania') );

  }
  componentDidMount() {
    // var currentbtn = document.getElementById('bc');
    // var activeBtn = document.getElementsByClassName('active');
    // console.log(activeBtn);
    // for(var i = 0; i < activeBtn.length; i++){
    //   if(activeBtn[i] != currentbtn) activeBtn[i].className = ' ';
    // }
    // currentbtn.className = 'active';
  //   const url = 'https://raw.githubusercontent.com/yliugt/4462/main/olympic.json';
  //   axios.get(url).then( res => {
  //     this.setState({data:res.data});
  //     this.renderGraph(1984);
  //   });
  const url = 'http://localhost:3000/Olympics';
  fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',

      }
    }).then(res =>  { return res.json();})
      .then(resData => {
        resData = resData.map(d =>{
          var tempObj = d;
          tempObj.Year = parseInt(d.Year);
          tempObj.GDP = parseFloat(d.GDP);
          tempObj.GDP_Per_Capita = parseFloat(d.GDP_Per_Capita);
          tempObj.Medal = parseInt(d.Medal);
          tempObj.Population = parseInt(d.Population);
          tempObj.Athelets = parseInt(d.Athelets);
          tempObj.GDP_Growth = parseInt(d.GDP_Growth);
          return tempObj;
        })
        this.setState({data:resData});
        this.renderGraph(1984);
      }

    )
      .catch(err => {console.log(err)});
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
  //   <div style={{position:"relative", top:20}}>
  //   <div style={{position:"relative", top:-100}} ref="bubble"/>
  // <div style={{position:"relative", top:300}}>
  //   <Slider
  //     aria-label="Temperature"
  //     defaultValue={1984}
  //     valueLabelDisplay="auto"
  //     onChange ={this.handleChange}
  //     min={1984}
  //     max={1993}
  //   />
  //  </div>
  //  <div style={{position:"relative",top:270}}>
  //   selected year : {this.state.current}
  //  </div>
  // </div>

    return(
        <div style={{position:'relative', top:-250}}>
        <div ref="bubble"/>
      <div style={{position:'relative', top:400, left:-370}}>
        <Slider
          style={{width:'50%'}}
          aria-label="Temperature"
          defaultValue={1984}
          valueLabelDisplay="auto"
          onChange ={this.handleChange}
          min={1984}
          max={1993}
        />
        <div style={{position:'relative'}}>
        Bubble Chart selected year : <span style={{color:'green', fontWeight:'bold'}}>{this.state.current}</span>
        </div>
       </div>

      </div>
    );
  }
}

export default BubbleChart ;
