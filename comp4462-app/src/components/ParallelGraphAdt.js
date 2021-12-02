import React from "react";
import * as d3 from "d3";
import {event} from 'd3';
import { Slider } from 'material-ui-slider';
import d3Tip from 'd3-tip'
const axios = require('axios').default;
//last graph in observable
class ParallelGraphAdt extends React.Component {
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

    const height = 400;
    const width = 400;
    // remove svg before drawing svg , prevent repeating drawing.
    d3.selectAll('#adt').remove();
    d3.selectAll('#tooltip').remove();
    const svg3 = d3.select(this.refs.svg3)
                  .append('svg')
                  .attr('width', 1000)
                  .attr('hegith', height)
                  .attr('id', 'adt');
                  console.log(this.state.data);
                  const margin = { left: 40, top: 30, right: 40, bottom: 20 }

                  const dimensions = [ 'GDP_Growth',  'Medal','Athelets','Population','GDP','GDP_Per_Capita']
                  const dimension2 = [ 'GDP_Growth',  'Medal','Athelets','Population','GDP','GDP_Per_Capita','Continent']
                  var data = this.state.data.filter(d=>{
                    return (d.Year==selectedYear) & parseInt(d.Population)<400000000 & parseInt(d.GDP)<8000000000000;
                  })
                  data = data.map(d =>{
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
                  console.log(data);

                  // Use scalePoint because x-axis domain is discrete
                  const xScale = d3.scalePoint()
                    .range([margin.left, 1000 - margin.right])
                    .domain(dimensions)

                  // Plot x-axis at the top, remove the line stroke
                  svg3.append('g')
                    .call(d3.axisTop(xScale))
                    .attr('transform', `translate(0,${margin.top})`)
                    .selectAll('path')
                      .attr('stroke', 'none')

                  // Make one y-scale for each dimension
                  const yScales = dimensions.map(dimension =>
                    d3.scaleLinear()
                      .range([height - margin.bottom, margin.top])
                      .domain(d3.extent(data.map(d => d[dimension])))
                  )

                  var myColor = d3.scaleOrdinal()
                    .domain(["Low income","Lower middle income","Upper middle income","High income"])
                    .range(["#EC7063","#EC7063","#F1C40F","#5DADE2"]);

                  // Plot axes for each dimension
                  dimensions.forEach((dimension, i) => {
                    svg3.append('g')
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
                      d3.selectAll(".line").filter("."+d.Income.substring(0,3))
                        .transition().duration(100)
                        .style("stroke", myColor(d.Income))
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
                      <div id="tooltip" style='float: right'>
                        ${d.Country}:${d.Income} <br/>
                        Continent: ${d.Continent} <br/>
                      </div>`)

                  svg3.call(tooltip)

                  var doNotHighlight = function(i,d){
                      d3.selectAll(".line")
                        .transition().duration(200).delay(500)
                        .style("stroke", function(d){ return( myColor(d.Income))} )
                        .style("opacity", "1")

                  }

                  var clickevent=function(event,d){
                    d3.selectAll(".line")
                      .transition().duration(200)
                      .style("stroke", "lightgrey")
                      .style("opacity", "0.1")
                    d3.select(this)
                        .transition().duration(100)
                        .style("stroke", myColor(d.Income))
                        .style("opacity", "1")
                  }

                  // Just like a line chart!
                  svg3.append('g')
                    .selectAll('path')
                    .data(data)
                    .enter()
                    .append('path')
                      .attr("class", function (d) {
                        return "line "+d.Income.substring(0,3) } )
                      .attr('d', path)
                      .attr('fill', 'none')
                      .attr('stroke', d=>myColor(d.Income))
                      .attr('stroke-width','3px')
                      .attr('stroke-opacity','0.8')
                    .on("mouseover.text", tooltip.show)
                    .on("mouseover.line", highlight)
                    .on('click',clickevent)
                    .on("mouseleave.text", tooltip.hide)
                    .on("mouseleave.line", doNotHighlight)
//////////////////////////////////////////////////////
//////// add color label
/////////////////////////////////////////////////////
                    svg3.append("text")
                    .attr('transform', 'translate(53,-3)')
                            .attr("x", 0)
                            .attr("y", -20)
                            .attr("text-anchor", "left")
                            .style("font-size", "15px")
                            .style("fill", "grey")
                            .style("font-weight", "bold")
                            .style("max-width", 400)
                            .text("Low income & Lower middle income");
                    svg3
                      .append('circle')
                      .attr('transform', 'translate(30,-30)')
                    .attr("cx",0).attr("cy",0).attr("r",10)
                      .style("fill", "#EC7063" )
//////////////////////////////////////////////////////////
// add svg label and text
/////////////////////////////////////////////////////////
                svg3.append("text")
                .attr('transform', 'translate(380,-3)')
                        .attr("x", 0)
                        .attr("y", -20)
                        .attr("text-anchor", "left")
                        .style("font-size", "15px")
                        .style("fill", "grey")
                        .style("font-weight", "bold")
                        .style("max-width", 400)
                        .text("Upper middle income");
                svg3
                  .append('circle')
                  .attr('transform', 'translate(357,-30)')
                .attr("cx",0).attr("cy",0).attr("r",10)
                  .style("fill", "#F1C40F" );
//////////////////////////////////////////////////////////
// add svg label and text
/////////////////////////////////////////////////////////
                svg3.append("text")
                .attr('transform', 'translate(600,-3)')
                        .attr("x", 0)
                        .attr("y", -20)
                        .attr("text-anchor", "left")
                        .style("font-size", "15px")
                        .style("fill", "grey")
                        .style("font-weight", "bold")
                        .style("max-width", 400)
                        .text("High income");
                svg3
                  .append('circle')
                  .attr('transform', 'translate(577,-30)')
                .attr("cx",0).attr("cy",0).attr("r",10)
                  .style("fill", "#5DADE2" );
        return(
          <svg ref={this.myRef} style={{height:1000, width:1000}} />
        );
  }
  componentDidMount() {
    // const url = 'https://raw.githubusercontent.com/yliugt/4462/main/olympic.json';
    // d3.csv('https://raw.githubusercontent.com/yliugt/4462/main/olympic.csv', function(Resdata) {
    //   return Resdata;
    // }).then(
    // (Resdata)=>{
    //   this.setState({data:Resdata});
    //   this.renderGraph(1984);
    // })
    const url = 'http://localhost:3000/Olympics';
    fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json',

        }
      }).then(res =>  { return res.json();})
        .then(resData => {
          this.setState({data:resData})
          this.renderGraph(1984);
        }

      )
        .catch(err => {console.log(err)});

    // axios.get(url).then( res => {
    // this.setState({data:res.data});
    // this.renderGraph(1984);
    // });
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
        <div>
        <div style={{position:"relative", top:600, left:0}}>
        <h1>Analysis:</h1>
<p>1.There are two Asian countries that act as most European countries:</p>
<p>2.Japan and South Korea! Surprisingly they are both high-income countries!</p>
Question: Does the pattern has a high correlation with the income level of the countries?
      </div>
        <div style={{position:"relative", top:650, left:0}} ref="svg3"/>
      <div style={{position:"relative", top:860, left:0}}>
        <Slider
          style={{width:'90%'}}
          aria-label="Temperature"
          defaultValue={1984}
          valueLabelDisplay="auto"
          onChange ={this.handleChange}
          min={1984}
          max={1993}
        />
        <div style={{position:'relative'}}>
        Parallel Graph selected year: <span style={{color:'green', fontWeight:'bold'}}>{this.state.current}</span>
        </div>
       </div>
      </div>
    );
  }
}

export default ParallelGraphAdt ;
